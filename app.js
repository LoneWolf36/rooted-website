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
      { href: '#mission', label: 'Mission' },
      { href: '#signup', label: 'Sign Up' }
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
    productImage: './assets/product/1.png',
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
    mainCtaLabel: '🎉 Get 15% Off – Snack Smarter!',
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
        desc: 'Packed with plant-based protein, minerals, and antioxidants.'
      },
      {
        title: 'Delicious',
        desc: "Crunchy, light, and full of flavor – a snack you'll crave."
      },
      {
        title: 'Diverse',
        desc: 'Rooted celebrates global flavors and ancient superfoods.'
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
      { quote: 'Absolutely delicious and guilt-free. My new go-to snack!', author: 'Alex, Yoga Instructor' },
      { quote: 'Perfect for my lunchbox and post-workout cravings.', author: 'Jamie, Student' },
      { quote: 'Crispy, light, and so satisfying. Love the Himalayan salt flavor!', author: 'Priya, Designer' },
      { quote: 'Finally, a snack that fits my plant-based lifestyle.', author: 'Morgan, Runner' }
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
        q: "Are popped water lily seeds really healthy?",
        a: "Absolutely! They're naturally gluten-free, plant-based, and packed with protein, minerals, and antioxidants. Plus, they're deliciously crunchy. (Your taste buds and your body will thank you!)"
      },
      {
        q: "Is Rooted vegan and allergen-friendly?",
        a: "Yes! Rooted snacks are 100% vegan and free from gluten, soy, and artificial nasties. Snack happy, snack safe."
      },
      {
        q: "How do I get early access and my 15% off?",
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
    instagramUrl: "https://instagram.com/yourbrand",
    instagramIcon: "PATH_TO_INSTAGRAM_ICON",
    email: "hello@rootedsnacks.com",
    brandStatement: "Rooted is committed to plant-based nutrition, sustainability, and global flavors. Certified vegan. Made with love.",
    logo: "./assets/logos/logo_rooted_green.png",
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
    stepOffsetsDesktop: [10, -30, -10, -20, -50],
    stepOffsetsMobile: [-15, 0, -20, -40, 0], // Adjust these for mobile as needed
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
    pulse: null,
    container: null,
    tooltipDiv: null,
    init() {
      this.curveContainer = document.querySelector('#journey-curve-container');
      this.svg = document.querySelector('#journey-curve');
      this.path = document.querySelector('#journeyPath');
      this.pulse = document.querySelector('#journey-pulse');
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
            let circleClass = 'flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full shadow-xl border-2 mb-2 transition-all duration-300 cursor-pointer journey-pop journey-card-base';
            if (idx === 0) circleClass += ' bg-gradient-to-br from-[var(--rooted-green)]/80 to-white/80 border-[var(--rooted-green)] ring-4 ring-[var(--rooted-green)]/30 journey-card-seed';
            else if (idx === this.steps.length - 1) circleClass += ' bg-gradient-to-br from-[var(--rooted-orange)]/80 to-white/80 border-[var(--rooted-orange)] ring-4 ring-[var(--rooted-orange)]/30 journey-card-snack';
            else circleClass += ' bg-white/80 glass-base border-[var(--rooted-green)]/10';
            const circle = document.createElement('div');
            circle.className = circleClass;
            const img = document.createElement('img');
            img.src = step.icon;
            img.alt = step.label;
            img.className = 'w-10 h-10 md:w-12 md:h-12 object-contain journey-card-icon';
            img.width = 48;
            img.height = 48;
            circle.appendChild(img);
            stepDiv.appendChild(circle);
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
          stepDiv.style.left = `${leftPx - 24}px`;
          stepDiv.style.top = `${topPx - 24}px`;
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
            this.pulse.style.left = `calc(${leftPx}px - 12px)`;
            this.pulse.style.top = `calc(${clampedTopPx}px - 12px)`;
            this.pulse.style.opacity = 1;
            this.pulse.style.boxShadow = `0 0 32px 12px rgba(243,92,55,${0.18 + 0.12 * Math.sin(t * Math.PI)})`;
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
  { icon: 'PATH_TO_JOURNEY_ICON_1', label: 'Seed', micro: 'The seed is collected from the water lily plant.' },
  { icon: 'PATH_TO_JOURNEY_ICON_2', label: 'Harvest', micro: 'The seeds are harvested from the water lily plant.' },
  { icon: 'PATH_TO_JOURNEY_ICON_3', label: 'Pop', micro: 'The seeds are popped in a pan to create a crunchy snack.' },
  { icon: 'PATH_TO_JOURNEY_ICON_4', label: 'Pack', micro: 'The snack is packed into a bag for easy storage.' },
  { icon: 'PATH_TO_JOURNEY_ICON_5', label: 'Snack', micro: 'Enjoy your Rooted snack guilt-free!' }
];

// The journey animation logic is now fully encapsulated in the journeySection Alpine.js component.
// No global imperative setup or listeners are needed.

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