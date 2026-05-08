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
        <li><a href="process.html" data-page="process">Process</a></li>
        <li><a href="packages.html" data-page="packages">Packages</a></li>
        <li><a href="retainers.html" data-page="retainers">Retainers</a></li>
        <li><a href="about.html" data-page="about">About</a></li>
        <li><a href="request-preview.html" class="nav-cta">See Your Site</a></li>
      </ul>
    </nav>`;

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
        <li><a href="process.html">Process</a></li>
        <li><a href="packages.html">Packages</a></li>
        <li><a href="retainers.html">Retainers</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="request-preview.html">Contact</a></li>
      </ul>
    </footer>`;

  document.getElementById('nav-placeholder').outerHTML = navHTML;
  document.getElementById('footer-placeholder').outerHTML = footerHTML;

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
