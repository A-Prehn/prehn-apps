// Samtykke til Meta Pixel på hjemmesiden (aldrig i appen).
// Pixlen indlæses KUN, efter at den besøgende har trykket "Accepter". Valget huskes i localStorage
// og kan ændres via linket "Cookie-indstillinger" i bunden af siderne (data-cookie-settings).
(function () {
  var PIXEL_ID = '2678816972521613';
  var KEY = 'vf-cookie-samtykke'; // "ja" | "nej"
  var privacyHref = (document.currentScript && document.currentScript.dataset.privacy) || '/vores-familie/privatliv/#hjemmesiden';

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    // Tryk på "Hent i App Store" tælles som et klik videre til App Store (ingen data om appen).
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href*="apps.apple.com"]');
      if (a && window.fbq) window.fbq('trackCustom', 'AppStoreKlik');
    });
  }

  function css() {
    var s = document.createElement('style');
    s.textContent =
      '.vf-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:50;max-width:30rem;margin:0 auto;' +
      'background:#fff;color:#2c2820;border:1px solid #e8e3db;border-radius:18px;padding:16px 18px;' +
      'box-shadow:0 12px 40px -12px rgba(44,40,32,.35);font:400 .9375rem/1.45 -apple-system,system-ui,"Segoe UI",sans-serif}' +
      '.vf-consent p{margin:0 0 12px}.vf-consent a{color:#2c2820}' +
      '.vf-consent .row{display:flex;gap:8px}' +
      '.vf-consent button{flex:1;min-height:44px;border-radius:22px;font:600 .9375rem -apple-system,system-ui,sans-serif;cursor:pointer}' +
      '.vf-consent .yes{background:#2c2820;color:#fff;border:0}.vf-consent .no{background:#f0ede6;color:#2c2820;border:0}' +
      '@media (prefers-color-scheme:dark){.vf-consent{background:#2a2620;color:#eee8dd;border-color:#3b352d}.vf-consent a{color:#eee8dd}' +
      '.vf-consent .yes{background:#eee8dd;color:#1b1814}.vf-consent .no{background:#3b352d;color:#eee8dd}}';
    document.head.appendChild(s);
  }

  function banner() {
    if (document.querySelector('.vf-consent')) return;
    var box = document.createElement('div');
    box.className = 'vf-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Cookies');
    box.innerHTML =
      '<p>Vi bruger cookies til at måle vores markedsføring. <a href="' + privacyHref + '">Læs mere</a></p>' +
      '<div class="row"><button type="button" class="no">Afvis</button><button type="button" class="yes">Accepter</button></div>';
    box.querySelector('.yes').onclick = function () { save('ja'); box.remove(); loadPixel(); };
    box.querySelector('.no').onclick = function () { save('nej'); box.remove(); };
    document.body.appendChild(box);
  }

  function start() {
    css();
    var v = read();
    if (v === 'ja') loadPixel();
    else if (v !== 'nej') banner();
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        // Har man sagt ja og ombestemmer sig, genindlæses siden uden pixlen, når man vælger "Afvis".
        var had = read() === 'ja';
        banner();
        var no = document.querySelector('.vf-consent .no');
        if (no && had) no.onclick = function () { save('nej'); location.reload(); };
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
