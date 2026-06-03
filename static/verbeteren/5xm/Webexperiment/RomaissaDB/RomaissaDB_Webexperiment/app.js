
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

const mouse = {
  x: width / 2,
  y: height / 2,
  down: false,
  pulse: 0
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousedown", () => {
  mouse.down = true;
  mouse.pulse = 1; // start een puls
});

window.addEventListener("mouseup", () => {
  mouse.down = false;
});

// Partikelklasse
class Particle {
  constructor() {
    this.reset(true);
  }

  reset(randomPos = false) {
    this.x = randomPos ? Math.random() * width : width / 2;
    this.y = randomPos ? Math.random() * height : height / 2;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.baseSpeed = 0.4 + Math.random() * 0.6;
    this.size = 1 + Math.random() * 2;
    this.life = 0;
    this.maxLife = 400 + Math.random() * 400;
    this.hueOffset = Math.random() * 360;
  }

  update(time) {
    this.life++;

    // lichte drift
    this.vx += (Math.random() - 0.5) * 0.02;
    this.vy += (Math.random() - 0.5) * 0.02;

    // aantrekkingskracht naar muis
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = Math.min(80 / dist, 0.25);

    this.vx += (dx / dist) * force * 0.02;
    this.vy += (dy / dist) * force * 0.02;

    // extra puls bij klik
    if (mouse.pulse > 0) {
      const pulseForce = mouse.pulse * 0.5;
      this.vx -= (dx / dist) * pulseForce * 0.02;
      this.vy -= (dy / dist) * pulseForce * 0.02;
    }

    // snelheid limiteren
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed = this.baseSpeed;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    this.x += this.vx;
    this.y += this.vy;

   
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    if (this.life > this.maxLife) {
      this.reset(true);
    }

    // kleur op basis van tijd en eigen offset
    const hue = (time * 0.02 + this.hueOffset) % 360;
    const alpha = 0.2 + 0.8 * (this.life / this.maxLife);
    this.color = `hsla(${hue}, 80%, 60%, ${alpha})`;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Partikelveld
const particles = [];
const PARTICLE_COUNT = 400;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}


let lastTime = 0;

function animate(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.fillRect(0, 0, width, height);

  
  if (mouse.pulse > 0) {
    mouse.pulse -= delta * 0.003;
    if (mouse.pulse < 0) mouse.pulse = 0;

    
    const radius = 40 + (1 - mouse.pulse) * 200;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 200, 255, ${mouse.pulse})`;
    ctx.lineWidth = 2;
    ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.update(timestamp);
    p.draw(ctx);

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const alpha = 1 - dist / 80;
        ctx.strokeStyle = `rgba(150, 200, 255, ${alpha * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
