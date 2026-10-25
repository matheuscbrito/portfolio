"use client";

import { useEffect, useState } from "react";

/** Share of the viewport height where a section counts as being read. */
const READING_LINE = 0.4;

/**
 * Id of the section being read: the last one whose top has passed the reading line, or
 * undefined before the first one gets there. At the page bottom the last section wins, since it
 * may be too short to reach the line.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>();
  const key = ids.join(",");

  useEffect(() => {
    const sections = key.split(",").flatMap((id) => document.getElementById(id) ?? []);

    const update = () => {
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) return setActive(sections.at(-1)?.id);

      let current: string | undefined;
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
  }, [key]);

  return active;
}
