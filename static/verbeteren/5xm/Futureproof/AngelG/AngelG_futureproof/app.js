const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const trashCount =
document.getElementById("trashCount");

const player = {
    x: 100,
    y: 100,
    size: 40,
    speed: 5
};

const monster = {
    x: 750,
    y: 450,
    size: 40,
    speed: 1.5
};

const keys = {};

const trash = [];
const flowers = [];
const particles = [];
const floatingTexts = [];

for(let i=0;i<20;i++){

    const icons = [
        "🥤",
        "📦",
        "🥫",
        "🧃"
    ];

    trash.push({
        x: Math.random()*800+30,
        y: Math.random()*500+30,
        icon:
        icons[
            Math.floor(
                Math.random()*icons.length
            )
        ]
    });
}

document.addEventListener(
    "keydown",
    e => keys[e.key] = true
);

document.addEventListener(
    "keyup",
    e => keys[e.key] = false
);

function spawnLeaves(){

    const container =
    document.getElementById("leaves");

    for(let i=0;i<25;i++){

        const leaf =
        document.createElement("div");

        leaf.className = "leaf";

        leaf.innerHTML =
        ["🍃","☘️","🍃"][
            Math.floor(
                Math.random()*3
            )
        ];

        leaf.style.left =
        Math.random()*100 + "%";

        leaf.style.animationDuration =
        (6 + Math.random()*10) + "s";

        leaf.style.animationDelay =
        Math.random()*10 + "s";

        leaf.style.fontSize =
        (18 + Math.random()*20) + "px";

        container.appendChild(leaf);
    }
}

spawnLeaves();

function createBurst(x,y){

    for(let i=0;i<20;i++){

        particles.push({

            x,
            y,

            dx:
            (Math.random()-0.5)*8,

            dy:
            (Math.random()-0.5)*8,

            life:60,

            emoji:"🍀"
        });
    }

    floatingTexts.push({
        x,
        y,
        text:"+10 CLEAN",
        life:60
    });

    canvas.style.transform =
    "scale(1.03)";

    setTimeout(()=>{
        canvas.style.transform =
        "scale(1)";
    },80);
}

function updatePlayer(){

    if(keys["ArrowUp"])
        player.y -= player.speed;

    if(keys["ArrowDown"])
        player.y += player.speed;

    if(keys["ArrowLeft"])
        player.x -= player.speed;

    if(keys["ArrowRight"])
        player.x += player.speed;

    player.x =
    Math.max(
        0,
        Math.min(
            canvas.width-player.size,
            player.x
        )
    );

    player.y =
    Math.max(
        0,
        Math.min(
            canvas.height-player.size,
            player.y
        )
    );
}

function updateMonster(){

    let dx =
    player.x - monster.x;

    let dy =
    player.y - monster.y;

    let distance =
    Math.hypot(dx,dy);

    if(distance > 0){

        monster.x +=
        dx / distance *
        monster.speed;

        monster.y +=
        dy / distance *
        monster.speed;
    }

    if(distance < 30){

        alert(
            "💀 The Plastic Monster got you!"
        );

        location.reload();
    }
}

function checkTrash(){

    for(let i=trash.length-1;i>=0;i--){

        const t = trash[i];

        const d =
        Math.hypot(
            player.x - t.x,
            player.y - t.y
        );

        if(d < 35){
if(d < 35){

    const gardenFlowers = [
        "🌼",
        "🌸",
        "🌷",
        "🪻",
        "🌺"
    ];

    flowers.push({
        x: t.x,
        y: t.y,
        flower: gardenFlowers[
            Math.floor(Math.random() * gardenFlowers.length)
        ]
    });

    createBurst(
        t.x,
        t.y
    );

    trash.splice(i,1);
}

            trash.splice(i,1);
        }
    }
}

function drawMonster(){

    ctx.fillStyle = "purple";

    ctx.fillRect(
        monster.x,
        monster.y,
        40,
        40
    );

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(
        monster.x+12,
        monster.y+12,
        5,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
        monster.x+28,
        monster.y+12,
        5,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.fillStyle = "red";

    ctx.fillRect(
        monster.x+10,
        monster.y+28,
        20,
        4
    );
}

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    flowers.forEach(f=>{

    ctx.font = "32px Arial";

    ctx.fillText(
        f.flower,
        f.x,
        f.y
    );
});

    trash.forEach(t=>{

        ctx.font="32px Arial";

        ctx.fillText(
            t.icon,
            t.x,
            t.y
        );
    });

    particles.forEach(p=>{

        ctx.font="24px Arial";

        ctx.fillText(
            p.emoji,
            p.x,
            p.y
        );

        p.x += p.dx;
        p.y += p.dy;

        p.life--;
    });

    floatingTexts.forEach(t=>{

        ctx.fillStyle =
        "gold";

        ctx.font =
        "20px Arial";

        ctx.fillText(
            t.text,
            t.x,
            t.y
        );

        t.y -= 1;
        t.life--;
    });

    ctx.font = "40px Arial";

    ctx.fillText(
        "🐝",
        player.x,
        player.y
    );

    drawMonster();

    trashCount.textContent =
    trash.length;

    if(trash.length === 0){

        ctx.fillStyle =
        "rgba(0,0,0,0.7)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle =
        "white";

        ctx.font =
        "60px Arial";

        ctx.fillText(
            "🍀 GARDEN SAVED! 🍀",
            120,
            300
        );
    }
}
function showEndScreen(message){
    gameOver = true;

    const overlay = document.getElementById("overlay");
    overlay.innerText = message;
    overlay.style.display = "flex";
}


function gameLoop(){

    updatePlayer();

    updateMonster();

    checkTrash();

    draw();

    requestAnimationFrame(
        gameLoop
    );
}

gameLoop();