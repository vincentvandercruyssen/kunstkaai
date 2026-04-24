const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ----------------------------
// Creature parameters
// ----------------------------
const NUM_LINES = 350;
const lines = [];
let mouse = { x: w / 2, y: h / 2, vx: 0, vy: 0 };
let lastMouse = { x: mouse.x, y: mouse.y };
let scatter = 0;

// Core that wanders + reacts to cursor
let core = {
  x: w / 2,
  y: h / 2,
  vx: 0,
  vy: 0
};

// ----------------------------
// House parameters
// ----------------------------
const house = {
  x: w * 0.15,
  y: h * 0.75,
  size: 80,
  hideTimer: 0,
  exitTimer: 0,
  isHiding: false,
  isExiting: false
};

// ----------------------------
// Line object
// ----------------------------
class Line {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.tx = w / 2;
    this.ty = h / 2;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    if (scatter > 0) {
      this.vx += (Math.random() - 0.5) * scatter;
      this.vy += (Math.random() - 0.5) * scatter;
    }

    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    this.vx += dx * 0.002;
    this.vy += dy * 0.002;

    this.vx *= 0.92;
    this.vy *= 0.92;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 4, this.y - this.vy * 4);
    ctx.stroke();
  }
}

// Initialize lines
for (let i = 0; i < NUM_LINES; i++) {
  lines.push(new Line());
}

// ----------------------------
// Mouse interaction
// ----------------------------
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  mouse.vx = mouse.x - lastMouse.x;
  mouse.vy = mouse.y - lastMouse.y;

  const speed = Math.hypot(mouse.vx, mouse.vy);
  if (speed > 35) scatter = 3;

  lastMouse.x = mouse.x;
  lastMouse.y = mouse.y;
});

// ----------------------------
// Animation loop
// ----------------------------
function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1;

  const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);
  const fast = mouseSpeed >= 25;

  // -----------------------------------
  // House behavior logic
  // -----------------------------------
  if (fast) {
    house.isHiding = true;
    house.isExiting = false;
    house.hideTimer = 180; // 3 seconds
  } else {
    if (house.hideTimer > 0) {
      house.hideTimer--;
    } else if (house.isHiding) {
      // Start exit phase
      house.isHiding = false;
      house.isExiting = true;
      house.exitTimer = 60; // 1 second slow exit
    }
  }

  // While hiding → pull strongly into house
  if (house.isHiding) {
    const dxHome = house.x - core.x;
    const dyHome = house.y - core.y;
    core.vx += dxHome * 0.03;
    core.vy += dyHome * 0.03;
  }

  // While exiting → gently drift outward, ignore cursor
  if (house.isExiting) {
    house.exitTimer--;

    const dx = core.x - house.x;
    const dy = core.y - house.y;
    const dist = Math.hypot(dx, dy);

    // If too close, nudge outward
    if (dist < house.size * 0.7) {
      core.vx += (dx / (dist + 0.001)) * 0.02;
      core.vy += (dy / (dist + 0.001)) * 0.02;
    }

    // End exit phase
    if (house.exitTimer <= 0) {
      house.isExiting = false;
    }
  }

  // -----------------------------------
  // Core behavior (only when fully free)
  // -----------------------------------
  if (!house.isHiding && !house.isExiting) {
    // Default wandering
    core.vx += (Math.random() - 0.5) * 0.1;
    core.vy += (Math.random() - 0.5) * 0.1;

    // Slow movement → intrigued
    if (mouseSpeed > 0.5 && mouseSpeed < 12) {
      const dx = mouse.x - core.x;
      const dy = mouse.y - core.y;
      core.vx += dx * 0.004;
      core.vy += dy * 0.004;
    }

    // Fast movement → startled → moves away
    if (mouseSpeed >= 12) {
      const dx = core.x - mouse.x;
      const dy = core.y - mouse.y;
      core.vx += dx * 0.015;
      core.vy += dy * 0.015;
    }
  }

  // Soft boundary force
  const margin = 80;
  if (core.x < margin) core.vx += (margin - core.x) * 0.01;
  if (core.x > w - margin) core.vx -= (core.x - (w - margin)) * 0.01;
  if (core.y < margin) core.vy += (margin - core.y) * 0.01;
  if (core.y > h - margin) core.vy -= (core.y - (h - margin)) * 0.01;

  // Damping
  core.vx *= 0.94;
  core.vy *= 0.94;

  // Apply movement
  core.x += core.vx;
  core.y += core.vy;

  // Reduce scatter
  scatter *= 0.95;

  // Update creature lines
  lines.forEach((ln, i) => {
    const angle = (i / NUM_LINES) * Math.PI * 2;
    const radius = 40 + Math.sin(i * 0.1 + performance.now() * 0.002) * 20;

    ln.tx = core.x + Math.cos(angle) * radius;
    ln.ty = core.y + Math.sin(angle) * radius;

    ln.update();
    ln.draw();
  });

  // ----------------------------
  // Draw house
  // ----------------------------
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(
    house.x - house.size / 2,
    house.y - house.size / 2,
    house.size,
    house.size
  );

  // Roof
  ctx.beginPath();
  ctx.moveTo(house.x - house.size / 2, house.y - house.size / 2);
  ctx.lineTo(house.x, house.y - house.size);
  ctx.lineTo(house.x + house.size / 2, house.y - house.size / 2);
  ctx.closePath();
  ctx.fill();

  // Door
  ctx.fillStyle =
    house.isHiding ? "black" :
    house.isExiting ? "rgba(0,0,0,0.6)" :
    "rgba(0,0,0,0.3)";
  ctx.fillRect(house.x - 10, house.y + 10, 20, 30);
}

animate();
