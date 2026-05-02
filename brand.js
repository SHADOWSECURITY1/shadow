(function () {
  var CSS = [
    '.brand-s-seal{display:block;width:56px;height:auto;margin-top:20px;opacity:0.75;}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

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