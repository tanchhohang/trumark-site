"use client";
import { useLayoutEffect } from "react";
import { OPENING_MARK_BASELINE } from "./motion";
export function HeroIntro() {
  useLayoutEffect(() => {
    window.dispatchEvent(new Event("trumark:hero-ready"));
    const root = document.documentElement;
    const motion = matchMedia(
      "screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)",
    );
    const hero = document.querySelector<HTMLElement>(".hero")!;
    const mark = hero.querySelector<HTMLElement>(".hero-mark")!;
    const copy = hero.querySelector<HTMLElement>(".hero-copy")!;
    const cue = hero.querySelector<HTMLElement>(".scroll-cue")!;
    const nav = document.querySelector<HTMLElement>(".site-nav")!;
    const homeLink = nav.querySelector<HTMLElement>(".wordmark")!;
    const mobile = matchMedia("(max-width: 700px)");
    const wasPlaying = root.classList.contains("intro-playing");
    const wasScrollIntro = root.classList.contains("scroll-intro");
    let completed = !root.classList.contains("intro-playing");
    const observer = new IntersectionObserver(([entry]) => {
      const past =
        !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
      nav.classList.toggle("past-hero", past);
      nav.classList.toggle("over-art", !past);
    });
    observer.observe(hero.parentElement!);

    let listeners: AbortController | undefined;
    let frame = 0,
      startY = 0,
      endY = 0,
      endScale = 1,
      scrollStart = 0,
      scrollDistance = 1;
    function measure() {
      const sequence = hero.parentElement!;
      scrollStart = sequence.getBoundingClientRect().top + window.scrollY;
      scrollDistance = Math.max(1, sequence.offsetHeight - hero.offsetHeight);
      endScale = homeLink.offsetWidth / mark.offsetWidth;
      endY = (nav.offsetHeight - mark.offsetHeight * endScale) / 2;
      startY = hero.offsetHeight * OPENING_MARK_BASELINE - mark.offsetHeight;
    }
    function ease(value: number, from: number, to: number) {
      const t = Math.max(0, Math.min(1, (value - from) / (to - from)));
      return t * t * (3 - 2 * t);
    }
    function paint(progress: number) {
      hero.style.setProperty(
        "--frame-inline",
        String(1 - ease(progress, 0.06, 0.84)),
      );
      hero.style.setProperty(
        "--frame-block",
        String(1 - ease(progress, 0.28, 1)),
      );
      const y = startY + (endY - startY) * ease(progress, 0.18, 1);
      const scale = 1 + (endScale - 1) * ease(progress, 0.06, 0.88);
      mark.style.transform = `translate(-50%, ${y}px) scale(${scale})`;
      const reveal = ease(progress, 0.55, 0.98);
      copy.style.opacity = String(reveal);
      copy.style.transform = `translateY(${(1 - reveal) * 16}px)`;
      const cueOpacity = 1 - ease(progress, 0, 0.1);
      cue.style.opacity = String(cueOpacity);
      cue.inert = cueOpacity === 0;
    }
    function reset() {
      listeners?.abort();
      cancelAnimationFrame(frame);
      root.classList.remove("intro-playing", "scroll-intro");
      copy.inert = false;
      copy.style.removeProperty("opacity");
      copy.style.removeProperty("transform");
      cue.inert = false;
      cue.style.removeProperty("opacity");
      mark.style.removeProperty("transform");
      hero.style.removeProperty("--frame-inline");
      hero.style.removeProperty("--frame-block");
    }
    function configure() {
      reset();
      // The opening animation is laptop and desktop only. Phones skip it.
      const enabled = motion.matches && !mobile.matches;
      root.classList.toggle("hero-motion", enabled);
      if (!enabled) completed = true;
      if (completed) return;

      listeners = new AbortController();
      const options = { passive: true, signal: listeners.signal };
      root.classList.add("intro-playing", "scroll-intro");
      copy.inert = true;
      let settled = false;
      function followScroll() {
        const progress = Math.max(
          0,
          Math.min(1, (window.scrollY - scrollStart) / scrollDistance),
        );
        if (progress === 1 && settled) return;
        // Keep the sticky runway so scrolling back up replays the intro.
        settled = progress === 1;
        root.classList.toggle("intro-playing", !settled);
        copy.inert = !settled;
        paint(progress);
      }
      function resize() {
        // The mark is only laid out while the intro class is on.
        root.classList.add("intro-playing");
        settled = false;
        measure();
        followScroll();
      }
      // Play the rest of the intro from wherever it is. The wheel or a touch
      // hands control straight back to the visitor.
      function playToEnd() {
        cancelAnimationFrame(frame);
        const from = window.scrollY;
        const to = Math.ceil(scrollStart + scrollDistance);
        if (to <= from) return;
        const duration = 450 + 650 * ((to - from) / scrollDistance);
        const begin = performance.now();
        function step(time: number) {
          const t = Math.min(1, (time - begin) / duration);
          const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
          window.scrollTo({
            top: from + (to - from) * eased,
            behavior: "instant",
          });
          if (t < 1) frame = requestAnimationFrame(step);
        }
        frame = requestAnimationFrame(step);
      }
      resize();
      window.addEventListener(
        "click",
        (event) => {
          if (
            !root.classList.contains("intro-playing") ||
            (event.target instanceof Element &&
              event.target.closest(".scroll-cue"))
          )
            return;
          // The hero copy is not ready yet, so a click finishes the intro
          // instead of landing on a half-visible button.
          event.preventDefault();
          playToEnd();
        },
        { signal: listeners.signal },
      );
      for (const event of ["wheel", "touchstart"])
        window.addEventListener(
          event,
          () => cancelAnimationFrame(frame),
          options,
        );
      window.addEventListener("scroll", followScroll, options);
      window.addEventListener("resize", resize, options);
      window.addEventListener("pageshow", resize, options);
      window.addEventListener(
        "keydown",
        (event) => {
          if (
            (event.key === "Tab" || event.key === "Escape") &&
            root.classList.contains("intro-playing")
          ) {
            window.scrollTo(0, Math.ceil(scrollStart + scrollDistance));
            followScroll();
          }
        },
        options,
      );
    }
    configure();
    const reconfigure = () => configure();
    mobile.addEventListener("change", reconfigure);
    motion.addEventListener("change", reconfigure);
    return () => {
      reset();
      observer.disconnect();
      mobile.removeEventListener("change", reconfigure);
      motion.removeEventListener("change", reconfigure);
      root.classList.toggle("intro-playing", wasPlaying);
      root.classList.toggle("scroll-intro", wasScrollIntro);
    };
  }, []);
  return null;
}
