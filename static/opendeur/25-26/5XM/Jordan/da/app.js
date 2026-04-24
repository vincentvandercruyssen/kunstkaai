const bg = document.getElementById("background");
const bctx = bg.getContext("2d");

const trailCanvas = document.getElementById("overlay-trail");
const trailCtx = trailCanvas.getContext("2d");

let w = bg.width = trailCanvas.width = window.innerWidth;
let h = bg.height = trailCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  w = bg.width = trailCanvas.width = window.innerWidth;
  h = bg.height = trailCanvas.height = window.innerHeight;
});

const helicesCount = 6;
const helices = [];

for (let hIndex = 0; hIndex < helicesCount; hIndex++) {
  const particles = [];
  const particleCount = 50; 

  for (let i = 0; i < particleCount; i++) {
    const normalizedY = i / particleCount;
    particles.push({
      index: i,
      yNorm: normalizedY
    });
  }

  const hue1 = Math.random() * 360;
  const hue2 = (hue1 + 120) % 360; 
  
  helices.push({
    particles: particles,
    hue1: hue1,
    hue2: hue2,
    xOffsetRatio: (hIndex + 0.5) / helicesCount, 
    speedMultiplier: Math.random() * 0.8 + 0.5, 
    driftSpeed: Math.random() * 0.02 + 0.01,    
    baseRadius: Math.random() * 40 + 30         
  });
}

let mouse = { x: w / 2, y: h / 2 };
let mouseTrail = [];
let shockwaves = [];
const glassPanels = document.querySelectorAll('.glass-panel');

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouseTrail.push({ x: mouse.x, y: mouse.y, age: 1.0 });

  glassPanels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    const tiltX = (py / rect.height) * -8; 
    const tiltY = (px / rect.width) * 8;
    panel.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
});

