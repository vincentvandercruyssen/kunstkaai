const bgCanvas = document.getElementById("bg");
const bgCtx = bgCanvas.getContext("2d");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const webcamCanvas = document.getElementById("webcamFx");
const webcamCtx = webcamCanvas.getContext("2d");

const text = document.getElementById("text");
const video = document.getElementById("webcam");
const fullscreenBtn = document.getElementById("fullscreenBtn");

bgCanvas.width = canvas.width = webcamCanvas.width = window.innerWidth;
bgCanvas.height = canvas.height = webcamCanvas.height = window.innerHeight;

let audioLevel = 0;
let colorMode = 0;

// 🔊 OUTPUT (AGRESSIEVE SYNTH SCREAM)
let audioContextOut;
let gainNode;
let filter;
let distortion;
let noiseSource;

// 🎤 MICROFOON
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  source.connect(analyser);
  analyser.fftSize = 256;

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  // 🔊 setup scream synth
  audioContextOut = new AudioContext();

  gainNode = audioContextOut.createGain();

  filter = audioContextOut.createBiquadFilter();
  filter.type = "bandpass";

  distortion = audioContextOut.createWaveShaper();

  // noise
  let bufferSize = 2 * audioContextOut.sampleRate;
  let noiseBuffer = audioContextOut.createBuffer(1, bufferSize, audioContextOut.sampleRate);
  let output = noiseBuffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  noiseSource = audioContextOut.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  function makeDistortionCurve(amount) {
    let k = amount;
    let n_samples = 44100;
    let curve = new Float32Array(n_samples);
    let deg = Math.PI / 180;

    for (let i = 0; i < n_samples; ++i) {
      let x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  distortion.curve = makeDistortionCurve(400);

  // connect chain
  noiseSource.connect(filter);
  filter.connect(distortion);
  distortion.connect(gainNode);
  gainNode.connect(audioContextOut.destination);

  gainNode.gain.value = 0;
  noiseSource.start();

  window.getAudio = function () {
    analyser.getByteFrequencyData(dataArray);
    let sum = dataArray.reduce((a, b) => a + b, 0);
    audioLevel = sum / dataArray.length;

    // 🔊 scream reactie
    gainNode.gain.value = audioLevel / 80;
    filter.frequency.value = 300 + audioLevel * 20;
    filter.Q.value = 10 + audioLevel / 2;
  };

  animate();
});

// 🎥 WEBCAM
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
});

// 🌈 BACKGROUND
let t = 0;

function drawBackground() {
  let imageData = bgCtx.createImageData(bgCanvas.width, bgCanvas.height);
  let data = imageData.data;

  for (let x = 0; x < bgCanvas.width; x += 4) {
    for (let y = 0; y < bgCanvas.height; y += 4) {
      let i = (y * bgCanvas.width + x) * 4;

      let v = Math.sin(x * 0.01 + t) + Math.cos(y * 0.01 + t);

      if (colorMode === 0) {
        data[i] = 128 + 128 * Math.sin(v + t);
        data[i + 1] = 128 + 128 * Math.sin(v + 2);
        data[i + 2] = 128 + 128 * Math.cos(v);
      } else {
        data[i] = 128 + 128 * Math.cos(v);
        data[i + 1] = 128 + 128 * Math.sin(v);
        data[i + 2] = 255 - data[i];
      }

      data[i + 3] = 255;
    }
  }

  bgCtx.putImageData(imageData, 0, 0);
  t += 0.02 + audioLevel * 0.0005;
}

// 🎥 WEBCAM EFFECT + AUDIO ZOOM
function drawWebcamEffect(){

  let zoom = 1 + audioLevel * 0.015

  let w = webcamCanvas.width / zoom
  let h = webcamCanvas.height / zoom

  let x = (video.videoWidth - w) / 2
  let y = (video.videoHeight - h) / 2

  webcamCtx.drawImage(
    video,
    x, y, w, h,
    0, 0,
    webcamCanvas.width,
    webcamCanvas.height
  )

  let frame = webcamCtx.getImageData(0,0,webcamCanvas.width,webcamCanvas.height)
  let data = frame.data

  for(let i=0;i<data.length;i+=4){

    let r=data[i]
    let g=data[i+1]
    let b=data[i+2]

    data[i]=r+audioLevel*2
    data[i+1]=g+Math.sin(t)*60
    data[i+2]=b+Math.cos(t)*60

  }

  webcamCtx.putImageData(frame,0,0)

}

// 💥 PARTICLES
let particles = [];

function spawnExplosion(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: x,
      y: y,
      dx: (Math.random() - 0.5) * audioLevel,
      dy: (Math.random() - 0.5) * audioLevel,
      life: 100
    });
  }
}

function drawParticles() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${audioLevel * 2 + p.life},100%,50%)`;
    ctx.fill();

    if (p.life <= 0) particles.splice(index, 1);
  });
}

// 🔊 TEXT
function updateText() {
  let scale = 1 + audioLevel / 40;
  text.style.transform = `translate(-50%, -50%) scale(${scale})`;
  text.style.letterSpacing = `${audioLevel / 4}px`;
}

// 🎮 EVENTS
window.addEventListener("click", e => {
  spawnExplosion(e.clientX, e.clientY);
});

window.addEventListener("keydown", e => {
  if (e.key === "c") {
    colorMode = (colorMode + 1) % 2;
  }
});

fullscreenBtn.addEventListener("click", () => {
  document.body.requestFullscreen();
});

// 🎬 LOOP
function animate() {
  requestAnimationFrame(animate);

  if (window.getAudio) getAudio();

  drawBackground();
  drawWebcamEffect();
  drawParticles();
  updateText();

  if (audioLevel > 40) {
    spawnExplosion(canvas.width / 2, canvas.height / 2);
  }
}