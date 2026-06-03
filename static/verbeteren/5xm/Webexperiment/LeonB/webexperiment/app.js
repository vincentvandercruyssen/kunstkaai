const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let hue = 0; 


const mouse = {
    x: undefined,
    y: undefined
};


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();


window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = mouse.x || Math.random() * canvas.width;
        this.y = mouse.y || Math.random() * canvas.height;
        
    
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
   
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
   
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    handleParticles();
    

    hue += 2;
    
    
    if (Math.random() > 0.9) {
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        for (let i = 0; i < 3; i++) particles.push(new Particle());
    }

    requestAnimationFrame(animate);
}

animate();