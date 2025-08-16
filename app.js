/*
  ============================================================================
  Rooted Website – Alpine.js App Logic & Animation Library (Documentation Template)
  ----------------------------------------------------------------------------
  This script centralizes all Alpine.js component functions, global utilities,
  animation helpers, and custom Alpine.js directives for maintainability.
  ----------------------------------------------------------------------------
  Sections:
    1. Alpine.js Component Functions (one per major UI section)
    2. Journey Animation Logic (imperative, curve-aligned)
    3. Global Utilities (debounce, etc.)
    4. Alpine.js Custom Directives (x-intersect, x-imgfallback)
  ============================================================================
*/

// ---------------------------------------------------------------------------
// 1. Alpine.js Component Functions
// ---------------------------------------------------------------------------

/**
 * Navigation bar logic: handles nav links, mobile drawer, and smooth scroll.
 */
function navBar() {
  return {
    mobileNavOpen: false,
    navLinks: [
      { href: '#hero', label: 'Home' },
      { href: '#benefits', label: 'Benefits' },
      { href: '#mission', label: 'Our Mission' },
      { href: '#signup', label: 'Get Early Access' }
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
 * Hero section: manages product image, use-cases, CTA, and plan steps.
 */
function heroSection() {
  return {
    productImage: './assets/product/2.png',
    productImageAlt: 'Rooted Himalayan Pink Salt Popped Water Lily Seeds snack bag, front view, on spotlight, with pink halo',
    useCases: [
      { label: 'Lunchbox Snack', icon: '🥪' },
      { label: 'Post-Yoga Fuel', icon: '🧘‍♂️' },
      { label: 'Movie Night', icon: '🍿' },
      { label: 'On-the-Go', icon: '🚗' },
    ],
    currentUseCase: 0,
    nextUseCase: null,
    transitioning: false,
    chipClass: [
      'glass-base inline-flex items-center gap-2 px-5 py-1.5 rounded-full font-bold text-lg border border-[var(--rooted-green)]/15 shadow-sm',
      'bg-[var(--rooted-yellow)]',
      'transition-all duration-300',
      'usecase-chip-animate-luxury',
      'will-change-opacity-transform',
      'chip-min-w',
      'chip-max-w',
      'chip-pop-anim'
    ].join(' '),
    mainCtaLabel: '🎉 Get 15% Off Your First Order & Free Samples',
    mainCtaClass: 'btn btn--primary',
    useCaseInterval: null,
    chipRef: null,
    popChip() {
      if (this.chipRef) {
        this.chipRef.classList.remove('chip-pop-anim');
        // Force reflow to restart animation
        void this.chipRef.offsetWidth;
        this.chipRef.classList.add('chip-pop-anim');
      }
    },
    init() {
      this.useCaseInterval = setInterval(() => {
        this.nextUseCase = (this.currentUseCase + 1) % this.useCases.length;
        this.transitioning = true;
        setTimeout(() => {
          this.currentUseCase = this.nextUseCase;
          this.nextUseCase = null;
          this.transitioning = false;
          this.$nextTick(() => {
            this.chipRef = this.$refs.chip;
            this.popChip();
          });
        }, 400); // match transition duration
      }, 2500);
      // Set chipRef on initial load
      this.$nextTick(() => {
        this.chipRef = this.$refs.chip;
      });
    },
    destroy() {
      if (this.useCaseInterval) clearInterval(this.useCaseInterval);
    }
  }
}

/**
 * "What Is" section: manages title, description, and illustration.
 */
function whatIsSection() {
  return {
    sectionTitle: 'What is a Popped Water Lily Seed?',
    sectionDescription: "Popped water lily seeds are a light, crunchy, and ancient superfood snack, enjoyed for centuries in Asia. Naturally gluten-free, plant-based, and deliciously satisfying!",
    illustrationImage: 'PATH_TO_ILLUSTRATION_IMAGE',
    illustrationAlt: 'Illustration of water lily seeds being popped in a pan, showcasing the snack preparation process'
  }
}

/**
 * Benefits section: displays product health benefits and image.
 */
function benefitsSection() {
  return {
    sectionTitle: "Super Snack That's Good For You",
    sectionDescription: "",
    benefits: [
      { icon: './assets/illustrations/less_in_fat.svg', alt: 'Up to 50% Less Fat', title: 'Up to 50% Less Fat*' },
      { icon: './assets/illustrations/source_of_fiber.svg', alt: 'Source Of Fibre', title: 'Source Of Fibre' },
      { icon: './assets/illustrations/antioxidant_punch.svg', alt: 'Antioxidant Punch', title: 'Antioxidant Punch' },
      { icon: './assets/illustrations/gluten_free.svg', alt: 'Gluten Free', title: 'Gluten Free' },
      { icon: './assets/illustrations/vegan.svg', alt: 'Vegan', title: 'Vegan' }
    ],
    productImage: 'PATH_TO_BENEFITS_IMAGE',
    productImageAlt: 'Rooted snack product with health benefits, bowl and bag on table'
  }
}

/**
 * Mission section: shows brand mission, description, and image.
 */
function missionSection() {
  return {
    sectionTitle: "Our Mission",
    sectionDescription: "At Rooted, we believe in joyful, mindful snacking. Our mission is to bring you delicious, plant-based treats that nourish your body, respect the planet, and celebrate global flavors. We're committed to sustainability, transparency, and making healthy choices easy and delightful.",
    missionImage: "PATH_TO_MISSION_IMAGE",
    missionImageAlt: "Rooted team planting water lilies"
  }
}

/**
 * Promise section: lists brand promises (nutritious, delicious, diverse).
 */
function promiseSection() {
  return {
    sectionTitle: "Our Promise",
    promises: [
      {
        title: 'Nutritious',
        desc: 'We get you powerful, plant-based nutrition sourced from climate-smart plants that support your well-being.'
      },
      {
        title: 'Delicious',
        desc: 'Flavor is at the heart of everything we do. We never cut corners, every bite is packed with satisfying flavors.'
      },
      {
        title: 'Diverse',
        desc: 'By partnering closely with local farms, we honor the rich heritage and biodiversity of South Asia, bringing you unique, thoughtfully sourced ingredients.'
      }
    ],
    tiltAngles: ['-2deg', '2deg', '-2deg'],
    hovered: null,
    init() {
      // No-op for now, but could be used for animation triggers
    }
  }
}

/**
 * Testimonial carousel: manages testimonials, auto-advance, and responsive display.
 */
function testimonialCarousel() {
  return {
    sectionTitle: "What Snackers Are Saying",
    testimonials: [
      { quote: 'Absolutely delicious and guilt-free. My new go-to snack!', author: 'Alex' },
      { quote: 'Crispy, light, and so satisfying. Love the Himalayan salt flavor!', author: 'Priya' }
    ],
    current: 0,
    autoInterval: null,
    isDesktop: window.innerWidth >= 768,
    groupFading: false,
    _debouncedResize: null,
    updateIsDesktop() {
      this.isDesktop = window.innerWidth >= 768;
    },
    next() {
      if (this.isDesktop) {
        this.groupFading = true;
        setTimeout(() => {
          this.current = (this.current + 1) % this.testimonials.length;
          this.groupFading = false;
        }, 150);
      } else {
        this.current = (this.current + 1) % this.testimonials.length;
      }
    },
    prev() {
      if (this.isDesktop) {
        this.groupFading = true;
        setTimeout(() => {
          this.current = (this.current - 1 + this.testimonials.length) % this.testimonials.length;
          this.groupFading = false;
        }, 150);
      } else {
        this.current = (this.current - 1 + this.testimonials.length) % this.testimonials.length;
      }
    },
    goTo(idx) {
      if (this.isDesktop) {
        this.groupFading = true;
        setTimeout(() => {
          this.current = idx;
          this.groupFading = false;
        }, 150);
      } else {
        this.current = idx;
      }
    },
    startAuto() {
      if (this.autoInterval) clearInterval(this.autoInterval);
      this.autoInterval = setInterval(() => { this.next(); }, 4000);
    },
    pauseAuto() {
      if (this.autoInterval) clearInterval(this.autoInterval);
    },
    init() {
      this.startAuto();
      this.updateIsDesktop();
      this._debouncedResize = debounce(this.updateIsDesktop.bind(this), 100);
      window.addEventListener('resize', this._debouncedResize);
      window.addEventListener('orientationchange', this._orientation);

      this.updateIsDesktop();
      this._orientation = () => { this.updateIsDesktop(); };
      window.addEventListener('orientationchange', this._orientation);
    },
    destroy() {
      window.removeEventListener('resize', this._debouncedResize);
      this.pauseAuto();
      window.removeEventListener('orientationchange', this._orientation);
    }
  }
}

/**
 * Email CTA section: manages email capture call-to-action.
 */
function emailCtaSection() {
  return {
    sectionTitle: "We're Rooting for Online Soon! 🌱",
    sectionDescription: "Updates popping into your inbox + 15% off your first order. Because you deserve snacks that love you back! 💚",
    buttonLabel: "Get Early Access Now",
    microcopy: "Join now to be the first to try Rooted!"
  }
}

/**
 * FAQ section: manages frequently asked questions and accordion logic.
 */
function faqSection() {
  return {
    sectionTitle: "Frequently Asked Questions",
    open: 0,
    faqs: [
      {
        q: "What are popped water lily seeds?",
        a: "Popped water lily seeds come from the Euryale ferox plant, traditionally sun-dried, roasted, and hand-popped to create a light, crunchy snack packed with nutrients. These seeds are harvested from water lilies that grow in the still ponds of Eastern India and surrounding regions."
      },
      {
        q: "Are popped water lily seeds gluten-free?",
        a: "Yes! Popped water lily seeds are naturally gluten-free, making them a great snack option for those with gluten sensitivities."
      },
      {
        q: "What nutritional benefits do popped water lily seeds offer?",
        a: "They're rich in plant-based protein, antioxidants, and essential minerals, providing clean, wholesome energy."
      },
      {
        q: "Are popped water lily seeds suitable for vegans?",
        a: "Absolutely! They're 100% plant-based and free from any animal products."
      },
      {
        q: "Can I use popped water lily seeds in recipes?",
        a: "Yes! They're great as a snack on their own or as a crunchy topping for salads, yogurt, and more."
      },
      {
        q: "How do I get early access, free samples, and my 15% off?",
        a: "Just join our waitlist above! We'll send you a code as soon as we launch. Welcome to the Rooted fam! 🌱"
      }
    ]
  }
}

/**
 * Footer section: manages social links, brand statement, and copyright.
 */
function footerSection() {
  return {
    instagramUrl: "https://instagram.com/weare_rooted",
    email: "hello@rootedfoods.com",
    logo: "./assets/logos/logo_rooted_beige.png",
    logoAlt: "Rooted Snacks logo",
    copyright: "Rooted. All rights reserved."
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
        if (e.key === 'Escape' && this.showEmailPopup) this.closeEmailPopup();
      };
      window.addEventListener('keydown', this._onEscape);

      // Handle waitlist form submission
      this.setupWaitlistForm();
    },
    setupWaitlistForm() {
      const form = document.getElementById('waitlist-form');
      if (!form) return;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitLoading = document.getElementById('submit-loading');
        const successMessage = document.getElementById('success-message');
        const formElement = document.getElementById('waitlist-form');

        // Show loading state
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        submitLoading.classList.remove('hidden');

        const formData = new FormData(form);
        const data = {
          firstName: formData.get('firstName') || formData.get('name'),
          email: formData.get('email')
        };

        try {
          // Create FormData for the request
          const requestFormData = new FormData();
          requestFormData.append('firstName', data.firstName);
          requestFormData.append('email', data.email);

          const response = await fetch('https://script.google.com/macros/s/AKfycbysXfx5w2jvz0YkGL3Sz9AfJ7MDmi_pZbo7GSEU5hy9Jxnxhl7zWR3yC8LWkIZh2F3vzg/exec', {
            method: 'POST',
            body: requestFormData
          });

          const result = await response.json();

          if (result.success) {
            // Show success message
            formElement.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Close popup after 3 seconds
            setTimeout(() => {
              this.closeEmailPopup();
              // Reset form
              form.reset();
              formElement.classList.remove('hidden');
              successMessage.classList.add('hidden');
            }, 3000);
          } else {
            throw new Error(result.error || 'Submission failed');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Sorry, something went wrong. Please try again.');
        } finally {
          // Reset button state
          submitBtn.disabled = false;
          submitText.classList.remove('hidden');
          submitLoading.classList.add('hidden');
        }
      });
    },

    destroy() {
      if (this._onEscape) window.removeEventListener('keydown', this._onEscape);
    }
  }
}

