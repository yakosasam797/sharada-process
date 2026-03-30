/* ============================================
   SRI SHARADA PROCESSORES — MAIN JAVASCRIPT
   Farmora Design Language
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // PRELOADER
  // =====================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 500);
    });
    setTimeout(() => preloader.classList.add('hidden'), 2500);
  }

  // =====================
  // TOP BAR HIDE ON SCROLL
  // =====================
  const topbar = document.getElementById('topbar');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (topbar) {
      topbar.classList.toggle('hidden', window.scrollY > 60);
    }
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    }
  });

  // =====================
  // MOBILE NAVIGATION
  // =====================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeNav() {
    navToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
    navOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle?.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    navOverlay?.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  navOverlay?.addEventListener('click', closeNav);

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // =====================
  // HERO SLIDER
  // =====================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(idx) {
    heroSlides.forEach(s => s.classList.remove('active'));
    currentSlide = (idx + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide]?.classList.add('active');
  }

  function startSlider() {
    if (heroSlides.length > 1) {
      slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5500);
    }
  }

  function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
  }

  heroPrev?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSlider(); });
  heroNext?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSlider(); });
  startSlider();

  // =====================
  // ABOUT TABS
  // =====================
  const aboutTabs = document.querySelectorAll('.about-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  aboutTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = 'tab-' + tab.dataset.tab;

      aboutTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => {
        content.style.display = content.id === targetId ? '' : 'none';
        content.classList.toggle('active', content.id === targetId);
      });

      // Re-trigger reveal animations in new tab
      const reveals = document.getElementById(targetId)?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      reveals?.forEach(el => {
        el.classList.remove('visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.classList.add('visible');
          });
        });
      });
    });
  });

  // =====================
  // NEWS CAROUSEL NAV
  // =====================
  const newsCarousel = document.getElementById('newsCarousel');
  const newsPrev = document.getElementById('newsPrev');
  const newsNext = document.getElementById('newsNext');

  newsNext?.addEventListener('click', () => {
    newsCarousel?.scrollBy({ left: 370, behavior: 'smooth' });
  });

  newsPrev?.addEventListener('click', () => {
    newsCarousel?.scrollBy({ left: -370, behavior: 'smooth' });
  });

  // =====================
  // COUNTER ANIMATION
  // =====================
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const tick = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      };
      tick();
    });
  }

  // =====================
  // SCROLL REVEAL
  // =====================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  // Counter trigger
  const statsArea = document.querySelector('.stats-grid');
  if (statsArea && counters.length > 0) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 }).observe(statsArea);
  }

  // =====================
  // SCROLL TO TOP
  // =====================
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 500);
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =====================
  // SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // =====================
  // CONTACT FORM
  // =====================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Quote Request Sent!';
        submitBtn.style.background = '#2E7D32';
        submitBtn.style.borderColor = '#2E7D32';
        submitBtn.style.color = '#fff';

        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

});
