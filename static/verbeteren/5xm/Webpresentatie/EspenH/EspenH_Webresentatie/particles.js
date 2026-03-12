// Bouncing ball particle animation with outward gravity (centrifugal effect)
(function() {
    // Create canvas for particle effects
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.5;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    // Track mouse position for interactive cursor effect
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorTrail = [];
    const maxCursorTrailLength = 15;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.body.style.cursor = 'none';
        
        // Add cursor position to trail
        cursorTrail.push({ x: mouseX, y: mouseY });
        if (cursorTrail.length > maxCursorTrailLength) {
            cursorTrail.shift();
        }
    });

    document.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'auto';
        cursorTrail = [];
    });

    const ctx = canvas.getContext('2d');
    let particles = [];
    const OUTWARD_FORCE = 0.08; // Force pushing particles toward edges (reduced for better distribution)
    const BOUNCE_DAMPING = 1.0; // No energy loss - perfect bounces

    // Resize canvas to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class - Bouncing ball with outward centrifugal force
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2; // Slower initial velocity
            this.vy = (Math.random() - 0.5) * 2; // Slower initial velocity
            this.radius = Math.random() * 4 + 3;
            this.mass = this.radius;
            this.opacity = Math.random() * 0.4 + 0.3;
            this.colors = [
                'rgba(30, 60, 114,', 
                'rgba(42, 82, 152,', 
                'rgba(168, 237, 234,'
            ];
            this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            // Trail for motion blur effect
            this.trail = [];
            this.maxTrailLength = 12;
            this.maxSpeed = 3; // Maximum speed before damping applies
            this.friction = 0.92; // Friction coefficient (slower return to baseline)
        }

        update() {
            // Define the four corners
            const corners = [
                { x: 0, y: 0 },                          // Top-left
                { x: canvas.width, y: 0 },               // Top-right
                { x: 0, y: canvas.height },              // Bottom-left
                { x: canvas.width, y: canvas.height }    // Bottom-right
            ];

            // Apply attractive force toward all corners
            corners.forEach(corner => {
                const dx = corner.x - this.x;
                const dy = corner.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0) {
                    const force = OUTWARD_FORCE * 0.5; // Reduced force for smoother behavior
                    this.vx += (dx / distance) * force;
                    this.vy += (dy / distance) * force;
                }
            });

            // Cursor repulsion - make particles bounce away from cursor
            const cursorRepulsionRadius = 80;
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distanceToCursor = Math.sqrt(dx * dx + dy * dy);

            if (distanceToCursor < cursorRepulsionRadius && distanceToCursor > 0) {
                const repulsionForce = (cursorRepulsionRadius - distanceToCursor) / cursorRepulsionRadius * 2.5;
                this.vx += (dx / distanceToCursor) * repulsionForce;
                this.vy += (dy / distanceToCursor) * repulsionForce;
            }

            // Apply friction to gradually slow down to baseline speed
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (currentSpeed > this.maxSpeed) {
                this.vx *= this.friction;
                this.vy *= this.friction;
            }

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls with damping and energy loss
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.vx = Math.abs(this.vx) * BOUNCE_DAMPING;
            }
            if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.vx = -Math.abs(this.vx) * BOUNCE_DAMPING;
            }

            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.vy = Math.abs(this.vy) * BOUNCE_DAMPING;
            }
            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.vy = -Math.abs(this.vy) * BOUNCE_DAMPING;
            }

            // Keep particles on screen
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));

            // Add current position to trail for motion blur
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
        }

        draw() {
            // Draw motion blur trail
            if (this.trail.length > 1) {
                for (let i = 0; i < this.trail.length - 1; i++) {
                    const trailOpacity = (i / this.trail.length) * this.opacity * 0.6;
                    const trailRadius = (i / this.trail.length) * this.radius * 0.7;
                    
                    const gradient = ctx.createRadialGradient(
                        this.trail[i].x - trailRadius * 0.3, 
                        this.trail[i].y - trailRadius * 0.3, 
                        0, 
                        this.trail[i].x, 
                        this.trail[i].y, 
                        trailRadius
                    );
                    
                    const color = this.color;
                    gradient.addColorStop(0, color + (trailOpacity + 0.1) + ')');
                    gradient.addColorStop(1, color + (trailOpacity * 0.3) + ')');
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(this.trail[i].x, this.trail[i].y, trailRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Draw ball with gradient for depth
            const gradient = ctx.createRadialGradient(
                this.x - this.radius * 0.3, 
                this.y - this.radius * 0.3, 
                0, 
                this.x, 
                this.y, 
                this.radius
            );
            
            const color = this.color;
            gradient.addColorStop(0, color + (this.opacity + 0.2) + ')');
            gradient.addColorStop(1, color + this.opacity + ')');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // Add shine effect
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.4, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // Initialize particles
    function init() {
        particles = [];
        const particleCount = Math.floor(canvas.width / 80); // More particles for better coverage
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    init();

    // Draw connection lines between nearby particles
    function drawConnections() {
        const maxDistance = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.strokeStyle = `rgba(42, 82, 152, ${0.08 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        // Clear canvas with faster fade for quicker track disappearance
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        // Draw custom cursor
        drawCustomCursor();

        requestAnimationFrame(animate);
    }

    // Draw custom interactive cursor
    function drawCustomCursor() {
        // Draw motion blur trail
        if (cursorTrail.length > 1) {
            for (let i = 0; i < cursorTrail.length - 1; i++) {
                const trailOpacity = (i / cursorTrail.length) * 0.4;
                const trailScale = i / cursorTrail.length;
                
                // Trail outer circle
                ctx.strokeStyle = `rgba(42, 82, 152, ${trailOpacity * 0.6})`;
                ctx.lineWidth = 2 * trailScale;
                ctx.beginPath();
                ctx.arc(cursorTrail[i].x, cursorTrail[i].y, 15 * trailScale, 0, Math.PI * 2);
                ctx.stroke();

                // Trail inner circle
                ctx.fillStyle = `rgba(42, 82, 152, ${trailOpacity * 0.3})`;
                ctx.beginPath();
                ctx.arc(cursorTrail[i].x, cursorTrail[i].y, 5 * trailScale, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Outer circle
        ctx.strokeStyle = 'rgba(42, 82, 152, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circle
        ctx.fillStyle = 'rgba(42, 82, 152, 0.3)';
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair
        ctx.strokeStyle = 'rgba(42, 82, 152, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouseX - 10, mouseY);
        ctx.lineTo(mouseX + 10, mouseY);
        ctx.moveTo(mouseX, mouseY - 10);
        ctx.lineTo(mouseX, mouseY + 10);
        ctx.stroke();
    }

    animate();

    // Reinitialize particles on window resize
    window.addEventListener('resize', () => {
        setTimeout(init, 100);
    });
})();
