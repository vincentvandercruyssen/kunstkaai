let mic;
let osc; // De oscillator voor het geluidje
let micStarted = false;

const GEVOELIGHEID = 1.0; // Iets gevoeliger gezet voor extra effect

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // 1. Microfoon instellen
    mic = new p5.AudioIn();
    
    // 2. Geluidsbron (Oscillator) instellen
    // We gebruiken een 'sine' wave voor een zacht, fluitachtig geluid
    osc = new p5.Oscillator('sine');
    osc.amp(0); // Begin met volume op 0
    
    colorMode(HSB, 360, 100, 100, 100);
    background(0);
}

function draw() {
    if (!micStarted) {
        showStartScreen();
        return;
    }

    background(0, 10); 

    let rawVol = mic.getLevel(); 
    let vol = constrain(rawVol * GEVOELIGHEID, 0, 1.0);

    // --- HET GELUIDJE AANSTUREN ---
    if (vol > 0.01) { // Alleen geluid maken als er echt input is
        // De toonhoogte (frequentie) verandert mee met het volume
        // Stil = lage brom (200Hz), Hard = hoge fluit (800Hz)
        let freq = map(vol, 0, 0.5, 200, 800);
        osc.freq(freq, 0.1); // De 0.1 zorgt voor een vloeiende overgang
        
        // Het volume van het piepje reageert op jouw volume
        osc.amp(map(vol, 0, 0.5, 0, 0.2), 0.1); 
    } else {
        osc.amp(0, 0.5); // Langzaam uitfaden als het stil is
    }

    // --- VISUELE EFFECTEN ---
    let shapeSize = map(vol, 0, 0.5, 50, width * 0.6);
    let hueValue = map(vol, 0, 0.5, 160, 280); // Van zeegroen naar paars

    push();
    translate(width / 2, height / 2);
    noFill();
    
    // Teken "geluidsgolven"
    for (let i = 0; i < 3; i++) {
        stroke(hueValue, 70, 100, 50 - (i * 10));
        strokeWeight(3);
        
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.2) {
            let n = noise(cos(a) + frameCount * 0.02, sin(a) + frameCount * 0.02);
            let r = shapeSize + (n * vol * 300) - (i * 30);
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
    pop();
}

function showStartScreen() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("Zing of blaas in de microfoon...", width / 2, height / 2 - 20);
    text("KLIK OM DE THEREMIN TE STARTEN", width / 2, height / 2 + 20);
}

function mousePressed() {
    if (!micStarted) {
        userStartAudio(); 
        mic.start();
        osc.start(); // Start de oscillator
        micStarted = true;
        background(0);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


