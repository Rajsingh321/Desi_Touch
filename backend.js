// ===== Language switch (English default, Hindi secondary) =====
// Any element with data-en / data-hi attributes has its text swapped.
// Elements are found fresh each time so this also covers content added later.

const langSwitchBtn = document.getElementById('langSwitch');
const langOptEls = document.querySelectorAll('[data-lang-btn]');

function setLanguage(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');

  document.querySelectorAll('[data-en]').forEach((el) => {
    const text = lang === 'hi' ? (el.getAttribute('data-hi') || el.getAttribute('data-en')) : el.getAttribute('data-en');
    el.textContent = text;
  });

  langOptEls.forEach((el) => {
    el.classList.toggle('active', el.getAttribute('data-lang-btn') === lang);
  });

  try {
    localStorage.setItem('desi_touch_lang', lang);
  } catch (e) {
    // localStorage unavailable — language choice just won't persist across visits
  }
}

langSwitchBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-lang') || 'en';
  setLanguage(current === 'en' ? 'hi' : 'en');
});

// Restore saved preference, default English
let savedLang = 'en';
try {
  savedLang = localStorage.getItem('desi_touch_lang') || 'en';
} catch (e) {
  savedLang = 'en';
}
setLanguage(savedLang);


// ===== Sticky mobile/desktop buy bar =====
// Shown once the hero section has scrolled out of view.

const hero = document.getElementById('hero');
const stickyBuy = document.getElementById('stickyBuy');

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      stickyBuy.classList.toggle('visible', !entry.isIntersecting);
    });
  },
  { threshold: 0 }
);
heroObserver.observe(hero);


// ===== Buy buttons =====
// Ordering flow is a separate page (not built yet). Both buy buttons already
// link to order.html via href, so no extra JS is required for navigation.
// Placeholder hook kept here in case pre-checkout logic (e.g. quantity,
// analytics event) needs to be added later.

['buyHero', 'buySticky'].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => {
      // e.g. track 'buy_click' analytics event here before navigation
    });
  }
});