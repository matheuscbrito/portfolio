"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { GradientBg } from "@/components/gradient-bg";
import { scrollToRising } from "@/components/rising-layer";
import { home, type Lang } from "@/lib/lang";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const copy = {
  pt: { contact: "Contato", subtitle: "Ciência da Computação na UFPB" },
  en: { contact: "Contact", subtitle: "Computer Science at UFPB" },
};

/** The switch names the other language, in that language. */
const other = {
  pt: { lang: "en", label: "English" },
  en: { lang: "pt", label: "Português" },
} as const;

/**
 * First screen: the gradient, a language switch, a contact shortcut and the name. The text rises in once on load;
 * then, while the first panel slides over it, it drifts down and fades a little, so it reads as
 * further away than the panel.
 */
export function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const switchTo = other[lang];
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

      {/* py-2.5 brings each hit region to 44px; the press state is instant. */}
      <div className="animate-rise-in type-body absolute top-4 right-6 z-10 flex gap-6 [animation-delay:600ms] sm:top-6 sm:right-12">
        <Link
          href={home[switchTo.lang]}
          hrefLang={switchTo.lang === "pt" ? "pt-BR" : "en"}
          lang={switchTo.lang === "pt" ? "pt-BR" : "en"}
          className="py-2.5 text-ink/70 transition-colors hover:text-ink active:text-ink/50 active:duration-0"
        >
          {switchTo.label}
        </Link>
        <a
          href="#contato"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("contato");
            if (el) scrollToRising(el, reduced);
            history.replaceState(null, "", "#contato");
          }}
          className="py-2.5 text-ink/70 transition-colors hover:text-ink active:text-ink/50 active:duration-0"
        >
          {t.contact}
        </a>
      </div>

      <motion.div className="relative z-10" style={reduced ? undefined : { y, opacity }}>
        <h1 className="animate-rise-in type-display font-bold text-balance">Matheus Brito</h1>
        <p className="animate-rise-in type-subtitle mt-4 text-ink/75 [animation-delay:250ms] sm:mt-6">
          {t.subtitle}
        </p>
      </motion.div>
    </section>
  );
}
