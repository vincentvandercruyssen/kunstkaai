const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("video");

// resize
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// webcam
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
  video.srcObject = stream;
  video.play();
});

// input
let mouse = { x: canvas.width/2, y: canvas.height/2, down: false };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousedown", () => mouse.down = true);
window.addEventListener("mouseup", () => mouse.down = false);

// particles
let particles = [];
let shocks = [];

// create particle
function createParticle(x, y, power = 2) {
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * power * 4,
    vy: (Math.random() - 0.5) * power * 4,
    life: 100 + Math.random() * 100
  };
}

// initial
for (let i = 0; i < 200; i++) {
  particles.push(createParticle(Math.random()*canvas.width, Math.random()*canvas.height));
}

// shockwave
window.addEventListener("click", () => {
  shocks.push({ x: mouse.x, y: mouse.y, r: 0 });

  for (let i = 0; i < 80; i++) {
    particles.push(createParticle(mouse.x, mouse.y, 6));
  }
});

// trails
let trails = [];
window.addEventListener("mousemove", () => {
  if (mouse.down) {
    trails.push({ x: mouse.x, y: mouse.y, life: 60 });
  }
});

// animate
function animate() {
  requestAnimationFrame(animate);

  // fade
  ctx.fillStyle = "rgba(0,0,0,0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // webcam ghost
  ctx.globalAlpha = 0.08;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  let time = Date.now() * 0.002;

  // particles
  particles.forEach((p, i) => {
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.hypot(dx, dy);

    // gravity field
    let force = 0.0008;
    p.vx += dx * force;
    p.vy += dy * force;

    // swirl
    p.vx += Math.cos(time + i) * 0.05;
    p.vy += Math.sin(time + i) * 0.05;

    // friction
    p.vx *= 0.97;
    p.vy *= 0.97;

    p.x += p.vx;
    p.y += p.vy;

    p.life--;

    let hue = (time * 120 + i * 4) % 360;

    // glow particle
    ctx.shadowBlur = 20;
    ctx.shadowColor = `hsl(${hue},100%,60%)`;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${hue},100%,60%)`;
    ctx.fill();

    ctx.shadowBlur = 0;

    // respawn
    if (p.life <= 0) {
      particles[i] = createParticle(Math.random()*canvas.width, Math.random()*canvas.height);
    }
  });

  // connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i+1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.hypot(dx, dy);

      if (dist < 70) {
        ctx.strokeStyle = `rgba(255,255,255,${0.03})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // shockwaves
  shocks.forEach((s, i) => {
    s.r += 8;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${1 - s.r/300})`;
    ctx.lineWidth = 3;
    ctx.stroke();

    if (s.r > 300) shocks.splice(i,1);
  });

  // trails
  trails.forEach((t, i) => {
    t.life--;

    ctx.beginPath();
    ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${t.life/60})`;
    ctx.fill();

    if (t.life <= 0) trails.splice(i,1);
  });
}

animate();