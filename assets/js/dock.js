/* Apple macOS Style Interactive Magnification Dock Engine */
(function () {
  'use strict';

  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initDock() {
    var dockWrap = document.querySelector('.apple-dock-wrap');
    var dock = document.querySelector('.apple-dock');
    if (!dockWrap || !dock) return;

    var items = Array.from(dock.querySelectorAll('.dock-item'));
    if (!items.length) return;

    var BASE_SIZE = 44;
    var MAX_SIZE = 70;
    var DISTANCE = 135;

    var isHovered = false;
    var mouseX = Infinity;
    var rafId = null;

    // Track state for spring/lerp interpolation
    var itemStates = items.map(function (el) {
      return {
        el: el,
        icon: el.querySelector('svg'),
        currentSize: BASE_SIZE,
        targetSize: BASE_SIZE
      };
    });

    function updatePhysics() {
      var moving = false;

      itemStates.forEach(function (state) {
        if (!isHovered || mouseX === Infinity || rm) {
          state.targetSize = BASE_SIZE;
        } else {
          var rect = state.el.getBoundingClientRect();
          var centerX = rect.left + rect.width / 2;
          var diff = Math.abs(mouseX - centerX);

          if (diff < DISTANCE) {
            var k = Math.cos((diff / DISTANCE) * (Math.PI / 2));
            state.targetSize = BASE_SIZE + (MAX_SIZE - BASE_SIZE) * k;
          } else {
            state.targetSize = BASE_SIZE;
          }
        }

        // Lerp towards target
        var step = (state.targetSize - state.currentSize) * 0.24;
        state.currentSize += step;

        if (Math.abs(state.targetSize - state.currentSize) > 0.1) {
          moving = true;
        } else {
          state.currentSize = state.targetSize;
        }

        var s = state.currentSize;
        state.el.style.width = s.toFixed(1) + 'px';
        state.el.style.height = s.toFixed(1) + 'px';

        if (state.icon) {
          var iconSize = Math.max(18, s * 0.5);
          state.icon.style.width = iconSize.toFixed(1) + 'px';
          state.icon.style.height = iconSize.toFixed(1) + 'px';
        }
      });

      if (moving || isHovered) {
        rafId = requestAnimationFrame(updatePhysics);
      } else {
        rafId = null;
      }
    }

    function kick() {
      if (!rafId && !rm) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    }

    dock.addEventListener('pointermove', function (e) {
      if (rm) return;
      isHovered = true;
      mouseX = e.clientX;
      kick();
    });

    dock.addEventListener('pointerleave', function () {
      isHovered = false;
      mouseX = Infinity;
      kick();
    });

    // Handle Clicks: smooth scroll or actions
    items.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var href = btn.getAttribute('href');

        // Theme toggle button
        if (btn.classList.contains('dock-theme-btn')) {
          e.preventDefault();
          var html = document.documentElement;
          var cur = html.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          var next = cur === 'dark' ? 'light' : 'dark';
          html.setAttribute('data-theme', next);
          try { localStorage.setItem('theme', next); } catch (err) {}
          return;
        }

        // Anchor navigation
        if (href && href.startsWith('#')) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            if (history.pushState) history.pushState(null, null, href);
          }
        }
      });
    });

    // Scrollspy synchronization for active dot indicator
    var sections = ['hero', 'about', 'projects', 'skills', 'accomplishments', 'contact'];
    function onScrollSpy() {
      var current = '';
      sections.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      });

      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
        current = 'contact';
      }

      items.forEach(function (btn) {
        var href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
          var secId = href.replace('#', '');
          btn.classList.toggle('active', secId === current);
        }
      });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDock);
  } else {
    initDock();
  }
})();
