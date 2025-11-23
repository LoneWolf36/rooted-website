/**
 * Alpine.js Component Functions for Rooted Website
 */

/**
 * Navigation bar logic: handles nav links, mobile drawer, and smooth scroll.
 */
function navBar() {
    return {
        mobileNavOpen: false,
        navLinks: [
            { href: '#sanctuary', label: 'Sanctuary' },
            { href: '#origin', label: 'Origin' },
            { href: '#ritual', label: 'Ritual' },
            { href: '#pantry', label: 'Pantry' },
            { href: '#community', label: 'Community' }
        ],
        navLinkClass: 'relative px-2 py-1',
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
}

/**
 * Sticky CTA bar for mobile: shows/hides based on footer visibility.
 */
function stickyCtaBar() {
    return {
        visible: true,
        ctaText: 'Get 15% Off – Join the Waitlist!',
        buttonLabel: 'Sign Up',
        buttonClass: 'btn btn--primary',
        observeFooter() {
            const footer = document.querySelector('footer');
            const cta = this.$el;
            if (footer && cta) {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        this.visible = !entry.isIntersecting;
                    });
                }, { threshold: 0.01 });
                observer.observe(footer);
            }
        },
        init() {
            this.observeFooter();
        }
    }
}

/**
 * Desktop floating CTA button logic.
 */
function desktopCtaButton() {
    return {
        buttonLabel: 'Get 15% Off – Join Waitlist',
        buttonClass: 'btn btn--primary',
    }
}

/**
 * Root Alpine.js app: manages global state (email popup, nav, focus trap, etc).
 */
function rootedApp() {
    return {
        showEmailPopup: false,
        mobileNavOpen: false,
        lastFocused: null,
        _onEscape: null,
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        openEmailPopup() {
            this.showEmailPopup = true;
            document.body.classList.add('overflow-hidden');
            setTimeout(() => {
                const popup = this.$refs && this.$refs.popup ? this.$refs.popup : document.querySelector('[x-show=showEmailPopup] .glass-light');
                if (popup) popup.focus();
                this.lastFocused = document.activeElement;
            }, 100);
        },
        closeEmailPopup() {
            this.showEmailPopup = false;
            document.body.classList.remove('overflow-hidden');
            if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
                setTimeout(() => this.lastFocused.focus(), 100);
            }
        },
        focusTrap(e) {
            const popup = this.$refs && this.$refs.popup ? this.$refs.popup : document.querySelector('[x-show=showEmailPopup] .glass-light');
            const focusable = Array.from(popup.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])')).filter(el => !el.disabled && el.offsetParent !== null);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        },
        init() {
            // Accessibility: Close popup on Escape
            this._onEscape = (e) => {
                if (e.key === 'Escape' && this.showEmailPopup) {
                    this.closeEmailPopup();
                }
            };
            window.addEventListener('keydown', this._onEscape);
            this.setupWaitlistForm();

            // Delayed popup: Show after 10 seconds, only once per session
            if (!sessionStorage.getItem('popupShown')) {
                setTimeout(() => {
                    if (!this.showEmailPopup) {  // Only if not already open
                        this.openEmailPopup();
                        sessionStorage.setItem('popupShown', 'true');  // Mark as shown
                    }
                }, 1000000);  // 10 seconds delay
            }
        },
        setupWaitlistForm() {
            const form = document.getElementById('waitlist-form');
            if (!form) return;
            if (form.dataset.listenerAdded) return;  // Skip if already added
            form.dataset.listenerAdded = 'true';     // Flag to prevent duplicates

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = document.getElementById('submit-btn');
                const submitText = document.getElementById('submit-text');
                const submitLoading = document.getElementById('submit-loading');
                const successMessage = document.getElementById('success-message');
                const formElement = document.getElementById('waitlist-form');
                const formData = new FormData(form);
                const data = {
                    firstName: formData.get('firstName') || formData.get('name'),
                    email: formData.get('email')
                };

                // Frontend validation
                if (!data.firstName || !data.email) {
                    alert('Please fill in all required fields.');
                    return;
                }

                // Disable button immediately to prevent double-submits
                submitBtn.disabled = true;
                submitText.classList.add('hidden');
                submitLoading.classList.remove('hidden');

                try {
                    // Placeholder for actual submission logic
                    // Simulate network request
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Assume success
                    formElement.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    setTimeout(() => {
                        this.closeEmailPopup();
                        form.reset();
                        formElement.classList.remove('hidden');
                        successMessage.classList.add('hidden');
                    }, 3000);
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('Sorry, something went wrong. Please try again.');
                } finally {
                    submitText.classList.remove('hidden');
                    submitLoading.classList.add('hidden');
                    setTimeout(() => { submitBtn.disabled = false; }, 1000);  // Re-enable after delay
                }
            });
        },

        destroy() {
            if (this._onEscape) window.removeEventListener('keydown', this._onEscape);
        }
    }
}

// Alpine.js component for scroll-to-top button
function scrollToTopButton() {
    return {
        show: false,
        _onScroll: null,
        init() {
            this._onScroll = () => { this.show = window.scrollY > 200 };
            window.addEventListener('scroll', this._onScroll);
        },
        destroy() {
            window.removeEventListener('scroll', this._onScroll);
        }
    }
}

/**
 * Testimonial carousel: manages testimonials, auto-advance, and responsive display.
 */
function testimonialCarousel() {
    return {
        testimonials: [
            { quote: 'Absolutely delicious and guilt-free. My new go-to snack!', author: 'Alex' },
            { quote: 'Crispy, light, and so satisfying. Love the Himalayan salt flavor!', author: 'Priya' },
            { quote: 'Finally a snack that tastes amazing and is actually healthy.', author: 'Jordan' }
        ],
        current: 0,
        autoInterval: null,
        next() {
            this.current = (this.current + 1) % this.testimonials.length;
        },
        goTo(idx) {
            this.current = idx;
        },
        startAuto() {
            this.autoInterval = setInterval(() => { this.next(); }, 5000);
        },
        init() {
            this.startAuto();
        },
        destroy() {
            if (this.autoInterval) clearInterval(this.autoInterval);
        }
    }
}

// Register Alpine.js directives
document.addEventListener('alpine:init', () => {
    Alpine.directive('intersect', (el, { expression }, { evaluateLater, cleanup }) => {
        let evaluate = evaluateLater(expression)
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    evaluate()
                    observer.disconnect()
                }
            })
        })
        observer.observe(el)
        cleanup(() => observer.disconnect())
    });
    Alpine.directive('imgfallback', (el, { expression }) => {
        el.onerror = () => {
            el.onerror = null;
            el.src = expression;
        };
    });
});

// Register components globally
window.navBar = navBar;
window.stickyCtaBar = stickyCtaBar;
window.desktopCtaButton = desktopCtaButton;
window.rootedApp = rootedApp;
window.scrollToTopButton = scrollToTopButton;
window.testimonialCarousel = testimonialCarousel;
