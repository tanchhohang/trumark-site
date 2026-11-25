"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";

// Phone-only entrance. The head script (opening-state.ts) adds .mobile-intro,
// which hides the hero text and the nav mark. Here the headline rises word by
// word out of a mask, the TMA mark wipes in, then the lead and buttons settle.
export function MobileIntro() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("mobile-intro")) return;

    const hero = document.querySelector<HTMLElement>(".hero")!;
    const h1 = hero.querySelector<HTMLElement>("h1")!;
    const lead = hero.querySelector<HTMLElement>(".lead > p")!;
    const actions = hero.querySelector<HTMLElement>(".actions")!;
    const nav = document.querySelector<HTMLElement>(".site-nav")!;
    const mark = nav.querySelector<HTMLElement>(".wordmark")!;
    const toggle = nav.querySelector<HTMLElement>(".menu-toggle")!;

    // Split the headline into masked words. The original nodes come back
    // afterwards so the final DOM is exactly what the server rendered.
    const original = [...h1.childNodes];
    const words: HTMLElement[] = [];
    const content = document.createDocumentFragment();
    for (const node of original) {
      if (node.nodeType !== Node.TEXT_NODE) {
        content.append(node.cloneNode(true));
        continue;
      }
      for (const token of node.textContent?.match(/\s+|\S+/g) || []) {
        if (!token.trim()) {
          content.append(token);
          continue;
        }
        const mask = document.createElement("span");
        mask.className = "reveal-word";
        const word = document.createElement("span");
        word.textContent = token;
        mask.append(word);
        content.append(mask);
        words.push(word);
      }
    }
    h1.replaceChildren(content);

    let cancelled = false;
    let started = false;
    let timer = 0;
    let tl: gsap.core.Timeline;

    function restore() {
      h1.replaceChildren(...original);
    }
    function finish() {
      root.classList.remove("mobile-intro");
      restore();
      ctx.revert(); // clears every inline style GSAP added
    }

    const ctx = gsap.context(() => {
      gsap.set(h1, { autoAlpha: 1 });
      gsap.set(words, { yPercent: 115 });
      gsap.set([lead, actions], { autoAlpha: 0, y: 18 });
      gsap.set(mark, { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(toggle, { autoAlpha: 0, y: -8 });

      tl = gsap
        .timeline({ paused: true, onComplete: finish })
        .to(
          mark,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.inOut" },
          0,
        )
        .to(toggle, { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" }, 0.15)
        .to(
          words,
          { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.035 },
          0.1,
        )
        .to(
          [lead, actions],
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 },
          0.45,
        );
    });

    // Alte Haas has no font-display, so wait for it (briefly) rather than
    // animating invisible glyphs.
    function go() {
      if (started || cancelled) return;
      started = true;
      clearTimeout(timer);
      tl.play();
    }
    timer = window.setTimeout(go, 1200);
    document.fonts.ready.then(go);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      restore();
      ctx.revert();
    };
  }, []);
  return null;
}
