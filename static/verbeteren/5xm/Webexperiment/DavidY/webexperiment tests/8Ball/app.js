let answers = [
  "Yes", "No", "Ask again", "Definitely", "Unclear",
  "Probably", "Doubtful", "Trust your gut", "Absolutely not",
  "The stars say yes", "The void says no",
];

let currentAnswer = "";
let revealProgress = 0;
let wobble = 0;

let lastQuestion = "";
let input;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);

  input = document.getElementById("questionInput");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleQuestion();
    }
  });
}

function draw() {
  background(0, 0, 0, 20);

  let cx = width / 2;
  let cy = height / 2;

  let glow = 40 + sin(frameCount * 0.02) * 20;

  let d = dist(mouseX, mouseY, cx, cy);
  if (d < 200) wobble = lerp(wobble, 10, 0.05);
  else wobble = lerp(wobble, 0, 0.05);

  push();
  translate(cx, cy + sin(frameCount * 0.03) * 5);

  noStroke();
  fill(20, 20, 40);
  ellipse(0, 0, 350 + wobble, 350 + wobble);

  fill(80, 80, 160, 80);
  ellipse(0, 0, 350 + glow, 350 + glow);

  if (revealProgress > 0) {
    push();
    scale(revealProgress);

    fill(30, 30, 80);
    triangle(-60, 40, 60, 40, 0, -40);

    fill(180, 200, 255);
    textSize(20);
    text(currentAnswer, 0, 20);
    pop();
  }

  pop();

  if (lastQuestion) {
    fill(200);
    textSize(18);
    text("You asked: " + lastQuestion, width / 2, height - 100);
  }
}

function handleQuestion() {
  lastQuestion = input.value.trim();
  input.value = "";

  if (lastQuestion.length === 0) return;

  revealAnswer();
}

function revealAnswer() {
  currentAnswer = random(answers);
  revealProgress = 0;

  let interval = setInterval(() => {
    revealProgress += 0.05;
    if (revealProgress >= 1) clearInterval(interval);
  }, 16);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
