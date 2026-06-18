const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// UI Elementen
const scoreEl = document.getElementById("score");
const inventoryEl = document.getElementById("inventory");
const coinsEl = document.getElementById("coins");
const worldNameEl = document.getElementById("world-name");
const timerEl = document.getElementById("timer");
const timerBox = document.getElementById("timer-box");

// Schermen
const startScreen = document.getElementById("start-screen");
const durationScreen = document.getElementById("duration-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const shopScreen = document.getElementById("shop-screen");
const scoreboardScreen = document.getElementById("scoreboard-screen");
const shopMsg = document.getElementById("shop-message");

const hatsShopEl = document.getElementById("hats-shop");
const worldsShopEl = document.getElementById("worlds-shop");
const scoresListEl = document.getElementById("scores-list");
const finalScoreEl = document.getElementById("final-score");

// --- DATA & STATE ---
let gameState = "start"; // start, playing, shop, gameover, scoreboard
let gameMode = "classic"; // classic of timed
let timeLeft = 0;
let timerInterval = null;

let score = 0;
let coins = 0;
let currentWorld = 1; 
let unlockedWorlds = [1]; 

// Vernieuwde Hoedjes met Powers & Realistische prijzen
const hats = [
  { id: 'red', icon: '🤠', name: 'Rood Hoedje', price: 45, owned: false, color: '#c0392b', power: 'speed', desc: '⚡ Snelheid +45%' },
  { id: 'blue', icon: '🧢', name: 'Blauwe Pet', price: 90, owned: false, color: '#2980b9', power: 'magnet', desc: '🧲 Magneetveld' },
  { id: 'crown', icon: '👑', name: 'Gouden Kroon', price: 250, owned: false, color: '#f1c40f', power: 'god', desc: '🌟 Snelheid + Magneet + 2x Coins!' }
];
let equippedHat = null;

// Werelden Configuraties
const worldConfigs = {
  1: { name: 'Bos 🌲', price: 0, ground0: '#48b369', ground1: '#1b6e35', dot: 'rgba(255,255,255,0.06)', bush0: '#58d68d', bush1: '#145a32', tree0: '#2ecc71', tree1: '#1b4f72' },
  2: { name: 'Woestijn 🏜️', price: 40, ground0: '#f5cba7', ground1: '#d35400', dot: 'rgba(0,0,0,0.04)', bush0: '#e59866', bush1: '#6e2c00', tree0: '#f4d03f', tree1: '#784212' },
  3: { name: 'Noordpool ⛄', price: 80, ground0: '#eaeded', ground1: '#bcc6cc', dot: 'rgba(255,255,255,0.4)', bush0: '#d4e6f1', bush1: '#7fb3d5', tree0: '#a9cce3', tree1: '#2980b9' }
};

const portals = [
  { worldId: 1, x: 200, y: 150, color: '#2ecc71', name: 'Portaal: Bos' },
  { worldId: 2, x: 450, y: 150, color: '#e67e22', name: 'Portaal: Woestijn' },
  { worldId: 3, x: 700, y: 150, color: '#3498db', name: 'Portaal: Noordpool' }
];

const world = { width: 3000, height: 2000 };
const camera = { x: 0, y: 0 };
const player = { x: 300, y: 300, size: 36, baseSpeed: 3.5, carrying: 0, isHidden: false, isMoving: false };
const bin = { x: world.width - 300, y: world.height - 300, width: 75, height: 95 };

const bottles = [];
const maxBottles = 18;
const trees = [];
const bushes = [];
const keys = {};

// --- HIGH SCORES ---
let highscores = JSON.parse(localStorage.getItem('plastic3DHighscores')) || [];

function saveScore() {
  if (score > 0) {
    const modeText = gameMode === 'classic' ? 'Klassiek' : 'Tijdrit';
    highscores.push({ score: score, mode: modeText, date: new Date().toLocaleDateString() });
    highscores.sort((a, b) => b.score - a.score);
    highscores = highscores.slice(0, 5);
    localStorage.setItem('plastic3DHighscores', JSON.stringify(highscores));
    renderScoreboard();
    alert("Score succesvol opgeslagen! 🏆");
  } else {
    alert("Verzamel eerst wat plastic!");
  }
}

function renderScoreboard() {
  scoresListEl.innerHTML = "";
  if (highscores.length === 0) {
    scoresListEl.innerHTML = "<p>Nog geen highscores.</p>";
  } else {
    const ol = document.createElement('ol');
    highscores.forEach(s => {
      const li = document.createElement('li');
      li.textContent = `${s.score} ptn - ${s.mode} (${s.date})`;
      ol.appendChild(li);
    });
    scoresListEl.appendChild(ol);
  }
}

// --- WINKEL ---
function renderShop() {
  hatsShopEl.innerHTML = "";
  worldsShopEl.innerHTML = "";

  hats.forEach(hat => {
    const div = document.createElement("div");
    div.className = "shop-item";
    let btnHTML = "";
    if (!hat.owned) {
      btnHTML = `<button onclick="buyHat('${hat.id}')" style="background:#3498db;">Koop (${hat.price}💰)</button>`;
    } else if (equippedHat === hat.id) {
      btnHTML = `<button onclick="unequipHat()" style="background:#e74c3c;">Uitdoen</button>`;
    } else {
      btnHTML = `<button onclick="equipHat('${hat.id}')" style="background:#2ecc71;">Aandoen</button>`;
    }
    div.innerHTML = `<p>${hat.icon} ${hat.name}</p><span>${hat.desc}</span>${btnHTML}`;
    hatsShopEl.appendChild(div);
  });

  Object.keys(worldConfigs).forEach(id => {
    const wId = parseInt(id); if (wId === 1) return;
    const w = worldConfigs[wId];
    const div = document.createElement("div");
    div.className = "shop-item";
    if (unlockedWorlds.includes(wId)) {
      div.innerHTML = `<p>${w.name}</p><button disabled>Vrijgegeven</button>`;
    } else {
      div.innerHTML = `<p>${w.name}</p><button onclick="buyWorld(${wId})" style="background:#9b59b6;">Koop (${w.price}💰)</button>`;
    }
    worldsShopEl.appendChild(div);
  });
}

window.buyHat = function(id) {
  const hat = hats.find(h => h.id === id);
  if (coins >= hat.price) {
    coins -= hat.price; hat.owned = true; equippedHat = hat.id;
    shopMsg.textContent = `${hat.name} geactiveerd! ⚡`;
    updateUI(); renderShop();
  } else { shopMsg.textContent = "Je hebt te weinig munten! 😢"; }
};
window.equipHat = function(id) { equippedHat = id; shopMsg.textContent = "Hoed gewisseld!"; renderShop(); };
window.unequipHat = function() { equippedHat = null; shopMsg.textContent = "Hoed afgezet."; renderShop(); };
window.buyWorld = function(wId) {
  const w = worldConfigs[wId];
  if (coins >= w.price) {
    coins -= w.price; unlockedWorlds.push(wId);
    shopMsg.textContent = `${w.name} gekocht! Zoek het portaal op de kaart.`;
    updateUI(); renderShop();
  } else { shopMsg.textContent = "Onvoldoende munten! 😢"; }
};

// --- GAME MODE TRIGGERS ---
document.getElementById("mode-classic-btn").addEventListener("click", () => {
  gameMode = "classic";
  timerBox.style.display = "none";
  startScreen.style.display = "none";
  gameState = "playing";
});

document.getElementById("mode-timed-btn").addEventListener("click", () => {
  startScreen.style.display = "none";
  durationScreen.style.display = "flex";
});

document.getElementById("back-to-modes-btn").addEventListener("click", () => {
  durationScreen.style.display = "none";
  startScreen.style.display = "flex";
});

window.startTimedGame = function(seconds) {
  gameMode = "timed";
  timeLeft = seconds;
  score = 0; player.carrying = 0;
  updateUI();
  timerEl.textContent = timeLeft;
  timerBox.style.display = "flex";
  durationScreen.style.display = "none";
  gameState = "playing";

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (gameState === "playing") {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) endTimedGame();
    }
  }, 1000);
};