window.addEventListener("mouseleave", () => {
  glassPanels.forEach(panel => {
    panel.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

window.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SPAN") {
    shockwaves.push({ x: e.clientX, y: e.clientY, radius: 0, age: 1.0 });
  }
});

window.addEventListener("contextmenu", e => {
  e.preventDefault(); 
  
  const hack = document.createElement("div");
  hack.innerText = "ACCESS.DENIED // OMEGA PROTOCOL";
  hack.style.position = "fixed";
  hack.style.top = e.clientY + "px";
  hack.style.left = e.clientX + "px";
  hack.style.color = "#ff0055";
  hack.style.fontFamily = "var(--font-mono, monospace)";
  hack.style.fontSize = "1.4rem";
  hack.style.fontWeight = "bold";
  hack.style.textShadow = "0 0 10px #ff0055";
  hack.style.pointerEvents = "none";
  hack.style.zIndex = "10000";
  hack.style.transform = "translate(-50%, -50%) scale(0.5)";
  hack.style.transition = "all 0.1s ease";
  
  document.body.appendChild(hack);

  let glitchInterval = setInterval(() => {
    hack.style.transform = `translate(-50%, -50%) translate(${Math.random()*10 - 5}px, ${Math.random()*10 - 5}px) scale(${1 + Math.random()*0.2})`;
    hack.style.color = Math.random() > 0.5 ? "#ff0055" : "#00eaff";
  }, 50);
  
  setTimeout(() => {
    clearInterval(glitchInterval);
    hack.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    hack.style.transform = "translate(-50%, -50%) scale(2)";
    hack.style.opacity = "0";
  }, 2000);
  
  setTimeout(() => {
    hack.remove();
  }, 2800);

  for(let i = 0; i < 5; i++) {
    setTimeout(() => {
        shockwaves.push({ x: e.clientX, y: e.clientY, radius: (i * 10), age: 1.0 });
    }, i * 150);
  }
});

let globalTime = 0;
let overrideActive = false;

function animateBackground() {
  bctx.fillStyle = "rgba(0,0,0,0.2)"; 
  bctx.fillRect(0, 0, w, h);

  globalTime += 0.01 + (mouse.y / h) * 0.03; 

  const rungs = [];

  helices.forEach(helix => {
    const time = globalTime * helix.speedMultiplier;
    const driftY = (Date.now() * helix.driftSpeed) % h;
    const radius = helix.baseRadius + (mouse.x / w) * 80; 
    const centerX = helix.xOffsetRatio * w + Math.sin(time) * 30; 

    helix.particles.forEach(p => {
      let currentY = (p.yNorm * h * 1.5) - driftY;
      currentY = ((currentY % h) + h) % h;
      
      const angle = p.yNorm * Math.PI * 10 + time; 

      const x1 = Math.sin(angle) * radius;
      const z1 = Math.cos(angle);
      
      const x2 = Math.sin(angle + Math.PI) * radius;
      const z2 = Math.cos(angle + Math.PI);
      
      let rx1 = centerX + x1;
      let ry1 = currentY;
      let rx2 = centerX + x2;
      let ry2 = currentY;

      const dist1 = Math.hypot(rx1 - mouse.x, ry1 - mouse.y);
      if (dist1 < 120) {
        const force = (120 - dist1) / 120;
        rx1 += ((rx1 - mouse.x) / dist1) * force * 80;
        ry1 += ((ry1 - mouse.y) / dist1) * force * 80;
      }

      const dist2 = Math.hypot(rx2 - mouse.x, ry2 - mouse.y);
      if (dist2 < 120) {
        const force = (120 - dist2) / 120;
        rx2 += ((rx2 - mouse.x) / dist2) * force * 80;
        ry2 += ((ry2 - mouse.y) / dist2) * force * 80;
      }
      
      rungs.push({
        x1: rx1, y1: ry1, z1: z1,
        x2: rx2, y2: ry2, z2: z2,
        hue1: helix.hue1, hue2: helix.hue2
      });
    });
  });

  rungs.sort((a, b) => (a.z1 + a.z2) - (b.z1 + b.z2));

  rungs.forEach(r => {
    const avgZ = (r.z1 + r.z2) / 2;
    const alpha = 0.1 + (avgZ + 1) * 0.45; 

    bctx.beginPath();
    const grad = bctx.createLinearGradient(r.x1, r.y1, r.x2, r.y2);
    grad.addColorStop(0, `hsla(${r.hue1}, 100%, 60%, ${alpha * 0.4})`);
    grad.addColorStop(1, `hsla(${r.hue2}, 100%, 60%, ${alpha * 0.4})`);
    bctx.strokeStyle = grad;
    bctx.lineWidth = 1 + (avgZ + 1) * 0.8;
    bctx.moveTo(r.x1, r.y1);
    bctx.lineTo(r.x2, r.y2);
    bctx.stroke();

    bctx.beginPath();
    bctx.fillStyle = `hsla(${r.hue1}, 100%, 60%, ${alpha})`;
    bctx.arc(r.x1, r.y1, 1 + (r.z1 + 1) * 2, 0, Math.PI * 2);
    bctx.fill();

    bctx.beginPath();
    bctx.fillStyle = `hsla(${r.hue2}, 100%, 60%, ${alpha})`;
    bctx.arc(r.x2, r.y2, 1 + (r.z2 + 1) * 2, 0, Math.PI * 2);
    bctx.fill();
  });

  for (let i = 0; i < mouseTrail.length; i++) {
    mouseTrail[i].age -= 0.04;
  }
  mouseTrail = mouseTrail.filter(pt => pt.age > 0);

  trailCtx.clearRect(0, 0, w, h);

  if (mouseTrail.length > 1) {
    for (let i = 1; i < mouseTrail.length; i++) {
      trailCtx.beginPath();
      trailCtx.moveTo(mouseTrail[i-1].x, mouseTrail[i-1].y);
      trailCtx.lineTo(mouseTrail[i].x, mouseTrail[i].y);
      
      const alpha = mouseTrail[i].age;
      trailCtx.lineWidth = overrideActive ? 8 : 5;
      trailCtx.lineCap = "round";
      trailCtx.strokeStyle = overrideActive ? `rgba(255, 0, 85, ${alpha})` : `rgba(0, 234, 255, ${alpha})`;
      trailCtx.shadowBlur = 10 * alpha;
      trailCtx.shadowColor = overrideActive ? "#ff0055" : "#00eaff";
      trailCtx.stroke();
    }
    trailCtx.shadowBlur = 0; 
  }

  for (let i = shockwaves.length - 1; i >= 0; i--) {
    let sw = shockwaves[i];
    trailCtx.beginPath();
    trailCtx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
    trailCtx.strokeStyle = overrideActive ? `rgba(255, 0, 85, ${sw.age})` : `rgba(0, 234, 255, ${sw.age})`;
    trailCtx.lineWidth = 2 + (1 - sw.age) * 8;
    trailCtx.shadowBlur = 20 * sw.age;
    trailCtx.shadowColor = overrideActive ? "#ff0055" : "#00eaff";
    trailCtx.stroke();
    
    trailCtx.shadowBlur = 0;
    sw.radius += 12;
    sw.age -= 0.025;
    if (sw.age <= 0) shockwaves.splice(i, 1);
  }

  if (typeof overrideActive !== 'undefined' && overrideActive) {
    bctx.fillStyle = "rgba(255, 0, 85, 0.2)";
    bctx.fillRect(0, 0, w, h);
    
    for(let i=0; i < 40; i++) {
        bctx.fillStyle = Math.random() > 0.5 ? "#ff0055" : "#00eaff";
        bctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 100 + 10, Math.random() * 3);
    }
    
    globalTime += 0.05; 
  }

  requestAnimationFrame(animateBackground);
}

