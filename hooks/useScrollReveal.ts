"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, once = true } = options;
  const containerRef = useRef<HTMLElement | null>(null);

  const observe = useCallback(
    (element: HTMLElement) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              if (once) observer.unobserve(entry.target);
            } else if (!once) {
              entry.target.classList.remove("visible");
            }
          });
        },
        { threshold }
      );

      const targets = element.querySelectorAll(".reveal, .reveal-left");
      targets.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    },
    [threshold, once]
  );

  useEffect(() => {
    const el = containerRef.current || document.body;
    let cleanup = observe(el);

    // Watch for DOM changes (like Next.js HMR) to re-apply observers to new elements
    const mutationObserver = new MutationObserver(() => {
      cleanup();
      cleanup = observe(el);
    });

    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      cleanup();
      mutationObserver.disconnect();
    };
  }, [observe]);

  return containerRef;
}
