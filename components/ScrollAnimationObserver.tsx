"use client";

import { useEffect } from "react";

const ANIMATION_SELECTOR = [
  ".anim-rise",
  ".anim-left",
  ".anim-right",
].join(", ");

export default function ScrollAnimationObserver() {
  useEffect(() => {
    const body = document.body;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observed = new Set<HTMLElement>();
    const pending = new Set<HTMLElement>();

    body.classList.remove("anim-observe-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.classList.add("anim-in-view");
          pending.delete(target);
          observer.unobserve(target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -2% 0px",
      },
    );

    const markVisiblePending = () => {
      if (!pending.size) return;
      const vh = window.innerHeight;
      const visibleNow: HTMLElement[] = [];

      pending.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const visible = rect.top < vh * 0.96 && rect.bottom > vh * 0.04;
        if (visible) visibleNow.push(target);
      });

      visibleNow.forEach((target) => {
        target.classList.add("anim-in-view");
        pending.delete(target);
        observer.unobserve(target);
      });
    };

    const registerTargets = () => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>(ANIMATION_SELECTOR));
      if (!targets.length) return;

      if (prefersReducedMotion) {
        body.classList.remove("anim-observe-ready");
        targets.forEach((target) => target.classList.add("anim-in-view"));
        return;
      }

      body.classList.add("anim-observe-ready");

      const vh = window.innerHeight;
      for (const target of targets) {
        if (observed.has(target)) continue;
        observed.add(target);
        target.classList.remove("anim-in-view");

        const rect = target.getBoundingClientRect();
        const alreadyVisible = rect.top < vh * 0.92 && rect.bottom > vh * 0.08;
        if (alreadyVisible) {
          target.classList.add("anim-in-view");
          continue;
        }
        pending.add(target);
        observer.observe(target);
      }
    };

    registerTargets();

    const onViewportChange = () => {
      window.requestAnimationFrame(markVisiblePending);
    };
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    const mutationObserver = new MutationObserver(() => {
      registerTargets();
      markVisiblePending();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const failsafeTimer = window.setTimeout(() => {
      pending.forEach((target) => {
        target.classList.add("anim-in-view");
        observer.unobserve(target);
      });
      pending.clear();
    }, 3500);

    return () => {
      window.clearTimeout(failsafeTimer);
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      mutationObserver.disconnect();
      observer.disconnect();
      body.classList.remove("anim-observe-ready");
      observed.forEach((target) => target.classList.remove("anim-in-view"));
      observed.clear();
      pending.clear();
    };
  }, []);

  return null;
}
