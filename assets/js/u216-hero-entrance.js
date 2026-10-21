/* Lucian UX/UI Prompt #216 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#216 */
(function () {
  'use strict';

  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initHeroEntrance() {
    var hero = document.getElementById('hero');
    var nav = document.getElementById('nav');

    if (!hero) return;

    function play() {
      if (rm) {
        if (nav) nav.classList.add('is-in');
        hero.classList.add('is-in');
        return;
      }

      // Snap reset to initial state
      if (nav) {
        nav.classList.add('is-snap');
        nav.classList.remove('is-in');
      }
      hero.classList.add('is-snap');
      hero.classList.remove('is-in');

      // Force layout reflow
      void hero.offsetWidth;

      if (nav) nav.classList.remove('is-snap');
      hero.classList.remove('is-snap');

      // Trigger transition on next frame
      requestAnimationFrame(function () {
        if (nav) nav.classList.add('is-in');
        hero.classList.add('is-in');
      });
    }

    // Expose for external calls or replay
    window.replayHeroEntrance = play;

    // Trigger entrance immediately
    if (document.readyState === 'complete') {
      play();
    } else {
      window.addEventListener('load', play, { once: true });
      // Fallback in case load takes time
      setTimeout(play, 150);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroEntrance);
  } else {
    initHeroEntrance();
  }
})();
