"use client";

import { scrollToRising } from "@/components/rising-layer";
import { useActiveSection } from "@/lib/use-active-section";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export type NavLink = { id: string; label: string };
/** A section, or a group of sections under a heading (the heading links to its first one). */
export type NavItem = NavLink | { label: string; children: NavLink[] };

const links = (items: NavItem[]) =>
  items.flatMap((item) => ("children" in item ? item.children : [item]));

/**
 * Side index of the page, fixed over the panels. The section being read is highlighted, and so
 * is the heading of its group; the rest fade to a secondary tone. It appears once the first
 * section reaches the reading line. Clicking scrolls to the section.
 *
 * The text is white and its container blends with `difference` (see page.tsx), so it reads dark
 * on light panels and light on dark ones, pixel by pixel: as a panel's edge rises through the
 * nav, the letters split exactly at the edge.
 */
export function SectionNav({ items, label }: { items: NavItem[]; label: string }) {
  const active = useActiveSection(links(items).map(({ id }) => id));
  const reduced = useReducedMotion();

  /** `kind`: a group heading lights up with its group but is never the current location; a child is indented. */
  const link = ({ id, label }: NavLink, isActive: boolean, kind?: "heading" | "child") => (
    <a
      href={`#${id}`}
      aria-current={kind !== "heading" && id === active ? "location" : undefined}
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) scrollToRising(el, reduced);
        history.replaceState(null, "", `#${id}`);
      }}
      // py-2.5 brings the hit region to 44px; the press state is instant.
      className={`type-body block py-2.5 transition-colors duration-500 active:text-white/50 active:duration-0 ${
        kind === "child" ? "pl-4" : ""
      } ${isActive ? "text-white" : "text-white/30 hover:text-white/60"}`}
    >
      {label}
    </a>
  );

  return (
    <nav
      aria-label={label}
      className={`text-white transition-opacity duration-700 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul>
        {items.map((item) => {
          if (!("children" in item)) return <li key={item.id}>{link(item, item.id === active)}</li>;
          const inGroup = item.children.some(({ id }) => id === active);
          return (
            <li key={item.label}>
              {link({ id: item.children[0].id, label: item.label }, inGroup, "heading")}
              <ul className="border-l-2 border-white/20">
                {item.children.map((child) => (
                  <li key={child.id}>{link(child, child.id === active, "child")}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
