let coder;
let platforms = [];
let enemies = [];
let gameOver = false;
let gameWon = false;
let video;
let poseNet;
let handposeModel;
let poses = [];
let handPredictions = [];
let score = 0;
let level = 1;
let stage = 1;
let levelComplete = false;
let modelReady = false;
let handModelReady = false;
let lastMoveCmd = 'Stand';
let jumpSignal = false;
let restartSignal = false;
let checkpoint;
let gameOverTime = 0;
let autoRestartCountdown = 0;

// Check if all libraries are loaded
function checkLibraries() {
  return (typeof p5 !== 'undefined') && (typeof ml5 !== 'undefined');
}

function setup() {
  // Wait for libraries to be ready
  if (!checkLibraries()) {
    console.warn('Libraries not ready, retrying...');
    setTimeout(setup, 500);
    return;
  }

  let container = document.getElementById('gameContainer');
  let w = container.offsetWidth;
  let h = container.offsetHeight || window.innerHeight;
  
  const cnv = createCanvas(w, h);
  cnv.parent('gameContainer');
  
  // Initialize game state first
  coder = new Coder(width / 2, height - 100);
  createLevel(level, stage);
  autoRestartCountdown = 0;
  
  // Setup camera with constraints for better performance
  const constraints = {
    audio: false,
    video: {
      width: { ideal: width },
      height: { ideal: height },
      facingMode: 'user'
    }
  };
  
  video = createCapture(VIDEO, constraints);
  video.size(width, height);
  video.hide();
  
  document.getElementById('status').innerText = 'Loading pose detection...';
  
  // Load pose detection quickly without blocking
  if (ml5 && ml5.poseNet) {
    poseNet = ml5.poseNet(video, {
      maxPoseDetections: 1,
      architecture: 'MobileNetV1'
    }, onModelReady);
    poseNet.on('pose', receivePoses);
  }

  // Load handpose model for real finger recognition
  if (ml5 && ml5.handpose) {
    handposeModel = ml5.handpose(video, onHandModelReady);
    handposeModel.on('predict', receiveHands);
  }
}

function onHandModelReady() {
  handModelReady = true;
  console.log('Handpose model ready!');
  document.getElementById('status').innerText = 'Hand gesture ready!';
  setTimeout(() => {
    if (modelReady) document.getElementById('status').innerText = '';
  }, 1500);
}

function receiveHands(predictions) {
  handPredictions = predictions;
}

function onModelReady() {
  modelReady = true;
  console.log('Pose model ready!');
  document.getElementById('status').innerText = 'Ready! Move to play!';
  setTimeout(() => {
    document.getElementById('status').innerText = '';
  }, 2000);
}

let lastPoseUpdate = 0;
const POSE_UPDATE_INTERVAL = 100; // Update pose every 100ms

