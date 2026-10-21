/* Bottom Navigation Bar Controller */
(function () {
  'use strict';

  function initBottomNav() {
    var nav = document.getElementById('bottom-nav');
    if (!nav) return;

    var items = nav.querySelectorAll('.bottom-nav-item');
    if (!items.length) return;

    var sections = [];
    items.forEach(function (item) {
      var targetId = item.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        var sec = document.querySelector(targetId);
        if (sec) {
          sections.push({ id: targetId.slice(1), el: sec, btn: item });
        }
      }
    });

    function setActive(activeBtn) {
      items.forEach(function (btn) {
        var isActive = (btn === activeBtn);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    }

    // Click handler with smooth scrolling
    items.forEach(function (item) {
      item.addEventListener('click', function (e) {
        var targetId = item.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          var targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            setActive(item);
            targetEl.scrollIntoView({ behavior: 'smooth' });
            if (history.pushState) {
              history.pushState(null, null, targetId);
            }
          }
        }
      });
    });

    // Sync active item on scroll (Scrollspy)
    function onScrollSync() {
      var scrollPos = window.scrollY + window.innerHeight * 0.35;
      var current = null;

      for (var i = 0; i < sections.length; i++) {
        var s = sections[i];
        var top = s.el.offsetTop;
        var bottom = top + s.el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          current = s.btn;
          break;
        }
      }

      // If at bottom of page, activate last item (Contact)
      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50)) {
        if (sections.length) current = sections[sections.length - 1].btn;
      }

      if (current) {
        setActive(current);
      }
    }

    window.addEventListener('scroll', onScrollSync, { passive: true });
    onScrollSync();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBottomNav);
  } else {
    initBottomNav();
  }
})();
