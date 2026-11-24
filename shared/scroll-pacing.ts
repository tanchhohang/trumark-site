// Smooth wheel scrolling. The wheel moves a target and the page eases toward
// it, with no cap on distance or speed. Touch, keyboard and scrollbar stay native.
export function setupScrollPacing() {
  const controller = new AbortController();
  const { signal } = controller;
  const motion = matchMedia(
    "screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)",
  );
  const excluded =
    'dialog, textarea, select, input, [contenteditable="true"], .menu-open .nav-panel';
  let target = 0,
    current = 0,
    frame = 0,
    lastFrame = 0;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function advance(time: number) {
    const elapsed = Math.max(0, Math.min(64, time - lastFrame));
    lastFrame = time;
    // Frame-rate independent easing toward the target.
    current += (target - current) * (1 - Math.exp(-elapsed / 100));
    if (Math.abs(target - current) < 0.5) {
      current = target;
      frame = 0;
    } else {
      frame = requestAnimationFrame(advance);
    }
    window.scrollTo({ top: current, behavior: "instant" });
  }

  window.addEventListener(
    "wheel",
    (event) => {
      if (
        !motion.matches ||
        !event.cancelable ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
        (event.target instanceof Element && event.target.closest(excluded))
      )
        return;
      event.preventDefault();
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
      // Pick up wherever the page is if something else moved it.
      if (!frame) current = target = window.scrollY;
      const end =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      target = Math.max(0, Math.min(end, target + event.deltaY * unit));
      if (!frame) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(advance);
      }
    },
    { passive: false, signal },
  );

  for (const event of [
    "pointerdown",
    "keydown",
    "click",
    "hashchange",
    "pageshow",
  ]) {
    window.addEventListener(event, stop, { capture: true, signal });
  }
  return () => {
    controller.abort();
    stop();
  };
}
