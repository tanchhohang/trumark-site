"use client";
import { useLayoutEffect } from "react";

export function PanelNavigation() {
  useLayoutEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    function showLinkedPanel() {
      const panel = document.getElementById(location.hash.slice(1));
      document
        .querySelectorAll<HTMLDialogElement>("dialog[data-panel][open]")
        .forEach((openPanel) => {
          if (openPanel !== panel) openPanel.close();
        });
      if (
        panel instanceof HTMLDialogElement &&
        panel.matches("dialog[data-panel]") &&
        !panel.open
      )
        panel.showModal();
    }
    document
      .querySelectorAll<HTMLDialogElement>("dialog[data-panel]")
      .forEach((panel) => {
        panel
          .querySelector(".close")!
          .addEventListener("click", () => panel.close(), { signal });
        panel.addEventListener(
          "close",
          () => {
            if (location.hash === `#${panel.id}`)
              history.replaceState(null, "", location.href.split("#")[0]);
          },
          { signal },
        );
      });
    window.addEventListener("hashchange", showLinkedPanel, { signal });
    showLinkedPanel();
    return () => controller.abort();
  }, []);
  return null;
}