/**
 * Journey section: manages the Seed-to-Snack animation and all related listeners.
 */
function journeySection() {
  return {
    steps: window.journeySteps,
    // Per-step vertical offsets (in px)
    stepOffsetsDesktop: [-30, -10, -50], // for 3 steps: Seed, Pop, Snack
    stepOffsetsMobile: [-25, -20, 0],  // for 3 steps: Seed, Pop, Snack
    getStepOffsets() {
      return window.innerWidth <= 767 ? this.stepOffsetsMobile : this.stepOffsetsDesktop;
    },
    _parallax: null,
    _resize: null,
    _orientation: null,
    _hasAnimated: false,
    curveContainer: null,
    svg: null,
    path: null,
    pulse: null, // Now an <img> instead of a <div>
    container: null,
    tooltipDiv: null,
    init() {
      this.curveContainer = document.querySelector('#journey-curve-container');
      this.svg = document.querySelector('#journey-curve');
      this.path = document.querySelector('#journeyPath');
      this.pulse = document.querySelector('#journey-pulse'); // Now an <img> instead of a <div>
      this.container = document.querySelector('#journey-steps');

      this._parallax = () => this.parallax();
      this._resize = () => { this.getCurveParams(); this.positionStepsAndPulse(); };
      this._orientation = () => { this.getCurveParams(); this.positionStepsAndPulse(); };
      window.addEventListener('scroll', this._parallax, { passive: true });
      window.addEventListener('resize', this._resize);
      window.addEventListener('orientationchange', this._orientation);

      this.getCurveParams();
      this.positionStepsAndPulse();
      this.setupObservers();
      this.setupIntersectionObserver();
    },
    destroy() {
      window.removeEventListener('scroll', this._parallax);
      window.removeEventListener('resize', this._resize);
      window.removeEventListener('orientationchange', this._orientation);
    },
    getCurveParams() {
      const isMobile = window.innerWidth <= 767;
      if (isMobile) {
        this.svg.setAttribute('viewBox', '0 0 1000 140');
        this.path.setAttribute('d', 'M60 110 Q 250 20 500 90 T 940 60');
        this.svg.style.height = '140px';
      } else {
        this.svg.setAttribute('viewBox', '0 0 1000 260');
        this.path.setAttribute('d', 'M60 200 Q 250 60 500 160 T 940 120');
        this.svg.style.height = '260px';
      }
    },
    positionStepsAndPulse(retry = 0) {
      requestAnimationFrame(() => {
        const svgRect = this.svg.getBoundingClientRect();
        const viewBoxWidth = this.svg.viewBox.baseVal.width;
        const viewBoxHeight = this.svg.viewBox.baseVal.height;
        if (svgRect.width === 0 || svgRect.height === 0) {
          if (retry < 10) {
            setTimeout(() => this.positionStepsAndPulse(retry + 1), 30 * Math.pow(2, retry));
          }
          return;
        }
        const totalLength = this.path.getTotalLength();
        const n = this.steps.length;
        let stepPoints = [];
        for (let idx = 0; idx < n; idx++) {
          const pct = idx / (n - 1);
          const pt = this.path.getPointAtLength(totalLength * pct);
          stepPoints.push(pt);
        }
        // Only create step elements if not already present
        if (!this.container._stepDivs || this.container._stepDivs.length !== n) {
          this.container.innerHTML = '';
          this.container._stepDivs = [];
          this.steps.forEach((step, idx) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'journey-step-anim group flex flex-col items-center absolute z-20 opacity-0 scale-90 transition-all duration-700';
            stepDiv.style.position = 'absolute';
            // Render only the image for all steps, no circle/card
            const img = document.createElement('img');
            img.src = step.icon;
            img.alt = step.label;
            img.className = 'object-contain';
            img.style.width = '96px'; // desktop default
            img.style.height = '96px';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.flexShrink = '0';
            img.style.flexGrow = '0';
            // Responsive: shrink on mobile
            if (window.innerWidth <= 767) {
              img.style.width = '88px';
              img.style.height = '88px';
            }
            // Tilt the Seed image (index 0) and Snack image (index 2)
            if (idx === 0) {
              img.style.transform = 'rotate(-25deg)';
            } else if (idx === 1) {
              // Make pop image bigger
              img.style.width = '140px';
              img.style.height = '140px';
              img.style.minWidth = '140px';
              img.style.minHeight = '140px';
              if (window.innerWidth <= 767) {
                img.style.width = '110px';
                img.style.height = '110px';
                img.style.minWidth = '110px';
                img.style.minHeight = '110px';
              }
            } else if (idx === 2) {
              // Make snack image much bigger and slanted
              img.style.width = '160px';
              img.style.height = '160px';
              img.style.minWidth = '160px';
              img.style.minHeight = '160px';
              if (window.innerWidth <= 767) {
                img.style.width = '110px';
                img.style.height = '110px';
                img.style.minWidth = '110px';
                img.style.minHeight = '110px';
              }
              img.style.transform = 'rotate(15deg)';
            }
            stepDiv.appendChild(img);
            const label = document.createElement('span');
            label.className = 'mt-1 text-sm md:text-base font-extrabold uppercase tracking-wider text-[var(--rooted-green)] group-hover:text-[var(--rooted-orange)] group-focus:text-[var(--rooted-orange)] transition-colors duration-200 text-center';
            label.textContent = step.label;
            stepDiv.appendChild(label);
            stepDiv.addEventListener('mouseenter', () => {
              this.showTooltip(stepDiv, step.micro);
            });
            stepDiv.addEventListener('mouseleave', () => {
              this.hideTooltip();
            });
            stepDiv.addEventListener('focus', () => {
              this.showTooltip(stepDiv, step.micro);
            });
            stepDiv.addEventListener('blur', () => {
              this.hideTooltip();
            });
            this.container.appendChild(stepDiv);
            this.container._stepDivs.push(stepDiv);
          });
        }
        // Always update position of step elements
        this.container._stepDivs.forEach((stepDiv, idx) => {
          const pt = stepPoints[idx];
          const leftPx = (pt.x / viewBoxWidth) * svgRect.width;
          const offset = this.getStepOffsets()[idx] || 0;
          const topPx = (pt.y / viewBoxHeight) * svgRect.height + offset;

          // Adjust positioning based on step type
          let offsetX = 24; // default offset
          let offsetY = 24; // default offset

          if (idx === 1) {
            // Pop image is bigger, so adjust positioning
            offsetX = 70; // half of 140px
            offsetY = 70; // half of 140px
            if (window.innerWidth <= 767) {
              offsetX = 40; // half of 120px
              offsetY = 50; // half of 120px
            }
          } else if (idx === 2) {
            // Snack image is bigger, so adjust positioning
            offsetX = 80; // half of 160px
            offsetY = 80; // half of 160px
            if (window.innerWidth <= 767) {
              offsetX = 40; // half of 120px
              offsetY = 50; // half of 120px
            }
          }

          stepDiv.style.left = `${leftPx - offsetX}px`;
          stepDiv.style.top = `${topPx - offsetY}px`;
        });
      });
    },
    animateJourney() {
      this.getCurveParams();
      requestAnimationFrame(() => {
        const totalLength = this.path.getTotalLength();
        const n = this.steps.length;
        let stepPoints = [];
        for (let idx = 0; idx < n; idx++) {
          const pct = idx / (n - 1);
          const pt = this.path.getPointAtLength(totalLength * pct);
          stepPoints.push(pt);
        }
        const svgRect = this.svg.getBoundingClientRect();
        const viewBoxWidth = this.svg.viewBox.baseVal.width;
        const viewBoxHeight = this.svg.viewBox.baseVal.height;
        this.path.style.strokeDasharray = totalLength;
        this.path.style.strokeDashoffset = totalLength;
        setTimeout(() => {
          this.path.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.4,2,.6,1)';
          this.path.style.strokeDashoffset = 0;
        }, 200);
        // Animate steps in sequence with Tailwind classes
        if (this.container._stepDivs) {
          this.container._stepDivs.forEach((stepDiv, idx) => {
            // Reset to initial state
            stepDiv.classList.remove('opacity-100', 'scale-100');
            stepDiv.classList.add('opacity-0', 'scale-90');
          });
          this.container._stepDivs.forEach((stepDiv, idx) => {
            setTimeout(() => {
              stepDiv.classList.remove('opacity-0', 'scale-90');
              stepDiv.classList.add('opacity-100', 'scale-100');
            }, 350 + idx * 200); // staggered delay
          });
        }
        // Pulse animation (seed) should start after all steps are visible
        const pulseDelay = 350 + (n - 1) * 200 + 400; // last step's delay + animation duration buffer
        setTimeout(() => {
          this.pulse.style.display = 'block';
          this.pulse.style.opacity = 0;
          let start = null;
          let duration = 1800;
          let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          let stepIdx = 0;
          const animatePulse = (ts) => {
            if (!start) start = ts;
            let elapsed = ts - start;
            let t = Math.min(elapsed / duration, 1);
            let len = t * totalLength;
            let pt = this.path.getPointAtLength(len);
            const leftPx = (pt.x / viewBoxWidth) * svgRect.width;
            const topPx = (pt.y / viewBoxHeight) * svgRect.height;
            // Clamp pulse position to stay within the visible area
            let clampedTopPx = Math.max(0, Math.min(topPx, this.curveContainer.offsetHeight - 24));
            // Add rotation: rotate from 0 to 360 degrees as t goes from 0 to 1
            const rotation = 360 * t;
            // Alternate image every 90 degrees
            if (Math.floor(rotation / 90) % 2 === 0) {
              this.pulse.src = './assets/illustrations/lotus-img3-1.png';
            } else {
              this.pulse.src = './assets/illustrations/lotus-img3-2.png';
            }
            this.pulse.style.left = `calc(${leftPx}px - 24px)`;
            this.pulse.style.top = `calc(${clampedTopPx}px - 24px)`;
            this.pulse.style.opacity = 1;
            this.pulse.style.boxShadow = `0 0 32px 12px rgba(243,92,55,${0.18 + 0.12 * Math.sin(t * Math.PI)})`;
            this.pulse.style.transform = `rotate(${rotation}deg)`;
            if (t < 1) {
              requestAnimationFrame(animatePulse);
            } else {
              this.pulse.style.opacity = 0;
            }
          };
          requestAnimationFrame(animatePulse);
        }, pulseDelay);
      });
    },
    setupObservers() {
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
          this.getCurveParams();
          this.positionStepsAndPulse();
        });
        ro.observe(this.svg);
        ro.observe(this.curveContainer);
      }
    },
    parallax() {
      const containerRect = this.curveContainer.getBoundingClientRect();
      const winH = window.innerHeight;
      const center = containerRect.top + containerRect.height / 2 - winH / 2;
      const parallaxY = Math.max(-24, Math.min(24, -center / 16));
      this.svg.style.transform = `translateY(${parallaxY}px)`;
      this.pulse.style.transform = `translateY(${parallaxY / 2}px)`;
      this.container.style.transform = `translateY(${parallaxY / 2}px)`;
    },
    setupIntersectionObserver() {
      const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateJourney();
          } else {
            this.resetJourneyAnimation();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(this.curveContainer);
    },
    resetJourneyAnimation() {
      // Reset the path
      if (this.path) {
        const totalLength = this.path.getTotalLength();
        this.path.style.transition = 'none';
        this.path.style.strokeDasharray = totalLength;
        this.path.style.strokeDashoffset = totalLength;
      }
      // Hide the pulse
      if (this.pulse) {
        this.pulse.style.display = 'none';
        this.pulse.style.opacity = 0;
      }
      // Remove animation classes from steps, but do not remove the elements
      if (this.container && this.container._stepDivs) {
        this.container._stepDivs.forEach(div => {
          div.classList.remove('journey-step-in', 'journey-step-bounce', 'journey-step-wobble');
        });
      }
    },
    showTooltip(parent, text) {
      this.hideTooltip();
      this.tooltipDiv = document.createElement('div');
      this.tooltipDiv.className = 'fixed bg-white/95 border border-[var(--rooted-green)]/20 rounded-xl shadow-lg px-4 py-2 text-xs text-[var(--rooted-brown)] z-30 min-w-[120px] max-w-[180px] pointer-events-none animate-fade-in';
      this.tooltipDiv.innerHTML = text;
      document.body.appendChild(this.tooltipDiv);
      requestAnimationFrame(() => {
        const tooltip = this.tooltipDiv;
        const tooltipRect = tooltip.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        // Default: show below
        let top = parentRect.bottom + 8; // 8px gap
        let left = parentRect.left + parentRect.width / 2 - tooltipRect.width / 2;
        // If not enough space below, show above
        if (parentRect.bottom + tooltipRect.height + 8 > window.innerHeight) {
          top = parentRect.top - tooltipRect.height - 8;
        }
        // Clamp top to viewport
        top = Math.max(0, Math.min(top, window.innerHeight - tooltipRect.height));
        // Clamp left to viewport
        left = Math.max(0, Math.min(left, window.innerWidth - tooltipRect.width));
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.style.transform = 'none';
      });
    },
    hideTooltip() {
      if (this.tooltipDiv && this.tooltipDiv.parentNode) {
        this.tooltipDiv.parentNode.removeChild(this.tooltipDiv);
        this.tooltipDiv = null;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Journey Animation Logic (now handled by Alpine.js journeySection component)
// ---------------------------------------------------------------------------

/**
 * Array of journey steps for the Seed-to-Snack animation.
 * Each step contains icon, label, and microcopy.
 */
window.journeySteps = [
  { icon: './assets/illustrations/lotus-img1.png', label: 'Seed', micro: 'The seed is collected from the water lily plant.' },
  { icon: './assets/illustrations/lotus-seeds.svg', label: 'Pop', micro: 'The seeds are popped in a pan to create a crunchy snack.' },
  { icon: './assets/product/2.png', label: 'Snack', micro: 'Enjoy your Rooted snack guilt-free!' }
];

// The journey animation logic is now fully encapsulated in the journeySection Alpine.js component.
// No global imperative setup or listeners are needed.

// === GSAP ScrollTrigger: Seed Animation for 'What is a Popped Water Lily Seed?' Section ===
(function seedScrollAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var seeds = document.querySelectorAll('#seed-illustration .seed-img');
  if (!seeds.length) return;
  var seedAnims = [
    { x: -60, y: -220, rotation: -40 }, // Seed 1: up & left
    { x: 30, y: -190, rotation: 30 },  // Seed 2: straight up
    { x: 60, y: -200, rotation: 50 },  // Seed 3: up & right
    { x: -30, y: -210, rotation: -25 }, // Seed 4: up & slightly left
  ];
  seeds.forEach(function (seed, i) {
    gsap.fromTo(seed,
      {
        opacity: 0,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        x: seedAnims[i].x,
        y: seedAnims[i].y,
        rotate: seedAnims[i].rotation,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#what-is",
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
        stagger: {
          each: 0.08,
          from: "center"
        }
      }
    );
  });
})();

// === GSAP Hero Section Animation ===
(function gsapHeroSectionAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Check if all required elements exist before proceeding
  var back1 = document.querySelector('[data-gsap-hero="back1"]');
  var back2 = document.querySelector('[data-gsap-hero="back2"]');
  var main = document.querySelector('[data-gsap-hero="main"]');
  var heading = document.querySelector('[data-gsap-hero="heading"]');
  var subheading = document.querySelector('[data-gsap-hero="subheading"]');
  var chip = document.querySelector('[data-gsap-hero="chip"]');
  var cta = document.querySelector('[data-gsap-hero="cta"]');

  // Only proceed if we have the essential elements
  if (!back1 || !back2 || !main) return;

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top 70%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse',
      // markers: true, // Uncomment for debugging
    }
  });
  // Animate back/peeking packets
  tl.fromTo('[data-gsap-hero="back1"]',
    { opacity: 0, scale: 0.9, x: 60, y: 40 },
    { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1
  )
    .fromTo('[data-gsap-hero="back2"]',
      { opacity: 0, scale: 0.9, x: -60, y: 40 },
      { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.out' }, 0.15
    );
  // Animate main product image
  tl.fromTo('[data-gsap-hero="main"]',
    { opacity: 0, scale: 0.9, y: 40 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.2
  );
  // Animate heading if it exists
  if (heading) {
    tl.fromTo('[data-gsap-hero="heading"]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.3
    );
  }
  // Animate subheading if it exists
  if (subheading) {
    tl.fromTo('[data-gsap-hero="subheading"]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.4
    );
  }
  // Animate use-case chip (pop effect) if it exists
  if (chip) {
    tl.fromTo('[data-gsap-hero="chip"]',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1.08, duration: 0.3, ease: 'back.out(2)' }, 0.5
    )
      .to('[data-gsap-hero="chip"]',
        { scale: 1, duration: 0.2, ease: 'power1.in' }, 0.8
      );
  }
  // Animate CTA button if it exists
  if (cta) {
    tl.fromTo('[data-gsap-hero="cta"]',
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, 0.7
    );
  }
})();

