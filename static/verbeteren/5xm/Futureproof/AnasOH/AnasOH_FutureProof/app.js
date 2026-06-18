/* ─────────────────────────────────────────
   NexWear Runner — app.js
   ───────────────────────────────────────── */

const canvas  = document.getElementById('c');
const ctx     = canvas.getContext('2d');
const wrap    = document.getElementById('wrap');
const overlay = document.getElementById('overlay');

// ── resize canvas to fill wrapper ──────────
function resize() {
  canvas.width  = wrap.clientWidth;
  canvas.height = wrap.clientHeight;
  groundY = canvas.height - 60;
}

let groundY;
resize();
window.addEventListener('resize', resize);

// ── constants ──────────────────────────────
const GRAVITY    = 0.55;
const JUMP_FORCE = -13;
const SPD_START  = 4;
const SPD_MAX    = 10;

const OBS_EMOJIS = ['👕', '👖', '🧥', '🛍️'];

// ── game state ─────────────────────────────
let state;       // 'idle' | 'playing' | 'dead'
let player;
let obstacles;
let buttons;
let particles;
let dist, co2, btnCount, speed, frame;
let lastObsFrame, lastBtnFrame;

function init() {
  groundY      = canvas.height - 60;
  player       = { x: 80, y: groundY, vy: 0, w: 36, h: 44, jumps: 0, maxJumps: 2 };
  obstacles    = [];
  buttons      = [];
  particles    = [];
  dist         = 0;
  co2          = 0;
  btnCount     = 0;
  speed        = SPD_START;
  frame        = 0;
  lastObsFrame = 0;
  lastBtnFrame = 0;
}

