"use client";

import { scrollToRising } from "@/components/rising-layer";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** In-page link that scrolls to a section, landing it at the top once its panel has risen. */
export function ScrollLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById(to);
        if (el) scrollToRising(el, reduced);
        history.replaceState(null, "", `#${to}`);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
