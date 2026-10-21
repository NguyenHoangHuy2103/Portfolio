/* Lucian UX/UI Prompt #205 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#205 */
(function () {
  'use strict';

  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function g(d, s) {
    return Math.exp(-(d * d) / (2 * s * s));
  }

  function initRipple(el, opts) {
    if (!el) return null;
    opts = opts || {};

    var text = opts.text || el.textContent || '';
    var amp = opts.amp || 22;
    var sig = opts.sig || 36;
    var initialWaveDelay = opts.initialWaveDelay || 0;

    // Preserve accessibility: set aria-label
    if (!el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', text.trim());
    }

    el.classList.add('u205-wd');
    el.innerHTML = '';

    // Parse words and letters
    var words = text.split(' ');
    var L = [];

    words.forEach(function (wordText, wIdx) {
      if (wIdx > 0) {
        var sp = document.createElement('span');
        sp.className = 'u205-space';
        sp.innerHTML = '&nbsp;';
        sp.setAttribute('aria-hidden', 'true');
        el.appendChild(sp);
      }

      var wSpan = document.createElement('span');
      wSpan.className = 'u205-word';
      wSpan.setAttribute('aria-hidden', 'true');

      Array.from(wordText).forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'u205-l' + (ch === '.' ? ' u205-dot' : '');
        s.textContent = ch;
        s.setAttribute('aria-hidden', 'true');
        wSpan.appendChild(s);
        L.push({ el: s, x: 0, y: 0, v: 0 });
      });

      el.appendChild(wSpan);
    });

    var px = null;
    var pulse = null;
    var raf = 0;

    function measure() {
      if (!el.isConnected) return;
      var r = el.getBoundingClientRect();
      L.forEach(function (l) {
        var lr = l.el.getBoundingClientRect();
        l.x = (lr.left - r.left) + lr.width / 2;
      });
    }

    function tick(now) {
      raf = 0;
      if (!el.isConnected) return;

      var moving = false;
      var pc = null;

      if (pulse !== null) {
        var k = (now - pulse) / 1050;
        if (k >= 1) {
          pulse = null;
        } else {
          pc = -40 + (el.offsetWidth + 80) * k;
        }
      }

      L.forEach(function (l) {
        var tgt = 0;
        if (px !== null) {
          tgt -= amp * g(l.x - px, sig);
        }
        if (pc !== null) {
          tgt -= amp * 1.32 * g(l.x - pc, sig * 1.25);
        }

        l.v += (tgt - l.y) * 0.16;
        l.v *= 0.8;
        l.y += l.v;

        if (Math.abs(l.v) > 0.02 || Math.abs(tgt - l.y) > 0.05) {
          moving = true;
        }

        var t = Math.min(1, Math.max(0, -l.y / (amp * 1.35)));
        var sy = 1 + Math.max(-0.08, Math.min(0.14, -l.v * 0.02));

        l.el.style.setProperty('--y', l.y.toFixed(2) + 'px');
        l.el.style.setProperty('--sy', sy.toFixed(3));
        l.el.style.setProperty('--t', t.toFixed(3));
      });

      if (moving || pulse !== null || px !== null) {
        raf = requestAnimationFrame(tick);
      }
    }

    function kick() {
      if (!raf && !rm) {
        raf = requestAnimationFrame(tick);
      }
    }

    function sendWave() {
      if (rm) return;
      measure();
      pulse = performance.now();
      kick();
    }

    function local(e) {
      var r = el.getBoundingClientRect();
      return (e.clientX - r.left) * (el.offsetWidth / (r.width || 1));
    }

    el.addEventListener('pointermove', function (e) {
      if (!L.length) return;
      if (!L[0].x) measure();
      px = local(e);
      kick();
    });

    el.addEventListener('pointerleave', function () {
      px = null;
      kick();
    });

    // Send wave on click
    el.addEventListener('click', function () {
      sendWave();
    });

    // Keyboard support: trigger wave on focus or Enter/Space
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        sendWave();
      }
    });

    // Responsive re-measure
    window.addEventListener('resize', measure, { passive: true });
    el.addEventListener('transitionend', measure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    setTimeout(measure, 100);
    setTimeout(measure, 500);

    // Initial welcome wave if requested
    if (initialWaveDelay > 0 && !rm) {
      setTimeout(function () {
        sendWave();
      }, initialWaveDelay);
    }

    return {
      measure: measure,
      sendWave: sendWave
    };
  }

  // Initialize on target elements
  function initAll() {
    // 1. Logo NHH. in Navigation
    var logoEl = document.getElementById('logo-ripple');
    if (logoEl) {
      initRipple(logoEl, {
        text: 'NHH.',
        amp: 8,
        sig: 15,
        initialWaveDelay: 800
      });
    }

    // 2. Hero Name Nguyễn Hoàng Huy.
    var heroNameEl = document.getElementById('hero-name-ripple');
    if (heroNameEl) {
      initRipple(heroNameEl, {
        text: 'Nguyễn Hoàng Huy.',
        amp: 24,
        sig: 40,
        initialWaveDelay: 1200
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
