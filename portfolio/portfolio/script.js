/* =====================================================================
   PODILI SUSMITHA — PORTFOLIO SCRIPT
   Vanilla JavaScript — modular, commented, no dependencies
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initTypingEffect();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initButtonRipple();
  initContactForm();
  initScrollTopButton();
  initActiveNavLink();
  initCursorGlow();
  setFooterYear();
});

/* ---------------------------------------------------------------
   1. PRELOADER — hides once the window has fully loaded
--------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 400);
  });

  // Fallback in case 'load' fires slowly on some connections
  setTimeout(() => preloader.classList.add('hide'), 2500);
}

/* ---------------------------------------------------------------
   2. NAVBAR — adds a glass background once the page is scrolled
--------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------------------------------------------------------------
   3. MOBILE MENU — hamburger toggle for small screens
--------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close the menu whenever a link is tapped
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ---------------------------------------------------------------
   4. TYPING EFFECT — animates the rotating role titles in the hero
--------------------------------------------------------------- */
function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Frontend Developer',
    'Web Designer',
    'Java Programmer',
    'Problem Solver',
    'Continuous Learner',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 80;
  const DELETE_SPEED = 45;
  const HOLD_TIME = 1400;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------------------------------------------------------------
   5. SCROLL REVEAL — fades/slides elements up as they enter view
--------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('revealed'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   6. ANIMATED COUNTERS — counts up numbers inside the About section
--------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const isDecimal = String(target).includes('.');
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(2) : Math.floor(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal ? target.toFixed(2) : target;
      }
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   7. SKILL BARS — fills progress bars when scrolled into view
--------------------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-fill');
          const level = entry.target.dataset.level || 0;
          if (fill) fill.style.width = `${level}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------------------------------------------------------------
   8. BUTTON RIPPLE — subtle click ripple on all .btn elements
--------------------------------------------------------------- */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--ry', `${e.clientY - rect.top}px`);
      btn.classList.remove('rippling');
      // Force reflow so the animation can restart on repeated clicks
      void btn.offsetWidth;
      btn.classList.add('rippling');
    });
  });
}

/* ---------------------------------------------------------------
   9. CONTACT FORM — front-end only validation & success message
      (No backend: this simply confirms receipt in the browser)
--------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    success.classList.add('show');
    form.reset();

    setTimeout(() => success.classList.remove('show'), 5000);
  });
}

/* ---------------------------------------------------------------
   10. SCROLL-TO-TOP BUTTON
--------------------------------------------------------------- */
function initScrollTopButton() {
  const btn = document.getElementById('toTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 500) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------------
   11. ACTIVE NAV LINK — highlights the link matching the section
       currently in view
--------------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((link) => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------
   12. CURSOR GLOW — ambient light that follows the pointer (desktop)
--------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ---------------------------------------------------------------
   13. FOOTER YEAR
--------------------------------------------------------------- */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