function endTimedGame() {
  gameState = "gameover";
  clearInterval(timerInterval);
  finalScoreEl.textContent = score;
  gameOverScreen.style.display = "flex";
}

document.getElementById("restart-game-btn").addEventListener("click", () => {
  gameOverScreen.style.display = "none";
  startScreen.style.display = "flex";
});
document.getElementById("go-save-score-btn").addEventListener("click", () => {
  saveScore();
});

// Algemene Knoppen
document.getElementById("shop-btn").addEventListener("click", () => {
  if(gameState === "playing") { gameState = "shop"; renderShop(); shopMsg.textContent=""; shopScreen.style.display = "flex"; }
});
document.getElementById("close-shop-btn").addEventListener("click", () => { gameState = "playing"; shopScreen.style.display = "none"; });
document.getElementById("scoreboard-btn").addEventListener("click", () => { if(gameState === "playing") { gameState = "scoreboard"; renderScoreboard(); scoreboardScreen.style.display = "flex"; }});
document.getElementById("close-scoreboard-btn").addEventListener("click", () => { gameState = "playing"; scoreboardScreen.style.display = "none"; });
document.getElementById("save-score-btn").addEventListener("click", saveScore);

window.addEventListener("keydown", (e) => { keys[e.key] = true; });
window.addEventListener("keyup", (e) => { keys[e.key] = false; });