animateBackground();

const imageList = [
  "images/raphinha.jpg",
  "images/hart.jpg",
  "images/drakeboy.jpg",
  "images/lamine.jpg"
];

const gallery = document.getElementById("gallery");

const TARGET_WIDTH = 120; 
const TARGET_HEIGHT = 120;
const CELL_SIZE = 6;

imageList.forEach(src => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("portrait");
  const ctx = canvas.getContext("2d");
  gallery.appendChild(canvas);

  canvas.width = TARGET_WIDTH * CELL_SIZE;
  canvas.height = TARGET_HEIGHT * CELL_SIZE;

  const img = new Image();
  img.src = src;

  img.onerror = () => {
    ctx.fillStyle = "white";
    ctx.font = "18px monospace";
    ctx.fillText("Kon afbeelding niet laden:", 10, 30);
    ctx.fillText(src, 10, 60);
  };

  img.onload = () => {
    const off = document.createElement("canvas");
    off.width = TARGET_WIDTH;
    off.height = TARGET_HEIGHT;
    const offCtx = off.getContext("2d");

    offCtx.drawImage(img, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
    const pixels = offCtx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT).data;

    let isHovered = false;
    let timeOff = 0;
    
    let isExploding = false;
    let explosionForce = 0;
    let clickOriginX = 0;
    let clickOriginY = 0;

    canvas.addEventListener("click", e => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      clickOriginX = (e.clientX - rect.left) * scaleX;
      clickOriginY = (e.clientY - rect.top) * scaleY;
      explosionForce = 1.0;
      
      if (!isExploding && !isHovered) {
         isExploding = true;
         drawNumbers();
      } else {
         isExploding = true;
      }
    });

    function drawNumbers() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < TARGET_HEIGHT; y++) {
        for (let x = 0; x < TARGET_WIDTH; x++) {
          const i = (y * TARGET_WIDTH + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          const brightness = (r + g + b) / 3;
          let digit = Math.floor((brightness / 255) * 9);

          let fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
          let offsetX = 0;
          let offsetY = 0;

          if (isHovered) {
            if (Math.random() > 0.95) {
              digit = Math.floor(Math.random() * 9);
            }
            if (Math.random() > 0.8) {
              fillStyle = Math.random() > 0.5 ? "var(--accent-1)" : "var(--accent-2)";
              offsetX = (Math.random() - 0.5) * 4;
              offsetY = (Math.random() - 0.5) * 4;
            } else {
              fillStyle = `rgb(${r}, ${g}, ${b})`; 
            }
          }

          if (explosionForce > 0) {
             const pixelX = x * CELL_SIZE;
             const pixelY = y * CELL_SIZE;
             const dx = pixelX - clickOriginX;
             const dy = pixelY - clickOriginY;
             const distance = Math.hypot(dx, dy);
             
             if (distance < 300 * explosionForce) {
               const power = (300 * explosionForce - distance) / (300 * explosionForce);
               offsetX += (dx / (distance || 1)) * power * 150 * explosionForce;
               offsetY += (dy / (distance || 1)) * power * 150 * explosionForce;
               fillStyle = Math.random() > 0.5 ? "var(--accent-1)" : (Math.random() > 0.5 ? "var(--accent-2)" : "#fff");
             }
          }

          ctx.fillStyle = fillStyle;
          ctx.font = `bold ${CELL_SIZE}px "JetBrains Mono", monospace`;
          ctx.fillText(digit, x * CELL_SIZE + offsetX, y * CELL_SIZE + offsetY);
        }
      }

      if (explosionForce > 0) {
         explosionForce -= 0.035;
         if (explosionForce <= 0) {
             isExploding = false;
             if (!isHovered) {
                 drawNumbers(); 
                 return;
             }
         }
      }

      if (isHovered || isExploding) {
        timeOff = requestAnimationFrame(drawNumbers);
      }
    }

    drawNumbers();

    canvas.addEventListener("mouseenter", () => {
      isHovered = true;
      if (!isExploding) {
          drawNumbers();
      }
    });

    canvas.addEventListener("mouseleave", () => {
      isHovered = false;
      if (!isExploding) {
        cancelAnimationFrame(timeOff);
        drawNumbers(); 
      }
    });
  };
});