function draw() {
  background(135, 206, 235); // Sky blue
  
  // Draw camera feed with transparency
  push();
  tint(255, 50);
  image(video, 0, 0, width, height);
  pop();
  
  // Game logic
  if (!gameOver && !gameWon) {
    // Update player based on pose (throttled)
    if (modelReady && millis() - lastPoseUpdate > POSE_UPDATE_INTERVAL) {
      updatePlayerFromPose();
      lastPoseUpdate = millis();
    }
    
    coder.update();
    coder.display();
    
    // Check level bounds
    if (coder.x < 0) coder.x = 0;
    if (coder.x > width) coder.x = width;
    
    // Platform rendering and collision
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].display();
      coder.checkCollision(platforms[i]);
    }
    
    // Checkpoint rendering
    if (checkpoint) {
      checkpoint.display();
    }
    
    // Enemy updates with early exit
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];
      enemy.update();
      enemy.display();
      
      if (coder.checkCollision(enemy)) {
        gameOver = true;
        gameOverTime = millis();
        autoRestartCountdown = 30;
        document.getElementById('status').innerText = 'GAME OVER! Hit an error... Restarting in 30 seconds or make a fist gesture!';
        break;
      }
      
      // Remove enemies that fall off screen
      if (enemy.y > height + 50) {
        enemies.splice(i, 1);
      }
    }
    
    // Check checkpoint collision (world/stage exit)
    if (checkpoint && coder.checkCollision(checkpoint)) {
      levelComplete = true;
      score += 1000;

      if (stage < 3) {
        stage++;
      } else {
        level++;
        stage = 1;
      }

      if (level > 10) {
        gameWon = true;
        gameOverTime = millis();
        document.getElementById('status').innerText = 'YOU WON ALL 10 WORLDS! MASTER Coder!';
      } else {
        resetLevel();
        document.getElementById('status').innerText = 'World ' + level + ' Stage ' + stage + ' unlocked!';
      }
    }
  }
  
  // Draw HUD
  updateHUD();

  // On-screen movement status label
  push();
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(20);
  textAlign(LEFT, TOP);
  text('Command: ' + lastMoveCmd, 20, 100);
  text('Jump gesture: ' + (jumpSignal ? 'YES' : 'NO'), 20, 130);
  text('Restart gesture: ' + (restartSignal ? 'READY' : 'OFF'), 20, 160);
  noStroke();
  pop();
  
  // Direction guide around coder
  push();
  noFill();
  stroke(255, 255, 0);
  strokeWeight(3);
  ellipse(coder.x, coder.y + 10, 70, 70);
  pop();

  // Game over / won screen
  if (gameOver) {
    if (autoRestartCountdown > 0) {
      autoRestartCountdown -= deltaTime / 1000; // Countdown in seconds
      if (autoRestartCountdown <= 0) {
        // Auto-restart
        gameOver = false;
        level = 1;
        stage = 1;
        score = 0;
        resetLevel();
      }
    }

    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('GAME OVER', width / 2, height / 2);
    textSize(24);
    text('Making a fist gesture restarts instantly', width / 2, height / 2 + 60);
    fill(255, 100, 100);
    textSize(32);
    text('Auto-restart in: ' + max(0, ceil(autoRestartCountdown)) + 's', width / 2, height / 2 + 110);
  }
  
  if (gameWon) {
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    fill(255, 215, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('YOU WON ALL 10 WORLDS!', width / 2, height / 2);
    textSize(24);
    fill(255);
    text('Total Score: ' + score, width / 2, height / 2 + 60);
    text('Make a fist gesture to restart or wait 30 seconds', width / 2, height / 2 + 110);
  }
}

function updatePlayerFromPose() {
  if (poses.length > 0) {
    let pose = poses[0].pose;

    // Use nose for horizontal movement
    let nose = pose.nose;
    let leftShoulder = pose.leftShoulder;
    let rightShoulder = pose.rightShoulder;

    if (nose && nose.confidence > 0.25) {
      let targetScreenX = map(nose.x, 0, video.width || width, 0, width);
      let dx = targetScreenX - coder.x;
      coder.vx = constrain(dx * 0.3, -12, 12);

      if (abs(dx) < 15) {
        lastMoveCmd = 'Stand';
      } else if (dx < 0) {
        lastMoveCmd = 'Move LEFT';
      } else {
        lastMoveCmd = 'Move RIGHT';
      }

      // Move status update
      if (modelReady) {
        document.getElementById('status').innerText = 'Tracking nose. ' + lastMoveCmd;
      }
    }

    // Combined gesture control
    let leftIndex = pose.leftIndex;
    let rightIndex = pose.rightIndex;
    let leftWrist = pose.leftWrist;
    let rightWrist = pose.rightWrist;
    let leftEye = pose.leftEye;
    let rightEye = pose.rightEye;

    // Jump detection: handpose index fingers high, fallback to wrists
    jumpSignal = false;
    if (handPredictions.length > 0 && nose && nose.confidence > 0.25) {
      let indexFingersUp = 0;
      for (let h = 0; h < handPredictions.length; h++) {
        let keypoints = handPredictions[h].landmarks;
        if (!keypoints || keypoints.length < 9) continue;
        let indexTip = keypoints[8];
        if (indexTip[1] < nose.y - 25) {
          indexFingersUp += 1;
        }
      }
      if (indexFingersUp >= 1) {
        jumpSignal = true;
        if (coder.onGround) {
          coder.jump();
        }
      }
    } else if (leftWrist && rightWrist && nose && nose.confidence > 0.25) {
      if (leftWrist.y < nose.y - 25 && rightWrist.y < nose.y - 25) {
        jumpSignal = true;
        if (coder.onGround) {
          coder.jump();
        }
      }
    }

    // Restart gesture: detect a fist pump entirely from handpose (no PoseNet wrists)
    restartSignal = false;
    if (nose && nose.confidence > 0.25 && handPredictions.length > 0) {
      for (let h = 0; h < handPredictions.length; h++) {
        let keypoints = handPredictions[h].landmarks;
        if (!keypoints || keypoints.length < 21) continue;

        let wrist = keypoints[0];
        let indexTip = keypoints[8];
        let middleTip = keypoints[12];
        let ringTip = keypoints[16];
        let pinkyTip = keypoints[20];

        let wristHigh = wrist[1] < nose.y - 30;
        let indexDist = dist(wrist[0], wrist[1], indexTip[0], indexTip[1]);
        let middleDist = dist(wrist[0], wrist[1], middleTip[0], middleTip[1]);
        let ringDist = dist(wrist[0], wrist[1], ringTip[0], ringTip[1]);
        let pinkyDist = dist(wrist[0], wrist[1], pinkyTip[0], pinkyTip[1]);

        // Fist: all finger tips near wrist (folded) and hand raised
        if (wristHigh && indexDist < 55 && middleDist < 55 && ringDist < 55 && pinkyDist < 55) {
          restartSignal = true;
          break;
        }
      }
    }

    if (restartSignal && (gameOver || gameWon)) {
      gameOver = false;
      gameWon = false;
      level = 1;
      stage = 1;
      score = 0;
      resetLevel();
      document.getElementById('status').innerText = 'Restarted by gesture!';
    }
  }
}

