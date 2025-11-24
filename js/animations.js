/**
 * GSAP Animations for Rooted Website
 * Enhanced with purposeful, elegant scroll-triggered animations
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Set default ease for all animations
    gsap.defaults({
        ease: 'power2.out',
        duration: 0.8
    });
    
    /**
     * 1. HERO SECTION - Enhanced entrance animation
     */
    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });
    
    // Animate hero elements with stagger
    heroTimeline
        .from('.hero-section-clean .inline-block', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: 0.2
        })
        .from('.hero-title', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.3')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-section-clean .btn', {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)'
        }, '-=0.4')
        .from('.hero-section-clean .text-center.text-2xl', {
            opacity: 0,
            y: 15,
            duration: 0.6,
            stagger: 0.15
        }, '-=0.3');
    
    // Subtle parallax on hero background
    gsap.to('.hero-section-clean::before', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section-clean',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    /**
     * 2. ORIGIN SECTION - Split-screen parallax effect
     */
    ScrollTrigger.create({
        trigger: '#origin',
        start: 'top center',
        onEnter: () => {
            gsap.from('#origin img', {
                scale: 1.2,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out'
            });
            
            gsap.from('#origin .text-left > *', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        },
        once: true
    });
    
    // Parallax scale on origin image
    gsap.to('#origin img', {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
            trigger: '#origin',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    /**
     * 3. RITUAL SECTION - Timeline steps animation
     */
    const ritualSteps = document.querySelectorAll('#ritual .group');
    
    ritualSteps.forEach((step, index) => {
        const isEven = index % 2 === 0;
        
        gsap.from(step.children, {
            y: 60,
            x: isEven ? -30 : 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate ritual mobile cards
    const ritualCards = document.querySelectorAll('.ritual-card');
    
    gsap.from(ritualCards, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.ritual-scroll-snap',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    /**
     * 4. PANTRY SECTION - Product spotlight with rotation
     */
    ScrollTrigger.create({
        trigger: '#pantry',
        start: 'top center',
        onEnter: () => {
            // Animate product image
            gsap.from('#pantry img[alt="Himalayan Pink Salt"]', {
                scale: 0.8,
                opacity: 0,
                rotationY: -15,
                duration: 1.2,
                ease: 'back.out(1.2)'
            });
            
            // Animate description elements
            gsap.from('#pantry .md\\:w-1\\/2.p-8 > *', {
                x: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        },
        once: true
    });
    
    // Subtle 3D rotation on scroll
    gsap.to('#pantry img[alt="Himalayan Pink Salt"]', {
        rotationY: 5,
        ease: 'none',
        scrollTrigger: {
            trigger: '#pantry',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
        }
    });
    
    /**
     * 5. COMMUNITY SECTION - Staggered grid entrance
     */
    ScrollTrigger.create({
        trigger: '#community',
        start: 'top 75%',
        onEnter: () => {
            // Animate testimonial section
            gsap.from('#community .mb-24 > *', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });
            
            // Animate Instagram grid
            gsap.from('#community .grid > a', {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'back.out(1.5)'
            });
            
            // Animate footer
            gsap.from('footer', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        },
        once: true
    });
    
    /**
     * 6. NAVBAR - Scroll-reactive behavior
     */
    let lastScroll = 0;
    
    ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
            const currentScroll = self.scroll();
            const header = document.querySelector('header');
            
            if (!header) return;
            
            // Shrink navbar on scroll down
            if (currentScroll > 100) {
                header.classList.add('navbar-scrolled');
            } else {
                header.classList.remove('navbar-scrolled');
            }
            
            // Hide on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 200) {
                gsap.to(header, {
                    y: -100,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            } else {
                gsap.to(header, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            }
            
            lastScroll = currentScroll;
        }
    });
    
    /**
     * 7. MARQUEE - Smooth infinite scroll (already in CSS)
     * Enhanced hover behavior
     */
    const marquee = document.querySelector('.marquee-content-premium');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => {
            gsap.to(marquee, {
                animationPlayState: 'paused',
                duration: 0.3
            });
        });
        
        marquee.addEventListener('mouseleave', () => {
            gsap.to(marquee, {
                animationPlayState: 'running',
                duration: 0.3
            });
        });
    }
    
    /**
     * 8. BUTTON MICRO-INTERACTIONS - Ripple effect on click
     */
    document.querySelectorAll('.btn, .btn--primary').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Animate ripple
            gsap.fromTo(ripple,
                {
                    scale: 0,
                    opacity: 0.5
                },
                {
                    scale: 2,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                }
            );
        });
    });
    
    /**
     * 9. SCROLL PROGRESS INDICATOR
     */
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            start: 'top top',
            end: 'max',
            scrub: 0.3
        }
    });
    
    /**
     * 10. PERFORMANCE OPTIMIZATION
     * Disable animations on low-performance devices
     */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.globalTimeline.clear();
    }
    
    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            ScrollTrigger.getAll().forEach(trigger => trigger.disable());
        } else {
            ScrollTrigger.getAll().forEach(trigger => trigger.enable());
        }
    });
    
    console.log('✨ Rooted animations initialized');
});

/**
 * Add ripple styles dynamically
 */
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        .btn, .btn--primary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            pointer-events: none;
            transform: scale(0);
        }
        
        .navbar-scrolled {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
        }
        
        .navbar-scrolled img {
            height: 2rem !important;
        }
    `;
    document.head.appendChild(style);
}