// === GSAP Hero Section Micro-Interactions: Parallax & Hover Effects ===
(function gsapHeroMicroInteractions() {
  if (typeof window === 'undefined' || !window.gsap) return;
  // Parallax for hero images (desktop only)
  var heroSection = document.querySelector('[data-gsap-hero-section]');
  var mainImg = document.querySelector('[data-gsap-hero="main"]');
  var back1 = document.querySelector('[data-gsap-hero="back1"]');
  var back2 = document.querySelector('[data-gsap-hero="back2"]');
  var parallaxRAF = null;
  var parallaxState = { x: 0, y: 0 };
  var parallaxEnabled = false;
  function enableParallax() {
    if (!heroSection || !mainImg || !back1 || !back2) return;
    if (parallaxEnabled) return;
    parallaxEnabled = true;
    heroSection.addEventListener('mousemove', onParallaxMove);
    heroSection.addEventListener('mouseleave', onParallaxLeave);
  }
  function disableParallax() {
    if (!parallaxEnabled) return;
    parallaxEnabled = false;
    if (heroSection) {
      heroSection.removeEventListener('mousemove', onParallaxMove);
      heroSection.removeEventListener('mouseleave', onParallaxLeave);
    }
    parallaxState.x = 0; parallaxState.y = 0;
    if (mainImg && back1 && back2) {
      gsap.to([mainImg, back1, back2], { x: 0, y: 0, rotate: (el) => el === back1 ? -20 : el === back2 ? 20 : 0, duration: 0.7, overwrite: 'auto' });
    }
  }
  function onParallaxMove(e) {
    if (!heroSection) return;
    var rect = heroSection.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    parallaxState.x = x;
    parallaxState.y = y;
    if (!parallaxRAF) {
      parallaxRAF = requestAnimationFrame(applyParallax);
    }
  }
  function applyParallax() {
    if (mainImg) gsap.to(mainImg, { x: parallaxState.x * 12, y: parallaxState.y * 8, rotate: parallaxState.x * 3, duration: 0.5, overwrite: 'auto' });
    if (back1) gsap.to(back1, { x: parallaxState.x * 24 + 96, y: parallaxState.y * 16 + 40, rotate: -30 + parallaxState.x * 6, duration: 0.7, overwrite: 'auto' });
    if (back2) gsap.to(back2, { x: parallaxState.x * 24 - 96, y: parallaxState.y * 16 + 40, rotate: 30 + parallaxState.x * 6, duration: 0.7, overwrite: 'auto' });
    parallaxRAF = null;
  }
  function onParallaxLeave() {
    parallaxState.x = 0; parallaxState.y = 0;
    if (mainImg) gsap.to(mainImg, { x: 0, y: 0, rotate: 0, duration: 0.7, overwrite: 'auto' });
    if (back1) gsap.to(back1, { x: 96, y: 40, rotate: -30, duration: 0.7, overwrite: 'auto' });
    if (back2) gsap.to(back2, { x: -96, y: 40, rotate: 30, duration: 0.7, overwrite: 'auto' });
  }
  function checkParallax() {
    if (window.innerWidth >= 768) {
      enableParallax();
    } else {
      disableParallax();
    }
  }
  if (heroSection && mainImg && back1 && back2) {
    checkParallax();
    window.addEventListener('resize', checkParallax);
  }
  // CTA Button Hover/Focus Effect
  var cta = document.querySelector('[data-gsap-hero="cta"]');
  if (cta) {
    var ctaHover = function () {
      gsap.to(cta, { scale: 1.08, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', duration: 0.25, ease: 'power2.out' });
    };
    var ctaUnhover = function () {
      gsap.to(cta, { scale: 1, boxShadow: '0 4px 32px 0 rgba(31,38,135,0.10)', duration: 0.25, ease: 'power2.in' });
    };
    cta.addEventListener('mouseenter', ctaHover);
    cta.addEventListener('focus', ctaHover);
    cta.addEventListener('mouseleave', ctaUnhover);
    cta.addEventListener('blur', ctaUnhover);
  }
})();

// === GSAP Feel Good Flavours Accordion Animation ===
(function gsapFeelGoodAccordion() {
  if (typeof window === 'undefined' || !window.gsap) return;
  // Utility to animate accordion panel open/close
  function animateAccordion(panel, open) {
    if (!panel) return;
    var content = panel.querySelector('ul, table, div') || panel.firstElementChild;
    var chevron = panel.previousElementSibling && panel.previousElementSibling.querySelector('svg');
    if (open) {
      gsap.to(panel, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      if (chevron) gsap.to(chevron, { rotate: 180, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    } else {
      gsap.to(panel, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.in', overwrite: 'auto' });
      if (chevron) gsap.to(chevron, { rotate: 0, duration: 0.3, ease: 'power2.in', overwrite: 'auto' });
    }
  }
  // Observe Alpine.js state changes for the accordions
  function setupAccordion(btnAttr, panelAttr) {
    var btn = document.querySelector(`[data-gsap-accordion="${btnAttr}"]`);
    var panel = document.querySelector(`[data-gsap-accordion="${panelAttr}"]`);
    if (!btn || !panel) return;
    // Set initial state
    if (panel.hasAttribute('x-show')) {
      panel.style.overflow = 'hidden';
      panel.style.height = btn.getAttribute('aria-expanded') === 'true' ? 'auto' : '0px';
      panel.style.opacity = btn.getAttribute('aria-expanded') === 'true' ? '1' : '0';
    }
    // Listen for Alpine.js state changes via MutationObserver
    var observer = new MutationObserver(function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      animateAccordion(panel, open);
    });
    observer.observe(btn, { attributes: true, attributeFilter: ['aria-expanded'] });
    // Animate on click for micro-interaction
    btn.addEventListener('mousedown', function () {
      gsap.to(btn, { scale: 0.97, duration: 0.12, overwrite: 'auto' });
    });
    btn.addEventListener('mouseup', function () {
      gsap.to(btn, { scale: 1, duration: 0.18, overwrite: 'auto' });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { scale: 1, duration: 0.18, overwrite: 'auto' });
    });
  }
  setupAccordion('ingredients-btn', 'ingredients-panel');
  setupAccordion('nutrition-btn', 'nutrition-panel');
})();

// === GSAP FAQ Section Animation & Micro-Interactions ===
(function gsapFaqSectionAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var section = document.querySelector('[data-gsap-faq="section"]');
  if (!section) return;
  var heading = section.querySelector('[data-gsap-faq="heading"]');
  var buttons = section.querySelectorAll('[data-gsap-faq="button"]');
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse',
    }
  });
  if (heading) {
    tl.fromTo(heading,
      { opacity: 0.3, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1
    );
  }
  if (buttons.length) {
    tl.fromTo(buttons,
      { opacity: 0.3, y: 24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.18
    );
  }
  // Micro-interaction: button hover/focus
  buttons.forEach(function (button) {
    button.addEventListener('mouseenter', function () {
      gsap.to(button, { scale: 1.02, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.12)', duration: 0.18, overwrite: 'auto' });
    });
    button.addEventListener('focus', function () {
      gsap.to(button, { scale: 1.02, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.12)', duration: 0.18, overwrite: 'auto' });
    });
    button.addEventListener('mouseleave', function () {
      gsap.to(button, { scale: 1, boxShadow: 'none', duration: 0.18, overwrite: 'auto' });
    });
    button.addEventListener('blur', function () {
      gsap.to(button, { scale: 1, boxShadow: 'none', duration: 0.18, overwrite: 'auto' });
    });
  });
})();

// === GSAP Root Alpine.js App Animation ===
(function gsapRootedAppAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var rootedApps = document.querySelectorAll('[data-gsap-rooted-app]');
  if (!rootedApps.length) return;
  rootedApps.forEach(function (app) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: app,
        start: 'top 70%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
      }
    });
    tl.fromTo('[data-gsap-rooted-app-email-popup]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1
    );
    tl.fromTo('[data-gsap-rooted-app-mobile-nav]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.2
    );
    tl.fromTo('[data-gsap-rooted-app-focus-trap]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.3
    );
  });
})();

