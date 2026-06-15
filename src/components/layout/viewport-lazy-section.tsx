"use client";

import { type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface ViewportLazySectionProps {
  children: ReactNode;
  /** Reserve space before the section chunk loads */
  placeholderClassName?: string;
  rootMargin?: string;
}

export function ViewportLazySection({
  children,
  placeholderClassName = "min-h-[40vh]",
  rootMargin = "320px",
}: ViewportLazySectionProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin, once: true });

  return <div ref={ref}>{inView ? children : <div className={placeholderClassName} aria-hidden />}</div>;
}
