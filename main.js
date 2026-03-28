// ============================================================
//  HK PHOTOGRAPHY — Main JavaScript
//  ICT233 Web Technologies & Design, 2025/2026
// ============================================================

// ── NAV & FOOTER INJECTOR ────────────────────────────────────
(function () {
  function injectNavFooter() {
  const navHTML = `
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <div class="logo-main">HK<span>.</span></div>
      <div class="logo-sub">Photography</div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="gallery.html">Gallery</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="booking.html" class="nav-book">Book Now</a></li>
    </ul>
    <button class="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu">
    <a href="index.html">Home</a>
    <a href="gallery.html">Gallery</a>
    <a href="services.html">Services</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="booking.html">Book a Session</a>
  </div>
</nav>`;

  const footerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo-main">HK<span style="color:var(--gold)">.</span> Photography</div>
        <p>Capturing life's most beautiful moments with artistic vision and technical excellence. Based in Kumasi, Ghana.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="about.html">About Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html">Portrait Photography</a></li>
          <li><a href="services.html">Wedding Photography</a></li>
          <li><a href="services.html">Event Coverage</a></li>
          <li><a href="services.html">Product Photography</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="#">📍 Kumasi, Ghana</a></li>
          <li><a href="tel:+233000000000">📞 +233 (0) 000 000 000</a></li>
          <li><a href="mailto:info@hkphotography.com">✉️ info@hkphotography.com</a></li>
          <li><a href="booking.html">📅 Book a Session</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      © 2026 HK Photography · All Rights Reserved · ICT233 Web Technologies Project
    </div>
  </div>
</footer>
<div id="toast"></div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavFooter);
  } else {
    injectNavFooter();
  }
})();

// ── SHARED UTILITIES ─────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
  // Active link highlighting
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// ── SCROLL REVEAL ANIMATION ──────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── LIGHTBOX ─────────────────────────────────────────────────
function openLightbox(src, caption) {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div class="lb-overlay"></div>
      <div class="lb-content">
        <button class="lb-close" aria-label="Close">✕</button>
        <div class="lb-img-wrap"><div class="lb-placeholder" id="lb-ph"></div></div>
        <p class="lb-caption" id="lb-cap"></p>
      </div>`;
    lb.style.cssText = 'position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;';
    lb.querySelector('.lb-overlay').style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.92);cursor:pointer;';
    lb.querySelector('.lb-content').style.cssText = 'position:relative;max-width:90vw;max-height:90vh;text-align:center;';
    lb.querySelector('.lb-close').style.cssText = 'position:absolute;top:-40px;right:0;background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;';
    lb.querySelector('.lb-caption').style.cssText = 'color:#C9A84C;font-size:.82rem;letter-spacing:.1em;margin-top:12px;text-transform:uppercase;';
    lb.querySelector('.lb-placeholder').style.cssText = 'width:60vw;height:70vh;max-width:900px;background:#1E1E1E;display:flex;align-items:center;justify-content:center;font-size:5rem;';
    lb.querySelector('.lb-overlay').onclick = () => lb.remove();
    lb.querySelector('.lb-close').onclick  = () => lb.remove();
    document.body.appendChild(lb);
  }
  document.getElementById('lb-ph').textContent = src;
  document.getElementById('lb-cap').textContent = caption;
}

document.addEventListener('DOMContentLoaded', () => {
  // Small delay ensures nav/footer are injected first
  setTimeout(() => { initNav(); initScrollReveal(); }, 10);
});

// Reveal CSS
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal { opacity:0; transform:translateY(28px); transition:.7s ease; }
  .reveal.revealed { opacity:1; transform:translateY(0); }
  .reveal-delay-1 { transition-delay:.1s; }
  .reveal-delay-2 { transition-delay:.2s; }
  .reveal-delay-3 { transition-delay:.3s; }
  .reveal-delay-4 { transition-delay:.4s; }
`;
document.head.appendChild(revealStyle);
