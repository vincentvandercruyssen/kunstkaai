const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameRunning = false;
let score = 0;
let energy = 100;
let batteriesCollected = 0;
let speed = 4;
let highScore = localStorage.getItem("pedalRushHighScore") || 0;

const lanes = [200, 400, 600];
let playerLane = 1;
let playerY = 380;

let obstacles = [];
let collectibles = [];
let lastObstacleSpawn = 0;

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);
document.getElementById("rulesBtn").addEventListener("click", showRules);
document.getElementById("closeRules").addEventListener("click", hideRules);

document.getElementById("bestScore").textContent = highScore;

// Controls
window.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && playerLane > 0) playerLane--;
  if (e.key === "ArrowRight" && playerLane < 2) playerLane++;
  if (e.key === " " && gameRunning) energy = Math.min(100, energy + 18); // sterkere boost
});

canvas.addEventListener("click", (e) => {
  if (!gameRunning) return;
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  if (clickX < 400 && playerLane > 0) playerLane--;
  if (clickX > 400 && playerLane < 2) playerLane++;
});

function startGame() {
  score = 0;
  energy = 100;
  batteriesCollected = 0;
  obstacles = [];
  collectibles = [];
  speed = 4;
  lastObstacleSpawn = Date.now();
  gameRunning = true;
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameOverScreen").classList.add("hidden");
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  gameRunning = false;
  
  if (score > highScore) {
    highScore = Math.floor(score);
    localStorage.setItem("pedalRushHighScore", highScore);
    document.getElementById("bestScore").textContent = highScore;
  }

  document.getElementById("finalScore").innerHTML = `
    Afstand: ${Math.floor(score)} meter<br>
    Batterijen verzameld: ${batteriesCollected}<br>
    <strong>${Math.floor(batteriesCollected * 8)}% telefoon opgeladen!</strong>
  `;
  document.getElementById("gameOverScreen").classList.remove("hidden");
}

function showRules() {
  document.getElementById("rulesModal").classList.remove("hidden");
}

function hideRules() {
  document.getElementById("rulesModal").classList.add("hidden");
}

function spawnObstacle() {
  const now = Date.now();
  if (now - lastObstacleSpawn < 700) return;

  if (Math.random() < 0.018) {
    const occupied = new Set();
    obstacles.forEach(obs => {
      if (obs.y > -30 && obs.y < 380) {
        occupied.add(Math.round((obs.x - 200) / 200));
      }
    });

    if (occupied.size >= 2) return;

    let lane;
    do {
      lane = Math.floor(Math.random() * 3);
    } while (occupied.has(lane));

    obstacles.push({ x: lanes[lane], y: -70, width: 65, height: 55 });
    lastObstacleSpawn = now;
  }
}

function spawnCollectible() {
  if (Math.random() < 0.017) {
    const lane = Math.floor(Math.random() * 3);
    collectibles.push({ x: lanes[lane], y: -50, width: 45, height: 55 });
  }
}

function update() {
  score += 0.6;
  speed = 4 + Math.floor(score / 850);

  energy -= 0.095;        
  if (energy <= 0) gameOver();

  spawnObstacle();
  spawnCollectible();

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].y += speed;
    if (obstacles[i].y > 550) obstacles.splice(i, 1);
  }

  for (let i = collectibles.length - 1; i >= 0; i--) {
    collectibles[i].y += speed;
    if (collectibles[i].y > 550) collectibles.splice(i, 1);
  }

  const playerX = lanes[playerLane];

  for (let obs of obstacles) {
    if (Math.abs(obs.x - playerX) < 48 && Math.abs(obs.y - playerY) < 58) {
      gameOver();
    }
  }

  for (let i = collectibles.length - 1; i >= 0; i--) {
    const c = collectibles[i];
    if (Math.abs(c.x - playerX) < 55 && Math.abs(c.y - playerY) < 65) {
      batteriesCollected++;
      energy = Math.min(100, energy + 26);   // iets sterkere boost
      collectibles.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#4ade80";
  ctx.lineWidth = 10;
  for (let i = -100; i < 600; i += 70) {
    ctx.beginPath();
    ctx.moveTo(380, i + (Date.now() / 4) % 70);
    ctx.lineTo(380, i + 50 + (Date.now() / 4) % 70);
    ctx.stroke();
  }

  const px = lanes[playerLane];
  ctx.fillStyle = "#4ade80";
  ctx.fillRect(px - 32, playerY, 65, 35);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(px - 22, playerY - 25, 45, 30);

  ctx.fillStyle = "#ef4444";
  for (let obs of obstacles) {
    ctx.fillRect(obs.x - 32, obs.y, 65, 55);
  }

  ctx.fillStyle = "#22d3ee";
  for (let c of collectibles) {
    ctx.fillRect(c.x - 22, c.y, 45, 55);
    ctx.fillStyle = "#111";
    ctx.fillRect(c.x - 12, c.y + 12, 25, 32);
    ctx.fillStyle = "#22d3ee";
  }

  ctx.fillStyle = "white";
  ctx.font = "bold 26px Arial";
  ctx.fillText(`Afstand: ${Math.floor(score)}m`, 30, 50);
}

function gameLoop() {
  if (!gameRunning) return;
  
  update();
  draw();

  document.getElementById("distance").textContent = Math.floor(score);
  document.getElementById("energy").style.width = Math.max(0, energy) + "%";
  document.getElementById("batteries").textContent = batteriesCollected;

  requestAnimationFrame(gameLoop);
}