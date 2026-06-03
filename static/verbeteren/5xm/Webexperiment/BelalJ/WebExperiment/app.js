// --- Custom Cursor Logica ---
const cursor = document.getElementById('cursor');
const hoverTargets = document.querySelectorAll('.hover-target');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-grow');
    });
    target.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-grow');
    });
});

// --- Web Audio API (Snelle Fade Whoosh Sound) ---
let audioCtx, noiseSource, gainNode, filterNode;
let isAudioInit = false;

function initAudio() {
    if (isAudioInit) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    audioCtx = new AudioContext();
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; 
    }

    noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass'; 
    filterNode.frequency.value = 100; 

    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0; 

    noiseSource.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseSource.start();
    isAudioInit = true;
}

window.addEventListener('mousedown', initAudio, { once: true });
window.addEventListener('keydown', initAudio, { once: true });


// --- Oneindige Glitch Typewriter Loop ---
const scrambleChars = '!<>-_\\/[]{}—=+*^?#________';

function glitchTypewriter(element) {
    const finalText = element.getAttribute('data-orig') || element.innerText;
    if (!element.getAttribute('data-orig')) element.setAttribute('data-orig', finalText);
    element.setAttribute('data-text', finalText); 
    
    let isDeleting = false;
    let textIndex = 0;
    
    function typeLoop() {
        let currentText = finalText.substring(0, textIndex);
        let scrambledChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        
        if (!isDeleting) {
            if (textIndex < finalText.length) {
                element.innerText = currentText + scrambledChar;
                textIndex++;
                setTimeout(typeLoop, 40 + Math.random() * 60); 
            } else {
                element.innerText = finalText;
                element.classList.add('glitch-active');
                setTimeout(() => {
                    element.classList.remove('glitch-active');
                    isDeleting = true;
                    typeLoop();
                }, 3000);
            }
        } else {
            if (textIndex > 0) {
                element.innerText = currentText.substring(0, currentText.length - 1) + scrambledChar;
                textIndex--;
                setTimeout(typeLoop, 15 + Math.random() * 15); 
            } else {
                element.innerText = '';
                isDeleting = false;
                setTimeout(typeLoop, 1000); 
            }
        }
    }
    
    typeLoop(); 
}

// --- Intersection Observer ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            if (entry.target.id === 'typo-404' && !entry.target.classList.contains('loop-started')) {
                entry.target.classList.add('loop-started'); 
                glitchTypewriter(entry.target);
            }
            
            if (entry.target.id !== 'typo-404') {
                observer.unobserve(entry.target); 
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up').forEach(element => {
    observer.observe(element);
});
observer.observe(document.getElementById('typo-404'));


// --- Scroll & Parallax ---
const heroTitle = document.getElementById('hero-title');
const marquee1 = document.getElementById('marquee-1');
const marquee2 = document.getElementById('marquee-2');
const typo404 = document.getElementById('typo-404');

let targetScroll = 0;
let currentScroll = 0;

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
});

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// De hoofd animatie-loop
function animate() {
    cursorX = lerp(cursorX, mouseX, 0.4); 
    cursorY = lerp(cursorY, mouseY, 0.4);
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    currentScroll = lerp(currentScroll, targetScroll, 0.08);

    // --- EFFECT 1: Hero Tekst ---
    let scaleValue = 1 + (currentScroll * 0.005);
    let opacityValue = 1 - (currentScroll * 0.002);
    if (opacityValue < 0) opacityValue = 0;
    
    heroTitle.style.transform = `scale(${scaleValue})`;
    heroTitle.style.opacity = opacityValue;

    // --- EFFECT 2: Marquee ---
    let move1 = currentScroll * -0.15;
    let move2 = currentScroll * 0.15;
    marquee1.style.transform = `translateX(${move1}px)`;
    marquee2.style.transform = `translateX(calc(-20% + ${move2}px))`;

    // --- EFFECT 3: Typo 404 Parallax ---
    let typoMove = (currentScroll * -0.08) + 150; 
    typo404.style.transform = `translateX(${typoMove}px)`;

    // --- EFFECT 4: Audio Whoosh ---
    if (isAudioInit && gainNode && filterNode) {
        let scrollVelocity = Math.abs(targetScroll - currentScroll);
        
        let targetVolume = Math.min(scrollVelocity * 0.004, 0.12); 
        
        let fadeSpeed = (targetVolume < gainNode.gain.value) ? 0.4 : 0.1; 
        
        gainNode.gain.value = lerp(gainNode.gain.value, targetVolume, fadeSpeed);
        
        let targetFreq = 100 + (scrollVelocity * 10);
        filterNode.frequency.value = lerp(filterNode.frequency.value, targetFreq, 0.1);
    }

    requestAnimationFrame(animate);
}

animate();