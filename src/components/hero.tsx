"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { GradientBg } from "@/components/gradient-bg";
import { scrollToRising } from "@/components/rising-layer";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * First screen: the gradient, a contact shortcut and the name. The text rises in once on load;
 * then, while the first panel slides over it, it drifts down and fades a little, so it reads as
 * further away than the panel.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Progress through the first screen, from the page scroll: the hero starts the page and is one
  // viewport tall.
  const { scrollY } = useScroll();
  const progress = (v: number) => Math.min(v / (ref.current?.offsetHeight || 1), 1);
  const y = useTransform(scrollY, (v) => `${progress(v) * 18}svh`);
  const opacity = useTransform(scrollY, (v) => 1 - Math.min(progress(v) / 0.8, 1) * 0.65);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-[#D6E6F5] px-6 pb-16 sm:px-12 sm:pb-24"
    >
      <GradientBg />

      <a
        href="#contato"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("contato");
          if (el) scrollToRising(el, reduced);
          history.replaceState(null, "", "#contato");
        }}
        // py-2.5 brings the hit region to 44px.
        className="animate-rise-in type-body absolute top-4 right-6 z-10 py-2.5 text-ink/70 transition-colors [animation-delay:600ms] hover:text-ink active:text-ink/50 active:duration-0 sm:top-6 sm:right-12"
      >
        Contato
      </a>

      <motion.div className="relative z-10" style={reduced ? undefined : { y, opacity }}>
        <h1 className="animate-rise-in type-display text-balance">Matheus Brito</h1>
        <p className="animate-rise-in type-subtitle mt-4 text-ink/75 [animation-delay:250ms] sm:mt-6">
          Ciência da Computação na UFPB
        </p>
      </motion.div>
    </section>
  );
}