function receivePoses(results) {
  // Only keep the most recent pose
  poses = results || [];
}

function createLevel(levelNum, stageNum = 1) {
  platforms = [];
  enemies = [];
  levelComplete = false;

  // Enemy type by stage
  let enemyType = 'goomba';
  if (stageNum === 2) enemyType = 'turtle';
  else if (stageNum === 3) enemyType = 'fish';

  function spawnEnemy(x, y, speed) {
    enemies.push(new Enemy(x, y, speed, enemyType));
  }
  
  // Create base platform
  platforms.push(new Platform(0, height - 50, width, 50));
  
  // Create final platform leading to checkpoint and position checkpoint on it
  let finalPlatformY = 80;
  platforms.push(new Platform(width / 2 - 60, finalPlatformY, 120, 20));
  checkpoint = new Checkpoint(width / 2 - 40, finalPlatformY - 35, 80, 30);
  
  if (levelNum === 1) {
    // World 1: Tutorial level
    platforms.push(new Platform(150, height - 150, 200, 20));
    platforms.push(new Platform(500, height - 250, 200, 20));
    platforms.push(new Platform(150, height - 350, 200, 20));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    spawnEnemy(400, 300, 2);
    spawnEnemy(200, 150, 2);
  } else if (levelNum === 2) {
    // World 2: More challenging
    platforms.push(new Platform(100, height - 150, 150, 20));
    platforms.push(new Platform(350, height - 200, 150, 20));
    platforms.push(new Platform(600, height - 150, 150, 20));
    platforms.push(new Platform(200, height - 300, 200, 20));
    platforms.push(new Platform(550, height - 350, 200, 20));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    spawnEnemy(300, 250, 3);
    spawnEnemy(550, 200, 3);
    spawnEnemy(150, 150, 2);
  } else if (levelNum === 3) {
    // World 3: Hard mode with narrow jumps
    platforms.push(new Platform(80, height - 150, 120, 20));
    platforms.push(new Platform(300, height - 220, 120, 20));
    platforms.push(new Platform(550, height - 170, 120, 20));
    platforms.push(new Platform(150, height - 300, 120, 20));
    platforms.push(new Platform(450, height - 300, 120, 20));
    platforms.push(new Platform(300, height - 380, 200, 20));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    spawnEnemy(250, 300, 4);
    spawnEnemy(500, 250, 4);
    spawnEnemy(100, 200, 3);
    spawnEnemy(400, 150, 3);
  } else if (levelNum === 4) {
    // World 4: Stepping stone sequence
    for (let i = 0; i < 5; i++) {
      platforms.push(new Platform(100 + i * 140, height - 150 - i * 80, 100, 20));
    }
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    spawnEnemy(200, 300, 3);
    spawnEnemy(400, 250, 3);
    spawnEnemy(600, 200, 3);
  } else if (levelNum === 5) {
    // World 5: Wide platforms with fast enemies
    platforms.push(new Platform(50, height - 150, 250, 25));
    platforms.push(new Platform(350, height - 250, 250, 25));
    platforms.push(new Platform(20, height - 350, 300, 25));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    for (let i = 0; i < 4; i++) {
      spawnEnemy(150 + i * 200, 200 + i * 50, 5);
    }
  } else if (levelNum === 6) {
    // World 6: Zigzag climb
    platforms.push(new Platform(50, height - 150, 180, 20));
    platforms.push(new Platform(450, height - 220, 180, 20));
    platforms.push(new Platform(100, height - 290, 180, 20));
    platforms.push(new Platform(500, height - 360, 180, 20));
    platforms.push(new Platform(200, height - 430, 200, 20));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    spawnEnemy(300, 250, 4);
    spawnEnemy(250, 150, 4);
    spawnEnemy(400, 200, 4);
  } else if (levelNum === 7) {
    // World 7: Narrow path with many enemies
    platforms.push(new Platform(200, height - 140, 80, 20));
    platforms.push(new Platform(200, height - 220, 80, 20));
    platforms.push(new Platform(200, height - 300, 80, 20));
    platforms.push(new Platform(200, height - 380, 80, 20));
    platforms.push(new Platform(200, height - 460, 100, 20));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    for (let i = 0; i < 5; i++) {
      spawnEnemy(100 + i * 100, 200 + i * 40, 3);
    }
  } else if (levelNum === 8) {
    // World 8: Diagonal climb
    platforms.push(new Platform(80, height - 150, 100, 20));
    platforms.push(new Platform(250, height - 210, 100, 20));
    platforms.push(new Platform(420, height - 270, 100, 20));
    platforms.push(new Platform(590, height - 330, 100, 20));
    platforms.push(new Platform(300, height - 420, 150, 20));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    for (let i = 0; i < 3; i++) {
      spawnEnemy(200 + i * 150, 250 + i * 60, 4);
    }
  } else if (levelNum === 9) {
    // World 9: Dense challenge
    platforms.push(new Platform(50, height - 140, 120, 20));
    platforms.push(new Platform(250, height - 180, 120, 20));
    platforms.push(new Platform(450, height - 140, 120, 20));
    platforms.push(new Platform(150, height - 280, 120, 20));
    platforms.push(new Platform(350, height - 320, 120, 20));
    platforms.push(new Platform(550, height - 280, 120, 20));
    platforms.push(new Platform(300, height - 420, 150, 20));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    for (let i = 0; i < 6; i++) {
      spawnEnemy(100 + i * 120, 180 + i * 30, 5);
    }
  } else if (levelNum === 10) {
    // World 10: FINAL BOSS - Ultimate challenge
    platforms.push(new Platform(100, height - 150, 140, 25));
    platforms.push(new Platform(350, height - 210, 140, 25));
    platforms.push(new Platform(600, height - 150, 140, 25));
    platforms.push(new Platform(200, height - 310, 140, 25));
    platforms.push(new Platform(500, height - 310, 140, 25));
    platforms.push(new Platform(80, height - 420, 140, 25));
    platforms.push(new Platform(450, height - 420, 200, 25));
    platforms.push(new Platform(width / 2 - 100, 250, 200, 20)); // Bridge to exit
    for (let i = 0; i < 8; i++) {
      spawnEnemy(100 + i * 100, 150 + i * 40, 6);
    }
  }
}

