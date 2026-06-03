const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const mouse = { x: width / 2, y: height / 2 };
let time = 0;
let audioLevel = 0;
let glitchPower = 0;

const nodes = Array.from({ length: 110 }, (_, index) => ({
  angle: Math.random() * Math.PI * 2,
  radius: 120 + index * 4,
  offset: Math.random() * 3,
  hue: 180 + index * 1.5,
  tail: []
}));

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("click", () => {
  glitchPower = 0.85;
});

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);

    analyser.fftSize = 256;
    source.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);

    function updateAudio() {
      analyser.getByteFrequencyData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i];
      audioLevel = Math.min(1, sum / data.length / 196);
      requestAnimationFrame(updateAudio);
    }

    updateAudio();
  })
  .catch(() => {
    console.warn("Microfoon niet beschikbaar: blijf bewegen met de muis.");
  });

function drawTrail(node, x, y, hue) {
  node.tail.push({ x, y });
  if (node.tail.length > 16) node.tail.shift();

  ctx.strokeStyle = `hsla(${hue}, 95%, 70%, 0.12)`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  node.tail.forEach((point, index) => {
    const alpha = index / node.tail.length;
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
}

function drawGlitch() {
  if (Math.random() > 0.18 + audioLevel * 0.25) return;

  const bandCount = 4 + Math.floor(audioLevel * 7);
  for (let i = 0; i < bandCount; i++) {
    const bandHeight = 6 + Math.random() * 18;
    const y = Math.random() * height;
    ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.04})`;
    ctx.fillRect(0, y, width, bandHeight);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = `hsla(${200 + Math.random() * 120}, 100%, 84%, ${0.06 + audioLevel * 0.1})`;
    ctx.fillRect(-12 + Math.sin(time * 5 + i) * 10, y, width + 24, bandHeight * 0.8);
    ctx.restore();
  }
}

function draw() {
  time += 0.016;

  const centerX = width / 2;
  const centerY = height / 2;
  const spread = 80 + audioLevel * 120;

  ctx.fillStyle = `rgba(3, 5, 18, ${0.11 + audioLevel * 0.05})`;
  ctx.fillRect(0, 0, width, height);

  if (glitchPower > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${glitchPower * 0.08})`;
    ctx.fillRect(0, 0, width, height);
    glitchPower *= 0.95;
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  nodes.forEach((node, index) => {
    const drift = audioLevel * 120;
    node.angle += 0.008 + Math.sin(time * 0.7 + node.offset) * 0.001 + audioLevel * 0.025;
    const radius = node.radius + Math.sin(time * 1.12 + node.offset) * 22 + drift;

    const wobbleX = Math.cos(time * 0.9 + node.offset * 2) * 44;
    const wobbleY = Math.sin(time * 1.1 + node.offset * 2) * 38;
    let x = centerX + Math.cos(node.angle) * radius + wobbleX;
    let y = centerY + Math.sin(node.angle) * radius + wobbleY;

    const dx = (mouse.x - x) * 0.015;
    const dy = (mouse.y - y) * 0.015;
    x += dx;
    y += dy;

    const hue = (node.hue + time * 38 + audioLevel * 120) % 360;

    ctx.beginPath();
    ctx.strokeStyle = `hsla(${hue}, 100%, ${48 + audioLevel * 18}%, 0.55)`;
    ctx.lineWidth = 2 + Math.sin(time + index * 0.22) * 0.9;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    drawTrail(node, x, y, hue);

    ctx.beginPath();
    ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.82)`;
    ctx.arc(x, y, 6 + audioLevel * 8, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = `rgba(255, 255, 255, 0.16)`;
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    const y = ((time * 45 + i * 36) % height) + Math.sin(time + i) * 12;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + Math.sin(time * 1.8 + i) * 12);
    ctx.stroke();
  }
  ctx.restore();

  drawGlitch();

  requestAnimationFrame(draw);
}

draw();