/**
 * Global Utilities for Rooted Website
 */

/**
 * Debounce utility for throttling events.
 */
function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Animation helper: fades/scales in an element with a delay.
 */
function animateIn(el, delay = 0) {
    setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-8', 'translate-x-8', 'scale-95', 'scale-90');
        el.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100');
    }, delay);
}

/**
 * Animation helper: applies a bounce animation to an element after a delay.
 */
function delayedBounce(el) {
    setTimeout(() => {
        el.classList.add('animate-bounce');
    }, 600);
}

// Export to window for global access if needed (though these are global by default in browser)
window.debounce = debounce;
window.animateIn = animateIn;
window.delayedBounce = delayedBounce;
