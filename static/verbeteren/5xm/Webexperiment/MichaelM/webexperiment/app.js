// Visuele dobbelsteen webexperiment
// - Tekent een grote '3D' dobbelsteen op canvas
// - Klik of druk spatie om te rollen
// - Houdt geschiedenis bij en toont in de sidebar
// - Autonoom idle animatie en af en toe automatische roll

const dieCanvas = document.getElementById('die');
const dieCtx = dieCanvas.getContext('2d');
const bgCanvas = document.getElementById('bg');
const bgCtx = bgCanvas.getContext('2d');
const listEl = document.getElementById('list');
const hint = document.getElementById('hint');
const leaderboardList = document.getElementById('leaderboard-list');
const hofResetBtn = document.getElementById('hof-reset');

// Hall of Fame persisted in localStorage under key
const HOF_KEY = 'webexp_hof_v1';
let hallOfFame = [];

function loadHallOfFame(){
  try{
    const raw = localStorage.getItem(HOF_KEY);
    if(raw) hallOfFame = JSON.parse(raw);
  }catch(e){ hallOfFame = []; }
}

function saveHallOfFame(){
  try{ localStorage.setItem(HOF_KEY, JSON.stringify(hallOfFame)); }catch(e){}
}

function renderHallOfFame(){
  if(!leaderboardList) return;
  leaderboardList.innerHTML = '';
  if(hallOfFame.length === 0){ leaderboardList.innerHTML = '<div class="meta">Nog geen vermeldingen</div>'; return; }
  for(const h of hallOfFame){
    const d = document.createElement('div'); d.className = 'leader';
    // derive display properties (backwards compatible with older stored entries)
    const len = h.length || 1;
    const type = h.type || (len >= 4 ? 'rainbow' : (len === 3 ? 'strong' : 'win'));
    const denom = Math.pow(6, Math.max(1, len-1));
    const probFrac = h.prob || `1/${denom}`;
    const probPct = h.probPct || ( (100 / denom).toFixed(2) + '%');
    const effectLabel = h.effect || (len >= 4 ? 'RAINBOW' : (len === 3 ? '3× STREAK' : '2× STREAK'));
    // format date as day + month + year + time (Dutch), e.g. '03 apr 2026 14:30'
    const dt = new Date(h.at);
    const dateStr = dt.toLocaleString('nl-NL', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', hour12:false});
    d.innerHTML = `
      <div class="leader-left">
        <div class="swatch ${type}"></div>
        <div class="leader-main">
          <div class="leader-title">${h.value} × ${len} <span class="prob">(${probFrac} ≈ ${probPct})</span></div>
          <div class="leader-effect">${effectLabel}</div>
        </div>
      </div>
      <div class="meta">${dateStr}</div>
    `;
    leaderboardList.appendChild(d);
  }
}

function addToHallOfFame(entry){
  // normalize and enrich entry (compute probability, percent and type/effect for display)
  const e = Object.assign({}, entry);
  e.length = e.length || 1;
  const denom = Math.pow(6, Math.max(1, e.length-1));
  if(!e.prob) e.prob = `1/${denom}`;
  if(!e.probPct) e.probPct = (100/denom).toFixed(2) + '%';
  if(!e.type) e.type = e.length >= 4 ? 'rainbow' : (e.length === 3 ? 'strong' : 'win');
  if(!e.effect) e.effect = e.length >= 4 ? 'RAINBOW' : (e.length === 3 ? '3× STREAK' : '2× STREAK');

  // de-duplication and simple new-record logic:
  // - if an identical value+length was added in the last 10s, skip
  const tenSecAgo = Date.now() - 10000;
  for(const h of hallOfFame){
    if(h.value === e.value && h.length === e.length){
      const atMs = new Date(h.at).getTime();
      if(atMs > tenSecAgo) return; // duplicate recent, don't add
    }
  }
  // - only add if it's a new record for this value (longer than any existing), OR if there is no prior entry for this value
  const existingMax = hallOfFame.filter(h=>h.value===e.value).reduce((m,h)=>Math.max(m,h.length), 0);
  if(e.length < existingMax) {
    // not a new record for this value, still allow if no existing entries at all
    if(existingMax > 0) return;
  }

  // push and keep only top 12 by length then recent
  hallOfFame.push(e);
  hallOfFame.sort((a,b)=> b.length - a.length || (new Date(b.at) - new Date(a.at)));
  hallOfFame = hallOfFame.slice(0,12);
  saveHallOfFame(); renderHallOfFame();
}

hofResetBtn.addEventListener('click', ()=>{ hallOfFame = []; saveHallOfFame(); renderHallOfFame(); });

// initialize HOF
loadHallOfFame(); renderHallOfFame();

let W = dieCanvas.width;
let H = dieCanvas.height;
let history = [];
let streakCount = 0;
let streakTime = -9999; // in seconds (t)
let particles = [];
let currentStreakStart = null; // ISO string when current uninterrupted streak began

// resize background to fill
function fit() {
  bgCanvas.width = innerWidth * devicePixelRatio;
  bgCanvas.height = innerHeight * devicePixelRatio;
  bgCanvas.style.width = innerWidth + 'px';
  bgCanvas.style.height = innerHeight + 'px';
  bgCtx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
fit();
addEventListener('resize',()=>{fit();});

// Background animated field
let t = 0;
function drawBG(dt){
  t += dt*0.001;
  const w = innerWidth, h = innerHeight;
  bgCtx.clearRect(0,0,w,h);
  // moving gradient blobs
  for(let i=0;i<6;i++){
    const x = (Math.sin(t*0.2+ i)*0.5+0.5)*w;
    const y = (Math.cos(t*0.15 + i*1.3)*0.5+0.5)*h;
    const r = 180 + 80*Math.sin(t*0.3 + i);
    const g = 40 + 30*Math.cos(t*0.2 + i*1.2);
    const b = 120 + 60*Math.sin(t*0.17 + i*0.7);
    const grad = bgCtx.createRadialGradient(x,y,r*0.1,x,y,r);
    grad.addColorStop(0, `rgba(${r|0},${g|0},${b|0},0.12)`);
    grad.addColorStop(1, `rgba(10,12,30,0)`);
    bgCtx.fillStyle = grad;
    bgCtx.beginPath();
    bgCtx.arc(x,y,r,0,Math.PI*2);
    bgCtx.fill();
  }
}

// Die rendering
let angle = 0; // rotation for idle
let rolling = false;
let rollStart = 0;
let rollDuration = 1200;
let rollFrom = 0, rollTo = 0;
let current = 1;

function drawDie(now){
  const ctx = dieCtx;
  const W = dieCanvas.width;
  const H = dieCanvas.height;
  ctx.clearRect(0,0,W,H);

  // Simple 3D-ish cube by drawing front face and shadow/shine
  const cx = W/2, cy = H/2, size = Math.min(W,H)*0.56;
  ctx.save();
  ctx.translate(cx,cy);
  const a = angle;
  ctx.rotate(a*0.6);

  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.beginPath();
  ctx.ellipse(0, size*0.55, size*0.9, size*0.28, 0, 0, Math.PI*2);
  ctx.fill();

  // face
  const grad = ctx.createLinearGradient(-size/2,-size/2,size/2,size/2);
  grad.addColorStop(0,'#ffffff');
  grad.addColorStop(1,'#ddd6c8');
  ctx.fillStyle = grad;
  roundRect(ctx, -size/2, -size/2, size, size, size*0.08);
  ctx.fill();

  // inner color overlay for neon vibe
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = `rgba(255,200,60,${0.08 + 0.04*Math.sin(t*2)})`;
  roundRect(ctx, -size/2, -size/2, size, size, size*0.08);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  // dots
  drawPips(ctx, current, -size/2, -size/2, size, size);

  ctx.restore();

  // small glow
  ctx.save();
  // pulse glow based on streak
  const pulse = Math.min(1, Math.max(0, (streakCount-1) * 0.35));
  ctx.globalAlpha = 0.04 + pulse*0.14;
  ctx.fillStyle = '#6bf0a1';
  ctx.beginPath();
  ctx.ellipse(W*0.82,H*0.18, W*0.15 + pulse*40, H*0.08 + pulse*20, 0,0,Math.PI*2);
  ctx.fill();
  ctx.restore();

  // draw particles
  drawParticles(ctx, W, H, now);
}

// particles (confetti-like)
function spawnParticles(x,y,count,color){
  for(let i=0;i<count;i++){
    particles.push({
      x, y,
      vx: (Math.random()-0.5)*6,
      vy: -Math.random()*6 - 2,
      r: 4 + Math.random()*6,
      life: 1000 + Math.random()*800,
      born: performance.now(),
      color: color || `hsl(${Math.random()*60+120},80%,60%)`
    });
  }
}

function drawParticles(ctx, W, H, now){
  const alive = [];
  for(const p of particles){
    const age = now - p.born;
    if(age > p.life) continue;
    p.vy += 0.12; // gravity
    p.x += p.vx; p.y += p.vy;
    const t = 1 - age / p.life;
    ctx.save();
    ctx.globalAlpha = t;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.r, p.r*0.6, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
    alive.push(p);
  }
  particles = alive.slice(-300);
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

function drawPips(ctx, value, x,y,w,h){
  // pips positions relative
  const cx = x + w/2, cy = y + h/2;
  const r = Math.max(8, Math.min(w,h)*0.06);
  ctx.fillStyle = '#0b1020';
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 6;

  const places = {
    1: [[cx,cy]],
    2: [[x + w*0.25, y + h*0.25],[x + w*0.75, y + h*0.75]],
    3: [[x + w*0.2, y + h*0.2],[cx,cy],[x + w*0.8, y + h*0.8]],
    4: [[x + w*0.2, y + h*0.2],[x + w*0.8, y + h*0.2],[x + w*0.2, y + h*0.8],[x + w*0.8, y + h*0.8]],
    5: [[x + w*0.2, y + h*0.2],[x + w*0.8, y + h*0.2],[cx,cy],[x + w*0.2, y + h*0.8],[x + w*0.8, y + h*0.8]],
    6: [[x + w*0.2, y + h*0.18],[x + w*0.2, cy],[x + w*0.2, y + h*0.82],[x + w*0.8, y + h*0.18],[x + w*0.8, cy],[x + w*0.8, y + h*0.82]]
  };

  for(const p of places[value]){
    ctx.beginPath();
    ctx.fillStyle = '#0b1020';
    ctx.arc(p[0], p[1], r,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
  }
}

// Rolling state machine
function startRoll(){
  if(rolling) return;
  rolling = true;
  rollStart = performance.now();
  rollDuration = 800 + Math.random()*900;
  rollFrom = angle;
  rollTo = angle + (Math.PI*2)*(3 + Math.floor(Math.random()*5)) + (Math.random()*Math.PI*2);
  playTick();
}

function finishRoll(finalValue){
  rolling = false;
  current = finalValue;
  // push history
  const entry = {value: finalValue, at: new Date().toISOString()};
  // streak logic: check previous (last roll) which is history[0]
  const prev = history[0];
  if(prev && prev.value === finalValue){
    streakCount += 1;
    // if we just started a new uninterrupted streak (length became 2), record HOF start
    if(streakCount === 2){
      // record the streak start time (use the time of the second roll as start)
      currentStreakStart = entry.at;
      addToHallOfFame({value: finalValue, length: 2, at: currentStreakStart, startAt: currentStreakStart});
    } else if(streakCount > 2){
      // update the existing HOF entry for this ongoing streak (if present)
      updateCurrentHallOfFameEntry(streakCount);
    }
  } else {
    streakCount = 1; // current counts as 1
    // streak broken / new value
    currentStreakStart = null;
  }
  streakTime = performance.now();
  history.unshift(entry);
  if(history.length>30) history.pop();
  renderHistory();
  updateLeaderboard();
  // one-time pulse on the newest history item when a streak is created/extended
  if(streakCount > 1){
    // the newest item is the first child of listEl
    const first = listEl.firstElementChild;
    if(first){
      // add pulse-once class, then remove after animation ends or fallback timeout
      first.classList.add('pulse-once');
      const cleanup = ()=>{
        first.classList.remove('pulse-once');
        first.removeEventListener('animationend', cleanup);
      };
      first.addEventListener('animationend', cleanup);
      // fallback in case animationend doesn't fire
      setTimeout(()=>{ try{ cleanup(); }catch(e){} }, 900);
    }
  }
  // stronger audio feedback scaled with streak
  playStreakSound(streakCount);
  // spawn larger confetti when streak grows
  const rect = dieCanvas.getBoundingClientRect();
  if(streakCount === 2){
    // modest celebration
    spawnParticles(rect.left + rect.width*0.5, rect.top + rect.height*0.45, 18 + streakCount*8, '#6bf0a1');
    dieCanvas.classList.add('streak-glow');
  } else if(streakCount === 3){
    // stronger pulse, brighter color and bigger confetti
    spawnParticles(rect.left + rect.width*0.5, rect.top + rect.height*0.45, 40 + streakCount*12, '#38ff9a');
    // add a stronger class for CSS pulse
    dieCanvas.classList.add('streak-glow','streak-strong');
    // brief screen flash
    flashScreen('rgba(56,255,154,0.06)', 220);
    // show a big "3x" multiplier above the die
    showMultiplier('3x', 1200);
    // bigger sound handled by playStreakSound
  } else if(streakCount >= 4){
    // rainbow mode: lots of colorful confetti, animated glow and banner
    const colors = ['#ff3b3b','#ff8f3b','#ffd23b','#56ff6f','#3bd7ff','#7b6bff','#ff6be0'];
    for(let i=0;i<Math.min(8, streakCount); i++){
      const c = colors[(Math.floor(Math.random()*colors.length))];
      spawnParticles(rect.left + rect.width*(0.25+Math.random()*0.5), rect.top + rect.height*0.2 + Math.random()*rect.height*0.4, 12 + streakCount*6, c);
    }
    dieCanvas.classList.add('streak-glow','streak-rainbow');
    showBanner('RAINBOW STREAK! x' + streakCount, 1600 + (streakCount-3)*300);
    // extra layered sound
    playStreakSound(streakCount+2);
  } else {
    // remove glow if no streak
    dieCanvas.classList.remove('streak-strong','streak-rainbow');
  }
}

// Update the HOF entry that corresponds to the current ongoing streak (by startAt)
function updateCurrentHallOfFameEntry(newLength){
  if(!currentStreakStart) return;
  // find entry with same startAt and value
  for(let i=0;i<hallOfFame.length;i++){
    const h = hallOfFame[i];
    if((h.startAt && h.startAt === currentStreakStart) || (h.at === currentStreakStart)){
      // update length and derived fields
      h.length = newLength;
      const denom = Math.pow(6, Math.max(1, h.length-1));
      h.prob = `1/${denom}`;
      h.probPct = (100/denom).toFixed(2) + '%';
      h.type = h.length >= 4 ? 'rainbow' : (h.length === 3 ? 'strong' : 'win');
      h.effect = h.length >= 4 ? 'RAINBOW' : (h.length === 3 ? '3× STREAK' : '2× STREAK');
      // keep updated ordering
      hallOfFame.sort((a,b)=> b.length - a.length || (new Date(b.at) - new Date(a.at)));
      saveHallOfFame(); renderHallOfFame();
      return;
    }
  }
}

// small screen flash overlay
function flashScreen(color, duration=200){
  const el = document.createElement('div');
  el.style.position = 'fixed'; el.style.left=0; el.style.top=0; el.style.right=0; el.style.bottom=0;
  el.style.background = color; el.style.pointerEvents='none'; el.style.zIndex = 9999; el.style.opacity = '1';
  document.body.appendChild(el);
  requestAnimationFrame(()=>{ el.style.transition = `opacity ${duration}ms ease-out`; el.style.opacity = '0'; });
  setTimeout(()=>{ el.remove(); }, duration+40);
}

// banner for big streaks
function showBanner(text, duration=1400){
  let b = document.getElementById('streak-banner');
  if(!b){
    b = document.createElement('div');
    b.id = 'streak-banner';
    b.style.position = 'fixed';
    b.style.left = '50%'; b.style.top = '12%';
    b.style.transform = 'translateX(-50%) translateY(-10px)';
    b.style.padding = '14px 26px';
    b.style.borderRadius = '12px';
    b.style.zIndex = 10001; b.style.pointerEvents='none';
    b.style.fontWeight = '900'; b.style.letterSpacing = '1px';
    b.style.fontSize = '22px'; b.style.color = '#061217';
    b.style.background = 'linear-gradient(90deg,#fff, #ffd7ff)';
    b.style.boxShadow = '0 20px 60px rgba(0,0,0,0.45)';
    document.body.appendChild(b);
  }
  b.textContent = text;
  b.style.opacity = '0';
  b.style.transform = 'translateX(-50%) translateY(-10px) scale(0.98)';
  requestAnimationFrame(()=>{ b.style.transition = 'all 300ms cubic-bezier(.16,.9,.3,1)'; b.style.opacity='1'; b.style.transform='translateX(-50%) translateY(0) scale(1)'; });
  setTimeout(()=>{
    b.style.opacity='0'; b.style.transform='translateX(-50%) translateY(-10px) scale(0.98)';
    setTimeout(()=>{ if(b) b.remove(); }, 400);
  }, duration);
}

// show a temporary multiplier like '3x' above the die
function showMultiplier(text, duration=1000){
  let m = document.getElementById('multiplier');
  if(!m){
    m = document.createElement('div'); m.id = 'multiplier';
    document.body.appendChild(m);
  }
  m.textContent = text;
  m.style.opacity = '0'; m.style.transform = 'translate(-50%,-160px) scale(0.96)';
  requestAnimationFrame(()=>{ m.style.transition='all 260ms cubic-bezier(.16,.9,.3,1)'; m.style.opacity='1'; m.style.transform='translate(-50%,-140px) scale(1)'; });
  setTimeout(()=>{ m.style.opacity='0'; m.style.transform='translate(-50%,-160px) scale(0.96)'; setTimeout(()=>{ if(m) m.remove(); }, 360); }, duration);
}

// remove streak glow after a short delay if streak resets
function updateStreakGlow(){
  if(streakCount > 1){
    dieCanvas.classList.add('streak-glow');
  } else {
    dieCanvas.classList.remove('streak-glow');
  }
}

// call updateStreakGlow periodically (or after changes)
setInterval(updateStreakGlow, 300);

function playStreakSound(streak){
  if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  // escalate sound layers with streak
  const now = audioCtx.currentTime;
  const maxLayers = Math.min(6, Math.max(1, Math.floor(streak)));
  const baseFreq = 220 + Math.min(900, streak * 140);
  const masterGain = 0.02 + Math.min(0.18, 0.01 * streak);

  // short bright click to emphasize the event
  const click = audioCtx.createOscillator();
  const clickG = audioCtx.createGain();
  click.type = 'square';
  click.frequency.value = baseFreq * 2.5;
  clickG.gain.value = 0.0001;
  click.connect(clickG); clickG.connect(audioCtx.destination);
  click.start(now);
  clickG.gain.setValueAtTime(0.0001, now);
  clickG.gain.exponentialRampToValueAtTime(masterGain * 1.2, now + 0.005);
  clickG.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
  click.stop(now + 0.16 + Math.random()*0.05);

  // layered tonal pulses / arpeggio
  for(let i=0;i<maxLayers;i++){
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    // choose timbre by layer
    const types = ['sine','triangle','sawtooth','square'];
    o.type = types[i % types.length];
    // slight pitch offsets for richness
    const detune = (Math.random()-0.5) * 10 * (i/Math.max(1,streak));
    o.frequency.value = baseFreq * (1 + i * 0.06) * (1 + detune/100);
    g.gain.value = 0.0001;
    o.connect(g);
    // small bandpass / brightness for higher layers
    const bp = audioCtx.createBiquadFilter();
    bp.type = 'highshelf';
    bp.frequency.value = 1000 + i*300;
    bp.gain.value = Math.min(12, 3 * i);
    g.connect(bp); bp.connect(audioCtx.destination);
    const start = now + i * 0.02;
    const dur = 0.08 + Math.min(0.5, 0.02 * streak + i*0.02);
    o.start(start);
    g.gain.setValueAtTime(0.0001, start);
    // attack depends on streak
    const attack = Math.max(0.01, 0.005 + (0.008 * Math.min(6,streak - i)));
    g.gain.exponentialRampToValueAtTime(masterGain * (0.6 + i*0.12), start + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur + 0.02);
    o.stop(start + dur + 0.03);
  }

  // tiny harmonic shimmer when streak is high
  if(streak >= 4){
    const o2 = audioCtx.createOscillator();
    const g2 = audioCtx.createGain();
    o2.type = 'sine';
    o2.frequency.value = baseFreq * 1.5 + Math.random()*80;
    g2.gain.value = 0.0001;
    o2.connect(g2); g2.connect(audioCtx.destination);
    const s = now + 0.06;
    o2.start(s);
    g2.gain.setValueAtTime(0.0001, s);
    g2.gain.exponentialRampToValueAtTime(masterGain * 0.7, s + 0.06);
    g2.gain.exponentialRampToValueAtTime(0.0001, s + 0.6 + (streak-4)*0.12);
    o2.stop(s + 0.7 + (streak-4)*0.12);
  }
}

// small click sound using WebAudio
let audioCtx;
function playTick(){
  if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.value = 400 + Math.random()*400;
  g.gain.value = 0.02;
  o.connect(g); g.connect(audioCtx.destination);
  o.start(); o.stop(audioCtx.currentTime + 0.06);
}

// update loop
let last = performance.now();
function frame(now){
  const dt = now - last; last = now;
  drawBG(dt);

  // handle roll animation
  if(rolling){
    const p = Math.min(1,(now-rollStart)/rollDuration);
    // ease out
    const eased = 1 - Math.pow(1-p,3);
    angle = rollFrom + (rollTo - rollFrom) * eased;
    // flicker dots during roll
    current = 1 + Math.floor(Math.random()*6);
    if(p>=1){
      // end
      const final = 1 + Math.floor(Math.random()*6);
      finishRoll(final);
    }
  } else {
    // idle slow rotation (no automatic rolls)
    angle += dt*0.0003;
  }

  drawDie(now);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// interactions
dieCanvas.addEventListener('click', ()=>{ startRoll(); });
addEventListener('keydown', (e)=>{
  if(e.code === 'Space'){
    e.preventDefault(); startRoll();
  }
});


// history rendering
function renderHistory(){
  listEl.innerHTML = '';
  // Group consecutive identical values (history is newest-first) and mark groups.
  let i = 0;
  while(i < history.length){
    // find group of same values starting at i
    let j = i;
    while(j+1 < history.length && history[j+1].value === history[i].value) j++;
    const groupLen = j - i + 1;
    for(let k = i; k <= j; k++){
      const h = history[k];
      const div = document.createElement('div');
      div.className = 'history-item';
      // newest two in the group should pulse; older ones get a static glow
      const isNewest = (k === i);
      const isSecond = (k === i+1);
      if(groupLen >= 4){
        if(isNewest || isSecond){
          div.classList.add('rainbow');
        } else {
          div.classList.add('rainbow-static');
        }
      } else if(groupLen >= 2){
        if(isNewest || isSecond){
          div.classList.add('win');
        } else {
          div.classList.add('win-static');
        }
      }
      // compute probability fraction for group length: P = 1 / (6^(groupLen-1))
      let probHTML = '';
      if(groupLen >= 2 && isNewest){
        const denom = Math.pow(6, groupLen-1);
        probHTML = ` <span class="prob">(1/${denom})</span>`;
      }
      div.innerHTML = `<div>Dobbel: <strong>${h.value}</strong>${probHTML}</div><div class="meta">${new Date(h.at).toLocaleTimeString()}</div>`;
      listEl.appendChild(div);
    }
    i = j + 1;
  }
}

// compute leaderboard: find longest consecutive groups and show top results
function updateLeaderboard(){
  if(!leaderboardList) return;
  // scan history (newest-first) and collect groups: {value, length, at}
  const groups = [];
  let i = 0;
  while(i < history.length){
    let j = i;
    while(j+1 < history.length && history[j+1].value === history[i].value) j++;
    const len = j - i + 1;
    groups.push({value: history[i].value, length: len, at: history[i].at});
    i = j + 1;
  }

  // sort by length desc, then by most recent (at)
  groups.sort((a,b)=> b.length - a.length || (new Date(b.at) - new Date(a.at)));
  const top = groups.slice(0,6);
  // show top 6 recent groups in the smaller leaderboard area (still useful), but also add to HOF if long enough
  const smallList = top;
  const smallContainer = leaderboardList;
  smallContainer.innerHTML = '';
  for(const g of smallList){
    const d = document.createElement('div'); d.className = 'leader';
    d.innerHTML = `<div>${g.value} × ${g.length}</div><div class="meta">${new Date(g.at).toLocaleTimeString()}</div>`;
    smallContainer.appendChild(d);
  }
  // Hall of Fame entries are managed by the roll lifecycle (start/extend) to ensure each unbroken streak
  // is represented only once and updated while it grows.
}

// small help hint fade
setTimeout(()=>{ hint.style.opacity = 0.55 }, 1200);

// ensure canvas pixel ratio for die
function fixDieSize(){
  const el = dieCanvas;
  const rect = el.getBoundingClientRect();
  el.width = Math.min(1200, Math.max(300, rect.width)) * devicePixelRatio;
  el.height = Math.min(1200, Math.max(300, rect.height)) * devicePixelRatio;
  el.style.width = rect.width + 'px';
  el.style.height = rect.height + 'px';
  dieCtx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
fixDieSize();
addEventListener('resize', ()=>{ fixDieSize(); });

// initial automatic rolls to populate history
for(let i=0;i<3;i++) history.push({value:1+Math.floor(Math.random()*6), at: new Date(Date.now()-i*1200).toISOString()});
renderHistory();

// unlock audio on first interaction (mobile browsers)
['pointerdown','keydown','touchstart'].forEach(ev=>{
  addEventListener(ev, ()=>{
    if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  },{once:true});
});

// expose for debugging
window._exp = {history, startRoll};
