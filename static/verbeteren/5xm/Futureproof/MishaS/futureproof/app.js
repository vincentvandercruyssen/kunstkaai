
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".toggle-label");
const imageBox = document.getElementById("image-box");
const stateLabel = imageBox.querySelector(".state-label");
const modalContainer = document.getElementById("modal-container");
const modalTitle = document.getElementById("modal-title");
const closeModalButton = document.querySelector(".modal-close");
const serviceButtons = document.querySelectorAll(".service-card, .donate-button");
const paymentForm = document.querySelector(".payment-form");

function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeLabel.textContent = isDark ? "Dark" : "Light";
    localStorage.setItem("greenroof-theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("greenroof-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeToggle.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark"));
});

imageBox.addEventListener("click", () => {
    const isAfter = imageBox.classList.toggle("is-after");
    imageBox.setAttribute("aria-pressed", String(isAfter));
    stateLabel.textContent = isAfter ? "After" : "Before";
    imageBox.querySelector("strong").textContent = isAfter ? "Living roof system" : "Click to transform";
});

function openModal(serviceName) {
    modalTitle.textContent = serviceName === "Donation"
        ? "Support green urban projects"
        : `Complete your ${serviceName} request`;
    modalContainer.classList.add("is-open");
    modalContainer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeModalButton.focus();
}

function closeModal() {
    modalContainer.classList.remove("is-open");
    modalContainer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

serviceButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.service));
});

closeModalButton.addEventListener("click", closeModal);

modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) closeModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalContainer.classList.contains("is-open")) closeModal();
    if (event.key === "Escape" && gameModal.classList.contains("is-open")) closeGame();
});

paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();
});



const GAME_DURATION = 60; 
const COOLDOWN_MS = 24 * 60 * 60 * 1000; 


const btnOpenGame = document.getElementById("btn-open-game");
const gameCooldownText = document.getElementById("game-cooldown-text");
const gameModal = document.getElementById("game-modal-container");
const btnCloseGame = document.getElementById("game-close-btn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startOverlay = document.getElementById("game-overlay");
const btnStartGame = document.getElementById("start-game-btn");
const uiTime = document.getElementById("game-time");
const uiSessionDiscount = document.getElementById("game-session-discount");


const activeDiscountBadge = document.getElementById("active-discount-badge");
const discountValueDisplay = document.getElementById("discount-value-display");


let isPlaying = false;
let animationId;
let gameTimer;
let timeLeft = GAME_DURATION;
let sessionDiscount = 0;


const lanes = [50, 200, 350]; 
let currentLaneIndex = 1;     
let playerY = 430;
let items = [];               
let dropSpeed = 3;
let spawnRate = 60;           
let frameCount = 0;

const IS_LOCAL = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);

function checkGameState() {
    const lastPlayed = localStorage.getItem("greenroof_last_played");
    const totalDiscount = parseInt(localStorage.getItem("greenroof_discount") || "0");

    if (totalDiscount > 0) {
        activeDiscountBadge.style.display = "inline-flex";
        discountValueDisplay.textContent = totalDiscount;
    }

    if (!IS_LOCAL && lastPlayed) {
        const timePassed = Date.now() - parseInt(lastPlayed);
        if (timePassed < COOLDOWN_MS) {
            btnOpenGame.disabled = true;
            const hoursLeft = Math.ceil((COOLDOWN_MS - timePassed) / (1000 * 60 * 60));
            gameCooldownText.textContent = `Next game available in ${hoursLeft} h.`;
            gameCooldownText.style.display = "block";
            return;
        }
    }

    btnOpenGame.disabled = false;
    gameCooldownText.style.display = "none";
}


btnOpenGame.addEventListener("click", () => {
    gameModal.classList.add("is-open");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    startOverlay.style.display = "flex";
    resetGameData();
    drawInitialState();
});


function closeGame() {
    gameModal.classList.remove("is-open");
    gameModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    stopGame();
}
btnCloseGame.addEventListener("click", closeGame);


