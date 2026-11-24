"use client";
import { useEffect } from "react";

export function ServiceEntrance() {
  useEffect(() => {
    const serviceEntrance = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("service-enter");
            serviceEntrance.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll("#services-title, .service")
      .forEach((element) => {
        serviceEntrance.observe(element);
      });
    return () => serviceEntrance.disconnect();
  }, []);
  return null;
}
