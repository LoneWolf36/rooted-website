/**
 * Alpine.js Component Functions for Rooted Website
 * Enhanced with premium UX patterns and micro-interactions
 */

/**
 * Navigation bar logic: Enhanced with scroll-reactive logo
 */
function navBar() {
    return {
        mobileNavOpen: false,
        scrolled: false,
        navLinks: [
            { href: '#home', label: 'Home' },
            { href: '#origin', label: 'Origin' },
            { href: '#ritual', label: 'Ritual' },
            { href: '#pantry', label: 'Pantry' },
            { href: '#community', label: 'Community' }
        ],
        navLinkClass: 'relative px-2 py-1',
        
        init() {
            // Track scroll for navbar shrinking
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 100;
            });
        },
        
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) {
                // Close mobile nav if open
                this.mobileNavOpen = false;
                
                // Smooth scroll with offset for fixed header
                const headerOffset = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
}

/**
 * Hero Carousel Component - User-controlled (no auto-advance)
 */
function heroCarousel() {
    return {
        currentImageIndex: 0,
        heroImages: [
            './assets/product/2.png',
            './assets/generated/origin_artistic_seed.png',
            './assets/generated/ritual_harvest.png'
        ],
        touchStartX: 0,
        touchEndX: 0,
        
        init() {
            // No auto-rotation - user controls experience
            // Add touch/swipe support for mobile
            const container = this.$el;
            if (container) {
                container.addEventListener('touchstart', (e) => {
                    this.touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });
                
                container.addEventListener('touchend', (e) => {
                    this.touchEndX = e.changedTouches[0].screenX;
                    this.handleSwipe();
                }, { passive: true });
            }
        },
        
        handleSwipe() {
            const swipeThreshold = 50;
            const diff = this.touchStartX - this.touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextImage();
                } else {
                    this.prevImage();
                }
            }
        },
        
        nextImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
        },
        
        prevImage() {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.heroImages.length) % this.heroImages.length;
        },
        
        goToImage(index) {
            this.currentImageIndex = index;
        }
    };
}

/**
 * Horizontal Ritual Scroll Gallery (Desktop Only)
 * Premium side-scrolling gallery with scroll progress tracking
 */
function ritualScrollGallery() {
    return {
        scrollProgress: 0,
        ritualSteps: [
            {
                emoji: '🪷',
                title: 'Harvested',
                description: 'Farmers dive into the ponds to hand-pick the prickly water lily pods.',
                image: './assets/generated/ritual_harvest.png'
            },
            {
                emoji: '☀️',
                title: 'Sun-Dried',
                description: 'The seeds are dried under the intense Indian sun to reduce moisture naturally.',
                image: './assets/generated/ritual_sundried.png'
            },
            {
                emoji: '🔥',
                title: 'Roasted & Popped',
                description: 'Roasted in clay pots over a fire, then hand-popped with a wooden mallet.',
                image: './assets/generated/ritual_popping.png'
            },
            {
                emoji: '🧂',
                title: 'Seasoned',
                description: 'Tossed in olive oil and dusted with Himalayan Pink Salt. Simple. Perfect.',
                image: './assets/generated/ritual_seasoning.png'
            }
        ],
        
        init() {
            // Track scroll progress within the gallery
            const gallery = this.$el;
            if (gallery) {
                gallery.addEventListener('scroll', () => {
                    const scrollLeft = gallery.scrollLeft;
                    const scrollWidth = gallery.scrollWidth - gallery.clientWidth;
                    this.scrollProgress = (scrollLeft / scrollWidth) * 100;
                }, { passive: true });
            }
        },
        
        scrollToStep(index) {
            const gallery = this.$el;
            const cards = gallery.querySelectorAll('.ritual-gallery-card');
            if (cards[index]) {
                cards[index].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }
}

/**
 * Sticky CTA bar with scroll progress indicator
 */
function stickyCtaBar() {
    return {
        visible: true,
        scrollProgress: 0,
        
        init() {
            this.observeFooter();
            this.trackScrollProgress();
        },
        
        observeFooter() {
            const footer = document.querySelector('footer');
            if (footer) {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        this.visible = !entry.isIntersecting;
                    });
                }, { threshold: 0.01 });
                observer.observe(footer);
            }
        },
        
        trackScrollProgress() {
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = window.scrollY;
                this.scrollProgress = (scrolled / windowHeight) * 100;
            }, { passive: true });
        }
    }
}

