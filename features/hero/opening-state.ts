import { OPENING_MARK_BASELINE } from "./motion";

// Static head script. Honor an interruption even if React is still downloading.
// HeroIntro takes over these listeners as soon as it has the measured layout.
export const openingState = `(() => {
  const root = document.documentElement;
  root.classList.add('has-mobile-menu');
  const motionOk = matchMedia('screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)').matches;
  // The scroll intro is laptop and desktop only. Phones get a short GSAP
  // entrance instead (MobileIntro). Hide the hero text and mark until it runs,
  // with a failsafe so a failed script download never leaves them hidden.
  if (matchMedia('(max-width: 700px)').matches) {
    if (motionOk && (!location.hash || location.hash === '#home')) {
      root.classList.add('mobile-intro');
      setTimeout(() => root.classList.remove('mobile-intro'), 3000);
    }
    return;
  }
  if (!motionOk) return;
  root.classList.add('hero-motion');
  if (location.hash && location.hash !== '#home') return;

  root.classList.add('intro-playing', 'scroll-intro');
  const pending = new AbortController();
  const options = { signal: pending.signal, passive: true };
  const finish = () => {
    root.classList.remove('intro-playing', 'scroll-intro');
    pending.abort();
  };
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.key === 'Tab') finish();
  }, options);
  window.addEventListener('trumark:hero-ready', () => pending.abort(), options);
})();`;

// The hero can grow beyond 100svh on short screens. Use its laid-out height,
// including the same offsetHeight rounding that the animation uses.
export const openingPosition = `if (document.documentElement.classList.contains('intro-playing')) {
  const hero = document.querySelector('.hero');
  const mark = hero.querySelector('.hero-mark');
  document.documentElement.style.setProperty('--initial-mark-y', (hero.offsetHeight * ${OPENING_MARK_BASELINE} - mark.offsetHeight) + 'px');
}`;
