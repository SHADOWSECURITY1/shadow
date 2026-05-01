(function () {
  var CSS = [
    '.brand-s-fixed{position:fixed;right:48px;top:50%;transform:translateY(-50%);width:200px;opacity:0.09;pointer-events:none;z-index:9998;transition:none;}',
    '@keyframes sLightWave{0%{opacity:0.09;filter:drop-shadow(0 0 0px transparent)}35%{opacity:0.42;filter:drop-shadow(0 0 36px rgba(201,168,76,0.55))}100%{opacity:0.09;filter:drop-shadow(0 0 0px transparent)}}',
    '.brand-s-fixed.s-pulse{animation:sLightWave 2s ease-in-out forwards;}',
    '.brand-s-seal{display:block;width:56px;height:auto;margin-top:20px;opacity:0.75;}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // Fixed S watermark on right side
  var sMark = document.createElement('img');
  sMark.src = 'shadow-s.png';
  sMark.alt = '';
  sMark.setAttribute('aria-hidden', 'true');
  sMark.className = 'brand-s-fixed';
  document.body.appendChild(sMark);

  // Pulse on each section headline scroll into view
  function triggerPulse() {
    sMark.classList.remove('s-pulse');
    void sMark.offsetWidth; // restart animation
    sMark.classList.add('s-pulse');
  }

  // Initial pulse on load
  setTimeout(triggerPulse, 500);

  // Re-pulse on each h2.section-h entering viewport
  if ('IntersectionObserver' in window) {
    var headings = document.querySelectorAll('h2.section-h, .hero-kicker, .page-eyebrow');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) triggerPulse();
      });
    }, { threshold: 0.4 });
    headings.forEach(function (h) { observer.observe(h); });
  }

  // Footer seal — inserted after .footer-tagline
  var tagline = document.querySelector('.footer-tagline');
  if (tagline) {
    var seal = document.createElement('img');
    seal.src = 'shadow-s.png';
    seal.alt = 'SHADOW';
    seal.className = 'brand-s-seal';
    tagline.parentNode.insertBefore(seal, tagline.nextSibling);
  }
})();