// --- MECHANICS ---
function rand(min, max) { return Math.random() * (max - min) + min; }
function updateUI() { scoreEl.textContent = score; coinsEl.textContent = coins; inventoryEl.textContent = player.carrying; worldNameEl.textContent = worldConfigs[currentWorld].name; }
function spawnBottle() { bottles.push({ x: rand(100, world.width - 100), y: rand(100, world.height - 100), width: 16, height: 24 }); }
function generateFlora() {
  trees.length = 0; bushes.length = 0;
  for (let i = 0; i < 120; i++) trees.push({ x: rand(100, world.width - 100), y: rand(100, world.height - 100), size: rand(40, 65) });
  for (let i = 0; i < 55; i++) bushes.push({ x: rand(100, world.width - 100), y: rand(100, world.height - 100), size: rand(45, 70) });
}
function collision(a, b) { return (a.x < b.x + b.width && a.x + a.size > b.x && a.y < b.y + b.height && a.y + a.size > b.y); }

// Plaats de vuilbak op een veilige, willekeurige plek binnen de wereldgrenzen
function relocateBin() {
  // Houd marges zodat de bak niet buiten beeld of te dicht bij randen verschijnt
  const margin = 100;
  bin.x = Math.max(margin, Math.min(world.width - bin.width - margin, rand(margin, world.width - bin.width - margin)));
  bin.y = Math.max(margin, Math.min(world.height - bin.height - margin, rand(margin, world.height - bin.height - margin)));
}

function checkTreeCollision(targetX, targetY) {
  const pCenterX = targetX + player.size / 2;
  const pCenterY = targetY + player.size / 2;
  for (let tree of trees) {
    let dx = pCenterX - tree.x;
    let dy = pCenterY - tree.y;
    if (Math.sqrt(dx * dx + dy * dy) < (player.size / 2 + 12)) return true; // Stam radius check
  }
  return false;
}

generateFlora();
for (let i = 0; i < maxBottles; i++) spawnBottle();

