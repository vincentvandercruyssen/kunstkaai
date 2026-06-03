const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

/* =========================
   TIME SYSTEM (IMPORTANT FIX)
========================= */

let lastTime = 0;
let deltaTime = 1;

/* =========================
   GLOBAL STORM STATE
========================= */

let stormEnergy = 0;
let wind = 0;

/* =========================
   STARS
========================= */

const stars = [];

for (let i = 0; i < 220; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5,
    base: Math.random() * 0.5 + 0.2,
    twinkle: Math.random() * 100
  });
}

/* =========================
   CLOUDS
========================= */

const clouds = [];

for (let i = 0; i < 6; i++) {
  clouds.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.6,
    radius: 200 + Math.random() * 300,
    speed: 0.15 + Math.random() * 0.2
  });
}

/* =========================
   RAIN
========================= */

const rain = [];

for (let i = 0; i < 400; i++) {
  rain.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    len: Math.random() * 15 + 10,
    speed: Math.random() * 6 + 4,
    opacity: Math.random() * 0.3 + 0.2
  });
}

/* =========================
   LIGHTNING
========================= */

class Lightning {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.segments = [];
    this.life = 1;
    this.generate();
  }

  generate() {
    this.segments = [];

    let x = this.startX;
    let y = this.startY;

    const segmentCount = 30;

    const angle = Math.atan2(
      this.endY - this.startY,
      this.endX - this.startX
    );

    for (let i = 0; i < segmentCount; i++) {
      const progress = i / segmentCount;
      const chaos = Math.pow(progress, 3) * 120;

      x += Math.cos(angle) * 15 + (Math.random() - 0.5) * chaos;
      y += Math.sin(angle) * 15 + (Math.random() - 0.5) * chaos;

      this.segments.push({ x, y });
    }
  }

  draw() {
    ctx.shadowBlur = stormEnergy > 0.6 ? 10 : 25;
    ctx.shadowColor = "rgba(200,220,255,0.8)";

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);

    for (let s of this.segments) {
      ctx.lineTo(s.x, s.y);
    }

    ctx.strokeStyle = "rgba(120,140,255,0.12)";
    ctx.lineWidth = 12;
    ctx.stroke();

    ctx.strokeStyle = "rgba(180,190,255,0.35)";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    this.life -= 0.12 * deltaTime;
  }
}

const lightnings = [];

/* =========================
   SPAWN LIGHTNING
========================= */

function spawnLightning(x, y) {
  const startX = Math.random() * canvas.width;
  const startY = Math.random() * canvas.height;

  const endX = x + (Math.random() - 0.5) * 30;
  const endY = y + (Math.random() - 0.5) * 30;

  lightnings.push(new Lightning(startX, startY, endX, endY));

  stormEnergy = Math.min(1, stormEnergy + 0.4);
}

/* =========================
   INTERACTION
========================= */

const card = document.querySelector(".card");

let lastMove = 0;

card.addEventListener("mousemove", () => {
  if (Date.now() - lastMove > 80) {
    spawnLightning(canvas.width / 2, canvas.height / 2);
    lastMove = Date.now();
  }
});

card.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    spawnLightning(canvas.width / 2, canvas.height / 2);
  }
});

/* =========================
   MAIN LOOP (FIXED)
========================= */

function animate(time = 0) {
  requestAnimationFrame(animate);

  deltaTime = (time - lastTime) / 16.67;
  lastTime = time;

  deltaTime = Math.min(deltaTime, 2); // prevent huge jumps

  stormEnergy *= 0.92;

  wind += (stormEnergy * 0.2 - wind) * 0.05 * deltaTime;

  /* SKY */
  const skyDark = 0.35 + stormEnergy * 0.25;

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = `rgba(3, 6, 14, ${skyDark})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* CLOUDS */
  for (let c of clouds) {
    c.x += (c.speed + wind) * deltaTime;

    if (c.x > canvas.width + c.radius) {
      c.x = -c.radius;
      c.y = Math.random() * canvas.height * 0.6;
    }

    const gradient = ctx.createRadialGradient(
      c.x, c.y, 0,
      c.x, c.y, c.radius
    );

    gradient.addColorStop(0, "rgba(120,140,200,0.08)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  /* STARS */
  for (let s of stars) {
    const flicker =
      s.base +
      Math.sin(time * 0.002 + s.twinkle) * 0.25 -
      stormEnergy * 0.4;

    ctx.fillStyle = `rgba(220,230,255,${flicker})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }

  /* RAIN (FULLY TIME-INDEPENDENT) */
  for (let r of rain) {
    r.y += r.speed * deltaTime;
    r.x += (r.speed * 0.3 + wind * 2) * deltaTime;

    if (r.y > canvas.height) {
      r.y = -20;
      r.x = Math.random() * canvas.width;
    }

    ctx.strokeStyle = `rgba(200,220,255,${r.opacity})`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(r.x, r.y);
    ctx.lineTo(r.x - 2, r.y - r.len);
    ctx.stroke();
  }

  /* STORM FLASH (visual only) */
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = `rgba(180,200,255,${stormEnergy * 0.2})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* LIGHTNING */
  ctx.globalCompositeOperation = "lighter";

  if (Math.random() < 0.015 + stormEnergy * 0.02) {
    spawnLightning(mouse.x, mouse.y);
  }

  for (let i = lightnings.length - 1; i >= 0; i--) {
    lightnings[i].draw();

    if (lightnings[i].life <= 0) {
      lightnings.splice(i, 1);
    }
  }
}

animate();