function resetLevel() {
  gameOver = false;
  autoRestartCountdown = 0;
  coder = new Coder(width / 2, height - 100);
  createLevel(level, stage);
  document.getElementById('status').innerText = 'World ' + level + ' Stage ' + stage + ' - Reach the green EXIT!';
}

function updateHUD() {
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('level').innerText = 'World: ' + level + ' - Stg: ' + stage;
}

// Player (Coder) Class
class Coder {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 40;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.6;
    this.onGround = false;
    this.lastDisplayY = y;
  }
  
  update() {
    // Apply gravity
    this.vy += this.gravity;
    this.lastDisplayY = this.y;
    this.y += this.vy;
    this.x += this.vx;
    
    // Friction
    this.vx *= 0.9;
    
    // Reset on ground state
    this.onGround = false;
    
    // Fall off screen = game over
    if (this.y > height + 100) {
      gameOver = true;
      document.getElementById('status').innerText = 'GAME OVER! You fell...';
    }
  }
  
  jump() {
    if (this.onGround) {
      this.vy = -15;
      this.onGround = false;
    }
  }
  
  checkCollision(obj) {
    if (obj instanceof Platform) {
      // Check if falling on platform
      if (this.vy >= 0 &&
          this.y + this.h >= obj.y &&
          this.y + this.h <= obj.y + obj.h + 10 &&
          this.x + this.w > obj.x &&
          this.x < obj.x + obj.w) {
        this.y = obj.y - this.h;
        this.vy = 0;
        this.onGround = true;
      }
      return false;
    } else if (obj instanceof Checkpoint) {
      // Check if player touches checkpoint
      if (this.x < obj.x + obj.w &&
          this.x + this.w > obj.x &&
          this.y < obj.y + obj.h &&
          this.y + this.h > obj.y) {
        return true;
      }
      return false;
    } else if (obj instanceof Enemy) {
      // Check collision with enemy using simplified AABB
      let dx = this.x - obj.x;
      let dy = this.y - obj.y;
      let minDist = (this.w + obj.w) / 2;
      
      if (abs(dx) < minDist && abs(dy) < minDist) {
        return true;
      }
    }
    return false;
  }
  
  display() {
    // Draw coder character
    fill(100, 150, 255); // Blue programmer shirt
    rect(this.x - this.w / 2, this.y, this.w, this.h);
    
    // Head
    fill(220, 180, 130);
    circle(this.x, this.y - 10, 20);
    
    // Eyes
    fill(0);
    circle(this.x - 5, this.y - 12, 4);
    circle(this.x + 5, this.y - 12, 4);
    
    // Screen on chest (laptop)
    fill(50);
    rect(this.x - 8, this.y + 8, 16, 15);
    fill(0, 255, 0);
    rect(this.x - 6, this.y + 10, 12, 11);
    
    // Score popup when jumping (less frequent rendering)
    if (this.vy < -10) {
      fill(255, 255, 0);
      textSize(16);
      textAlign(CENTER);
      text('JUMP!', this.x, this.y - 30);
    }
  }
}