function update() {
  if (gameState !== "playing") return;

  // 1. Bereken snelheid op basis van hoedjeskracht
  let currentSpeed = player.baseSpeed;
  if (equippedHat === 'red') currentSpeed = 5.2; // Rood hoedje rent supersnel
  if (equippedHat === 'crown') currentSpeed = 4.8; // Kroon is snel én magnetisch

  let nextX = player.x, nextY = player.y;
  player.isMoving = false;

  if (keys["ArrowLeft"])  { nextX -= currentSpeed; player.isMoving = true; }
  if (keys["ArrowRight"]) { nextX += currentSpeed; player.isMoving = true; }
  if (keys["ArrowUp"])    { nextY -= currentSpeed; player.isMoving = true; }
  if (keys["ArrowDown"])  { nextY += currentSpeed; player.isMoving = true; }

  nextX = Math.max(0, Math.min(world.width - player.size, nextX));
  nextY = Math.max(0, Math.min(world.height - player.size, nextY));

  if (!checkTreeCollision(nextX, player.y)) player.x = nextX;
  if (!checkTreeCollision(player.x, nextY)) player.y = nextY;

  let pCenterX = player.x + player.size / 2, pCenterY = player.y + player.size / 2;

  // 2. MAGNEET KRACHT (Blauwe pet of Kroon)
  if (equippedHat === 'blue' || equippedHat === 'crown') {
    bottles.forEach(b => {
      let bCenterX = b.x + b.width / 2;
      let bCenterY = b.y + b.height / 2;
      let dx = pCenterX - bCenterX;
      let dy = pCenterY - bCenterY;
      let dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 160) { // Trekstraal van 160 pixels
        b.x += (dx / dist) * 4.5;
        b.y += (dy / dist) * 4.5;
      }
    });
  }

  // Struik check
  player.isHidden = false;
  for (let bush of bushes) {
    let dx = pCenterX - bush.x, dy = pCenterY - bush.y;
    if (Math.sqrt(dx * dx + dy * dy) < bush.size - 5) { player.isHidden = true; break; }
  }

  // Flessen pakken
  for (let i = bottles.length - 1; i >= 0; i--) {
    if (collision(player, bottles[i])) {
      bottles.splice(i, 1);
      player.carrying++;
      updateUI();
    }
  }
  while (bottles.length < maxBottles) spawnBottle();

  // Inleveren bij vuilbak
  if (collision(player, { x: bin.x, y: bin.y, width: bin.width, height: bin.height })) {
    if (player.carrying > 0) {
      // Gouden kroon geeft 2x munten!
      let multiplier = (equippedHat === 'crown') ? 2 : 1;
      
      score += player.carrying;
      coins += player.carrying * multiplier;
      player.carrying = 0;
      updateUI();
      relocateBin();
    }
  }

  // Portalen checken
  portals.forEach(portal => {
    if (currentWorld !== portal.worldId && unlockedWorlds.includes(portal.worldId)) {
      let dist = Math.sqrt(Math.pow(pCenterX - portal.x, 2) + Math.pow(pCenterY - portal.y, 2));
      if (dist < 40) {
        currentWorld = portal.worldId;
        generateFlora();
        updateUI();
        player.y += 70; // Voorkom direct terug teleporteren
      }
    }
  });

  // Vloeiende camera
  camera.x += ((player.x - canvas.width / 2) - camera.x) * 0.08;
  camera.y += ((player.y - canvas.height / 2) - camera.y) * 0.08;
}

// --- ADVANCED 3D RENDERING ---
function drawGround() {
  const cfg = worldConfigs[currentWorld];
  const gradient = ctx.createLinearGradient(0, 0, 0, world.height);
  gradient.addColorStop(0, cfg.ground0);
  gradient.addColorStop(1, cfg.ground1);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.fillStyle = cfg.dot;
  for (let i = 0; i < 250; i++) ctx.fillRect((i * 131) % world.width, (i * 223) % world.height, 3, 3);
}

