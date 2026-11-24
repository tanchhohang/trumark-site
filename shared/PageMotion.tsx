"use client";
import { useLayoutEffect } from "react";
import { setupScrollPacing } from "./scroll-pacing";
export function PageMotion() {
  useLayoutEffect(() => {
    const stopPacing = setupScrollPacing();
    return () => {
      stopPacing();
    };
  }, []);
  return null;
}
