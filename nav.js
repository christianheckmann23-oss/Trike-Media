// Injects shared nav and footer, highlights active link
(function () {
  const logoSVG = `
    <svg class="logo-mark" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="38" rx="2" fill="#2e4a3e"/>
      <polygon points="8,28 19,10 30,28" fill="none" stroke="#fdfdfb" stroke-width="1.5"/>
      <line x1="19" y1="10" x2="19" y2="5" stroke="#c8a96e" stroke-width="2" stroke-linecap="round"/>
      <line x1="13" y1="18" x2="9" y2="14" stroke="#c8a96e" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="25" y1="18" x2="29" y2="14" stroke="#c8a96e" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="19" cy="20" r="2" fill="#c8a96e"/>
    </svg>`;

  const navHTML = `
    <nav>
      <a href="index.html" class="nav-logo">
        ${logoSVG}
        <span class="logo-text">Trike Media</span>
      </a>
      <ul class="nav-links">
        <li><a href="website-development.html" data-page="website-development">Website Development</a></li>
        <li><a href="packages.html" data-page="packages">Packages</a></li>
        <li><a href="hosting.html" data-page="hosting">Hosting</a></li>
        <li><a href="about.html" data-page="about">About</a></li>
        <li><a href="request-preview.html" class="nav-cta">See Your Site</a></li>
      </ul>
      <button class="nav-burger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-mobile" role="dialog" aria-label="Mobile navigation">
      <a href="website-development.html">Website Development</a>
      <a href="packages.html">Packages</a>
      <a href="hosting.html">Hosting</a>
      <a href="about.html">About</a>
      <a href="request-preview.html" class="nav-mobile-cta">See Your Site</a>
    </div>`;

  const footerHTML = `
    <footer>
      <a href="index.html" class="footer-logo">
        <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
          <rect width="38" height="38" rx="2" fill="#2e4a3e"/>
          <polygon points="8,28 19,10 30,28" fill="none" stroke="#fdfdfb" stroke-width="1.5"/>
          <line x1="19" y1="10" x2="19" y2="5" stroke="#c8a96e" stroke-width="2" stroke-linecap="round"/>
          <line x1="13" y1="18" x2="9" y2="14" stroke="#c8a96e" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="25" y1="18" x2="29" y2="14" stroke="#c8a96e" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="19" cy="20" r="2" fill="#c8a96e"/>
        </svg>
        Trike Media
      </a>
      <p class="footer-copy">© 2026 Triceratops Media Solutions, LLC · Elyria, Ohio</p>
      <ul class="footer-links">
        <li><a href="website-development.html">Website Development</a></li>
        <li><a href="packages.html">Packages</a></li>
        <li><a href="hosting.html">Hosting</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="request-preview.html">Contact</a></li>
        <li><a href="legal.html">Legal &amp; Policies</a></li>
      </ul>
    </footer>`;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = navHTML;
  const navEl = tempDiv.querySelector('nav');
  const mobileMenu = tempDiv.querySelector('.nav-mobile');
  document.getElementById('nav-placeholder').replaceWith(navEl, mobileMenu);
  document.getElementById('footer-placeholder').outerHTML = footerHTML;

  // Hamburger toggle
  const burger = document.querySelector('.nav-burger');
  const mobile = document.querySelector('.nav-mobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Highlight active nav link
  const page = document.body.dataset.page;
  if (page) {
    const link = document.querySelector(`[data-page="${page}"]`);
    if (link) link.classList.add('active');
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
