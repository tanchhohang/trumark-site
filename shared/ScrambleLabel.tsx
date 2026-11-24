"use client";

import { useEffect, useRef, useState } from "react";

function scrambleLetters(text: string, resolved: number) {
  return Array.from(text, (letter, index) => {
    if (index < resolved || !/[a-z]/i.test(letter)) return letter;
    const first = letter === letter.toUpperCase() ? 65 : 97;
    return String.fromCharCode(first + Math.floor(Math.random() * 26));
  }).join("");
}

export function ScrambleLabel({ children }: { children: string }) {
  const label = useRef<HTMLSpanElement>(null);
  const [overlay, setOverlay] = useState<string | null>(null);
  useEffect(() => {
    const parent = label.current!.parentElement!;
    const service = parent.closest<HTMLElement>(".service");
    const target = service || parent;
    const long = Boolean(service || parent.matches(".button, [data-brief]"));
    const motion = matchMedia(
      "screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)",
    );
    const hover = matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const controller = new AbortController();
    const { signal } = controller;
    let timer: number | undefined;
    function stop() {
      clearTimeout(timer);
      timer = undefined;
      setOverlay(null);
    }
    function scramble() {
      if (!motion.matches || timer !== undefined) return;
      const start = performance.now();
      function tick() {
        const progress = (performance.now() - start) / (long ? 600 : 420);
        if (progress >= 1 || !motion.matches) return stop();
        const resolved = long
          ? (1 - (1 - progress) ** 4) * (children.length + 4) - 4
          : Math.floor(children.length * progress);
        setOverlay(scrambleLetters(children, resolved));
        timer = window.setTimeout(tick, 35);
      }
      tick();
    }
    target.addEventListener(
      "pointerenter",
      (event) => {
        if (hover.matches && event.pointerType !== "touch") scramble();
      },
      { signal },
    );
    target.addEventListener("pointerleave", stop, { signal });
    target.addEventListener(
      "focus",
      () => {
        if (target.matches(":focus-visible")) scramble();
      },
      { signal },
    );
    target.addEventListener("blur", stop, { signal });
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [children]);
  return (
    <span
      ref={label}
      className={
        overlay === null ? "scramble-label" : "scramble-label is-scrambling"
      }
    >
      <span className="scramble-original">{children}</span>
      {overlay !== null && (
        <span className="scramble-overlay" aria-hidden="true">
          {overlay}
        </span>
      )}
    </span>
  );
}
