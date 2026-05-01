/* =========================================================
   Bueno Homes — Vanilla JS
   - Loader, sticky nav, mobile menu
   - Scroll progress bar
   - IntersectionObserver reveal animations
   - Masonry-style lightbox gallery (keyboard + swipe)
   - 3D tilt effect on showcase card
   - Form validation
   ========================================================= */

(() => {
  // ----- Loader -----
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 350);
  });

  // ----- Year -----
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ----- Sticky nav -----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 24);
    // progress bar
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const p = total > 0 ? window.scrollY / total : 0;
    const bar = document.getElementById('progress');
    if (bar) bar.style.transform = `scaleX(${p})`;
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu -----
  const burger = document.getElementById('hamburger');
  const mobile = document.getElementById('mobileNav');
  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobile?.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  mobile?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      mobile.classList.remove('open');
    })
  );

  // ----- Reveal on scroll -----
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 60) + 'ms';
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ----- Lightbox -----
  const tiles = [...document.querySelectorAll('.tile')];
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  let idx = 0;

  const open = i => {
    idx = i;
    const t = tiles[idx];
    const img = t.querySelector('img');
    const cat = t.querySelector('em')?.textContent || '';
    const title = t.querySelector('b')?.textContent || '';
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = title;
    lbCap.setAttribute('data-cat', cat);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const next = () => open((idx + 1) % tiles.length);
  const prev = () => open((idx - 1 + tiles.length) % tiles.length);

  tiles.forEach((t, i) => t.addEventListener('click', () => open(i)));
  document.getElementById('lbClose')?.addEventListener('click', close);
  document.getElementById('lbNext')?.addEventListener('click', next);
  document.getElementById('lbPrev')?.addEventListener('click', prev);
  lb?.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
  // touch swipe
  let tx = 0;
  lb?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  });

  // ----- 3D tilt on showcase card -----
  const wrap = document.getElementById('tiltWrap');
  const card = document.getElementById('tiltCard');
  if (wrap && card && matchMedia('(hover: hover)').matches) {
    wrap.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.02)`;
    });
    wrap.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
  }

  // ----- Contact form validation -----
  const form = document.getElementById('quoteForm');
  const msg = document.getElementById('formMsg');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    msg.className = 'form__msg';
    msg.textContent = '';
    const data = Object.fromEntries(new FormData(form).entries());
    const errors = [];
    if (!data.name || data.name.trim().length < 2) errors.push('Please enter your name.');
    if (!data.phone || data.phone.trim().length < 7) errors.push('Please enter a valid phone.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) errors.push('Please enter a valid email.');
    if (!data.message || data.message.trim().length < 10) errors.push('Tell us a bit more about your project.');

    if (errors.length) {
      msg.classList.add('error');
      msg.textContent = errors[0];
      return;
    }
    msg.classList.add('success');
    msg.textContent = "Thanks — we'll be in touch within one business day.";
    form.reset();
  });
})();
