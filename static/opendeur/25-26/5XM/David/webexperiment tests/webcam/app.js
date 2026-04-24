const video = document.getElementById("webcam");
const canvas = document.getElementById("crt-canvas");
const ctx = canvas.getContext("2d");

const SIZE = 512;
canvas.width = SIZE;
canvas.height = SIZE;

let powerOn = false;          // screen starts OFF
let autoStartupDone = false;  // run startup once
let currentEffectName = "none";
let frameCount = 0;

// Animation state
let anim = null;

// Offscreen frame buffer (webcam frame before effects)
const frameCanvas = document.createElement("canvas");
frameCanvas.width = SIZE;
frameCanvas.height = SIZE;
const frameCtx = frameCanvas.getContext("2d");

/* ============================================================
   EFFECT CLASSES
   ============================================================ */

class FracturedMirror {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.tiles = 40;
  }
  update(frame) {}
  draw(frame) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    const tw = w / 10;
    const th = h / 10;

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const dx = x * tw + Math.sin(Date.now() * 0.001 + x + y) * 10;
        const dy = y * th + Math.cos(Date.now() * 0.001 + x - y) * 10;

        this.ctx.drawImage(
          frame,
          x * tw, y * th, tw, th,
          dx, dy, tw, th
        );
      }
    }
  }
}

class LiquidDistortion {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.time = 0;
  }
  update(frame) {
    this.time += 0.02;
  }
  draw(frame) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    for (let y = 0; y < h; y += 4) {
      const offset = Math.sin(this.time + y * 0.02) * 20;
      this.ctx.drawImage(frame, 0, y, w, 4, offset, y, w, 4);
    }
  }
}

class EchoTunnel {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
  update(frame) {}
  draw(frame) {
    this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);

    for (let i = 1; i < 20; i++) {
      const scale = 1 - i * 0.04;
      const w = this.canvas.width * scale;
      const h = this.canvas.height * scale;
      const x = (this.canvas.width - w) / 2;
      const y = (this.canvas.height - h) / 2;

      this.ctx.globalAlpha = 0.05;
      this.ctx.drawImage(this.canvas, x, y, w, h);
    }

    this.ctx.globalAlpha = 1;
  }
}

class ShadowBeing {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
  update(frame) {}
  draw(frame) {
    this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);

    const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = (data[i] + data[i+1] + data[i+2]) / 3;
      const t = v < 100 ? 0 : 255;
      data[i] = data[i+1] = data[i+2] = t;
    }

    this.ctx.putImageData(img, 0, 0);
  }
}

// Instantiate effects
const effects = {
  fractured: new FracturedMirror(canvas, ctx),
  liquid: new LiquidDistortion(canvas, ctx),
  echo: new EchoTunnel(canvas, ctx),
  shadow: new ShadowBeing(canvas, ctx)
};

/* ============================================================
   UI: EFFECT BUTTONS
   ============================================================ */

document.querySelectorAll(".effect-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".effect-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentEffectName = btn.dataset.effect;
    randomChannel();
  });
});

/* ============================================================
   POWER TOGGLE (ON label)
   ============================================================ */

const powerToggle = document.getElementById("power-toggle");
powerToggle.addEventListener("click", () => {
  if (anim) return; // don't interrupt animations

  if (powerOn) {
    startShutdownAnimation();
  } else {
    startStartupAnimation();
  }
});

/* ============================================================
   CHANNEL + CLOCK
   ============================================================ */

const channelSpan = document.getElementById("channel-num");
const clockSpan = document.getElementById("clock");

function randomChannel() {
  const n = Math.floor(Math.random() * 99) + 1;
  channelSpan.textContent = n.toString().padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  clockSpan.textContent = `${h}:${m}`;
}

setInterval(updateClock, 1000);
updateClock();
randomChannel();

/* ============================================================
   WEBCAM SETUP
   ============================================================ */

async function setupWebcam() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
    audio: false
  });

  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      video.play();
      resolve();
    };
  });
}

/* ============================================================
   DRAW WEBCAM INTO OFFSCREEN FRAME (centered square crop)
   ============================================================ */

