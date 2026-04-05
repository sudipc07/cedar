/* ============================================================
   CEDAR DOUGH PIZZA BAR — Main JS
   A Sstori.com Design
   ============================================================ */

(function () {
  'use strict';

  // --- Nav progressive glass (builds up and stays) ---
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');

  if (nav && hero) {
    let ticking = false;
    const maxOpacity = 0.45;
    const maxBlur = 20;

    function updateNav() {
      const heroH = hero.offsetHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (heroH * 0.5), 1);

      const bg = `rgba(26, 20, 16, ${(progress * maxOpacity).toFixed(3)})`;
      const blur = `blur(${(progress * maxBlur).toFixed(1)}px)`;
      const border = `1px solid rgba(246, 240, 231, ${(progress * 0.1).toFixed(3)})`;

      nav.style.background = bg;
      nav.style.backdropFilter = blur;
      nav.style.webkitBackdropFilter = blur;
      nav.style.borderBottom = border;

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });

    updateNav();
  }

  // --- Mobile nav ---
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  // --- Reveal on scroll ---
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => revealObs.observe(el));
  }

  // --- Menu category filter ---
  const catBtns = document.querySelectorAll('.chalk-cat');
  const menuItems = document.querySelectorAll('.chalk-item');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;

      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      menuItems.forEach(item => {
        item.style.display = item.dataset.cat === cat ? '' : 'none';
      });
    });
  });

  // --- Smooth scroll with nav offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 60;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

})();
