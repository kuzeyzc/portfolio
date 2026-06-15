"use client";

import { useEffect, useState, type DependencyList } from "react";

const DEFER_MS = 500;

/**
 * Returns true once window load and a minimum defer window have both completed.
 * Keeps GSAP / Framer init off the critical path for first paint.
 */
export function useDeferredAnimationsReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let loadComplete = document.readyState === "complete";
    let timeoutComplete = false;
    let activated = false;

    const tryActivate = () => {
      if (activated) return;
      if (loadComplete && timeoutComplete) {
        activated = true;
        setReady(true);
      }
    };

    const timeoutId = window.setTimeout(() => {
      timeoutComplete = true;
      tryActivate();
    }, DEFER_MS);

    const onLoad = () => {
      loadComplete = true;
      tryActivate();
    };

    if (!loadComplete) {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return ready;
}

/** Run a GSAP / motion setup effect only after deferred animations are allowed. */
export function useDeferredAnimationsEffect(
  effect: () => void | (() => void),
  deps: DependencyList = []
): void {
  const ready = useDeferredAnimationsReady();

  useEffect(() => {
    if (!ready) return;
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller owns deps
  }, [ready, ...deps]);
}
