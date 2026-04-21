// ═══════════════════════════════════════
// CONCEPT DECORS — SHARED JS
// ═══════════════════════════════════════

// Loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 2000);
});

// Nav scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', scrollY > 80);
  revealOnScroll();
});

// Hamburger
function toggleMenu() {
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob-menu');
  if (ham) ham.classList.toggle('open');
  if (mob) mob.classList.toggle('open');
}

// Reveal on scroll
function revealOnScroll() {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
      el.classList.add('in');
    }
  });
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = target * ease;
      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

let countersDone = false;
function checkCounters() {
  if (countersDone) return;
  const strip = document.querySelector('.stats-strip');
  if (strip && strip.getBoundingClientRect().top < window.innerHeight * 0.9) {
    countersDone = true;
    animateCounters();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => { revealOnScroll(); checkCounters(); }, 300);
});
window.addEventListener('scroll', checkCounters);
