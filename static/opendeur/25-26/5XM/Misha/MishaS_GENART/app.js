const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const counter = document.getElementById("counter");
const ui = document.getElementById("ui");
const boxes = document.querySelectorAll(".color-box");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let slices = 12;
let points = [];
let colorMode = 1;

let hideTimer;

function updateUI() {
  counter.textContent = "slices: " + slices;
  ui.style.opacity = 1;

  boxes.forEach(box => {
    box.classList.toggle("active", box.dataset.mode == colorMode);
  });

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    ui.style.opacity = 0;
  }, 5000);
}

window.addEventListener("wheel", e => {
  if (e.deltaY < 0) slices++;
  else slices = Math.max(2, slices - 1);

  updateUI();
});

window.addEventListener("keydown", e => {
  if (e.key >= "1" && e.key <= "5") {
    colorMode = Number(e.key);
    updateUI();
  }
});

updateUI();

function addPoint(x, y) {
  points.push({ x, y, life: 1 });
}

canvas.addEventListener("mousemove", e => {
  addPoint(e.clientX, e.clientY);
});

canvas.addEventListener("touchmove", e => {
  const t = e.touches[0];
  addPoint(t.clientX, t.clientY);
});

function getColor(life) {
  let r, g, b;

  switch (colorMode) {
    case 1: 
      r = 255;
      g = 100 + Math.random() * 100;
      b = 0;
      break;
    case 2: 
      r = 0;
      g = 100;
      b = 200 + Math.random() * 55;
      break;
    case 3: 
      r = 200 + Math.random() * 55;
      g = 0;
      b = 0;
      break;
    case 4: 
      r = 0;
      g = 200 + Math.random() * 55;
      b = 0;
      break;
    case 5: 
      r = 150 + Math.random() * 100;
      g = 0;
      b = 150 + Math.random() * 100;
      break;
  }

  return `rgba(${r},${g},${b},${life})`;
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  points.forEach(p => {
    for (let i = 0; i < slices; i++) {
      ctx.save();

      ctx.translate(centerX, centerY);
      ctx.rotate((Math.PI * 2 / slices) * i);

      const dx = p.x - centerX;
      const dy = p.y - centerY;

      ctx.fillStyle = getColor(p.life);

      ctx.beginPath();
      ctx.arc(dx, dy, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    p.life -= 0.02;
  });

  points = points.filter(p => p.life > 0);

  requestAnimationFrame(draw);
}

draw();