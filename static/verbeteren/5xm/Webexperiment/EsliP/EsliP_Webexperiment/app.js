const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: false });

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// UI ELEMENTS
const particleCountSlider = document.getElementById("particleCount");
const trailLengthSlider = document.getElementById("trailLength");
const audioForceSlider = document.getElementById("audioForce");
const countDisplay = document.getElementById("countDisplay");
const trailDisplay = document.getElementById("trailDisplay");
const audioDisplay = document.getElementById("audioDisplay");
const statusDiv = document.getElementById("audioStatus");
const fpsDiv = document.getElementById("fps");

let particleCount = 300;
let trailLength = 0.15;
let audioForceMultiplier = 5;

// UPDATE SLIDERS
particleCountSlider.addEventListener("input", (e) => {
  particleCount = parseInt(e.target.value);
  countDisplay.textContent = particleCount;
  createParticles();
});

trailLengthSlider.addEventListener("input", (e) => {
  trailLength = parseFloat(e.target.value);
  trailDisplay.textContent = trailLength.toFixed(2);
});

audioForceSlider.addEventListener("input", (e) => {
  audioForceMultiplier = parseFloat(e.target.value);
  audioDisplay.textContent = audioForceMultiplier.toFixed(1);
});

// FPS COUNTER
let frameCount = 0;
let lastTime = Date.now();
setInterval(() => {
  const now = Date.now();
  const fps = Math.round((frameCount * 1000) / (now - lastTime));
  fpsDiv.textContent = `FPS: ${fps}`;
  frameCount = 0;
  lastTime = now;
}, 1000);

// PARTICLES
let particles = [];

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1
    });
  }
}
createParticles();

// MOUSE
let mouse = { x: w / 2, y: h / 2 };
let isMouseDown = false;

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousedown", () => {
  isMouseDown = true;
});

window.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// CLICK = EXPLOSION
window.addEventListener("click", () => {
  particles.forEach(p => {
    p.vx += (Math.random() - 0.5) * 25;
    p.vy += (Math.random() - 0.5) * 25;
  });
});

// AUDIO
let audioLevel = 0;
let audioFrequency = new Array(10).fill(0);

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  statusDiv.textContent = "🎤 Microfoon actief";
  statusDiv.classList.add("active");
  
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  const mic = audioCtx.createMediaStreamSource(stream);

  mic.connect(analyser);

  let data = new Uint8Array(analyser.frequencyBinCount);

  function updateAudio() {
    analyser.getByteFrequencyData(data);

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
      audioFrequency[Math.floor(i / (data.length / 10))] = data[i] / 255;
    }

    audioLevel = (sum / data.length / 255) * 0.8 + audioLevel * 0.2; // Smooth

    requestAnimationFrame(updateAudio);
  }

  updateAudio();
}).catch(() => {
  statusDiv.textContent = "🔇 Geen microfoon";
  statusDiv.style.borderLeftColor = "#ff6b6b";
});

// CREATE GRADIENT FOR GLOW
const createGradient = () => {
  const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
  gradient.addColorStop(0, "rgba(0, 255, 255, 0.1)");
  gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
  return gradient;
};

// ANIMATION LOOP
function animate() {
  frameCount++;
  
  // Trail effect
  ctx.fillStyle = `rgba(10, 14, 39, ${trailLength})`;
  ctx.fillRect(0, 0, w, h);

  // Draw glow around mouse
  ctx.fillStyle = createGradient();
  ctx.fillRect(0, 0, w, h);

  particles.forEach((p, idx) => {
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Distance-based force
    let force = 150 / (dist + 50);
    if (dist < 150) {
      p.vx += (dx / dist) * force * (isMouseDown ? 0.02 : 0.01);
      p.vy += (dy / dist) * force * (isMouseDown ? 0.02 : 0.01);
    }

    // Audio chaos
    let audioInfluence = audioFrequency[idx % 10] || 0;
    p.vx += (Math.random() - 0.5) * audioLevel * audioForceMultiplier * 0.5;
    p.vy += (Math.random() - 0.5) * audioLevel * audioForceMultiplier * 0.5;

    // Friction
    p.vx *= 0.98;
    p.vy *= 0.98;

    // Movement
    p.x += p.vx;
    p.y += p.vy;

    // Boundaries - bounce
    const bounce = 0.8;
    if (p.x <= 5) { p.x = 5; p.vx *= -bounce; }
    if (p.x >= w - 5) { p.x = w - 5; p.vx *= -bounce; }
    if (p.y <= 5) { p.y = 5; p.vy *= -bounce; }
    if (p.y >= h - 5) { p.y = h - 5; p.vy *= -bounce; }

    // Draw particle with glow
    const size = 2 + audioLevel * 6;
    const hue = (p.x / w * 360 + idx * 5) % 360;
    const brightness = 50 + audioLevel * 30;

    // Glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsl(${hue}, 100%, ${brightness}%)`;

    // Particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${hue}, 100%, ${brightness}%)`;
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw connection lines to nearby particles
    if (idx % 3 === 0) {
      for (let i = idx + 1; i < Math.min(idx + 4, particles.length); i++) {
        let p2 = particles[i];
        let d = Math.hypot(p2.x - p.x, p2.y - p.y);
        if (d < 100) {
          ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${(1 - d / 100) * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  });

  requestAnimationFrame(animate);
}

animate();