/**
 * Root Alpine.js app: Enhanced two-step popup with progressive disclosure
 */
function rootedApp() {
    return {
        showEmailPopup: false,
        emailStep: 1, // Step 1: email only, Step 2: name
        emailValue: '',
        showSuccess: false,
        mobileNavOpen: false,
        lastFocused: null,
        _onEscape: null,
        
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) {
                const headerOffset = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        },
        
        openEmailPopup() {
            this.showEmailPopup = true;
            this.emailStep = 1;
            this.showSuccess = false;
            document.body.classList.add('overflow-hidden');
            
            setTimeout(() => {
                const popup = this.$refs?.popup || document.querySelector('[x-show=showEmailPopup] .glass-light');
                if (popup) popup.focus();
                this.lastFocused = document.activeElement;
                
                // Focus on email input
                const emailInput = document.getElementById('email');
                if (emailInput) emailInput.focus();
            }, 100);
        },
        
        closeEmailPopup() {
            this.showEmailPopup = false;
            this.emailStep = 1;
            this.emailValue = '';
            document.body.classList.remove('overflow-hidden');
            
            if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
                setTimeout(() => this.lastFocused.focus(), 100);
            }
        },
        
        focusTrap(e) {
            const popup = this.$refs?.popup || document.querySelector('[x-show=showEmailPopup] .glass-light');
            const focusable = Array.from(popup.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])'))
                .filter(el => !el.disabled && el.offsetParent !== null);
            
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
            
            // Delayed popup: 30 seconds, only once per session
            if (!sessionStorage.getItem('popupShown')) {
                setTimeout(() => {
                    if (!this.showEmailPopup) {
                        this.openEmailPopup();
                        sessionStorage.setItem('popupShown', 'true');
                    }
                }, 30000);
            }
        },
        
        setupWaitlistForm() {
            const form = document.getElementById('waitlist-form');
            if (!form) return;
            if (form.dataset.listenerAdded) return;
            form.dataset.listenerAdded = 'true';
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const email = formData.get('email');
                const firstName = formData.get('firstName');
                
                // Simple validation
                if (!email || !this.isValidEmail(email)) {
                    this.showFormError('Please enter a valid email address.');
                    return;
                }
                
                if (this.emailStep === 1 && !firstName) {
                    // Progress to step 2
                    this.emailValue = email;
                    this.emailStep = 2;
                    
                    // Focus on first name field
                    setTimeout(() => {
                        const nameInput = document.getElementById('firstName');
                        if (nameInput) nameInput.focus();
                    }, 100);
                    return;
                }
                
                // Submit form
                await this.submitWaitlist({ email, firstName });
            });
        },
        
        isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        
        showFormError(message) {
            // Simple alert for now - could be enhanced with inline error display
            alert(message);
        },
        
        async submitWaitlist(data) {
            const submitBtn = document.querySelector('#waitlist-form button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Joining...';
            }
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success
                this.showSuccess = true;
                
                // Auto-close after 3 seconds
                setTimeout(() => {
                    this.closeEmailPopup();
                    this.showSuccess = false;
                    
                    // Reset form
                    const form = document.getElementById('waitlist-form');
                    if (form) form.reset();
                }, 3000);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                this.showFormError('Sorry, something went wrong. Please try again.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Get 15% Off';
                }
            }
        },
        
        destroy() {
            if (this._onEscape) window.removeEventListener('keydown', this._onEscape);
        }
    }
}

/**
 * Testimonial Carousel - Controlled advancement
 */
