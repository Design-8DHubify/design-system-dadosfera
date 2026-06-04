/* ============================================================
   DADOSFERA DS — UI
   Interatividade dos componentes da documentação:
   accordion, tabs, carousel, toast demo, theme, sidebar, scrollspy.
   Tudo via delegação de eventos e atributos data-*.
   ============================================================ */
(function (w, d) {

  /* ---------- ACCORDION ---------- */
  d.addEventListener('click', function (e) {
    var head = e.target.closest('.ds-accordion__head');
    if (!head) return;
    var item = head.closest('.ds-accordion__item');
    var panel = item.querySelector('.ds-accordion__panel');
    var open = item.classList.toggle('is-open');
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
  });

  /* ---------- TABS ---------- */
  d.addEventListener('click', function (e) {
    var btn = e.target.closest('.ds-tabs__btn');
    if (!btn) return;
    var tabs = btn.closest('.ds-tabs');
    var id = btn.getAttribute('data-tab');
    tabs.querySelectorAll('.ds-tabs__btn').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
    tabs.querySelectorAll('.ds-tabs__panel').forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-panel') === id);
    });
  });

  /* ---------- CAROUSEL ---------- */
  function initCarousel(car) {
    var track = car.querySelector('.ds-carousel__track');
    var slides = car.querySelectorAll('.ds-carousel__slide');
    var dotsWrap = car.querySelector('.ds-carousel__dots');
    if (!track || !slides.length) return;

    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach(function (s, i) {
        var dot = d.createElement('button');
        dot.className = 'ds-carousel__dot' + (i === 0 ? ' is-active' : '');
        dot.addEventListener('click', function () {
          slides[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
        dotsWrap.appendChild(dot);
      });
    }
    function step(dir) {
      var w0 = slides[0].offsetWidth + 24;
      track.scrollBy({ left: dir * w0, behavior: 'smooth' });
    }
    var prev = car.querySelector('.ds-carousel__btn--prev');
    var next = car.querySelector('.ds-carousel__btn--next');
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });

    track.addEventListener('scroll', function () {
      if (!dotsWrap) return;
      var idx = Math.round(track.scrollLeft / (slides[0].offsetWidth + 24));
      dotsWrap.querySelectorAll('.ds-carousel__dot').forEach(function (dt, i) {
        dt.classList.toggle('is-active', i === idx);
      });
    }, { passive: true });
  }

  /* ---------- THEME ---------- */
  function applyTheme(t) {
    d.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('ds-theme', t); } catch (e) {}
  }
  d.addEventListener('click', function (e) {
    if (e.target.closest('[data-theme-toggle]')) {
      var cur = d.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    }
    if (e.target.closest('[data-burger]')) {
      var docs = d.querySelector('.docs');
      if (docs) docs.classList.toggle('nav-open');
    }
  });

  /* ---------- SCROLLSPY ---------- */
  function initScrollSpy() {
    var links = [].slice.call(d.querySelectorAll('[data-spy]'));
    if (!links.length) return;
    var sections = links.map(function (l) { return d.querySelector(l.getAttribute('href')); }).filter(Boolean);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = '#' + en.target.id;
          links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === id); });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ---------- DEMO TOAST TRIGGER ---------- */
  d.addEventListener('click', function (e) {
    var b = e.target.closest('[data-toast]');
    if (b && w.DSClipboard) w.DSClipboard.toast(b.getAttribute('data-toast'), b.getAttribute('data-toast-type') || '');
  });

  /* ---------- INIT ---------- */
  d.addEventListener('DOMContentLoaded', function () {
    d.querySelectorAll('.ds-carousel').forEach(initCarousel);
    initScrollSpy();
    // garante panels de accordion fechados
    d.querySelectorAll('.ds-accordion__item.is-open .ds-accordion__panel').forEach(function (p) {
      p.style.maxHeight = p.scrollHeight + 'px';
    });
  });

  w.DSUI = { initCarousel: initCarousel, applyTheme: applyTheme };
})(window, document);
