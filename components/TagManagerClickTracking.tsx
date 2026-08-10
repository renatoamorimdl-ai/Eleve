"use client";

import { useEffect } from "react";

type TrackableElement = HTMLElement & {
  dataset: DOMStringMap & {
    trackClick?: string;
  };
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function getAnchorTarget(element: HTMLElement | null): TrackableElement | null {
  if (!element) return null;
  return element.closest("[data-track-click]") as TrackableElement | null;
}

export default function TagManagerClickTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = getAnchorTarget(event.target as HTMLElement | null);
      if (!target) return;

      const eventName = target.dataset.trackClick;
      if (!eventName) return;

      const href = target instanceof HTMLAnchorElement ? target.href : undefined;
      const label = target.textContent?.trim().replace(/\s+/g, " ") || undefined;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        click_url: href,
        click_text: label,
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

