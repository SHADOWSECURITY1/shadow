/* ================================================================
   WCAG 2.2 Level AA — Global Accessibility Script
   shdw.com — loaded on every page
   ================================================================ */
(function () {
  'use strict';

  function init() {

    /* 1. Icon SVGs inside labeled links/buttons
       The parent <a aria-label="..."> already provides the accessible
       name. Hiding the SVG prevents screen readers from double-reading
       the SVG path data as garbled text. (WCAG 1.1.1, 4.1.2) */
    [
      'a[aria-label] svg',
      'button[aria-label] svg',
      '.footer-social a svg',
      '.press-play svg',
      '.hamburger svg',
      '.nav__toggle svg'
    ].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (svg) {
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
      });
    });

    /* 2. Social media link aria-labels — make descriptive (WCAG 2.4.4)
       "X" alone is ambiguous. Include brand context. */
    var socialLabels = {
      'Facebook':  'Shadow on Facebook',
      'Instagram': 'Shadow on Instagram',
      'YouTube':   'Shadow on YouTube',
      'X':         'Shadow on X, formerly Twitter',
      'TikTok':    'Shadow on TikTok',
      'LinkedIn':  'Shadow on LinkedIn'
    };
    document.querySelectorAll('.footer-social a[aria-label]').forEach(function (a) {
      var label = a.getAttribute('aria-label');
      if (socialLabels[label]) {
        a.setAttribute('aria-label', socialLabels[label]);
      }
    });

    /* 3. Decorative service number divs — purely visual, no info value
       Hiding from AT removes the contrast requirement. (WCAG 1.4.3) */
    document.querySelectorAll('.svc-num').forEach(function (el) {
      el.setAttribute('aria-hidden', 'true');
    });

    /* 4. Press-card play buttons — ensure the SVG polygon inside
       does not expose "5 3 19 12 5 21" as text to screen readers */
    document.querySelectorAll('.press-play svg polygon').forEach(function (el) {
      el.setAttribute('aria-hidden', 'true');
    });

    /* 5. Ticker items — mark separator dots as presentational */
    document.querySelectorAll('.ticker-sep, .globalops__ticker-sep').forEach(function (el) {
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('role', 'presentation');
    });

    /* 6. Announce dynamic city name changes to screen readers
       The global ops city slideshow updates #gop-city via JS.
       Adding a live region ensures screen reader users hear updates. */
    var gopCity = document.getElementById('gop-city');
    if (gopCity && !gopCity.getAttribute('aria-live')) {
      gopCity.setAttribute('aria-live', 'polite');
      gopCity.setAttribute('aria-atomic', 'true');
    }

    /* 7. Discreet pause control for autoplay background video (WCAG 2.2.2)
       Decorative hero videos autoplay/loop > 5s alongside content, so they
       need a pause mechanism. We inject a minimal, keyboard-operable
       pause/play button into each video's container, and start the video
       paused when the user prefers reduced motion. Styling: .vid-pause-btn
       in accessibility.css. */
    var PAUSE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<rect x="6" y="5" width="4" height="14" rx="1"></rect>' +
      '<rect x="14" y="5" width="4" height="14" rx="1"></rect></svg>';
    var PLAY_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M8 5v14l11-7z"></path></svg>';
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('video[autoplay], video[loop]').forEach(function (video) {
      var parent = video.parentElement;
      if (!parent || parent.querySelector(':scope > .vid-pause-btn')) return;
      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'vid-pause-btn';

      function render(paused) {
        btn.innerHTML = paused ? PLAY_SVG : PAUSE_SVG;
        btn.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
      }

      if (reduceMotion) { try { video.pause(); } catch (e) {} }
      render(video.paused);

      btn.addEventListener('click', function () {
        if (video.paused) {
          var p = video.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else {
          video.pause();
        }
      });

      /* Keep the icon in sync even if the browser changes playback itself. */
      video.addEventListener('play', function () { render(false); });
      video.addEventListener('pause', function () { render(true); });

      parent.appendChild(btn);
    });

  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
