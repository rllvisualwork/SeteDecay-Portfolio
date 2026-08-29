// ============ SALUDO EN CONSOLA ============
// EDITAR: cambia el mensaje si quieres, o bórralo si no te va el rollo
console.log(
  '%cqué haces aquí, fisgón%c\nsi sabes leer esto, escríbeme y hablamos de curro → setedecay.business@gmail.com',
  'font-size: 16px; font-weight: 700; color: #39ff88;',
  'font-size: 12px; color: #8b8c93;'
);

// ============ MENÚ MÓVIL ============
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ CONTADORES ANIMADOS DE STATS ============
const statNumbers = document.querySelectorAll('.stat-card__number');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (Number.isNaN(target)) return;

  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(target * eased);
    el.textContent = value.toLocaleString('es-ES');
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString('es-ES');
    }
  }
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window && statNumbers.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

// ============ CIERRE DE MENÚ MÓVIL AL REDIMENSIONAR A DESKTOP ============
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  }
});
