const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("contextmenu", e => e.preventDefault());

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  left: false,
  right: false
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousedown", (e) => {
  if (e.button === 0) mouse.left = true;
  if (e.button === 2) mouse.right = true;
});

window.addEventListener("mouseup", (e) => {
  if (e.button === 0) mouse.left = false;
  if (e.button === 2) mouse.right = false;
});

let particles = [];

function createParticle(x, y) {
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    size: 1 + Math.random() * 2
  };
}

function animate() {
  requestAnimationFrame(animate);


  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

 
  if (mouse.left) {
    for (let i = 0; i < 4; i++) {
      particles.push(createParticle(mouse.x, mouse.y));
    }
  }

 
  if (mouse.right) {
    particles = particles.filter(p => {
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      return Math.sqrt(dx * dx + dy * dy) > 40;
    });
  }


  for (let p of particles) {

    p.x += p.vx;
    p.y += p.vy;

  
    p.vx *= 0.97;
    p.vy *= 0.97;

    p.vx += (Math.random() - 0.5) * 0.03;
    p.vy += (Math.random() - 0.5) * 0.03;

   
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    let hue = (p.x + p.y) * 0.1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
    ctx.fill();
  }
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});