// ── draw helpers ───────────────────────────
function fillRoundRect(x, y, w, h, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function drawGround() {
  fillRoundRect(0, groundY + player.h, canvas.width, canvas.height, 0, '#1b3322');
  ctx.fillStyle = '#2a5c3a';
  ctx.fillRect(0, groundY + player.h, canvas.width, 3);
  ctx.setLineDash([24, 18]);
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, groundY + player.h + 18);
  ctx.lineTo(canvas.width, groundY + player.h + 18);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPlayer(p) {
  const airborne    = p.y < groundY - 2;
  const shadowAlpha = Math.max(0, (groundY - p.y) / 80);

  // drop shadow
  ctx.fillStyle = `rgba(0,0,0,${0.25 * shadowAlpha})`;
  ctx.beginPath();
  ctx.ellipse(
    p.x + p.w / 2,
    groundY + p.h + 2,
    (p.w / 2) * shadowAlpha + 4,
    5 * shadowAlpha + 1,
    0, 0, Math.PI * 2
  );
  ctx.fill();

  // body bob when running
  const bobY = airborne ? 0 : Math.sin(frame * 0.18) * 1.5;
  const bx   = p.x;
  const by   = p.y + bobY;

  // shirt body
  fillRoundRect(bx,           by,      p.w,      p.h, 6, '#5ecb8a');
  fillRoundRect(bx + 2,       by + 2,  p.w - 4,  8,   3, '#4ab878');

  // collar
  fillRoundRect(bx + 10,      by - 5,  16,       10,  4, '#85d4a5');

  // sleeves
  fillRoundRect(bx - 8,       by + 4,  12,       18,  4, '#5ecb8a');
  fillRoundRect(bx + p.w - 4, by + 4,  12,       18,  4, '#5ecb8a');

  // NexWear button
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(bx + p.w / 2, by + 22, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1b7a4a';
  ctx.beginPath();
  ctx.arc(bx + p.w / 2, by + 22, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacle(o) {
  ctx.font         = `${o.h}px serif`;
  ctx.textBaseline = 'bottom';
  ctx.fillText(o.emoji, o.x, o.y + o.h);
}

function drawButton(b) {
  const cx = b.x + b.r;
  const cy = b.y + b.r;

  // pulsing glow ring
  ctx.strokeStyle = `rgba(94,203,138,${0.25 + 0.2 * Math.sin(frame * 0.1)})`;
  ctx.lineWidth   = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, b.r + 5, 0, Math.PI * 2);
  ctx.stroke();

  // white face
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
  ctx.fill();

  // dark inner
  ctx.fillStyle = '#1b7a4a';
  ctx.beginPath();
  ctx.arc(cx, cy, b.r - 3, 0, Math.PI * 2);
  ctx.fill();

  // four stitch holes
  ctx.fillStyle = '#5ecb8a';
  for (let i = 0; i < 4; i++) {
    const ang = i * (Math.PI / 2);
    ctx.beginPath();
    ctx.arc(cx + Math.cos(ang) * 4, cy + Math.sin(ang) * 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParticle(p) {
  ctx.globalAlpha = p.life / p.maxLife;
  ctx.fillStyle   = p.color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ── spawning ───────────────────────────────
function spawnObstacle() {
  const h    = 32 + Math.random() * 28;
  const tall = Math.random() < 0.3;
  obstacles.push({
    x:     canvas.width + 10,
    y:     groundY + (tall ? -h * 1.6 : 0),
    w:     36,
    h:     h * 1.2,
    emoji: OBS_EMOJIS[Math.floor(Math.random() * OBS_EMOJIS.length)]
  });
}

function spawnButton() {
  const floaty = Math.random() < 0.4;
  const r      = 10;
  buttons.push({
    x: canvas.width + 10,
    y: floaty ? groundY - 70 - Math.random() * 30 : groundY - r * 2,
    r: r
  });
}

// ── particles ──────────────────────────────
function emitBurst(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = 1.5 + Math.random() * 3;
    particles.push({
      x, y,
      vx:      Math.cos(ang) * spd,
      vy:      Math.sin(ang) * spd - 2,
      r:       2 + Math.random() * 3,
      color:   color,
      life:    30,
      maxLife: 30
    });
  }
}

// ── AABB collision ─────────────────────────
function overlaps(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// ── jump ───────────────────────────────────
function jump() {
  if (state !== 'playing') return;
  if (player.jumps >= player.maxJumps) return;
  player.vy = JUMP_FORCE - (player.jumps * 2);
  player.jumps++;
  emitBurst(player.x + player.w / 2, player.y + player.h, 'rgba(94,203,138,0.4)', 5);
}

// ── main loop ──────────────────────────────
function loop() {
  if (state !== 'playing') return;
  requestAnimationFrame(loop);

  frame++;
  dist  += speed;
  speed  = Math.min(SPD_MAX, SPD_START + dist / 3000);

  // background
  ctx.fillStyle = '#0d1f14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // subtle twinkle
  if (frame % 4 === 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * (groundY - 40),
      1, 1
    );
  }

  drawGround();

  // player physics
  player.vy += GRAVITY;
  player.y  += player.vy;
  if (player.y >= groundY) {
    player.y     = groundY;
    player.vy    = 0;
    player.jumps = 0;
  }

  // spawn timing
  const obsGap = Math.max(55, 90 - dist / 600);
  const btnGap = Math.max(40, 70 - dist / 800);
  if (frame - lastObsFrame > obsGap) { spawnObstacle(); lastObsFrame = frame; }
  if (frame - lastBtnFrame > btnGap) { spawnButton();   lastBtnFrame = frame; }

  // obstacles
  obstacles = obstacles.filter(o => {
    o.x -= speed;
    drawObstacle(o);
    if (overlaps(
      player.x + 4, player.y + 4, player.w - 8, player.h - 8,
      o.x + 4,      o.y + 4,      o.w - 8,      o.h - 8
    )) {
      state = 'dead';
      emitBurst(player.x + player.w / 2, player.y + player.h / 2, '#e84f3d', 20);
      setTimeout(showDead, 400);
    }
    return o.x > -60;
  });

  // buttons
  buttons = buttons.filter(b => {
    b.x -= speed;
    drawButton(b);
    if (overlaps(
      player.x + 6, player.y + 6, player.w - 12, player.h - 12,
      b.x,          b.y,          b.r * 2,        b.r * 2
    )) {
      btnCount++;
      co2 = parseFloat((co2 + 0.8).toFixed(1));
      emitBurst(b.x + b.r, b.y + b.r, '#5ecb8a', 12);
      return false;
    }
    return b.x > -40;
  });

  // particles
  particles = particles.filter(p => {
    p.x  += p.vx;
    p.y  += p.vy;
    p.vy += 0.12;
    p.life--;
    drawParticle(p);
    return p.life > 0;
  });

  drawPlayer(player);

  // HUD
  document.getElementById('s-dist').textContent = Math.floor(dist / 60) + 'm';
  document.getElementById('s-btn').textContent  = btnCount;
  document.getElementById('s-co2').textContent  = co2 + ' kg';

  // speed bar (top edge)
  const pct = (speed - SPD_START) / (SPD_MAX - SPD_START);
  ctx.fillStyle = `rgba(94,203,138,${0.15 + pct * 0.2})`;
  ctx.fillRect(0, 0, canvas.width * pct, 2);
}

// ── game over screen ───────────────────────
function showDead() {
  const meters   = Math.floor(dist / 60);
  const feedback = btnCount >= 5
    ? `Top! Je redde ${btnCount} buttons.`
    : 'Probeer meer buttons te vangen!';

  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div class="gameover-label">game over</div>
    <div class="big">${meters}m</div>
    <div class="result-row">
      <div class="result-item">
        ${btnCount}
        <small>buttons</small>
      </div>
      <div class="result-item">
        ${co2} kg
        <small>CO₂ bespaard</small>
      </div>
    </div>
    <button id="startbtn">↺ Opnieuw</button>
    <p class="hint">${feedback}</p>
  `;

  document.getElementById('startbtn').addEventListener('click', startGame);
}

// ── start / restart ────────────────────────
function startGame() {
  overlay.style.display = 'none';
  init();
  state = 'playing';
  loop();
}

// ── input ──────────────────────────────────
document.getElementById('startbtn').addEventListener('click', startGame);

wrap.addEventListener('click', jump);

wrap.addEventListener('touchstart', e => {
  e.preventDefault();
  jump();
}, { passive: false });

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    jump();
  }
});

// ── initial state ──────────────────────────
state = 'idle';
init();