const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(() => {
    alert("Geen webcam 😢");
  });

let lastFrame = null;
let motion = 0;

// Game state
let freeze = false;
let score = 0;
let timer = 0;

function draw() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = frame.data;

  motion = 0;

  if (lastFrame) {
    for (let i = 0; i < data.length; i += 40) {
      motion += Math.abs(data[i] - lastFrame[i]);
    }
  }

  // GAME LOGIC
  timer++;

  if (timer % 120 === 0) {
    freeze = !freeze; // switch state
  }

  if (freeze) {
    // speler moet stil zijn
    if (motion > 30000) {
      fail();
    }
  } else {
    // speler moet bewegen
    if (motion < 15000) {
      fail();
    } else {
      score++;
    }
  }

  // Visual feedback
  if (freeze) {
    ctx.fillStyle = "rgba(255,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // lichte glitch altijd
  glitch(frame, freeze ? 0.3 : 0.05);

  ctx.putImageData(frame, 0, 0);

  drawUI();

  lastFrame = new Uint8ClampedArray(data);

  requestAnimationFrame(draw);
}

function glitch(frame, intensity) {
  const data = frame.data;

  for (let i = 0; i < data.length; i += 4) {
    if (Math.random() < intensity) {
      const offset = (Math.floor(Math.random() * 100) - 50) * 4;
      const target = i + offset;

      if (target > 0 && target < data.length) {
        data[i] = data[target];
        data[i + 1] = data[target + 1];
        data[i + 2] = data[target + 2];
      }
    }
  }
}

function fail() {
  score = 0;

  // heavy glitch burst
  for (let i = 0; i < 10; i++) {
    glitch(ctx.getImageData(0, 0, canvas.width, canvas.height), 0.5);
  }
}

function drawUI() {
  ctx.fillStyle = "white";
  ctx.font = "30px monospace";

  ctx.fillText("Score: " + score, 20, 40);

  ctx.fillStyle = freeze ? "red" : "lime";
  ctx.fillText(freeze ? "FREEZE!" : "MOVE!", 20, 80);
}

// start
video.addEventListener("play", () => {
  draw();
});