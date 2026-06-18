/* gemini-widget.js — floating AI chat widget powered by Gemini
 *
 * Usage:
 *   <script src="gemini-widget.js"></script>
 *   <script>
 *     GeminiChat.init({
 *       apiKey:       'AIza...',
 *       model:        'gemini-2.0-flash',     // optional
 *       systemPrompt: 'You are a helper...',  // optional
 *       title:        'AI Assistant',         // optional
 *       subtitle:     'Powered by Gemini',    // optional
 *     });
 *   </script>
 */
(function (global) {
  'use strict';

  // ── Colour helpers ──────────────────────────────────────────────────────────

  function parseRGB(str) {
    try {
      var c = document.createElement('canvas');
      c.width = c.height = 1;
      var ctx = c.getContext('2d');
      ctx.fillStyle = '#000';   // reset
      ctx.fillStyle = str;      // normalise to computed rgb
      ctx.fillRect(0, 0, 1, 1);
      var d = ctx.getImageData(0, 0, 1, 1).data;
      return { r: d[0], g: d[1], b: d[2], a: d[3] };
    } catch (e) {
      return null;
    }
  }

  function luminance(rgb) {
    function lin(x) {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
  }

  function isDark(str) {
    var rgb = parseRGB(str);
    return !!(rgb && rgb.a > 20 && luminance(rgb) < 0.179);
  }

  function isTransparent(str) {
    var rgb = parseRGB(str);
    return !rgb || rgb.a < 20;
  }

  function contrastFg(str) {
    var rgb = parseRGB(str);
    if (!rgb) return '#ffffff';
    return luminance(rgb) > 0.179 ? '#111111' : '#ffffff';
  }

  // ── Design detector ─────────────────────────────────────────────────────────

  function detectDesign() {
    var rootSt = getComputedStyle(document.documentElement);
    var bodySt = getComputedStyle(document.body);

    // 1. Try well-known CSS custom property names for an accent colour
    var cssVars = [
      '--color-primary', '--primary-color', '--accent-color', '--color-accent',
      '--brand-color',   '--theme-color',   '--primary',      '--accent',
    ];
    var accent = '';
    for (var i = 0; i < cssVars.length; i++) {
      var v = rootSt.getPropertyValue(cssVars[i]).trim();
      if (v) { accent = v; break; }
    }

    // 2. Fallback: grab the background of the first non-transparent, non-white button
    if (!accent) {
      var btn = document.querySelector(
        '.btn-primary, a.btn, button.btn, button:not([disabled])'
      );
      if (btn) {
        var btnBg = getComputedStyle(btn).backgroundColor;
        if (!isTransparent(btnBg)) {
          var rgb = parseRGB(btnBg);
          if (rgb && !(rgb.r > 220 && rgb.g > 220 && rgb.b > 220)) {
            accent = btnBg;
          }
        }
      }
    }

    // 3. Effective page background (body may be transparent)
    var pageBg = bodySt.backgroundColor;
    if (isTransparent(pageBg)) pageBg = rootSt.backgroundColor;
    if (isTransparent(pageBg)) pageBg = '#ffffff';

    // 4. Dark / light decision
    var dark = isDark(pageBg);

    // 5. Accent fallback
    if (!accent || isTransparent(accent)) {
      accent = dark ? '#60a5fa' : '#3b82f6';
    }

    return {
      accent: accent,
      font:   bodySt.fontFamily || 'system-ui, -apple-system, sans-serif',
      pageBg: pageBg,
      dark:   dark,
    };
  }

  // ── Markdown renderer ───────────────────────────────────────────────────────

  function renderMd(raw) {
    // 1. Lift fenced code blocks into protected placeholders
    var blocks = [];
    var s = raw.replace(/```(\w*)\n?([\s\S]*?)```/g, function (_, lang, code) {
      blocks.push({ lang: lang || '', code: code.trim() });
      return '\x00B' + (blocks.length - 1) + '\x00';
    });

    // 2. HTML-escape the rest
    s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 3. Inline code
    s = s.replace(/`([^`\n]+)`/g, function (_, c) {
      return '<code>' + c + '</code>';
    });

    // 4. Bold / italic
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__(.+?)__/g,     '<strong>$1</strong>');
    s = s.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    s = s.replace(/_([^_\n]+)_/g,   '<em>$1</em>');

    // 5. Unordered lists (consecutive lines starting with - * +)
    s = s.replace(/((?:^|\n)[ \t]*[-*+] [^\n]+)+/g, function (block) {
      var items = block.replace(/^\n/, '').split('\n').filter(Boolean).map(function (l) {
        return '<li>' + l.replace(/^\s*[-*+] /, '') + '</li>';
      });
      return '<ul>' + items.join('') + '</ul>';
    });

    // 6. Ordered lists
    s = s.replace(/((?:^|\n)[ \t]*\d+\. [^\n]+)+/g, function (block) {
      var items = block.replace(/^\n/, '').split('\n').filter(Boolean).map(function (l) {
        return '<li>' + l.replace(/^\s*\d+\. /, '') + '</li>';
      });
      return '<ol>' + items.join('') + '</ol>';
    });

    // 7. Paragraphs (double newline) and single line breaks
    s = '<p>' + s.split(/\n{2,}/).join('</p><p>') + '</p>';
    s = s.replace(/<p>\s*<\/p>/g, '');
    s = s.replace(/([^>])\n/g, '$1<br>');

    // 8. Restore code blocks (with their own HTML escaping)
    s = s.replace(/\x00B(\d+)\x00/g, function (_, idx) {
      var b = blocks[parseInt(idx, 10)];
      var escaped = b.code
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return '<pre><code class="lang-' + b.lang + '">' + escaped + '</code></pre>';
    });

    // 9. Unwrap <pre> accidentally wrapped in <p>
    s = s.replace(/<p>(<pre[\s\S]*?<\/pre>)<\/p>/g, '$1');

    return s;
  }

  // ── CSS builder ─────────────────────────────────────────────────────────────

  function buildCSS(d) {
    var fg      = contrastFg(d.accent);
    var dark    = d.dark;

    var chatBg   = dark ? '#16181d' : '#ffffff';
    var border   = dark ? 'rgba(255,255,255,.09)' : 'rgba(0,0,0,.09)';
    var textMain = dark ? '#e4e6ee' : '#111827';
    var textMid  = dark ? '#8b8fa8' : '#6b7280';
    var botBg    = dark ? '#252836' : '#f0f2f5';
    var inputBg  = dark ? '#1a1c24' : '#ffffff';
    var inputBdr = dark ? 'rgba(255,255,255,.13)' : 'rgba(0,0,0,.13)';
    var scroll   = dark ? '#35384a' : '#d1d5db';
    var errBg    = dark ? 'rgba(239,68,68,.15)' : 'rgba(239,68,68,.08)';
    var linkClr  = dark ? '#7cb9f4' : '#2563eb';
    var winShadow = dark
      ? '0 8px 40px rgba(0,0,0,.55),0 2px 8px rgba(0,0,0,.36)'
      : '0 8px 40px rgba(0,0,0,.15),0 2px 8px rgba(0,0,0,.08)';

    return [
      '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }',

      /* wrapper */
      '.w {',
      '  position: fixed; bottom: 24px; right: 24px; z-index: 9999;',
      '  display: flex; flex-direction: column; align-items: flex-end; gap: 12px;',
      '  font-family: ' + d.font + ';',
      '}',

      /* FAB */
      '.fab {',
      '  width: 56px; height: 56px; border-radius: 50%;',
      '  background: ' + d.accent + '; color: ' + fg + ';',
      '  border: none; cursor: pointer; flex-shrink: 0;',
      '  display: flex; align-items: center; justify-content: center;',
      '  box-shadow: 0 4px 18px rgba(0,0,0,.28);',
      '  transition: transform .2s ease, box-shadow .2s ease;',
      '  position: relative; outline: none;',
      '}',
      '.fab:hover { transform: scale(1.09); box-shadow: 0 6px 24px rgba(0,0,0,.34); }',
      '.fab:focus-visible { outline: 3px solid ' + d.accent + '; outline-offset: 3px; }',
      '.fab svg { width: 26px; height: 26px; transition: opacity .15s, transform .15s; position: absolute; }',
      '.fab .i-open  { opacity: 1; transform: scale(1); }',
      '.fab .i-close { opacity: 0; transform: rotate(-45deg) scale(.75); }',
      '.fab.active .i-open  { opacity: 0; transform: rotate(45deg) scale(.75); }',
      '.fab.active .i-close { opacity: 1; transform: rotate(0deg) scale(1); }',

      /* window */
      '.win {',
      '  width: 380px; height: 560px;',
      '  background: ' + chatBg + ';',
      '  border-radius: 18px; border: 1px solid ' + border + ';',
      '  box-shadow: ' + winShadow + ';',
      '  display: flex; flex-direction: column; overflow: hidden;',
      '  transform: scale(.88) translateY(22px); opacity: 0; pointer-events: none;',
      '  transform-origin: bottom right;',
      '  transition: transform .28s cubic-bezier(.34,1.56,.64,1), opacity .22s ease;',
      '}',
      '.win.show { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }',

      /* header */
      '.hdr {',
      '  background: ' + d.accent + '; color: ' + fg + ';',
      '  padding: 13px 14px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;',
      '}',
      '.hdr-av {',
      '  width: 38px; height: 38px; border-radius: 50%;',
      '  background: rgba(255,255,255,.18);',
      '  display: flex; align-items: center; justify-content: center; flex-shrink: 0;',
      '}',
      '.hdr-av svg { width: 22px; height: 22px; }',
      '.hdr-info { flex: 1; min-width: 0; }',
      '.hdr-title { font-size: 15px; font-weight: 600; line-height: 1.2; }',
      '.hdr-sub   { font-size: 12px; opacity: .75; margin-top: 1px; }',
      '.hdr-acts  { display: flex; gap: 2px; }',
      '.ibtn {',
      '  width: 34px; height: 34px; border-radius: 8px;',
      '  background: transparent; border: none; cursor: pointer;',
      '  color: ' + fg + '; opacity: .75;',
      '  display: flex; align-items: center; justify-content: center;',
      '  transition: opacity .15s, background .15s; outline: none;',
      '}',
      '.ibtn:hover { opacity: 1; background: rgba(255,255,255,.16); }',
      '.ibtn:focus-visible { outline: 2px solid rgba(255,255,255,.55); outline-offset: 1px; }',
      '.ibtn svg { width: 18px; height: 18px; }',

      /* messages */
      '.msgs {',
      '  flex: 1; overflow-y: auto; padding: 14px 14px 8px;',
      '  display: flex; flex-direction: column; gap: 10px;',
      '  scroll-behavior: smooth;',
      '}',
      '.msgs::-webkit-scrollbar { width: 4px; }',
      '.msgs::-webkit-scrollbar-thumb { background: ' + scroll + '; border-radius: 2px; }',

      /* welcome */
      '.welcome {',
      '  text-align: center; padding: 30px 16px;',
      '  color: ' + textMid + '; font-size: 14px; line-height: 1.65;',
      '}',
      '.welcome-icon { font-size: 40px; display: block; margin-bottom: 10px; }',
      '.welcome strong { color: ' + textMain + '; display: block; font-size: 16px; margin-bottom: 6px; }',

      /* bubbles */
      '@keyframes pop { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }',
      '.msg { display: flex; flex-direction: column; max-width: 83%; animation: pop .2s ease; }',
      '.msg.u { align-self: flex-end; align-items: flex-end; }',
      '.msg.b { align-self: flex-start; align-items: flex-start; }',
      '.bbl {',
      '  padding: 9px 13px; font-size: 14px; line-height: 1.57;',
      '  word-break: break-word; border-radius: 16px;',
      '}',
      '.msg.u .bbl { background: ' + d.accent + '; color: ' + fg + '; border-bottom-right-radius: 4px; }',
      '.msg.b .bbl { background: ' + botBg + '; color: ' + textMain + '; border-bottom-left-radius: 4px; }',
      '.ts { font-size: 11px; color: ' + textMid + '; margin-top: 3px; padding: 0 3px; }',

      /* markdown in bot bubble */
      '.msg.b .bbl p { margin: 0 0 6px; }',
      '.msg.b .bbl p:last-child { margin-bottom: 0; }',
      '.bbl strong { font-weight: 600; }',
      '.bbl em { font-style: italic; }',
      '.bbl a { color: ' + linkClr + '; }',
      '.bbl code {',
      '  font-family: "Fira Code", Consolas, "Courier New", monospace;',
      '  font-size: 13px; background: rgba(0,0,0,.12);',
      '  padding: 1px 5px; border-radius: 4px;',
      '}',
      '.msg.u .bbl code { background: rgba(255,255,255,.2); }',
      '.bbl pre {',
      '  background: rgba(0,0,0,.17); border-radius: 8px;',
      '  padding: 10px 12px; margin: 6px 0; overflow-x: auto;',
      '  font-size: 13px; line-height: 1.5;',
      '}',
      '.msg.u .bbl pre { background: rgba(0,0,0,.22); }',
      '.bbl pre code { background: transparent; padding: 0; }',
      '.bbl ul, .bbl ol { margin: 6px 0 6px 20px; }',
      '.bbl li { margin-bottom: 2px; }',

      /* typing indicator */
      '.typing {',
      '  display: flex; align-self: flex-start; align-items: center; gap: 5px;',
      '  padding: 11px 14px; background: ' + botBg + ';',
      '  border-radius: 16px; border-bottom-left-radius: 4px;',
      '  animation: pop .2s ease;',
      '}',
      '.dot {',
      '  width: 7px; height: 7px; border-radius: 50%;',
      '  background: ' + textMid + '; animation: bounce 1.2s infinite;',
      '}',
      '.dot:nth-child(2) { animation-delay: .2s; }',
      '.dot:nth-child(3) { animation-delay: .4s; }',
      '@keyframes bounce {',
      '  0%,60%,100% { transform: translateY(0); opacity: .5; }',
      '  30% { transform: translateY(-6px); opacity: 1; }',
      '}',

      /* error */
      '.err {',
      '  font-size: 13px; color: #ef4444; text-align: center;',
      '  padding: 6px 12px; border-radius: 8px;',
      '  background: ' + errBg + '; animation: pop .2s ease;',
      '}',

      /* input bar */
      '.inp-bar {',
      '  padding: 10px 12px; border-top: 1px solid ' + border + ';',
      '  background: ' + chatBg + ';',
      '  display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;',
      '}',
      '.inp-wrap {',
      '  flex: 1; display: flex; align-items: flex-end;',
      '  background: ' + inputBg + '; border: 1.5px solid ' + inputBdr + ';',
      '  border-radius: 12px; overflow: hidden; transition: border-color .15s;',
      '}',
      '.inp-wrap:focus-within { border-color: ' + d.accent + '; }',
      '.inp {',
      '  flex: 1; border: none; outline: none;',
      '  background: transparent; color: ' + textMain + ';',
      '  font-family: ' + d.font + '; font-size: 14px; line-height: 1.5;',
      '  padding: 10px 12px; resize: none;',
      '  min-height: 42px; max-height: 120px; overflow-y: auto;',
      '}',
      '.inp::placeholder { color: ' + textMid + '; }',
      '.inp::-webkit-scrollbar { width: 0; }',
      '.snd {',
      '  width: 40px; height: 40px; border-radius: 10px;',
      '  background: ' + d.accent + '; color: ' + fg + ';',
      '  border: none; cursor: pointer; flex-shrink: 0;',
      '  display: flex; align-items: center; justify-content: center;',
      '  transition: opacity .15s, transform .1s; outline: none;',
      '}',
      '.snd:hover:not(:disabled) { opacity: .83; transform: scale(1.07); }',
      '.snd:disabled { opacity: .38; cursor: default; }',
      '.snd:focus-visible { outline: 3px solid ' + d.accent + '; outline-offset: 2px; }',
      '.snd svg { width: 18px; height: 18px; }',

      /* mobile */
      '@media (max-width: 480px) {',
      '  .w { bottom: 16px; right: 16px; }',
      '  .win {',
      '    position: fixed; inset: 0; width: 100%; height: 100%;',
      '    border-radius: 0; border: none;',
      '    transform: translateY(100%); opacity: 1;',
      '    transition: transform .3s cubic-bezier(.4,0,.2,1);',
      '  }',
      '  .win.show { transform: translateY(0); }',
      '}',
    ].join('\n');
  }

  // ── HTML builder ────────────────────────────────────────────────────────────

  function htmlEsc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function buildHTML(cfg) {
    var title = htmlEsc(cfg.title       || 'AI Assistant');
    var sub   = htmlEsc(cfg.subtitle    || 'Powered by Gemini');
    var ph    = htmlEsc(cfg.placeholder || 'Type a message…');
    var wt    = htmlEsc(cfg.welcomeTitle || 'Hello! How can I help?');
    var wb    = htmlEsc(cfg.welcomeText  || "Ask me anything — I'm here to assist you.");

    return (
      '<div class="w">' +

        /* ── Chat window ── */
        '<div class="win" id="win" role="dialog" aria-modal="true" aria-label="' + title + '">' +

          /* Header */
          '<div class="hdr">' +
            '<div class="hdr-av" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="currentColor">' +
                '<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7' +
                '-7h1V5.73C10.4 5.39 10 4.74 10 4a2 2 0 0 1 2-2M7 14v2a5 5 0 0 0 10 0v-2H7m3 0a1 1' +
                ' 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1 1 1 0 0 1' +
                '-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1z"/>' +
              '</svg>' +
            '</div>' +
            '<div class="hdr-info">' +
              '<div class="hdr-title">' + title + '</div>' +
              '<div class="hdr-sub">'   + sub   + '</div>' +
            '</div>' +
            '<div class="hdr-acts">' +
              '<button class="ibtn" id="clrBtn" aria-label="Clear conversation" title="Clear history">' +
                '<svg viewBox="0 0 24 24" fill="currentColor">' +
                  '<path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9' +
                  'V8m4 0h2v9h-2V8z"/>' +
                '</svg>' +
              '</button>' +
              '<button class="ibtn" id="closeBtn" aria-label="Close chat">' +
                '<svg viewBox="0 0 24 24" fill="currentColor">' +
                  '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19' +
                  ' 12 13.41 17.59 19 19 17.59 13.41 12z"/>' +
                '</svg>' +
              '</button>' +
            '</div>' +
          '</div>' +

          /* Messages */
          '<div class="msgs" id="msgs" role="log" aria-live="polite" aria-label="Chat messages">' +
            '<div class="welcome" id="wlc">' +
              '<span class="welcome-icon" aria-hidden="true">✨</span>' +
              '<strong>' + wt + '</strong>' +
              wb +
            '</div>' +
          '</div>' +

          /* Input */
          '<div class="inp-bar" role="form" aria-label="Send a message">' +
            '<div class="inp-wrap">' +
              '<textarea class="inp" id="inp" rows="1"' +
                ' placeholder="' + ph + '"' +
                ' aria-label="Message input"' +
                ' autocomplete="off" spellcheck="true"></textarea>' +
            '</div>' +
            '<button class="snd" id="sndBtn" aria-label="Send message" disabled>' +
              '<svg viewBox="0 0 24 24" fill="currentColor">' +
                '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>' +
              '</svg>' +
            '</button>' +
          '</div>' +

        '</div>' + /* end .win */

        /* ── FAB ── */
        '<button class="fab" id="fab"' +
          ' aria-label="Open chat" aria-expanded="false" aria-controls="win">' +
          '<svg class="i-open" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
            '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' +
            'M6 14v-2h12v2H6zm0-3V9h12v2H6zm0-3V6h12v2H6z"/>' +
          '</svg>' +
          '<svg class="i-close" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
            '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19' +
            ' 12 13.41 17.59 19 19 17.59 13.41 12z"/>' +
          '</svg>' +
        '</button>' +

      '</div>'
    );
  }

  // ── Widget ──────────────────────────────────────────────────────────────────

  var GeminiChat = {
    _cfg:  null,
    _host: null,
    _root: null,   // ShadowRoot
    _msgs: [],     // conversation history for the API
    _open: false,
    _busy: false,

    // ─ Public API ─────────────────────────────────────────────────────────────

    init: function (cfg) {
      this._cfg = {
        model:        'gemini-2.0-flash',
        systemPrompt: '',
        title:        'AI Assistant',
        subtitle:     'Powered by Gemini',
        placeholder:  'Type a message…',
        welcomeTitle: 'Hello! How can I help?',
        welcomeText:  "Ask me anything — I'm here to assist you.",
      };
      for (var k in cfg) {
        if (Object.prototype.hasOwnProperty.call(cfg, k)) this._cfg[k] = cfg[k];
      }
      this._mount();
    },

    // ─ Mount ──────────────────────────────────────────────────────────────────

    _mount: function () {
      var design = detectDesign();

      this._host = document.createElement('div');
      this._host.setAttribute('role', 'complementary');
      this._host.setAttribute('aria-label', 'Chat widget');
      document.body.appendChild(this._host);

      this._root = this._host.attachShadow({ mode: 'open' });

      var styleEl = document.createElement('style');
      styleEl.textContent = buildCSS(design);
      this._root.appendChild(styleEl);

      var tmp = document.createElement('div');
      tmp.innerHTML = buildHTML(this._cfg);
      this._root.appendChild(tmp.firstChild);

      this._wire();
    },

    // ─ Wire events ────────────────────────────────────────────────────────────

    _wire: function () {
      var self = this;
      var r    = this._root;

      r.getElementById('fab').addEventListener('click', function () {
        self._toggle();
      });
      r.getElementById('closeBtn').addEventListener('click', function () {
        self._close();
      });
      r.getElementById('clrBtn').addEventListener('click', function () {
        self._clear();
      });
      r.getElementById('sndBtn').addEventListener('click', function () {
        self._submit();
      });

      var inp    = r.getElementById('inp');
      var sndBtn = r.getElementById('sndBtn');

      inp.addEventListener('input', function () {
        self._resize(inp);
        sndBtn.disabled = !inp.value.trim() || self._busy;
      });

      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (!sndBtn.disabled) self._submit();
        }
      });

      r.getElementById('win').addEventListener('keydown', function (e) {
        if (e.key === 'Escape') self._close();
        if (e.key === 'Tab')    self._trapFocus(e);
      });
    },

    _trapFocus: function (e) {
      var win = this._root.getElementById('win');
      var els = Array.prototype.filter.call(
        win.querySelectorAll('button:not([disabled]), textarea:not([disabled])'),
        function (el) { return el.offsetParent !== null; }
      );
      if (!els.length) return;
      var first = els[0], last = els[els.length - 1];
      var active = this._root.activeElement;
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    },

    _resize: function (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    },

    // ─ Open / close ───────────────────────────────────────────────────────────

    _toggle: function () { this._open ? this._close() : this._show(); },

    _show: function () {
      var self = this;
      this._open = true;
      var fab = this._root.getElementById('fab');
      this._root.getElementById('win').classList.add('show');
      fab.classList.add('active');
      fab.setAttribute('aria-expanded', 'true');
      fab.setAttribute('aria-label', 'Close chat');
      setTimeout(function () {
        var inp = self._root.getElementById('inp');
        if (inp) inp.focus();
      }, 130);
    },

    _close: function () {
      this._open = false;
      var fab = this._root.getElementById('fab');
      this._root.getElementById('win').classList.remove('show');
      fab.classList.remove('active');
      fab.setAttribute('aria-expanded', 'false');
      fab.setAttribute('aria-label', 'Open chat');
      fab.focus();
    },

    _clear: function () {
      this._msgs = [];
      var wt = htmlEsc(this._cfg.welcomeTitle || 'Hello! How can I help?');
      var wb = htmlEsc(this._cfg.welcomeText  || 'Ask me anything.');
      this._root.getElementById('msgs').innerHTML =
        '<div class="welcome" id="wlc">' +
          '<span class="welcome-icon" aria-hidden="true">✨</span>' +
          '<strong>' + wt + '</strong>' + wb +
        '</div>';
    },

    // ─ Messages ───────────────────────────────────────────────────────────────

    _now: function () {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    _addMsg: function (role, text) {
      var msgs = this._root.getElementById('msgs');
      var wlc  = this._root.getElementById('wlc');
      if (wlc) wlc.remove();

      var wrap = document.createElement('div');
      wrap.className = 'msg ' + (role === 'user' ? 'u' : 'b');

      var bbl = document.createElement('div');
      bbl.className = 'bbl';
      if (role === 'user') {
        bbl.textContent = text;        // plain text: safe by default
      } else {
        bbl.innerHTML = renderMd(text); // markdown rendered on bot side only
      }

      var ts = document.createElement('div');
      ts.className = 'ts';
      ts.textContent = this._now();
      ts.setAttribute('aria-hidden', 'true');

      wrap.appendChild(bbl);
      wrap.appendChild(ts);
      msgs.appendChild(wrap);
      this._scrollBottom();
    },

    _scrollBottom: function () {
      var msgs = this._root.getElementById('msgs');
      msgs.scrollTop = msgs.scrollHeight;
    },

    _typing: function (show) {
      var msgs     = this._root.getElementById('msgs');
      var existing = this._root.getElementById('typing');
      if (show) {
        if (existing) return;
        var el = document.createElement('div');
        el.className = 'typing'; el.id = 'typing';
        el.setAttribute('aria-label', 'Typing…');
        el.innerHTML =
          '<div class="dot"></div>' +
          '<div class="dot"></div>' +
          '<div class="dot"></div>';
        msgs.appendChild(el);
        this._scrollBottom();
      } else {
        if (existing) existing.remove();
      }
    },

    _showErr: function (msg) {
      var msgs = this._root.getElementById('msgs');
      var el   = document.createElement('div');
      el.className = 'err';
      el.setAttribute('role', 'alert');
      el.textContent = msg;
      msgs.appendChild(el);
      this._scrollBottom();
      setTimeout(function () { if (el.parentNode) el.remove(); }, 7000);
    },

    // ─ Submit ─────────────────────────────────────────────────────────────────

    _submit: function () {
      var self   = this;
      var inp    = this._root.getElementById('inp');
      var sndBtn = this._root.getElementById('sndBtn');
      var text   = inp.value.trim();
      if (!text || this._busy) return;

      inp.value = '';
      inp.style.height = 'auto';
      sndBtn.disabled = true;
      this._busy = true;

      this._msgs.push({ role: 'user', text: text });
      this._addMsg('user', text);
      this._typing(true);

      this._callAPI().then(
        function (reply) {
          self._typing(false);
          self._msgs.push({ role: 'assistant', text: reply });
          self._addMsg('model', reply);
          self._busy = false;
          sndBtn.disabled = !inp.value.trim();
          inp.focus();
        },
        function (err) {
          self._typing(false);
          self._msgs.pop(); // revert failed user turn
          self._showErr('Error: ' + (err.message || 'Could not reach AI'));
          console.error('[GeminiChat]', err);
          self._busy = false;
          sndBtn.disabled = !inp.value.trim();
          inp.focus();
        }
      );
    },

    // ─ API dispatcher ─────────────────────────────────────────────────────────

    _callAPI: function () {
      var provider = (this._cfg.provider || 'gemini').toLowerCase();
      return provider === 'claude' ? this._callClaude() : this._callGemini();
    },

    _callGemini: function () {
      var cfg   = this._cfg;
      var model = cfg.model || 'gemini-2.0-flash';
      var key   = encodeURIComponent(cfg.apiKey || '');
      var url   = 'https://generativelanguage.googleapis.com/v1beta/models/' +
                  model + ':generateContent?key=' + key;

      // Convert neutral history to Gemini format (role: 'user'|'model', parts)
      var contents = this._msgs.map(function (m) {
        return { role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] };
      });
      var body = { contents: contents };
      if (cfg.systemPrompt) body.systemInstruction = { parts: [{ text: cfg.systemPrompt }] };

      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(function (res) {
        return res.json().then(function (json) {
          if (!res.ok) throw new Error((json && json.error && json.error.message) || 'HTTP ' + res.status);
          var c = json && json.candidates && json.candidates[0];
          var text = c && c.content && c.content.parts && c.content.parts[0] && c.content.parts[0].text;
          if (!text) throw new Error('Empty response from Gemini');
          return text;
        });
      });
    },

    _callClaude: function () {
      var cfg      = this._cfg;
      var model    = cfg.model || 'claude-sonnet-4-6';
      var endpoint = (cfg.endpoint || 'https://api.anthropic.com').replace(/\/$/, '');
      var url      = endpoint + '/v1/messages';

      var messages = this._msgs.map(function (m) {
        return { role: m.role, content: m.text };
      });
      var body = {
        model:      model,
        max_tokens: cfg.maxTokens || 1024,
        messages:   messages,
      };
      if (cfg.systemPrompt) body.system = cfg.systemPrompt;

      // Use Authorization: Bearer — most proxy services require this instead of x-api-key.
      // anthropic-version header is intentionally omitted: proxy servers typically
      // don't whitelist it in CORS Access-Control-Allow-Headers, causing preflight failure.
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + (cfg.apiKey || ''),
        },
        body: JSON.stringify(body),
      }).then(function (res) {
        return res.text().then(function (raw) {
          var json;
          try { json = JSON.parse(raw); } catch (_) {
            throw new Error('Server error (HTTP ' + res.status + '). Make sure the site is running via: node server.js');
          }
          if (!res.ok) {
            var msg = (json && json.error && (json.error.message || json.error))
              || 'HTTP ' + res.status;
            throw new Error(msg);
          }
          // Handle both Anthropic format {content:[{text}]} and OpenAI format {choices:[{message:{content}}]}
          var text =
            (json.content && json.content[0] && json.content[0].text) ||
            (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content);
          if (!text) throw new Error('Empty response from Claude');
          return text;
        });
      });
    },
  };

  global.GeminiChat = GeminiChat;

}(typeof window !== 'undefined' ? window : this));
