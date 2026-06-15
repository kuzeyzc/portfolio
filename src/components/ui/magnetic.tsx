"use client";

import { useRef, useCallback, useEffect, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  /** How far the element pulls toward cursor (0-1). Default 0.35 */
  strength?: number;
  /** Radius of the magnetic field in px. Default 80 */
  radius?: number;
  /** Class name for the wrapper */
  className?: string;
}

export function Magnetic({ children, strength = 0.35, radius = 80, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const quickX = useRef<((value: number) => void) | null>(null);
  const quickY = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      quickX.current = gsap.quickTo(ref.current, "x", {
        duration: 0.3,
        ease: "power2.out",
      });
      quickY.current = gsap.quickTo(ref.current, "y", {
        duration: 0.3,
        ease: "power2.out",
      });
    }, ref);

    return () => {
      quickX.current = null;
      quickY.current = null;
      ctx.revert();
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !quickX.current || !quickY.current) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        quickX.current(distX * strength);
        quickY.current(distY * strength);
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    if (!quickX.current || !quickY.current) return;
    quickX.current(0);
    quickY.current(0);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: "inline-flex", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