const overrideBtn = document.getElementById("overrideBtn");
const subtitle = document.querySelector(".subtitle");

if (overrideBtn) {
  overrideBtn.addEventListener("click", () => {
    overrideActive = !overrideActive;
    
    if (overrideActive) {
      overrideBtn.classList.add("active");
      overrideBtn.innerHTML = '<span class="icon">⛔</span> Matrix Overload';
      
      if (subtitle) {
        subtitle.innerText = "SYSTEM COMPROMISED. OVERRIDE INITIATED.";
        subtitle.style.color = "#ff0055";
        subtitle.style.fontWeight = "bold";
      }
    } else {
      overrideBtn.classList.remove("active");
      overrideBtn.innerHTML = '<span class="icon">⚡</span> Initieer Core Override';
      
      if (subtitle) {
        subtitle.innerText = "Een interactieve, digitale blikvanger. Gecodeerd met de vibe.";
        subtitle.style.color = "var(--text-main)";
        subtitle.style.fontWeight = "normal";
      }
    }
  });
}

// --- LIVE WEBCAM DATA FEED ---
const webcamCanvas = document.createElement("canvas");
webcamCanvas.classList.add("portrait");
webcamCanvas.style.display = "none";
gallery.appendChild(webcamCanvas);

const webcamBtn = document.createElement("button");
webcamBtn.className = "override-btn";
webcamBtn.style.gridColumn = "1 / -1";
webcamBtn.style.marginTop = "20px";
webcamBtn.innerHTML = '<span class="icon">📷</span> Connect Live Data Feed';
gallery.appendChild(webcamBtn);

