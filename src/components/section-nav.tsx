"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export type NavItem = { id: string; label: string };

/** Share of the viewport height where a section counts as being read. */
const READING_LINE = 0.4;

/**
 * Side index of the page. The last section whose top has passed the reading line is highlighted;
 * the rest fade to a secondary tone. Clicking scrolls to the section.
 */
export function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = items.flatMap(({ id }) => document.getElementById(id) ?? []);

    const update = () => {
      // The last section may be too short to reach the reading line, so the page bottom selects it.
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) return setActive(sections.at(-1)?.id);

      let current = sections[0]?.id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= innerHeight * READING_LINE) current = el.id;
      }
      setActive(current);
    };

    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="Seções">
      <ul>
        {items.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
                  history.replaceState(null, "", `#${id}`);
                }}
                // py-2.5 brings the hit region to 44px; the press state is instant.
                className={`type-body block py-2.5 transition-colors duration-500 active:text-ink/50 active:duration-0 ${
                  isActive ? "text-ink" : "text-ink/30 hover:text-ink/60"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