// Platform Class
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  display() {
    // Draw code blocks as platforms
    fill(100, 200, 100);
    rect(this.x, this.y, this.w, this.h);
    
    // Texture
    stroke(50, 150, 50);
    strokeWeight(2);
    for (let i = 0; i < this.w; i += 20) {
      line(this.x + i, this.y, this.x + i, this.y + this.h);
    }
    noStroke();
  }
}

// Enemy Class (various enemy mechanics)
class Enemy {
  constructor(x, y, speed, kind = 'goomba') {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.speed = speed;
    this.direction = random([-1, 1]);
    this.kind = kind; // goomba, turtle, fish
    this.shellMode = false;
    this.oscillator = random(0, TWO_PI);
  }
  
  update() {
    if (this.kind === 'goomba') {
      this.x += this.speed * this.direction;
      this.y += 0.5;
    } else if (this.kind === 'turtle') {
      if (this.shellMode) {
        this.x += this.speed * this.direction * 1.4;
      } else {
        this.x += this.speed * this.direction * 0.8;
      }
      this.y += 0.5;
    } else if (this.kind === 'fish') {
      this.x += this.speed * this.direction;
      this.oscillator += 0.05;
      this.y += sin(this.oscillator) * 2;
    }

    if (this.x < 0 || this.x > width) {
      this.direction *= -1;
    }

    // limit y of fish to non-ground region
    if (this.kind === 'fish') {
      this.y = constrain(this.y, 70, height - 120);
    } else {
      this.y = min(this.y, height - 70);
    }
  }
  
  display() {
    if (this.kind === 'goomba') {
      fill(160, 70, 30);
      ellipse(this.x, this.y, this.w, this.h);
      fill(0);
      ellipse(this.x - 7, this.y - 5, 6, 6);
      ellipse(this.x + 7, this.y - 5, 6, 6);
    } else if (this.kind === 'turtle') {
      if (this.shellMode) {
        fill(50, 120, 30);
      } else {
        fill(80, 170, 40);
      }
      rect(this.x - 15, this.y - 15, 30, 22, 8);
      fill(255);
      ellipse(this.x - 8, this.y - 2, 7, 7);
      ellipse(this.x + 8, this.y - 2, 7, 7);
    } else if (this.kind === 'fish') {
      fill(100, 180, 255);
      ellipse(this.x, this.y, 34, 22);
      triangle(this.x + 15, this.y, this.x + 25, this.y - 8, this.x + 25, this.y + 8);
      fill(0);
      ellipse(this.x + 7, this.y - 3, 4, 4);
    }
    
    // Debug label
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(this.kind.substring(0, 1).toUpperCase(), this.x, this.y);
  }

  hitByPlayer() {
    if (this.kind === 'turtle' && !this.shellMode) {
      this.shellMode = true;
      this.speed = 7;
      this.w = 20;
      this.h = 20;
      return false;
    }
    return true;
  }
}


// Checkpoint Class (World exit)
class Checkpoint {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  display() {
    // Draw checkpoint as a glowing exit portal
    fill(0, 255, 100, 150);
    rect(this.x, this.y, this.w, this.h);
    
    // Glow effect
    noFill();
    stroke(0, 255, 100);
    strokeWeight(2);
    rect(this.x - 5, this.y - 5, this.w + 10, this.h + 10);
    
    // Flag/goal indicator
    fill(0, 255, 100);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('EXIT', this.x + this.w / 2, this.y + this.h / 2);
    noStroke();
  }
}
