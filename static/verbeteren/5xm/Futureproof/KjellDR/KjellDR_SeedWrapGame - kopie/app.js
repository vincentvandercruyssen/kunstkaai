// app.js

const startBtn = document.getElementById("startBtn");

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

const dragItem = document.getElementById("dragItem");

const dropzones =
document.querySelectorAll(".dropzone");

const scoreText =
document.getElementById("score");

const timerText =
document.getElementById("timer");

const roundText =
document.getElementById("round");

const feedback =
document.getElementById("feedback");

const finalText =
document.getElementById("finalText");

const leaderboard =
document.getElementById("leaderboard");

const flash =
document.getElementById("flash");

const difficultyBtns =
document.querySelectorAll(".difficulty-btn");

const gardenPlants =
document.getElementById("gardenPlants");

let score = 0;
let round = 1;
let timer;
let timeLeft = 10;

let difficulty = "normal";

let canDrop = true;

/* ITEMS */

const items = [

{
    name:"🥤 Plastic Fles",
    type:"plastic",
    color:"#2B2B2B"
},

{
    name:"📦 Kartonnen Doos",
    type:"paper",
    color:"#A67C52"
},

{
    name:"🥫 Aluminium Blik",
    type:"metal",
    color:"#7D7D7D"
},

{
    name:"🌱 SeedWrap",
    type:"seedwrap",
    color:"linear-gradient(135deg,#2F6F4E,#92DB49)"
},

{
    name:"🍔 Fast Food Plastic",
    type:"plastic",
    color:"#444"
},

{
    name:"📄 Papier Zak",
    type:"paper",
    color:"#B58B57"
},

{
    name:"🥤 Frisdrank Blik",
    type:"metal",
    color:"#888"
},

{
    name:"🌿 Biologische Wrap",
    type:"seedwrap",
    color:"linear-gradient(135deg,#2F6F4E,#8DE969)"
}

];

/* DIFFICULTY */

difficultyBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        difficultyBtns.forEach(b =>
        b.classList.remove("active"));

        btn.classList.add("active");

        difficulty = btn.dataset.mode;

    });

});

/* START */

startBtn.addEventListener("click", () => {

    startScreen.classList.remove("active");
    gameScreen.classList.add("active");

    updateItem();

    startTimer();

});

/* DRAG */

dragItem.addEventListener("dragstart", () => {

    dragItem.classList.add("dragging");

});

dragItem.addEventListener("dragend", () => {

    dragItem.classList.remove("dragging");

});

/* DROP */

dropzones.forEach(zone => {

    zone.addEventListener("dragover", e => {

        e.preventDefault();

        zone.classList.add("hovered");

    });

    zone.addEventListener("dragleave", () => {

        zone.classList.remove("hovered");

    });

    zone.addEventListener("drop", () => {

        if(!canDrop) return;

        canDrop = false;

        zone.classList.remove("hovered");

        const itemType =
        dragItem.dataset.type;

        const zoneType =
        zone.dataset.accept;

        if(itemType === zoneType){

            correctAnswer();

        } else {

            wrongAnswer();

        }

        nextRound();

    });

});

/* CORRECT */

function correctAnswer(){

    score += 100 + (timeLeft * 5);

    feedback.innerHTML =
    "🌱 Correct gesorteerd!";

    feedback.className = "correct";

    scoreText.innerText = score;

    flash.classList.add("flash-green");

    setTimeout(() => {

        flash.classList.remove("flash-green");

    },250);

    spawnParticles();
    growPlant();

    if(
    dragItem.dataset.type ===
    "seedwrap"
    ){
        growGardenPlant();
    }
}

/* WRONG */

function wrongAnswer(){

    score -= 40;

    if(score < 0){
        score = 0;
    }

    feedback.innerHTML =
    "☠️ Verkeerde keuze!";

    feedback.className = "wrong";

    scoreText.innerText = score;

    flash.classList.add("flash-red");

    setTimeout(() => {

        flash.classList.remove("flash-red");

    },250);
}

/* TIMER */

function startTimer(){

    clearInterval(timer);

    if(difficulty === "easy"){
        timeLeft = 14;
    }

    if(difficulty === "normal"){
        timeLeft = 10;
    }

    if(difficulty === "hard"){
        timeLeft = 6;
    }

    timerText.innerText = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerText.innerText = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            wrongAnswer();

            nextRound();
        }

    },1000);
}

/* NEXT ROUND */

function nextRound(){

    clearInterval(timer);

    round++;

    if(round > 10){

        endGame();
        return;
    }

    roundText.innerText = round;

    setTimeout(() => {

        canDrop = true;

        feedback.innerHTML = "";

        updateItem();

        startTimer();

    },1000);
}

/* UPDATE ITEM */

function updateItem(){

    const random =
    items[Math.floor(Math.random()*items.length)];

    dragItem.innerHTML = random.name;

    dragItem.dataset.type = random.type;

    dragItem.style.background = random.color;
}

/* PARTICLES */

function spawnParticles(){

    for(let i=0;i<20;i++){

        const particle =
        document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
        Math.random()*100 + "%";

        particle.style.top =
        Math.random()*100 + "%";

        document.body.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        },2000);
    }
}

/* GROW */

function growPlant(){

    const plant =
    document.createElement("div");

    plant.classList.add("plant-grow");

    plant.innerHTML = "🌱";

    document.body.appendChild(plant);

    setTimeout(() => {

        plant.remove();

    },2000);
}

/* GARDEN */

function growGardenPlant(){

    const plant =
    document.createElement("div");

    plant.classList.add("garden-plant");

    const plants = [
        "🌱",
        "🌿",
        "🍀",
        "🌾",
        "🪴"
    ];

    plant.innerHTML =
    plants[
        Math.floor(
        Math.random()*plants.length
        )
    ];

    plant.style.left =
    Math.random()*80 + "%";

    gardenPlants.appendChild(plant);

}

/* END */

function endGame(){

    gameScreen.classList.remove("active");
    endScreen.classList.add("active");

    finalText.innerHTML =
    `Je behaalde <strong>${score}</strong> eco punten 🌱`;

    saveLeaderboard(score);

    renderLeaderboard();
}

/* LEADERBOARD */

function saveLeaderboard(score){

    let scores =
    JSON.parse(localStorage.getItem("seedwrapScores"))
    || [];

    scores.push(score);

    scores.sort((a,b)=>b-a);

    scores = scores.slice(0,5);

    localStorage.setItem(
        "seedwrapScores",
        JSON.stringify(scores)
    );
}

function renderLeaderboard(){

    let scores =
    JSON.parse(localStorage.getItem("seedwrapScores"))
    || [];

    leaderboard.innerHTML = "";

    scores.forEach((score,index)=>{

        leaderboard.innerHTML +=
        `<li>#${index+1} — ${score} punten</li>`;

    });
}