// === GSAP Feel Good Flavours Section Text & Micro-Interactions ===
(function gsapFeelGoodFlavoursText() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var section = document.getElementById('feel-good-flavours');
  if (!section) return;
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse',
    }
  });
  tl.fromTo('[data-gsap-feelgood="heading"]',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1
  );
  tl.fromTo('[data-gsap-feelgood="subheading"]',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.2
  );
  tl.fromTo('[data-gsap-feelgood="accordion-btn"]',
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.1 }, 0.3
  );
  // Micro-interactions: accordion button hover/focus
  var btns = section.querySelectorAll('[data-gsap-feelgood="accordion-btn"]');
  btns.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      gsap.to(btn, { scale: 1.04, boxShadow: '0 6px 24px 0 rgba(31,38,135,0.13)', duration: 0.18, overwrite: 'auto' });
    });
    btn.addEventListener('focus', function () {
      gsap.to(btn, { scale: 1.04, boxShadow: '0 6px 24px 0 rgba(31,38,135,0.13)', duration: 0.18, overwrite: 'auto' });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
    btn.addEventListener('blur', function () {
      gsap.to(btn, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
  });
  // Micro-interaction: pop effect on panel open
  var observer = new MutationObserver(function () {
    section.querySelectorAll('[data-gsap-feelgood="accordion-panel"]').forEach(function (panel) {
      if (panel.offsetHeight > 0 && panel.style.opacity === '1') {
        gsap.fromTo(panel, { scale: 0.98 }, { scale: 1, duration: 0.18, ease: 'back.out(1.7)', overwrite: 'auto' });
      }
    });
  });
  section.querySelectorAll('[data-gsap-feelgood="accordion-panel"]').forEach(function (panel) {
    observer.observe(panel, { attributes: true, attributeFilter: ['style'] });
  });
})();

// === GSAP Our Mission Section Animation & Micro-Interactions ===
(function gsapMissionSectionAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var section = document.getElementById('mission');
  if (!section) return;
  var bg = section.querySelector('[data-gsap-mission="bg"]');
  var card = section.querySelector('[data-gsap-mission="card"]');
  var heading = section.querySelector('[data-gsap-mission="heading"]');
  var desc = section.querySelector('[data-gsap-mission="desc"]');
  // Timeline for scroll-triggered animation
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse',
    }
  });
  // Background grid stays visible, no opacity animation
  if (card) {
    tl.fromTo(card,
      { opacity: 0.3, y: 48, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }, 0.1
    );
  }
  if (heading) {
    tl.fromTo(heading,
      { opacity: 0.3, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.18
    );
  }
  if (desc) {
    tl.fromTo(desc,
      { opacity: 0.3, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.22
    );
  }
  // Micro-interaction: card hover/focus
  if (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { scale: 1.025, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.16)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('focus', function () {
      gsap.to(card, { scale: 1.025, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.16)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { scale: 1, boxShadow: '0 4px 32px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('blur', function () {
      gsap.to(card, { scale: 1, boxShadow: '0 4px 32px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
  }
})();

// === GSAP Our Promise Section Animation & Micro-Interactions ===
(function gsapPromiseSectionAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var section = document.querySelector('[data-gsap-promise="section"]');
  if (!section) return;
  var heading = section.querySelector('[data-gsap-promise="heading"]');
  var cards = section.querySelectorAll('[data-gsap-promise="card"]');
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse',
    }
  });
  if (heading) {
    tl.fromTo(heading,
      { opacity: 0.3, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1
    );
  }
  if (cards.length) {
    tl.fromTo(cards,
      { opacity: 0.3, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12 }, 0.18
    );
  }
  // Micro-interaction: card hover/focus
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { scale: 1.045, boxShadow: '0 10px 36px 0 rgba(31,38,135,0.18)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('focus', function () {
      gsap.to(card, { scale: 1.045, boxShadow: '0 10px 36px 0 rgba(31,38,135,0.18)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('blur', function () {
      gsap.to(card, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
  });
})();

// === GSAP Testimonials Section Animation & Micro-Interactions ===
(function gsapTestimonialsSectionAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var section = document.querySelector('[data-gsap-testimonial="section"]');
  if (!section) return;
  var heading = section.querySelector('[data-gsap-testimonial="heading"]');
  var cards = section.querySelectorAll('[data-gsap-testimonial="card"]');
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse',
    }
  });
  if (heading) {
    tl.fromTo(heading,
      { opacity: 0.3, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1
    );
  }
  if (cards.length) {
    tl.fromTo(cards,
      { opacity: 0.3, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12 }, 0.18
    );
  }
  // Micro-interaction: card hover/focus
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { scale: 1.035, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('focus', function () {
      gsap.to(card, { scale: 1.035, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
    card.addEventListener('blur', function () {
      gsap.to(card, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
  });
})();

// === GSAP Email Capture CTA Section Animation & Micro-Interactions ===
(function gsapEmailCtaSectionAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var section = document.querySelector('[data-gsap-email-cta="section"]');
  if (!section) return;
  var card = section.querySelector('[data-gsap-email-cta="card"]');
  var heading = section.querySelector('[data-gsap-email-cta="heading"]');
  var subheading = section.querySelector('[data-gsap-email-cta="subheading"]');
  var button = section.querySelector('[data-gsap-email-cta="button"]');
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse',
    }
  });
  var baseDelay = 0.1;
  var stagger = 0.18; // more pronounced stagger
  if (card) {
    tl.fromTo(card,
      { opacity: 0.3, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }, baseDelay
    );
  }
  if (heading) {
    tl.fromTo(heading,
      { opacity: 0.3, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, baseDelay + stagger
    );
  }
  if (subheading) {
    tl.fromTo(subheading,
      { opacity: 0.3, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, baseDelay + stagger * 2
    );
  }
  if (button) {
    tl.fromTo(button,
      { opacity: 0.3, scale: 0.92 },
      { opacity: 1, scale: 1.12, duration: 0.5, ease: 'back.out(2.2)' }, baseDelay + stagger * 3
    )
      .to(button,
        { scale: 1, duration: 0.25, ease: 'bounce.out' }, "+=0.01"
      );
    // Micro-interaction: button hover/focus
    button.addEventListener('mouseenter', function () {
      gsap.to(button, { scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.16)', duration: 0.18, overwrite: 'auto' });
    });
    button.addEventListener('focus', function () {
      gsap.to(button, { scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.16)', duration: 0.18, overwrite: 'auto' });
    });
    button.addEventListener('mouseleave', function () {
      gsap.to(button, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
    button.addEventListener('blur', function () {
      gsap.to(button, { scale: 1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)', duration: 0.18, overwrite: 'auto' });
    });
  }
})();

// === GSAP Navbar Animation & Micro-Interactions ===
(function gsapNavbarAnimation() {
  if (typeof window === 'undefined' || !window.gsap) return;

  var header = document.querySelector('[data-gsap-navbar="header"]');
  var nav = document.querySelector('[data-gsap-navbar="nav"]');
  var logo = document.querySelector('[data-gsap-navbar="logo"]');
  var desktopLinks = document.querySelector('[data-gsap-navbar="desktop-links"]');
  var navLinks = document.querySelectorAll('[data-gsap-navbar="nav-link"]');
  var hamburger = document.querySelector('[data-gsap-navbar="hamburger"]');
  var mobileDrawer = document.querySelector('[data-gsap-navbar="mobile-drawer"]');
  var mobileLinks = document.querySelectorAll('[data-gsap-navbar="mobile-nav-link"]');

  if (!header) return;

  // Initial state - navbar starts hidden
  gsap.set(header, { y: -60, opacity: 0 });

  // Only set initial states for elements that exist
  if (logo) gsap.set(logo, { x: -20, opacity: 0 });
  if (desktopLinks) gsap.set(desktopLinks, { x: 20, opacity: 0 });
  if (navLinks && navLinks.length > 0) gsap.set(navLinks, { y: -10, opacity: 0 });
  if (hamburger) gsap.set(hamburger, { x: 20, opacity: 0 });

  // Navbar entrance animation
  var tl = gsap.timeline({ delay: 0.2 });

  // Header slides down
  tl.to(header, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  });

  // Logo slides in from left if it exists
  if (logo) {
    tl.to(logo, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.3');
  }

  // Desktop nav links slide in from right if they exist
  if (desktopLinks) {
    tl.to(desktopLinks, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4');

    // Individual nav links stagger in if they exist
    if (navLinks && navLinks.length > 0) {
      tl.to(navLinks, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.08
      }, '-=0.3');
    }
  }

  // Hamburger button slides in from right if it exists
  if (hamburger) {
    tl.to(hamburger, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.5');
  }

  // Micro-interactions: Logo hover/focus
  if (logo) {
    logo.addEventListener('mouseenter', function () {
      gsap.to(logo, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
    });
    logo.addEventListener('focus', function () {
      gsap.to(logo, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
    });
    logo.addEventListener('mouseleave', function () {
      gsap.to(logo, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
    logo.addEventListener('blur', function () {
      gsap.to(logo, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  }

  // Micro-interactions: Nav links hover/focus
  if (navLinks && navLinks.length > 0) {
    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        gsap.to(link, { y: -2, scale: 1.02, duration: 0.2, ease: 'power2.out' });
      });
      link.addEventListener('focus', function () {
        gsap.to(link, { y: -2, scale: 1.02, duration: 0.2, ease: 'power2.out' });
      });
      link.addEventListener('mouseleave', function () {
        gsap.to(link, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out' });
      });
      link.addEventListener('blur', function () {
        gsap.to(link, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out' });
      });
    });
  }

  // Micro-interactions: Hamburger button hover/focus
  if (hamburger) {
    hamburger.addEventListener('mouseenter', function () {
      gsap.to(hamburger, { scale: 1.1, rotation: 5, duration: 0.2, ease: 'power2.out' });
    });
    hamburger.addEventListener('focus', function () {
      gsap.to(hamburger, { scale: 1.1, rotation: 5, duration: 0.2, ease: 'power2.out' });
    });
    hamburger.addEventListener('mouseleave', function () {
      gsap.to(hamburger, { scale: 1, rotation: 0, duration: 0.2, ease: 'power2.out' });
    });
    hamburger.addEventListener('blur', function () {
      gsap.to(hamburger, { scale: 1, rotation: 0, duration: 0.2, ease: 'power2.out' });
    });
    // Reset rotation on click (menu toggle)
    hamburger.addEventListener('click', function () {
      gsap.to(hamburger, { rotation: 0, duration: 0.2, ease: 'power2.out' });
    });
  }

  // Mobile drawer animation (when opened)
  if (mobileDrawer && mobileLinks.length) {
    // Set initial state for mobile drawer
    gsap.set(mobileDrawer, { opacity: 0, y: -20 });
    gsap.set(mobileLinks, { x: -20, opacity: 0 });

    // Watch for mobile nav state changes
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          var isVisible = mobileDrawer.style.display !== 'none';
          if (isVisible) {
            // Animate mobile drawer in
            gsap.to(mobileDrawer, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
            // Animate mobile links in with stagger
            gsap.to(mobileLinks, {
              x: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.08
            });
          } else {
            // Reset mobile drawer state
            gsap.set(mobileDrawer, { opacity: 0, y: -20 });
            gsap.set(mobileLinks, { x: -20, opacity: 0 });
          }
        }
      });
    });

    observer.observe(mobileDrawer, { attributes: true, attributeFilter: ['style'] });
  }
})();

// ---------------------------------------------------------------------------
// 3. Global Utilities
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// 4. Animation Helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// 5. Alpine.js Custom Directives
// ---------------------------------------------------------------------------

/**
 * Register all custom Alpine.js directives in a single block for clarity.
 * - x-intersect: triggers a callback when an element enters the viewport.
 * - x-imgfallback: sets a fallback image if the main image fails to load.
 */
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

// ---------------------------------------------------------------------------
// 6. Register Alpine.js Component Functions Globally
// ---------------------------------------------------------------------------

// Register all Alpine.js component functions globally for consistent access
window.navBar = navBar;
window.stickyCtaBar = stickyCtaBar;
window.desktopCtaButton = desktopCtaButton;
window.heroSection = heroSection;
window.whatIsSection = whatIsSection;
window.benefitsSection = benefitsSection;
window.missionSection = missionSection;
window.promiseSection = promiseSection;
window.testimonialCarousel = testimonialCarousel;
window.emailCtaSection = emailCtaSection;
window.faqSection = faqSection;
window.footerSection = footerSection;
window.rootedApp = rootedApp;

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