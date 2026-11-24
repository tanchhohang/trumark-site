import { OPENING_MARK_BASELINE } from "./motion";

// Static head script. Honor an interruption even if React is still downloading.
// HeroIntro takes over these listeners as soon as it has the measured layout.
export const openingState = `(() => {
  const root = document.documentElement;
  root.classList.add('has-mobile-menu');
  if (!matchMedia('screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)').matches) return;
  root.classList.add('hero-motion');
  if (location.hash && location.hash !== '#home') return;

  const mobile = matchMedia('(max-width: 700px)').matches;
  root.classList.add('intro-playing');
  if (!mobile) root.classList.add('scroll-intro');
  const pending = new AbortController();
  const options = { signal: pending.signal, passive: true };
  const finish = () => {
    root.classList.remove('intro-playing', 'scroll-intro');
    pending.abort();
  };
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.key === 'Tab') finish();
  }, options);
  if (mobile) {
    for (const event of ['scroll', 'hashchange', 'pagehide']) window.addEventListener(event, finish, options);
  }
  window.addEventListener('trumark:hero-ready', () => pending.abort(), options);
})();`;

// The hero can grow beyond 100svh on short screens. Use its laid-out height,
// including the same offsetHeight rounding that the animation uses.
export const openingPosition = `if (document.documentElement.classList.contains('intro-playing')) {
  const hero = document.querySelector('.hero');
  const mark = hero.querySelector('.hero-mark');
  document.documentElement.style.setProperty('--initial-mark-y', (hero.offsetHeight * ${OPENING_MARK_BASELINE} - mark.offsetHeight) + 'px');
}`;
