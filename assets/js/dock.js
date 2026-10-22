/* Floating Capsule Navbar Engine with Expanding Tabs */
(function () {
  'use strict';

  // Restore saved theme on load
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (err) {}

  function initNav() {
    var nav = document.getElementById('nav');
    var navItems = Array.from(document.querySelectorAll('.nav-item'));
    if (!navItems.length) return;

    // Handle Nav Item Clicks
    navItems.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
          var target = document.querySelector(href);
          if (target || href === '#hero') {
            e.preventDefault();

            // Instant visual feedback: expand clicked tab immediately
            navItems.forEach(function (el) { el.classList.remove('active'); });
            btn.classList.add('active');

            if (href === '#hero') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              // 70px further scroll offset for full section visibility below navbar
              var targetTop = target.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: Math.max(0, targetTop - 14),
                behavior: 'smooth'
              });
            }

            if (history.pushState) history.pushState(null, null, href);
          }
        }
      });
    });

    // Logo Click -> Smooth scroll to top & activate Home tab
    var logo = document.getElementById('logo-ripple');
    if (logo) {
      logo.addEventListener('click', function (e) {
        e.preventDefault();
        navItems.forEach(function (el) { el.classList.remove('active'); });
        var homeItem = document.querySelector('.nav-item[href="#hero"]');
        if (homeItem) homeItem.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (history.pushState) history.pushState(null, null, '#hero');
      });
    }

    // Theme Toggle Button
    var themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var html = document.documentElement;
        var cur = html.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        var next = cur === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (err) {}
      });
    }

    // Scrollspy synchronization for active expanding tab
    var sections = ['about', 'projects', 'skills', 'accomplishments', 'contact'];

    function onScrollSpy() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var current = 'hero';

      if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 60)) {
        current = 'contact';
      } else if (scrollY > 120) {
        sections.forEach(function (id) {
          var el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) {
            current = id;
          }
        });
      }

      navItems.forEach(function (btn) {
        var href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
          var secId = href.replace('#', '');
          btn.classList.toggle('active', secId === current);
        }
      });

      if (nav) {
        nav.classList.toggle('scrolled', scrollY > 30);
      }
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