btnStartGame.addEventListener("click", () => {
    startOverlay.style.display = "none";
    startGame();
});


document.addEventListener("keydown", (e) => {
    if (!isPlaying) return;
    if (e.key === "ArrowLeft" || e.key === "a") {
        if (currentLaneIndex > 0) currentLaneIndex--;
    } else if (e.key === "ArrowRight" || e.key === "d") {
        if (currentLaneIndex < lanes.length - 1) currentLaneIndex++;
    }
});

function resetGameData() {
    items = [];
    currentLaneIndex = 1;
    timeLeft = GAME_DURATION;
    sessionDiscount = 0;
    frameCount = 0;
    dropSpeed = 3;
    uiTime.textContent = timeLeft;
    uiSessionDiscount.textContent = sessionDiscount;
}

function startGame() {
    resetGameData();
    isPlaying = true;
    
    gameTimer = setInterval(() => {
        timeLeft--;
        uiTime.textContent = timeLeft;
        
        
        if (timeLeft % 15 === 0) dropSpeed += 0.5;

        if (timeLeft <= 0) endGame("time");
    }, 1000);

    gameLoop();
}

function stopGame() {
    isPlaying = false;
    cancelAnimationFrame(animationId);
    clearInterval(gameTimer);
}

function endGame(reason) {
    stopGame();
    
    
    localStorage.setItem("greenroof_last_played", Date.now().toString());
    const currentTotal = parseInt(localStorage.getItem("greenroof_discount") || "0");
    localStorage.setItem("greenroof_discount", (currentTotal + sessionDiscount).toString());
    
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px Inter";
    ctx.textAlign = "center";
    
    if (reason === "plastic") {
        ctx.fillText("Oops! You get some plastic.", canvas.width / 2, canvas.height / 2 - 20);
    } else {
        ctx.fillText("Time over!", canvas.width / 2, canvas.height / 2 - 20);
    }
    
    ctx.fillStyle = "#76c99d";
    ctx.fillText(`Sales collected: ${sessionDiscount}%`, canvas.width / 2, canvas.height / 2 + 20);
    
    setTimeout(() => {
        closeGame();
        checkGameState(); 
    }, 3000);
}

function spawnItem() {
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    const rand = Math.random();
    
    let type, emoji;
    if (rand < 0.2) {
        type = "plastic"; emoji = "🥤";
    } else if (rand < 0.3) {
        type = "discount"; emoji = "🏷️";
    } else if (rand < 0.65) {
        type = "water"; emoji = "💧";
    } else {
        type = "o2"; emoji = "🫧";
    }

    items.push({ x: lane, y: -40, type, emoji, width: 40, height: 40 });
}

function gameLoop() {
    if (!isPlaying) return;
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(133, 0); ctx.lineTo(133, canvas.height);
    ctx.moveTo(266, 0); ctx.lineTo(266, canvas.height);
    ctx.stroke();

    
    frameCount++;
    if (frameCount >= spawnRate) {
        spawnItem();
        frameCount = 0;
    }

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item.y += dropSpeed;

        
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.emoji, item.x, item.y);

        
        const playerX = lanes[currentLaneIndex];
        const hitBoxDist = Math.abs(item.x - playerX);
        
        if (item.y > playerY - 20 && item.y < playerY + 20 && hitBoxDist < 20) {
            if (item.type === "plastic") {
                endGame("plastic");
                return;
            } else if (item.type === "discount") {
                sessionDiscount += 1;
                uiSessionDiscount.textContent = sessionDiscount;
            }
            items.splice(i, 1);
            i--;
        } else if (item.y > canvas.height + 40) {
            items.splice(i, 1);
            i--;
        }
    }

    
    ctx.font = "50px Arial";
    ctx.fillText("🌳", lanes[currentLaneIndex], playerY);

    animationId = requestAnimationFrame(gameLoop);
}


function drawInitialState() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🌳", lanes[currentLaneIndex], playerY);
}


document.addEventListener("DOMContentLoaded", checkGameState);