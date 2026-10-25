"use client";

import { scrollToRising } from "@/components/rising-layer";
import { useActiveSection } from "@/lib/use-active-section";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export type NavItem = { id: string; label: string };

/**
 * Side index of the page, fixed over the panels. The section being read is highlighted; the rest
 * fade to a secondary tone. It appears once the first section reaches the reading line. Clicking
 * scrolls to the section.
 *
 * The text is white and its container blends with `difference` (see page.tsx), so it reads dark
 * on light panels and light on dark ones, pixel by pixel: as a panel's edge rises through the
 * nav, the letters split exactly at the edge.
 */
export function SectionNav({ items }: { items: NavItem[] }) {
  const active = useActiveSection(items.map(({ id }) => id));
  const reduced = useReducedMotion();

  return (
    <nav
      aria-label="Seções"
      className={`text-white transition-opacity duration-700 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
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
                  const el = document.getElementById(id);
                  if (el) scrollToRising(el, reduced);
                  history.replaceState(null, "", `#${id}`);
                }}
                // py-2.5 brings the hit region to 44px; the press state is instant.
                className={`type-body block py-2.5 transition-colors duration-500 active:text-white/50 active:duration-0 ${
                  isActive ? "text-white" : "text-white/30 hover:text-white/60"
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
