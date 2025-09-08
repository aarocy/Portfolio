// Premium Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Premium theme toggle with smooth transitions
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth theme change
    body.classList.add('theme-transitioning');
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Premium coin flip animation
    themeToggle.style.transform = 'rotateY(180deg) scale(1.1)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotateY(0deg) scale(1)';
        body.classList.remove('theme-transitioning');
    }, 400);
});

// Premium Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let isMoving = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '0.8';
    isMoving = true;
    
    // Add pulse effect when moving
    cursorGlow.style.transform = 'scale(1.2)';
    clearTimeout(cursorGlow.timeout);
    cursorGlow.timeout = setTimeout(() => {
        cursorGlow.style.transform = 'scale(1)';
        isMoving = false;
    }, 100);
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
    isMoving = false;
});

// Enhanced cursor following with premium easing
function animateCursor() {
    const ease = isMoving ? 0.2 : 0.1;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    cursorGlow.style.left = cursorX - 20 + 'px';
    cursorGlow.style.top = cursorY - 20 + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Premium Scroll Progress Bar with glow effect
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
    
    // Add glow intensity based on scroll progress
    const glowIntensity = Math.min(scrollPercent / 100, 1);
    scrollProgress.style.boxShadow = `0 0 ${20 + glowIntensity * 20}px rgba(99, 102, 241, ${0.3 + glowIntensity * 0.4})`;
});

// Premium Navigation Scroll Effect
let lastScrollTop = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Hide/show nav on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Premium Typewriter Effect with realistic typing
function premiumTypeWriter(element, text, speed = 120) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            
            // Vary typing speed for more human feel
            const variance = Math.random() * 50 - 25;
            const currentSpeed = speed + variance;
            
            // Add slight pause after punctuation
            const isPunctuation = /[.,!?;:]/.test(text.charAt(i - 1));
            const delay = isPunctuation ? currentSpeed + 200 : currentSpeed;
            
            setTimeout(type, delay);
        } else {
            // Add final cursor blink
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 2000);
        }
    }
    
    type();
}

// Initialize premium typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        setTimeout(() => {
            premiumTypeWriter(typewriterElement, text, 100);
        }, 1500);
    }
});

// Premium Intersection Observer with staggered animations
const premiumObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const premiumObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered animation delays
            const delay = index * 150;
            
            setTimeout(() => {
                entry.target.classList.add('visible');
                
                // Special handling for skill bubbles with wave effect
                if (entry.target.classList.contains('skill-bubble')) {
                    const bubbles = entry.target.parentNode.children;
                    const bubbleIndex = Array.from(bubbles).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        // Add ripple effect
                        entry.target.style.animation = 'bubbleRipple 0.6s ease forwards';
                    }, bubbleIndex * 100);
                }
                
                // Special handling for project cards
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'slideInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }
            }, delay);
        }
    });
}, premiumObserverOptions);

// Observe elements for premium animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.fade-up, .slide-left, .slide-right, .flip-card, .skill-bubble, .project-card, .service-card'
    );
    
    animatedElements.forEach(el => {
        premiumObserver.observe(el);
    });
    
    // Initialize premium floating skills
    initPremiumFloatingSkills();
    
    // Initialize magnetic effects
    initMagneticEffects();
    
    // Initialize premium parallax
    initPremiumParallax();
});

// Premium Smooth Scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 100;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Premium Project Card Magnetic Effect
function initMagneticEffects() {
    document.querySelectorAll('.project-card, .service-card, .skill-bubble').forEach(card => {
        let isHovering = false;
        
        card.addEventListener('mouseenter', () => {
            isHovering = true;
            card.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
        });
    });
}

// Premium Form Handling with enhanced UX
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
        
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
    
    function validateInput(input) {
        const isValid = input.checkValidity();
        const formGroup = input.parentNode;
        
        formGroup.classList.remove('error', 'success');
        
        if (input.value.length > 0) {
            if (isValid) {
                formGroup.classList.add('success');
            } else {
                formGroup.classList.add('error');
            }
        }
    }
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const originalText = submitBtn.innerHTML;
        
        // Premium loading animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            // Error animation
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Premium Form Input Focus Effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentNode.style.transform = 'scale(1.02)';
        input.parentNode.style.zIndex = '10';
    });
    
    input.addEventListener('blur', () => {
        input.parentNode.style.transform = 'scale(1)';
        input.parentNode.style.zIndex = '1';
    });
});

// Premium Navigation Active State with smooth transitions
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Premium Parallax Effect for Background Elements
function initPremiumParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.gradient-orb');
        const floatingSkills = document.querySelectorAll('.floating-skill');
        
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            const rotation = scrolled * 0.05;
            orb.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg) scale(${1 + Math.sin(scrolled * 0.001) * 0.1})`;
        });
        
        // Parallax for floating skills
        floatingSkills.forEach((skill, index) => {
            const speed = 0.1 + (index * 0.02);
            skill.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Premium Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements in sequence
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        }, index * 200);
    });
});

// Premium Floating Skills with enhanced physics
function initPremiumFloatingSkills() {
    const floatingSkills = document.querySelectorAll('.floating-skill');
    
    floatingSkills.forEach((skill, index) => {
        const delay = parseFloat(skill.getAttribute('data-delay')) * 1000;
        const randomOffset = Math.random() * 2000;
        
        setTimeout(() => {
            skill.style.animationPlayState = 'running';
            skill.style.animationDelay = randomOffset + 'ms';
        }, delay);
        
        // Add random horizontal drift
        const drift = (Math.random() - 0.5) * 100;
        skill.style.setProperty('--drift', drift + 'px');
        
        // Restart animation with random delay
        skill.addEventListener('animationend', () => {
            const restartDelay = Math.random() * 5000 + 3000;
            setTimeout(() => {
                skill.style.animation = 'none';
                setTimeout(() => {
                    skill.style.animation = 'premiumFloatUp 12s ease-in-out infinite';
                }, 100);
            }, restartDelay);
        });
    });
}

// Premium Easter Eggs and Interactions
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Premium rainbow effect
        document.body.style.animation = 'premiumRainbow 3s ease infinite';
        
        // Add floating hearts
        createFloatingHearts();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 6000);
    }
});

function createFloatingHearts() {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💜';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10000';
        heart.style.animation = 'floatHeart 4s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

// Premium Performance Optimizations
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Batch DOM updates here
    ticking = false;
}

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize optimizations
        initMagneticEffects();
    }, 250);
});

// Add premium CSS animations
const premiumStyle = document.createElement('style');
premiumStyle.textContent = `
    @keyframes bubbleRipple {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInScale {
        0% { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9); 
        }
        100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
    
    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes premiumRainbow {
        0% { filter: hue-rotate(0deg) saturate(1); }
        25% { filter: hue-rotate(90deg) saturate(1.5); }
        50% { filter: hue-rotate(180deg) saturate(2); }
        75% { filter: hue-rotate(270deg) saturate(1.5); }
        100% { filter: hue-rotate(360deg) saturate(1); }
    }
    
    @keyframes floatHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .form-group.success input,
    .form-group.success textarea {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .form-group.error input,
    .form-group.error textarea {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .theme-transitioning * {
        transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .nav-link.active::before {
        transform: translateX(-50%) scale(1);
    }
    
    .loaded .hero-content {
        animation: fadeInScale 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
`;
document.head.appendChild(premiumStyle);

// Premium accessibility enhancements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Premium reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Initialize all premium features
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Premium Portfolio Loaded - Crafted with precision and passion');
});