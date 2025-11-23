/**
 * GSAP Animations for Rooted Website
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // 1. Sanctuary (Hero)
    const heroTl = gsap.timeline();
    heroTl.to('[data-gsap-hero="title"]', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
        .to('[data-gsap-hero="subtitle"]', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
        .to('[data-gsap-hero="cta"]', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.8')
        .to('[data-gsap-hero="product"]', { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=1');

    gsap.to('[data-gsap-parallax="bg"]', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '#sanctuary',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 2. Origin (Story)
    gsap.from('#origin img', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#origin',
            start: 'top 70%',
        }
    });

    gsap.from('#origin .text-left > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#origin',
            start: 'top 60%',
        }
    });

    // 3. Ritual (Vertical Journey)
    const ritualSteps = document.querySelectorAll('#ritual .group');
    ritualSteps.forEach((step, i) => {
        gsap.from(step.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
            }
        });
    });

    // 4. Pantry (Flavors)
    gsap.from('#pantry .max-w-5xl', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#pantry',
            start: 'top 70%',
        }
    });

    // 5. Community
    gsap.from('#community .grid > div', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
            trigger: '#community .grid',
            start: 'top 75%',
        }
    });

    // Navbar Scroll Effect
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'glass-base', targets: 'header' }
    });
});