webcamBtn.addEventListener("click", async () => {
  webcamBtn.style.display = "none";
  webcamCanvas.style.display = "block";
  webcamCanvas.width = TARGET_WIDTH * CELL_SIZE;
  webcamCanvas.height = TARGET_HEIGHT * CELL_SIZE;
  
  const wCtx = webcamCanvas.getContext("2d");
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    
    const offVideo = document.createElement("canvas");
    offVideo.width = TARGET_WIDTH;
    offVideo.height = TARGET_HEIGHT;
    const offVCtx = offVideo.getContext("2d", { willReadFrequently: true });
    
    let isHovered = false;
    let isExploding = false;
    let explosionForce = 0;
    let clickOriginX = 0;
    let clickOriginY = 0;

    webcamCanvas.addEventListener("mouseenter", () => isHovered = true);
    webcamCanvas.addEventListener("mouseleave", () => isHovered = false);
    
    webcamCanvas.addEventListener("click", e => {
      const rect = webcamCanvas.getBoundingClientRect();
      const scaleX = webcamCanvas.width / rect.width;
      const scaleY = webcamCanvas.height / rect.height;
      clickOriginX = (e.clientX - rect.left) * scaleX;
      clickOriginY = (e.clientY - rect.top) * scaleY;
      explosionForce = 1.0;
      isExploding = true;
    });

    function drawWebcam() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const minDim = Math.min(video.videoWidth, video.videoHeight);
        const sx = (video.videoWidth - minDim) / 2;
        const sy = (video.videoHeight - minDim) / 2;
        
        offVCtx.save();
        offVCtx.translate(TARGET_WIDTH, 0);
        offVCtx.scale(-1, 1);
        offVCtx.drawImage(video, sx, sy, minDim, minDim, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        offVCtx.restore();
        
        const pixels = offVCtx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT).data;
        
        wCtx.clearRect(0, 0, webcamCanvas.width, webcamCanvas.height);
        
        for (let y = 0; y < TARGET_HEIGHT; y++) {
          for (let x = 0; x < TARGET_WIDTH; x++) {
            const i = (y * TARGET_WIDTH + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const brightness = (r + g + b) / 3;
            let digit = Math.floor((brightness / 255) * 9);

            let fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            let offsetX = 0;
            let offsetY = 0;

            if (isHovered) {
              if (Math.random() > 0.95) digit = Math.floor(Math.random() * 9);
              if (Math.random() > 0.8) {
                fillStyle = Math.random() > 0.5 ? "var(--accent-1)" : "var(--accent-2)";
                offsetX = (Math.random() - 0.5) * 4;
                offsetY = (Math.random() - 0.5) * 4;
              } else {
                fillStyle = `rgb(${r}, ${g}, ${b})`; 
              }
            }

            if (explosionForce > 0) {
               const pixelX = x * CELL_SIZE;
               const pixelY = y * CELL_SIZE;
               const dx = pixelX - clickOriginX;
               const dy = pixelY - clickOriginY;
               const distance = Math.hypot(dx, dy);
               
               if (distance < 300 * explosionForce) {
                 const power = (300 * explosionForce - distance) / (300 * explosionForce);
                 offsetX += (dx / (distance || 1)) * power * 150 * explosionForce;
                 offsetY += (dy / (distance || 1)) * power * 150 * explosionForce;
                 fillStyle = Math.random() > 0.5 ? "var(--accent-1)" : (Math.random() > 0.5 ? "var(--accent-2)" : "#fff");
               }
            }

            wCtx.fillStyle = fillStyle;
            wCtx.font = `bold ${CELL_SIZE}px "JetBrains Mono", monospace`;
            wCtx.fillText(digit, x * CELL_SIZE + offsetX, y * CELL_SIZE + offsetY);
          }
        }
        
        if (explosionForce > 0) {
           explosionForce -= 0.035;
           if (explosionForce <= 0) isExploding = false;
        }
      }
      requestAnimationFrame(drawWebcam);
    }
    
    drawWebcam();

  } catch (err) {
    wCtx.fillStyle = "white";
    wCtx.font = "14px monospace";
    wCtx.fillText("Camera toegang geweigerd.", 10, 50);
    webcamCanvas.style.display = "block";
    startWebcamBtn.style.display = "none";
  }
});