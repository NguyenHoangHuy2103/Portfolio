(function () {
  'use strict';

  /* ---------- PROGRESS BAR ---------- */
  var prog = document.getElementById('progress');
  function updateProgress() {
    var h = document.documentElement;
    var pct = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    prog.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ---------- NAV SCROLL STYLE ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    updateProgress();
    updateScrollspy();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- SCROLLSPY ---------- */
  var sections = ['about', 'projects', 'skills', 'contact'];
  var navLinks = document.querySelectorAll('.nav-links a[data-section]');
  function updateScrollspy() {
    var current = '';
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-section') === current);
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  function revealAll() { revealEls.forEach(function (el) { el.classList.add('rv'); }); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('rv'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      document.querySelectorAll('[data-reveal]:not(.rv)').forEach(function (el) { el.classList.add('rv'); });
    }, 800);
  } else {
    revealAll();
  }

  /* ---------- LIVE CLOCK ---------- */
  var clock = document.getElementById('clock');
  function tickClock() {
    try {
      clock.textContent = 'TP.HCM — ' + new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit'
      }).format(new Date()) + ' GMT+7';
    } catch (e) {}
  }
  tickClock();
  setInterval(tickClock, 30000);

  /* ---------- COPY EMAIL ---------- */
  var copyBtn = document.getElementById('copy-mail');
  var copyTip = document.getElementById('copy-tip');
  var tipTimer;
  function doCopy() {
    navigator.clipboard.writeText('jayker03212k5@gmail.com').then(function () {
      copyTip.classList.add('show');
      clearTimeout(tipTimer);
      tipTimer = setTimeout(function () { copyTip.classList.remove('show'); }, 2000);
    });
  }
  copyBtn.addEventListener('click', doCopy);
  copyBtn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') doCopy(); });

  /* ---------- AVATAR PLACEHOLDER ---------- */
  var avatarImg = document.getElementById('avatar-img');
  var avatarPh = document.getElementById('avatar-ph');
  if (!avatarImg.src || avatarImg.src.indexOf('YOUR_PHOTO') > -1) {
    avatarImg.style.display = 'none';
    avatarPh.style.display = 'flex';
  } else {
    avatarImg.addEventListener('load', function () { avatarPh.style.display = 'none'; });
    avatarImg.addEventListener('error', function () { avatarImg.style.display = 'none'; avatarPh.style.display = 'flex'; });
  }

  /* ---------- HAMBURGER ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  burger.addEventListener('click', function () {
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  window.closeDrawer = function () {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  };

})();

/* ---------- TYPEWRITER ---------- */
window.addEventListener('load', function () {
  var el = document.getElementById('tw');
  if (!el) return;

  var words = ['Backend Developer', 'Full-stack Developer', 'Research Lead', 'System Builder'];
  var wi = 0, ci = 0, deleting = false;

  el.textContent = words[0].substring(0, 1);

  function tick() {
    var w = words[wi];
    if (!deleting) {
      ci = ci + 1;
      el.textContent = w.substring(0, ci);
      if (ci >= w.length) {
        deleting = true;
        setTimeout(tick, 2000);
      } else {
        setTimeout(tick, 90);
      }
    } else {
      ci = ci - 1;
      el.textContent = w.substring(0, ci);
      if (ci <= 0) {
        ci = 0;
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, 350);
      } else {
        setTimeout(tick, 55);
      }
    }
  }

  setTimeout(tick, 400);
});
