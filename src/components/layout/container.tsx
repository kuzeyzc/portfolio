import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  narrow?: boolean;
}

export function Container({ children, narrow = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-12",
        narrow ? "max-w-[840px]" : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
