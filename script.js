// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add coin flip animation
    themeToggle.style.transform = 'rotateY(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotateY(0deg)';
    }, 300);
});

// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// Smooth cursor following with easing
function animateCursor() {
    const ease = 0.15;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    cursorGlow.style.left = cursorX - 10 + 'px';
    cursorGlow.style.top = cursorY - 10 + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
});

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        setTimeout(() => {
            typeWriter(typewriterElement, text, 150);
        }, 1000);
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for skill bubbles
            if (entry.target.classList.contains('skill-bubble')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.fade-up, .slide-left, .slide-right, .flip-card, .skill-bubble, .project-card, .process-step'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize floating skills animation
    initFloatingSkills();
    
    // Initialize new animations
    initNewAnimations();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Card Magnetic Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.setAttribute('action', 'https://formspree.io/f/xpznvbko');
    contactForm.setAttribute('method', 'POST');
    
    contactForm.addEventListener('submit', (e) => {
        // Don't prevent default - let Formspree handle it
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Button morphing animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.style.background = 'var(--gradient-2)';
        submitBtn.disabled = true;
    });
}

// Form Input Focus Effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentNode.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentNode.style.transform = 'scale(1)';
    });
});

// Skill Bubble Hover Effects
document.querySelectorAll('.skill-bubble').forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
        bubble.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    bubble.addEventListener('mouseleave', () => {
        bubble.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Navigation Active State
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Parallax Effect for Background Orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate SVG icons if any
    const svgIcons = document.querySelectorAll('svg path');
    svgIcons.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `drawSVG 2s ease ${index * 0.1}s forwards`;
    });
});

// Add CSS for SVG animation
const style = document.createElement('style');
style.textContent = `
    @keyframes drawSVG {
        to {
            stroke-dashoffset: 0;
        }
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    body.loaded .hero-content {
        animation: fadeInScale 1s ease forwards;
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger special animation
        document.body.style.animation = 'rainbow 2s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Initialize Floating Skills
function initFloatingSkills() {
    const floatingSkills = document.querySelectorAll('.floating-skill');
    
    floatingSkills.forEach((skill, index) => {
        const delay = parseFloat(skill.getAttribute('data-delay')) * 1000;
        
        setTimeout(() => {
            skill.style.animationPlayState = 'running';
        }, delay);
        
        // Restart animation when it ends
        skill.addEventListener('animationend', () => {
            setTimeout(() => {
                skill.style.animation = 'none';
                setTimeout(() => {
                    skill.style.animation = 'floatUp 8s ease-in-out infinite';
                }, 100);
            }, Math.random() * 3000 + 2000);
        });
    });
}

// Initialize New Animations
function initNewAnimations() {
    // Animation 1: Breathing effect on hero orbs
    document.querySelectorAll('.gradient-orb').forEach(orb => {
        orb.classList.add('breathing');
    });
    
    // Animation 2: Liquid morph on skill bubbles
    document.querySelectorAll('.skill-bubble').forEach((bubble, index) => {
        if (index % 2 === 0) {
            bubble.classList.add('liquid-morph');
        }
    });
    
    // Animation 3: Glitch effect on logo (on hover)
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.setAttribute('data-text', logo.textContent);
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('glitch');
            setTimeout(() => {
                logo.classList.remove('glitch');
            }, 1000);
        });
    }
    
    // Animation 4: Particle trail on navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('particle-trail');
            setTimeout(() => {
                link.classList.remove('particle-trail');
            }, 3000);
        });
    });
    
    // Animation 5: Elastic bounce on submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
            submitBtn.classList.add('elastic-bounce');
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            submitBtn.classList.remove('elastic-bounce');
        });
    }
}

// Enhanced scroll animations with stagger
function initStaggeredAnimations() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    processSteps.forEach(step => {
        processObserver.observe(step);
    });
}

// Initialize staggered animations
document.addEventListener('DOMContentLoaded', () => {
    initStaggeredAnimations();
});

// Enhanced magnetic effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', () => {
        isHovering = true;
        card.style.transition = 'transform 0.1s ease-out';
    });
    
    card.addEventListener('mouseleave', () => {
        isHovering = false;
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
    
    card.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
});

// Process step animations
const processStepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const step = entry.target;
            const stepNumber = step.getAttribute('data-step');
            
            setTimeout(() => {
                step.classList.add('visible');
                
                // Trigger specific animations based on step
                if (stepNumber === '1') {
                    const sketchLines = step.querySelectorAll('.sketch-line');
                    sketchLines.forEach((line, index) => {
                        setTimeout(() => {
                            line.style.animationPlayState = 'running';
                        }, index * 200);
                    });
                }
            }, parseInt(stepNumber) * 150);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.process-step').forEach(step => {
        processStepObserver.observe(step);
    });
});