function drawPortals() {
  const pulse = Math.sin(Date.now() * 0.004) * 6;
  portals.forEach(portal => {
    if (currentWorld !== portal.worldId && unlockedWorlds.includes(portal.worldId)) {
      ctx.save();
      // 3D Gradiënt gloed om het portaal heen
      const grad = ctx.createRadialGradient(portal.x, portal.y, 5, portal.x, portal.y, 45 + pulse);
      grad.addColorStop(0, "rgba(255,255,255,0.7)");
      grad.addColorStop(0.4, portal.color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(portal.x, portal.y, 45 + pulse, 0, Math.PI * 2); ctx.fill();

      // Roterende vortex kern
      ctx.fillStyle = "#111";
      ctx.beginPath(); ctx.ellipse(portal.x, portal.y, 18, 32 + pulse/2, (Date.now()*0.002), 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "white"; ctx.font = "bold 13px Segoe UI"; ctx.textAlign = "center";
      ctx.fillText(portal.name, portal.x, portal.y - 48);
      ctx.restore();
    }
  });
}

function drawBushes() {
  const cfg = worldConfigs[currentWorld];
  bushes.forEach(bush => {
    ctx.save();
    // Schuine 3D grondschaduw
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath(); ctx.ellipse(bush.x + 8, bush.y + 12, bush.size * 0.9, bush.size * 0.55, 0, 0, Math.PI * 2); ctx.fill();

    // Bolle struik met radiale schaduw
    const grad = ctx.createRadialGradient(bush.x - bush.size/3, bush.y - bush.size/3, 5, bush.x, bush.y, bush.size);
    grad.addColorStop(0, cfg.bush0); grad.addColorStop(1, cfg.bush1);
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(bush.x, bush.y, bush.size, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  });
}

function drawTrees() {
  const cfg = worldConfigs[currentWorld];
  trees.forEach(tree => {
    ctx.save();
    // Grote 3D Grondschaduw weggesmeerd naar rechtsonder
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath(); ctx.ellipse(tree.x + 15, tree.y + 25, tree.size * 0.8, tree.size * 0.45, 0, 0, Math.PI * 2); ctx.fill();

    // 3D Cilindrische boomstam met diepteverloop
    const trunkGrad = ctx.createLinearGradient(tree.x - 8, 0, tree.x + 8, 0);
    trunkGrad.addColorStop(0, "#4a3319"); trunkGrad.addColorStop(0.4, "#6e4726"); trunkGrad.addColorStop(1, "#2b1e10");
    ctx.fillStyle = trunkGrad; ctx.fillRect(tree.x - 8, tree.y, 16, 40);

    // MEERDERE REEKSEN BLADERLAGEN VOOR EEN ECHT 3D EFFECT (Canopy Layers)
    // Onderste/Donkerste laag
    let g1 = ctx.createRadialGradient(tree.x - 5, tree.y - 15, 10, tree.x, tree.y - 5, tree.size);
    g1.addColorStop(0, cfg.tree0); g1.addColorStop(1, cfg.tree1);
    ctx.fillStyle = g1; ctx.beginPath(); ctx.arc(tree.x, tree.y - 5, tree.size, 0, Math.PI * 2); ctx.fill();

    // Middelste hoogtelaag (kleiner en verschoven voor diepte)
    ctx.fillStyle = cfg.tree0;
    ctx.beginPath(); ctx.arc(tree.x - 4, tree.y - 18, tree.size * 0.75, 0, Math.PI * 2); ctx.fill();

    // Bovenste highlight laag (Zonlicht kant)
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.arc(tree.x - 8, tree.y - 24, tree.size * 0.4, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  });
}

function drawPlayer() {
  ctx.save();
  const centerX = player.x + player.size / 2;
  if (player.isHidden) ctx.globalAlpha = 0.25;

  // 1. Visueel Magneetveld om speler heen tekenen bij actieve power
  if (equippedHat === 'blue' || equippedHat === 'crown') {
    ctx.strokeStyle = "rgba(52, 152, 219, " + (0.15 + Math.sin(Date.now()*0.01)*0.05) + ")";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(centerX, player.y + player.size/2, 160, 0, Math.PI*2); ctx.stroke();
  }

  // 3D Grondschaduw van de speler
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath(); ctx.ellipse(centerX + 4, player.y + player.size, 16, 6, 0, 0, Math.PI * 2); ctx.fill();

  const swing = player.isMoving ? Math.sin(Date.now() * 0.016) * 11 : 0;

  // Benen
  ctx.strokeStyle = "#1b2a47"; ctx.lineWidth = 5.5; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(centerX - 6, player.y + player.size - 10); ctx.lineTo(centerX - 6, player.y + player.size + swing); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(centerX + 6, player.y + player.size - 10); ctx.lineTo(centerX + 6, player.y + player.size - swing); ctx.stroke();

  // Armen
  ctx.strokeStyle = "#f5cba7"; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(centerX - 13, player.y + 12); ctx.lineTo(centerX - 19, player.y + 22 - swing); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(centerX + 13, player.y + 12); ctx.lineTo(centerX + 18, player.y + 22 + swing); ctx.stroke();

  // Lichaam (3D Shaded T-shirt)
  const bodyGrad = ctx.createLinearGradient(player.x, player.y, player.x + player.size, player.y);
  bodyGrad.addColorStop(0, "#2980b9"); bodyGrad.addColorStop(0.7, "#3498db"); bodyGrad.addColorStop(1, "#1c4f72");
  ctx.fillStyle = bodyGrad; ctx.fillRect(centerX - 11, player.y + 6, 22, 20);

  // Hoofd
  ctx.fillStyle = "#f5cba7";
  ctx.beginPath(); ctx.arc(centerX, player.y, 10, 0, Math.PI * 2); ctx.fill();

  // Hoedjes met specifieke 3D renders
  if (equippedHat) {
    const activeHat = hats.find(h => h.id === equippedHat);
    ctx.fillStyle = activeHat.color;
    
    if (activeHat.id === 'crown') {
      // 3D Gouden Kroon met schaduwen
      ctx.fillStyle = "#f1c40f";
      ctx.beginPath();
      ctx.moveTo(centerX - 11, player.y - 5); ctx.lineTo(centerX + 11, player.y - 5);
      ctx.lineTo(centerX + 14, player.y - 19); ctx.lineTo(centerX + 5, player.y - 10);
      ctx.lineTo(centerX, player.y - 23); ctx.lineTo(centerX - 5, player.y - 10);
      ctx.lineTo(centerX - 14, player.y - 19); ctx.closePath(); ctx.fill();
      // Kroon juweeltje
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath(); ctx.arc(centerX, player.y - 10, 3, 0, Math.PI*2); ctx.fill();
    } else {
      // Pet / Hoed met 3D klep
      ctx.fillStyle = activeHat.color;
      ctx.fillRect(centerX - 16, player.y - 12, 32, 5); // Rand
      ctx.fillStyle = "rgba(0,0,0,0.15)"; // Schaduw breking op de pet
      ctx.fillRect(centerX - 10, player.y - 21, 20, 9);
      ctx.fillStyle = activeHat.color;
      ctx.fillRect(centerX - 10, player.y - 21, 17, 9); // Hoofdband bovenkant
    }
  }

  // Rugzak aanduiding flessen
  if (player.carrying > 0) {
    ctx.fillStyle = "#00ddff"; ctx.font = "bold 12px Arial"; ctx.textAlign = "center";
    ctx.fillText("🍾 x" + player.carrying, centerX, player.y - 16);
  }
  ctx.restore();
}

function drawBottles() {
  bottles.forEach(b => {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(b.x + 4, b.y + 6, b.width, b.height); // Schaduw

    const grad = ctx.createLinearGradient(b.x, b.y, b.x + b.width, b.y);
    grad.addColorStop(0, "#aed6f1"); grad.addColorStop(0.5, "#3498db"); grad.addColorStop(1, "#21618c");
    ctx.fillStyle = grad; ctx.fillRect(b.x, b.y, b.width, b.height); // Plastic fles cylinder look

    ctx.fillStyle = "white"; ctx.fillRect(b.x + 1, b.y + 7, b.width - 2, 5); // Etiket
    ctx.fillStyle = "#e74c3c"; ctx.fillRect(b.x + 4, b.y - 4, b.width - 8, 4); // Dopje
    ctx.restore();
  });
}

function drawBin() {
  ctx.save();
  // Grote schuine schaduw achterkant
  ctx.fillStyle = "rgba(0,0,0,0.32)"; ctx.fillRect(bin.x + 8, bin.y + 12, bin.width, bin.height);

  // 3D Behuizing met diep kleurverloop
  const grad = ctx.createLinearGradient(bin.x, bin.y, bin.x + bin.width, bin.y);
  grad.addColorStop(0, "#566573"); grad.addColorStop(0.7, "#2c3e50"); grad.addColorStop(1, "#1c2833");
  ctx.fillStyle = grad; ctx.fillRect(bin.x, bin.y, bin.width, bin.height);

  // 3D Bovenrand klep
  ctx.fillStyle = "#27ae60"; ctx.fillRect(bin.x - 4, bin.y - 8, bin.width + 8, 14);
  ctx.fillStyle = "#1e8449"; ctx.fillRect(bin.x - 4, bin.y + 2, bin.width + 8, 4);

  ctx.fillStyle = "white"; ctx.font = "bold 12px Segoe UI"; ctx.textAlign = "center";
  ctx.fillText("♻️ RECYCLE", bin.x + bin.width/2, bin.y + 52);
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  drawGround();
  drawPortals();
  drawBushes();
  drawBottles();
  drawBin();
  drawPlayer();
  drawTrees(); // Bomen overlappen alles wegens hoogte

  ctx.restore();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

updateUI();
loop();
