// Advanced JavaScript for AIResume Pro 2025
// React + Framer Motion + Modern Web APIs

class ModernLandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScroll();
        this.setupAdvancedAnimations();
        this.setupParticleSystem();
        this.setupTypingEffect();
        this.setupCounterAnimations();
        this.setupParallaxEffect();
        this.setupThemeToggle();
        this.setupAnalytics();
    }

    // Advanced Intersection Observer with threshold animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                const target = entry.target;
                
                if (entry.isIntersecting) {
                    // Progressive animation based on visibility ratio
                    target.style.opacity = ratio;
                    target.style.transform = `translateY(${(1 - ratio) * 50}px) scale(${0.9 + ratio * 0.1})`;
                    
                    // Add visible class for CSS animations
                    if (ratio > 0.1) {
                        target.classList.add('is-visible');
                    }
                    
                    // Remove observer for elements that don't need continuous updates
                    if (ratio > 0.7) {
                        observer.unobserve(target);
                    }
                } else {
                    target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Smooth scrolling with easing
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add scroll indicator
                    this.addScrollIndicator(targetElement);
                }
            });
        });
    }

    // Add scroll indicator for better UX
    addScrollIndicator(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.3s ease;
            z-index: 10;
        `;
        
        element.appendChild(indicator);
        
        // Animate the indicator
        setTimeout(() => {
            indicator.style.width = '100%';
        }, 100);
        
        // Remove after animation
        setTimeout(() => {
            indicator.remove();
        }, 1000);
    }

    // Advanced animations using Web Animations API
    setupAdvancedAnimations() {
        // Staggered text animation
        const textElements = document.querySelectorAll('.stagger-text');
        textElements.forEach((element, index) => {
            const text = element.textContent;
            element.innerHTML = text.split('').map(char => 
                `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>
                `
            ).join('');
            
            const chars = element.querySelectorAll('.char');
            chars.forEach((char, i) => {
                setTimeout(() => {
                    char.animate([
                        { opacity: 0, transform: 'translateY(20px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], {
                        duration: 600,
                        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        fill: 'forwards'
                    });
                }, i * 50);
            });
        });

        // Magnetic button effect
        const buttons = document.querySelectorAll('.magnetic-btn');
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Particle system for background effects
    setupParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = `hsl(${Math.random() * 60 + 220}, 70%, 60%)`;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Wrap around screen
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }

    // Typing effect with cursor
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            // Create cursor
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            cursor.style.cssText = 'color: #667eea; font-weight: bold;';
            
            element.appendChild(cursor);
            
            // Typing animation
            let i = 0;
            const typeChar = () => {
                if (i < text.length) {
                    cursor.insertAdjacentText('beforebegin', text.charAt(i));
                    i++;
                    setTimeout(typeChar, 50 + Math.random() * 50);
                } else {
                    // Blink cursor
                    setInterval(() => {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }, 500);
                }
            };
            
            // Start typing when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeChar, 1000);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Counter animations with easing
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2500; // 2.5 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            let isAnimating = false;
            
            const updateCounter = () => {
                if (!isAnimating) return;
                
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                    isAnimating = false;
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        isAnimating = true;
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    // Parallax effect for hero section
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        // Throttle for performance
        const throttledUpdate = this.throttle(updateParallax, 10);
        window.addEventListener('scroll', throttledUpdate);
    }

    // Theme toggle with system preference detection
    setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(themeToggle);
        
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        let isDark = prefersDark.matches;
        
        const updateTheme = () => {
            document.body.classList.toggle('dark-mode', !isDark);
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Update CSS custom properties
            document.documentElement.style.setProperty(
                '--glass-bg',
                isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            );
        };
        
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            updateTheme();
        });
        
        prefersDark.addEventListener('change', (e) => {
            isDark = e.matches;
            updateTheme();
        });
        
        updateTheme();
    }

    // Analytics tracking
    setupAnalytics() {
        // Track page views
        this.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
        
        // Track button clicks
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                this.trackEvent('button_click', {
                    button_text: buttonText,
                    button_location: this.getElementLocation(button)
                });
            });
        });
        
        // Track scroll depth
        this.trackScrollDepth();
    }

    // Track scroll depth
    trackScrollDepth() {
        let maxScroll = 0;
        const trackScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track at different milestones
                if (maxScroll >= 25 && maxScroll < 30) {
                    this.trackEvent('scroll_depth', { depth: '25%' });
                } else if (maxScroll >= 50 && maxScroll < 55) {
                    this.trackEvent('scroll_depth', { depth: '50%' });
                } else if (maxScroll >= 75 && maxScroll < 80) {
                    this.trackEvent('scroll_depth', { depth: '75%' });
                } else if (maxScroll >= 90 && maxScroll < 95) {
                    this.trackEvent('scroll_depth', { depth: '90%' });
                }
            }
        };
        
        const throttledTrackScroll = this.throttle(trackScroll, 100);
        window.addEventListener('scroll', throttledTrackScroll);
    }

    // Track custom events
    trackEvent(eventName, properties = {}) {
        console.log(`📊 Event: ${eventName}`, properties);
        
        // Placeholder for analytics integration
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Track to data layer for other analytics tools
        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...properties
            });
        }
    }

    // Get element location for analytics
    getElementLocation(element) {
        const sections = ['hero', 'features', 'pricing', 'cta', 'footer'
        ];
        
        for (const section of sections) {
            if (element.closest(`#${section}`)) {
                return section;
            }
        }
        
        return 'unknown';
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Enhanced utilities for modern web development
const modernUtils = {
    // Check if element is in viewport with offset
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= offset &&
            rect.left >= offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) - offset
        );
    },

    // Get random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Clamp number between min and max
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },

    // Linear interpolation
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    // Map number from one range to another
    map(value, start1, stop1, start2, stop2) {
        return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    },

    // Check device capabilities
    deviceCapabilities: {
        supportsWebGL: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            } catch (e) {
                return false;
            }
        })(),
        
        supportsWebAnimations: typeof Element.prototype.animate === 'function',
        
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
};

// Initialize the enhanced landing page
document.addEventListener('DOMContentLoaded', () => {
    // Wait for React to render
    setTimeout(() => {
        new ModernLandingPage();
        console.log('🚀 AIResume Pro 2025 - Modern Landing Page Initialized');
        console.log('💡 Powered by React + Tailwind CSS + Framer Motion concepts');
    }, 1000);
});

// Export for global access
window.ModernLandingPage = ModernLandingPage;
window.modernUtils = modernUtils;