function drawWebcamToFrame() {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return;

  const cropSize = Math.min(vw, vh);
  const sx = (vw - cropSize) / 2;
  const sy = (vh - cropSize) / 2;

  frameCtx.drawImage(video, sx, sy, cropSize, cropSize, 0, 0, SIZE, SIZE);
}

/* ============================================================
   STARTUP ANIMATION (horizontal line → vertical expansion)
   ============================================================ */

function startStartupAnimation() {
  powerOn = true;
  powerToggle.textContent = "ON";
  document.querySelector(".led-dot").classList.remove("off");

  const overlays = document.querySelectorAll(".crt-overlay");
  overlays.forEach(o => o.style.opacity = 0);

  anim = {
    type: "startup",
    t: 0
  };
}

function runStartupAnimation(dt) {
  anim.t += dt;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Phase 1: black (0–100ms)
  if (anim.t < 100) return;

  // Phase 2: horizontal line (100–250ms)
  if (anim.t < 250) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, SIZE / 2, SIZE, 1);
    return;
  }

  // Phase 3: vertical expansion (250–500ms)
  if (anim.t < 500) {
    const p = (anim.t - 250) / 250;
    const h = p * SIZE;
    const y = (SIZE - h) / 2;
    ctx.fillStyle = "white";
    ctx.fillRect(0, y, SIZE, h);
    return;
  }

  // Phase 4: fade-in (500–600ms)
  const fade = Math.min(1, (anim.t - 500) / 100);

  drawWebcamToFrame();
  ctx.globalAlpha = fade;
  ctx.drawImage(frameCanvas, 0, 0);
  ctx.globalAlpha = 1;

  if (anim.t >= 600) {
    anim = null;
    const overlays = document.querySelectorAll(".crt-overlay");
    overlays.forEach(o => o.style.opacity = 1);
  }
}

/* ============================================================
   SHUTDOWN ANIMATION (vertical collapse into horizontal line)
   ============================================================ */

function startShutdownAnimation() {
  powerOn = false;
  powerToggle.textContent = "OFF";
  document.querySelector(".led-dot").classList.add("off");

  anim = {
    type: "shutdown",
    t: 0,
    freeze: frameCanvas.toDataURL()
  };
}

function runShutdownAnimation(dt) {
  anim.t += dt;

  const img = new Image();
  img.src = anim.freeze;

  img.onload = () => {
    const total = 550;

    // Phase 1: vertical collapse (0–350ms)
    if (anim.t < 350) {
      const p = anim.t / 350;
      const h = SIZE * (1 - p);
      const y = (SIZE - h) / 2;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.drawImage(img, 0, y, SIZE, h);
      return;
    }

    // Phase 2: fade out (350–550ms)
    const fade = 1 - (anim.t - 350) / 200;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, SIZE, SIZE);

    ctx.globalAlpha = Math.max(0, fade);
    ctx.drawImage(img, 0, SIZE / 2 - 1, SIZE, 2);
    ctx.globalAlpha = 1;

    if (anim.t >= total) {
      anim = null;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, SIZE, SIZE);

      const overlays = document.querySelectorAll(".crt-overlay");
      overlays.forEach(o => o.style.opacity = 0);
    }
  };
}

/* ============================================================
   MAIN RENDER LOOP
   ============================================================ */

let lastTime = performance.now();

function render(now) {
  const dt = now - lastTime;
  lastTime = now;

  if (!autoStartupDone) {
    startStartupAnimation();
    autoStartupDone = true;
  }

  if (anim) {
    if (anim.type === "shutdown") {
      runShutdownAnimation(dt);
    } else {
      runStartupAnimation(dt);
    }
  } else if (powerOn && video.readyState >= 2) {
    drawWebcamToFrame();

    if (currentEffectName === "none") {
      ctx.drawImage(frameCanvas, 0, 0, SIZE, SIZE);
    } else {
      const effect = effects[currentEffectName];
      effect.update(frameCanvas);
      effect.draw(frameCanvas);
    }
  } else if (!powerOn) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, SIZE, SIZE);
  }

  requestAnimationFrame(render);
}

(async function init() {
  await setupWebcam();
  render(performance.now());
})();
