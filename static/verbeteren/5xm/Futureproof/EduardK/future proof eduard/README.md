# mcase — AI Chat Concept

> Macintosh Case Studio · AI layer

This repository contains two complementary AI chat implementations built for the mcase project. The idea: give visitors a way to ask questions, explore the product, and get help — without friction, and without compromising privacy.

---

## The idea

Two modes of AI chat, solving different problems:

| | Local AI | Cloud widget |
|---|---|---|
| **File** | `local-ai-chat.html` | `gemini-widget.js` |
| **Model runs** | In the browser | On Google / Anthropic servers |
| **Privacy** | 100% on-device, zero network | API key required, data leaves device |
| **Speed** | Fast with WebGPU, slower on CPU | Fast, always |
| **Cost** | Free, forever | Pay-per-token |
| **Use case** | Standalone chat page | Embeddable widget on any site |

---

## 1. Local AI Chat (`local-ai-chat.html`)

A fully self-contained chat page. The AI model downloads once to the browser cache via [Transformers.js](https://github.com/xenova/transformers.js) and then runs entirely on the visitor's device — no server, no API key, no data sent anywhere.

**Model:** `SmolLM2-135M-Instruct` (HuggingFace)  
**Runtime:** WebGPU (fast) with automatic fallback to WASM/CPU

### How it works

1. On first load, the model weights (~270 MB) are downloaded from HuggingFace CDN and cached in the browser.
2. Subsequent visits load instantly from cache.
3. Text generation streams token-by-token with a live cursor.
4. Conversation history is kept in memory for the session (clears on refresh).

### Features

- WebGPU auto-detection with CPU fallback
- Real-time token streaming
- Tokens/sec performance display
- Dark / light theme toggle
- Stop generation mid-stream
- Responsive, mobile-friendly layout

### Usage

Just open the file in a browser. No server needed.

```
open local-ai-chat.html
```

For production, serve from any static host (GitHub Pages, Netlify, Vercel).

---

## 2. Gemini/Claude Chat Widget (`gemini-widget.js`)

A floating chat button that drops into any existing page with two lines of HTML. Supports both **Google Gemini** and **Anthropic Claude** as backends.

The widget auto-detects the page's colour scheme (CSS custom properties, button colours, dark/light background) and adapts its accent colour accordingly. It lives in a Shadow DOM so it never conflicts with the host page's styles.

### Features

- Floating action button (FAB) with open/close animation
- Adaptive theme — reads the host page's accent colour automatically
- Markdown rendering (bold, italic, code blocks, lists)
- Typing indicator while waiting for a response
- Full keyboard accessibility + focus trap
- Mobile: expands to full-screen
- Supports Gemini and Claude APIs (and any Claude-compatible proxy)

### Setup

```html
<!-- Add before </body> -->
<script src="gemini-widget.js"></script>
<script>
  GeminiChat.init({
    apiKey:       'YOUR_API_KEY',
    provider:     'gemini',          // 'gemini' or 'claude'
    model:        'gemini-2.0-flash', // or 'claude-sonnet-4-6'
    systemPrompt: 'You are a helpful assistant for mcase. Answer questions about our Mac mini enclosures.',
    title:        'mcase Assistant',
    subtitle:     'Powered by AI',
  });
</script>
```

#### With Claude via a proxy

```js
GeminiChat.init({
  provider:  'claude',
  apiKey:    'YOUR_KEY',
  model:     'claude-sonnet-4-6',
  endpoint:  'https://your-proxy.example.com', // optional, defaults to api.anthropic.com
});
```

> **Note:** Calling the Anthropic API directly from the browser exposes your API key. For production, route requests through `proxy.js` (included) or a serverless function.

---

## Running the proxy (`server.js` / `proxy.js`)

The included Node proxy forwards requests to the Anthropic API server-side, keeping the API key out of the browser.

```bash
npm install   # if a package.json is present
node server.js
```

Then point the widget at `http://localhost:PORT`.

---

## File overview

```
index.html               # Redirect to main page
imac-mini-case-studio.html  # mcase landing page
local-ai-chat.html       # Standalone browser-local AI chat
gemini-widget.js         # Embeddable floating chat widget
server.js                # Node server / proxy entry point
proxy.js                 # Anthropic API proxy logic
img/                     # Assets
```

---

## Tech stack

- **Transformers.js 3** — run ONNX models in the browser via WebGPU/WASM
- **HuggingFace Hub** — model hosting and CDN
- **Google Gemini API** (`gemini-2.0-flash`) — cloud AI backend option
- **Anthropic Claude API** (`claude-sonnet-4-6`) — cloud AI backend option
- Vanilla JS, no build step, no framework
