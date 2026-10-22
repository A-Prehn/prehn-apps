// Fælles adfærd for Vores familie-undersiderne: kant under glasbjælken, indtoning og tryk-feedback.
(function () {
  var nav = document.querySelector('.nav');
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 4); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  document.querySelectorAll('.btn').forEach(function (el) {
    el.addEventListener('pointerdown', function () { el.classList.add('down'); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (t) { el.addEventListener(t, function () { el.classList.remove('down'); }); });
  });

  // Åbn et spørgsmål direkte via #anker (fx support/#premium)
  if (location.hash) { var d = document.querySelector(location.hash); if (d && d.tagName === 'DETAILS') d.open = true; }
})();
