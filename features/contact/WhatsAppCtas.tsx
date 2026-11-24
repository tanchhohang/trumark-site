"use client";

import { useEffect } from "react";

const number = "9779826177915";
const messages = {
  call: "Hi Trumark, I’m interested in booking a call.",
  audit: "Hi Trumark, I’m interested in a free consultation.",
  contact: "Hi Trumark, I’m interested in working with you.",
};

// Every call-to-action opens WhatsApp with a message that matches the button.
export function WhatsAppCtas() {
  useEffect(() => {
    function open(event: MouseEvent) {
      const trigger =
        event.target instanceof Element &&
        event.target.closest<HTMLElement>(
          "[data-brief], a[href='#contact-options']",
        );
      if (!trigger) return;
      const kind = trigger.dataset.brief;
      const message =
        kind === "call" || kind === "audit"
          ? messages[kind]
          : messages.contact;
      event.preventDefault();
      window.open(
        `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, []);
  return null;
}
