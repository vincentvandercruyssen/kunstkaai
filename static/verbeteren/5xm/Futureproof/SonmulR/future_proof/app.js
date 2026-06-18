document.addEventListener("DOMContentLoaded", () => {
    
    const stateStart = document.getElementById("state-start");
    const stateActive = document.getElementById("state-active");
    const stateResult = document.getElementById("state-result");
    
    const btnStart = document.getElementById("btn-start-game");
    const btnReset = document.getElementById("btn-reset-game");
    
    const hudScore = document.getElementById("hud-score");
    const hudShield = document.getElementById("hud-shield");
    const valFinalScore = document.getElementById("val-final-score");
    const feedbackText = document.getElementById("game-feedback-text");
    

    const canvas = document.getElementById("arcadeCanvas");
    const ctx = canvas.getContext("2d");
    

    let score = 0;
    let shield = 100;
    let animationFrameId = null;
    let spawnTimer = 0;
    let baseSpeedModifier = 0; 
    

    let player = {
        x: canvas.width / 2 - 50,
        y: canvas.height - 35,
        width: 100, 
        height: 15,
        speed: 7,   
        movingLeft: false,
        movingRight: false
    };
    
    let fallingObjects = [];


    const itemsPool = [
        { label: "Top Fabric", scoreEffect: 10, damageEffect: 0, color: "#6B8F71", isBad: false },    // Sage Green
        { label: "Shoe Bottom", scoreEffect: 15, damageEffect: 0, color: "#CDBFA6", isBad: false },   // Sand Beige
        { label: "Soft Cushion", scoreEffect: 20, damageEffect: 0, color: "#53775D", isBad: false },  // Moss Green
        { label: "Toxic Trash", scoreEffect: 0, damageEffect: 25, color: "#555555", isBad: true },    // Charcoal Grey
        { label: "Harsh Glue", scoreEffect: 0, damageEffect: 25, color: "#884444", isBad: true }      // Soft Dark Red
    ];

    function switchState(targetState) {
        [stateStart, stateActive, stateResult].forEach(s => s.classList.remove("active"));
        targetState.classList.add("active");
    }


    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") player.movingLeft = true;
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") player.movingRight = true;
    });

    window.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") player.movingLeft = false;
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") player.movingRight = false;
    });


    function spawnFallingItem() {
        const index = Math.floor(Math.random() * itemsPool.length);
        const itemType = itemsPool[index];
        
        
        const finalSpeed = 1.8 + baseSpeedModifier; 

        fallingObjects.push({
            x: Math.random() * (canvas.width - 100) + 50,
            y: -25,
            width: 85,
            height: 24,
            speed: finalSpeed, 
            ...itemType
        });
    }


    function runGameLoop() {
        score = 0;
        shield = 100;
        fallingObjects = [];
        spawnTimer = 0;
        baseSpeedModifier = 0;
        player.x = canvas.width / 2 - (player.width / 2);
        
        hudScore.textContent = score;
        hudShield.textContent = shield;
        
        switchState(stateActive);
        
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        gameTick();
    }

    function gameTick() {
        if (player.movingLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (player.movingRight && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
   
        ctx.fillStyle = "#1E3D2F"; 
        ctx.beginPath();
        ctx.roundRect(player.x, player.y, player.width, player.height, 4);
        ctx.fill();
        ctx.strokeStyle = "#6B8F71";
        ctx.stroke();

       
        baseSpeedModifier = Math.floor(score / 50) * 0.5;

    
        spawnTimer++;
        const spawnPace = Math.max(40, 75 - Math.floor(score / 50) * 8);
        if (spawnTimer % spawnPace === 0) { 
            spawnFallingItem();
        }
      
        for (let i = fallingObjects.length - 1; i >= 0; i--) {
            let item = fallingObjects[i];
            item.y += item.speed;
            
            ctx.fillStyle = item.color;
            ctx.beginPath();
            ctx.roundRect(item.x - (item.width / 2), item.y, item.width, item.height, 4);
            ctx.fill();
            
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 10px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(item.label, item.x, item.y + 15);
            
          
            if (
                item.y + item.height >= player.y &&
                item.y <= player.y + player.height &&
                item.x + (item.width / 2) >= player.x &&
                item.x - (item.width / 2) <= player.x + player.width
            ) {
                if (item.isBad) {
                    shield = Math.max(0, shield - item.damageEffect);
                    hudShield.textContent = shield;
                } else {
                    score += item.scoreEffect;
                    hudScore.textContent = score;
                }
                fallingObjects.splice(i, 1);
                continue;
            }
            
            if (item.y > canvas.height) {
                fallingObjects.splice(i, 1);
            }
        }
        
        if (shield <= 0) {
            endGameSession();
        } else {
            animationFrameId = requestAnimationFrame(gameTick);
        }
    }

    
    function endGameSession() {
        cancelAnimationFrame(animationFrameId);
        valFinalScore.textContent = score;
        
        if (score >= 150) {
            feedbackText.textContent = `Amazing job! You caught the clean parts perfectly, even when they started falling fast. This shows how easy it is to reuse materials when shoe parts aren't glued together.`;
        } else {
            feedbackText.textContent = `Nice try! Regular shoes mix fabrics and plastics together with harsh glues, making them impossible to fix or recycle. RESOLE changes this by keeping everything simple and snap-on.`;
        }
        
        switchState(stateResult);
    }

    btnStart.addEventListener("click", runGameLoop);
    btnReset.addEventListener("click", runGameLoop); 
});