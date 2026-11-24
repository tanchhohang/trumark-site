"use client";
import { useLayoutEffect } from "react";

export function MenuBehavior() {
  useLayoutEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const nav = document.querySelector<HTMLElement>(".site-nav")!;
    const toggle = nav.querySelector<HTMLButtonElement>(".menu-toggle")!;
    function setOpen(open: boolean) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("menu-open", open);
    }
    toggle.addEventListener(
      "click",
      () => setOpen(!nav.classList.contains("menu-open")),
      { signal },
    );
    nav.addEventListener(
      "click",
      (event) => {
        if (
          !nav.classList.contains("menu-open") ||
          !(
            event.target instanceof Element &&
            event.target.closest("a, [data-brief]")
          )
        )
          return;
        toggle.focus({ preventScroll: true });
        setOpen(false);
      },
      { capture: true, signal },
    );
    document.addEventListener(
      "pointerdown",
      (event) => {
        if (
          !nav.contains(event.target as Node) &&
          nav.classList.contains("menu-open")
        )
          setOpen(false);
      },
      { signal },
    );
    nav.addEventListener(
      "focusout",
      (event) => {
        if (event.relatedTarget && !nav.contains(event.relatedTarget as Node))
          setOpen(false);
      },
      { signal },
    );
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape" && nav.classList.contains("menu-open")) {
          setOpen(false);
          toggle.focus();
        }
      },
      { signal },
    );
    matchMedia("(max-width: 700px)").addEventListener(
      "change",
      () => setOpen(false),
      { signal },
    );
    document.documentElement.classList.add("has-mobile-menu");
    return () => {
      controller.abort();
      setOpen(false);
    };
  }, []);
  return null;
}
