"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** How far ahead of the scroll the layer travels, as a share of the viewport height. */
const LEAD = 30;

/**
 * White layer that rises over the hero a little faster than the page scrolls.
 * While its top travels from the bottom to the top of the viewport it gains LEAD svh on the scroll;
 * the matching negative margin keeps the end of the page from leaving a gap.
 * The transform also shifts sticky descendants up, so it exposes the offset as --rise-lead for them to add back.
 */
export function RisingLayer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0svh", `-${LEAD}svh`]);

  return (
    <motion.div
      ref={ref}
      className="relative z-20 bg-white"
      style={
        reduced
          ? undefined
          : { y, marginBottom: `-${LEAD}svh`, ["--rise-lead" as string]: `${LEAD}svh` }
      }
    >
      {children}
    </motion.div>
  );
}
