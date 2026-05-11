/* 
  ====================================
  ANIMATIONS - Canvas, SVG & Scroll Effects
  ====================================
*/

/**
 * Typewriter Effect
 */
class TypewriterEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed  = options.typeSpeed  || 80;
        this.deleteSpeed = options.deleteSpeed || 45;
        this.pauseAfterType   = options.pauseAfterType   || 1800;
        this.pauseAfterDelete = options.pauseAfterDelete || 400;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.timer = null;

        this._createCursor();
        this._tick();
    }

    _createCursor() {
        // Wrap element text in a span so cursor sits outside
        this.element.innerHTML = '';
        this.textSpan = document.createElement('span');
        this.cursor   = document.createElement('span');
        this.cursor.className  = 'typewriter-cursor';
        this.cursor.textContent = '|';
        this.element.appendChild(this.textSpan);
        this.element.appendChild(this.cursor);
    }

    _tick() {
        const current = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.currentCharIndex--;
        } else {
            this.currentCharIndex++;
        }

        this.textSpan.textContent = current.substring(0, this.currentCharIndex);

        let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === current.length) {
            // Finished typing — pause then start deleting
            delay = this.pauseAfterType;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            // Finished deleting — move to next text
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            delay = this.pauseAfterDelete;
        }

        this.timer = setTimeout(() => this._tick(), delay);
    }

    destroy() {
        clearTimeout(this.timer);
    }
}

class AnimationManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationFrameId = null;
        this.scrollObserver = null;
        
        this.init();
    }
    
    /**
     * Initialize Animation Manager
     */
    init() {
        this.setupScrollAnimations();
        this.initCanvasAnimation();
        this.initTypewriter();
        log('Animation Manager initialized');
    }

    /**
     * Initialize Typewriter on Hero Subtitle
     */
    initTypewriter() {
        const target = document.getElementById('typewriter-target');
        if (!target) return;

        const roles = [
            'Yönetim Bilişim Sistemleri Öğrencisi',
            'Web Geliştirici 💻',
            'UI/UX Meraklısı 🎨',
            'Yazı Yazıyor & Öğreniyor ✍️'
        ];

        this.typewriter = new TypewriterEffect(target, roles, {
            typeSpeed: 75,
            deleteSpeed: 40,
            pauseAfterType: 2000,
            pauseAfterDelete: 500
        });
    }

    /**
     * Initialize Canvas Animation
     */
    initCanvasAnimation() {
        this.canvas = $('#canvas-animation');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Create particles — more for full-screen coverage
        this.createParticles(90);
        
        // Start animation loop
        this.animateCanvas();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    /**
     * Resize Canvas to Fill Window (full-screen background)
     */
    resizeCanvas() {
        if (!this.canvas) return;

        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Re-spread particles after resize so they fill the new area
        if (this.particles.length) {
            this.particles.forEach(p => {
                p.x = Math.random() * this.canvas.width;
                p.y = Math.random() * this.canvas.height;
            });
        }
    }
    
    /**
     * Create Particles
     */
    createParticles(count) {
        this.particles = [];
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2.5 + 0.8,
                velocityX: (Math.random() - 0.5) * 1.2,
                velocityY: (Math.random() - 0.5) * 1.2,
                color: '#c56bff', // Mor renk
                opacity: Math.random() * 0.6 + 0.5, // Daha parlak
                life: 1
            });
        }
    }
    
    /**
     * Animate Canvas (Particle System)
     */
    animateCanvas() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw gradient background
        this.drawGradientBg();
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.velocityX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.velocityY *= -1;
            }
            
            // Keep within bounds
            particle.x = Math.max(0, Math.min(particle.x, this.canvas.width));
            particle.y = Math.max(0, Math.min(particle.y, this.canvas.height));
            
            // Draw particle
            this.drawParticle(particle);
        });
        
        // Draw connections between particles
        this.drawConnections();
        
        // Continue animation
        this.animationFrameId = requestAnimationFrame(() => this.animateCanvas());
    }
    
    /**
     * Draw Gradient Background
     */
    drawGradientBg() {
        // Transparent - background.png görünsün
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Draw Single Particle
     */
    drawParticle(particle) {
        // Glow efekti
        const glowGradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 3
        );
        glowGradient.addColorStop(0, particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0'));
        glowGradient.addColorStop(1, particle.color + '00');
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        
        // Ana nokta
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    /**
     * Draw Connections Between Particles
     */
    drawConnections() {
        // Bağlantı çizgileri devre dışı - sadece noktalar görsün
        return;
    }
    }
    
    /**
     * Setup Scroll-Triggered Animations
     */
    setupScrollAnimations() {
        if (!CONFIG.animations.scrollTrigger) return;
        
        // Use Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class
                    addClass(entry.target, 'animate-slideInUp');
                    
                    // Optional: Stop observing after animation
                    // this.scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        $$('.card, .blog-card, .project-card, .timeline-item').forEach(el => {
            this.scrollObserver.observe(el);
        });
    }
    
    /**
     * Animate SVG Figures
     */
    animateSVGFigures() {
        $$('.animated-figure').forEach(svg => {
            const parts = svg.querySelectorAll('[class]');
            
            parts.forEach((part, index) => {
                addClass(part, 'animate-float');
                part.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }
    
    /**
     * Mouse Follow Effect on Hero
     */
    setupMouseFollowEffect() {
        const heroAnimation = $('.hero-animation');
        if (!heroAnimation) return;
        
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            const heroRect = heroAnimation.getBoundingClientRect();
            const relativeX = x - heroRect.left;
            const relativeY = y - heroRect.top;
            
            // Apply subtle rotation based on mouse position
            const rotateX = (relativeY - heroRect.height / 2) / heroRect.height * 10;
            const rotateY = (relativeX - heroRect.width / 2) / heroRect.width * 10;
            
            // Uncomment to enable 3D effect
            // heroAnimation.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
    
    /**
     * Cleanup Animations
     */
    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }

        if (this.typewriter) {
            this.typewriter.destroy();
        }
    }
}

/**
 * Initialize Animation Manager globally
 */
const animationManager = new AnimationManager();

/**
 * Cleanup when page unloads
 */
window.addEventListener('unload', () => {
    if (window.animationManager) {
        window.animationManager.cleanup();
    }
});
