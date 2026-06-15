"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type LenisListener = () => void;

const lenisListeners = new Set<LenisListener>();
let lenisInstance: Lenis | null = null;

function subscribeLenis(listener: LenisListener) {
  lenisListeners.add(listener);
  return () => {
    lenisListeners.delete(listener);
  };
}

function getLenisSnapshot() {
  return lenisInstance;
}

function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
  lenisListeners.forEach((listener) => listener());
}

export function useLenis() {
  return useSyncExternalStore(subscribeLenis, getLenisSnapshot, () => null);
}

export function resetPageScroll(lenis?: Lenis | null) {
  if (typeof window !== "undefined" && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const instance = lenis ?? lenisInstance;

  if (instance) {
    instance.scrollTo(0, { immediate: true, force: true });
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 2.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
      anchors: { offset: -80 },
    });

    lenisRef.current = instance;
    setLenisInstance(instance);
    resetPageScroll(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return <>{children}</>;
}
