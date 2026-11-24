"use client";
import { useEffect } from "react";

export function FooterReveals() {
  useEffect(() => {
    const motion = matchMedia(
      "screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)",
    );
    const active = new Set<Animation>();
    const wordTargets =
      ".footer-invitation h2, .footer-directory h3, .footer-summary p";
    const linkTargets =
      ".footer-actions button, .footer-directory li, .footer-summary a";

    function play(
      element: Element,
      keyframes: Keyframe[],
      timing: KeyframeAnimationOptions,
    ) {
      const animation = element.animate(keyframes, {
        ...timing,
        fill: "backwards",
      });
      active.add(animation);
      // A focused control must be immediately visible during keyboard navigation.
      const finish = () => animation.finish();
      element.addEventListener("focusin", finish);
      return animation.finished
        .catch(() => {})
        .finally(() => {
          active.delete(animation);
          element.removeEventListener("focusin", finish);
        });
    }

    function revealWords(element: Element) {
      const original = [...element.childNodes];
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
      element.replaceChildren(content);
      Promise.all(
        words.map((word, i) =>
          play(
            word,
            [
              { transform: "translateY(100%)", opacity: 0 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            {
              duration: 680,
              delay: i * 32,
              easing: "cubic-bezier(.65,0,.25,1)",
            },
          ),
        ),
      ).then(() => element.replaceChildren(...original));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          observer.unobserve(target);
          if (!motion.matches || target.matches(":focus-within")) continue;
          if (target.matches(".section-panel")) {
            play(
              target,
              [
                {
                  transform: "translateY(20px)",
                  transformOrigin: "center top",
                },
                { transform: "none", transformOrigin: "center top" },
              ],
              { duration: 600, easing: "cubic-bezier(.16,1,.3,1)" },
            );
          } else if (target.matches(wordTargets)) {
            revealWords(target);
          } else {
            play(
              target,
              [
                { transform: "translateY(.85em)", opacity: 0 },
                { transform: "translateY(0)", opacity: 1 },
              ],
              { duration: 560, easing: "cubic-bezier(.16,1,.3,1)" },
            );
          }
        }
      },
      { threshold: 0 },
    );
    const targets = [wordTargets, linkTargets, ".section-panel"];
    if (!CSS.supports("animation-timeline: view()")) {
      targets.push(
        ".about .eyebrow, .statement p, .expertise-copy p, .clients header, .quotes figure",
      );
    }
    document.querySelectorAll(targets.join(", ")).forEach((element) => {
      observer.observe(element);
    });
    const sync = () => {
      if (!motion.matches)
        active.forEach((animation) => {
          animation.cancel();
        });
    };
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      active.forEach((animation) => {
        animation.cancel();
      });
    };
  }, []);
  return null;
}
