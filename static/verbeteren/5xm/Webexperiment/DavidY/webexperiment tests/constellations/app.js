const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// --- CONFIG ---
const CELL_COUNT = 180;
const cells = [];
const mouse = { x: 0, y: 0, active: false };

// --- AUDIO SYSTEM ---
let audioCtx;
let masterGain;
let isAudioInitialized = false;
let voice;

// --- CONSTANT SYNTH VOICE ---
class SynthVoice {
  constructor(audioCtx) {
    this.audioCtx = audioCtx;

    // Unison oscillators
    this.oscA = audioCtx.createOscillator();
    this.oscB = audioCtx.createOscillator();
    this.oscC = audioCtx.createOscillator();

    this.oscA.type = "sawtooth";
    this.oscB.type = "sawtooth";
    this.oscC.type = "sawtooth";

    this.oscA.detune.value = -10;
    this.oscB.detune.value = 0;
    this.oscC.detune.value = 10;

    // Filter (darker default)
    this.filter = audioCtx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = 200; // darker
    this.filter.Q.value = 8;

    // Amp
    this.amp = audioCtx.createGain();
    this.amp.gain.value = 0;

    // Routing
    this.oscA.connect(this.filter);
    this.oscB.connect(this.filter);
    this.oscC.connect(this.filter);

    this.filter.connect(this.amp);
    this.amp.connect(masterGain);

    this.oscA.start();
    this.oscB.start();
    this.oscC.start();
  }

  // Continuous modulation (no retriggering)
  modulate(freq, velocity) {
    const now = this.audioCtx.currentTime;

    this.oscA.frequency.setTargetAtTime(freq, now, 0.05);
    this.oscB.frequency.setTargetAtTime(freq, now, 0.05);
    this.oscC.frequency.setTargetAtTime(freq, now, 0.05);

    // Darker, less aggressive filter movement
    const filterTarget = 200 + velocity * 2000;
    this.filter.frequency.setTargetAtTime(filterTarget, now, 0.1);

    // Slight detune wobble
    this.oscA.detune.setTargetAtTime(-10 + velocity * 30, now, 0.1);
    this.oscC.detune.setTargetAtTime(10 - velocity * 30, now, 0.1);
  }

  fadeIn() {
    const now = this.audioCtx.currentTime;
    this.amp.gain.cancelScheduledValues(now);
    this.amp.gain.linearRampToValueAtTime(0.7, now + 0.5);
  }

  fadeOut() {
    const now = this.audioCtx.currentTime;
    this.amp.gain.cancelScheduledValues(now);
    this.amp.gain.setTargetAtTime(0, now, 0.5);
  }
}

function initAudio() {
  if (isAudioInitialized) return;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioCtx.destination);

  voice = new SynthVoice(audioCtx);
  voice.fadeIn();

  isAudioInitialized = true;
}

window.addEventListener("mousedown", () => {
  initAudio();
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.opacity = "0";
});

// --- CELL CLASS ---
class Cell {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.size = 2 + Math.random() * 4;
    this.hue = 180 + Math.random() * 120;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = w;
    if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h;
    if (this.y > h) this.y = 0;

    if (mouse.active) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200;
        this.vx += (dx / dist) * force * 0.02;
        this.vy += (dy / dist) * force * 0.02;
      }
    }

    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, 0.8)`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- INIT CELLS ---
for (let i = 0; i < CELL_COUNT; i++) {
  cells.push(new Cell());
}

// --- MOUSE ---
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;

  if (isAudioInitialized && audioCtx && voice) {

    // --- LOWER, BASSIER 2D PITCH SURFACE ---
    const baseFreq = 30 + (mouse.x / w) * 600;   // lower sweep
    const yBend = (1 - mouse.y / h) * 300;       // vertical lift but still warm
    const freq = baseFreq + yBend;

    // Mouse velocity as expressive modulation
    const dx = e.movementX;
    const dy = e.movementY;
    const speed = Math.min(Math.sqrt(dx * dx + dy * dy) / 20, 1);

    voice.modulate(freq, speed);

    masterGain.gain.setTargetAtTime(1.0, audioCtx.currentTime, 0.2);
  }
});

window.addEventListener("mouseleave", () => {
  mouse.active = false;
  if (isAudioInitialized && audioCtx && voice) {
    voice.fadeOut();
    masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.5);
  }
});

// --- ANIMATION LOOP ---
function animate() {
  ctx.fillStyle = "rgba(5, 5, 5, 0.2)";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < cells.length; i++) {
    for (let j = i + 1; j < cells.length; j++) {
      const a = cells[i];
      const b = cells[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        const alpha = 1 - dist / 120;
        ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 80%, 70%, ${alpha * 0.3})`;
        ctx.lineWidth = alpha * 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  cells.forEach((c) => {
    c.update();
    c.draw();
  });

  requestAnimationFrame(animate);
}

animate();
