"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** How far ahead of the scroll a panel travels, as a share of the viewport height. */
export const LEAD = 0.3;

export type Tone = "light" | "mist" | "dark";

/**
 * Full-width panel in its own tone that rises over the previous one a little faster than the
 * page scrolls. While its top travels from the bottom to the top of the viewport it gains LEAD
 * of the viewport on the scroll.
 *
 * The negative bottom margin pulls the next panel up by the same amount, so the end of the page
 * leaves no gap; the matching bottom padding keeps that strip, which the next panel ends up
 * covering, free of content.
 *
 * The last panel has nothing to pull up. It finishes its rise LEAD above where the page ends, so
 * its ::after strip fills the gap left below it and extra top padding brings its content back
 * down by the same amount.
 */
export function RisingLayer({
  tone,
  last = false,
  children,
}: {
  tone: Tone;
  last?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0svh", `-${LEAD * 100}svh`]);

  return (
    <motion.div
      ref={ref}
      data-tone={tone}
      data-panel=""
      className={`relative min-h-svh bg-[var(--surface)] text-ink ${
        last && !reduced
          ? "after:absolute after:inset-x-0 after:top-full after:h-[30svh] after:bg-inherit"
          : ""
      }`}
      style={
        reduced
          ? undefined
          : last
            ? { y, paddingTop: `${LEAD * 100}svh` }
            : { y, marginBottom: `-${LEAD * 100}svh`, paddingBottom: `${LEAD * 100}svh` }
      }
    >
      {children}
    </motion.div>
  );
}

/** Sum of offsetTop up the tree: the element's position in the page, ignoring transforms. */
function layoutTop(el: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

/**
 * Scrolls so the element lands at the top of the viewport once its panel's rise is applied.
 * scrollIntoView would aim at the element's current, still-moving position and miss.
 */
export function scrollToRising(el: HTMLElement, reduced: boolean) {
  if (reduced) return el.scrollIntoView();
  const panel = el.closest<HTMLElement>("[data-panel]") ?? el;
  const vh = innerHeight;
  const lead = LEAD * vh;
  // The panel's translation is lead · (vh − d) / vh while its layout top sits d below the viewport
  // top; the element reaches the top when d equals lead / (1 + LEAD).
  const target = layoutTop(panel) - lead / (1 + LEAD) + (layoutTop(el) - layoutTop(panel));
  window.scrollTo({ top: target, behavior: "smooth" });
}