function testimonialCarousel() {
    return {
        testimonials: [
            { 
                quote: 'Absolutely delicious and guilt-free. My new go-to snack!', 
                author: 'Alex Chen',
                rating: 5
            },
            { 
                quote: 'Crispy, light, and so satisfying. Love the Himalayan salt flavor!', 
                author: 'Priya Sharma',
                rating: 5
            },
            { 
                quote: 'Finally a snack that tastes amazing and is actually healthy.', 
                author: 'Jordan Mitchell',
                rating: 5
            }
        ],
        current: 0,
        autoInterval: null,
        
        next() {
            this.current = (this.current + 1) % this.testimonials.length;
        },
        
        goTo(idx) {
            this.current = idx;
            // Restart auto-rotation when user clicks
            this.restartAuto();
        },
        
        startAuto() {
            this.autoInterval = setInterval(() => { this.next(); }, 6000);
        },
        
        restartAuto() {
            if (this.autoInterval) clearInterval(this.autoInterval);
            this.startAuto();
        },
        
        init() {
            this.startAuto();
        },
        
        destroy() {
            if (this.autoInterval) clearInterval(this.autoInterval);
        }
    }
}

/**
 * Scroll-to-top button with progress indicator
 */
function scrollToTopButton() {
    return {
        show: false,
        scrollProgress: 0,
        _onScroll: null,
        
        init() {
            this._onScroll = () => {
                this.show = window.scrollY > 300;
                
                // Calculate scroll progress
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = window.scrollY;
                this.scrollProgress = (scrolled / windowHeight) * 100;
            };
            window.addEventListener('scroll', this._onScroll, { passive: true });
        },
        
        scrollToTop() {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        },
        
        destroy() {
            window.removeEventListener('scroll', this._onScroll);
        }
    }
}

/**
 * Instagram Feed Component - Live feed with fallback
 * Displays Instagram posts from @weare_rooted
 */
function instagramFeed() {
    return {
        posts: [],
        loading: true,
        error: false,
        username: 'weare_rooted',
        
        fallbackPosts: [
            {
                id: '1',
                image: './assets/mission/mission1.png',
                caption: 'Discover the ancient superfood 🌿',
                likes: 245,
                link: 'https://www.instagram.com/weare_rooted/'
            },
            {
                id: '2',
                image: './assets/mission/mission2.png',
                caption: 'Hand-harvested from pristine ponds 💧',
                likes: 312,
                link: 'https://www.instagram.com/weare_rooted/'
            },
            {
                id: '3',
                image: './assets/mission/mission3.png',
                caption: 'Sustainably grown, mindfully popped 🌱',
                likes: 189,
                link: 'https://www.instagram.com/weare_rooted/'
            },
            {
                id: '4',
                image: './assets/mission/mission4.png',
                caption: 'Join the Rooted family today! ✨',
                likes: 276,
                link: 'https://www.instagram.com/weare_rooted/'
            }
        ],
        
        init() {
            // Use fallback posts immediately for better performance
            // Instagram API integration can be added via backend proxy
            this.posts = this.fallbackPosts;
            this.loading = false;
            
            // Optional: Fetch live posts if API endpoint available
            // this.fetchInstagramPosts();
        },
        
        async fetchInstagramPosts() {
            // This requires a backend proxy to Instagram API
            // For now, using fallback posts
            try {
                // const response = await fetch('/api/instagram/feed');
                // const data = await response.json();
                // this.posts = data.posts;
                this.posts = this.fallbackPosts;
                this.loading = false;
            } catch (err) {
                console.error('Instagram feed error:', err);
                this.posts = this.fallbackPosts;
                this.loading = false;
                this.error = true;
            }
        },
        
        getInstagramUrl() {
            return `https://www.instagram.com/${this.username}/`;
        }
    };
}

// Alpine.js directive for intersection observer animations
document.addEventListener('alpine:init', () => {
    Alpine.directive('intersect', (el, { expression }, { evaluateLater, cleanup }) => {
        let evaluate = evaluateLater(expression);
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    evaluate();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(el);
        cleanup(() => observer.disconnect());
    });
    
    // Image fallback directive
    Alpine.directive('imgfallback', (el, { expression }) => {
        el.onerror = () => {
            el.onerror = null;
            el.src = expression;
        };
    });
});

// Register components globally
window.navBar = navBar;
window.heroCarousel = heroCarousel;
window.ritualScrollGallery = ritualScrollGallery;
window.instagramFeed = instagramFeed;
window.stickyCtaBar = stickyCtaBar;
window.rootedApp = rootedApp;
window.scrollToTopButton = scrollToTopButton;
window.testimonialCarousel = testimonialCarousel;