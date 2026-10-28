"use client";

import { useEffect, useRef } from "react";

/** The light blue of the hero gradient over light panels, a deeper one of the same hue over dark ones. */
const LIGHT = "#bfdbf7";
const DARK = "#2e4d70";
const RADIUS = 4;
/** Horizontal breathing room around each line, so the rounded ends clear the glyphs. */
const PAD_X = 2;

type Line = { top: number; bottom: number; left: number; right: number };

/** Rects of a range, one per line: the inline boxes on a line merge into one span. */
function lines(range: Range) {
  const result: Line[] = [];
  for (const r of range.getClientRects()) {
    if (r.width < 1 || r.height < 1) continue;
    const line = result.find((l) => r.top < l.bottom - 2 && r.bottom > l.top + 2);
    if (line) {
      line.top = Math.min(line.top, r.top);
      line.bottom = Math.max(line.bottom, r.bottom);
      line.left = Math.min(line.left, r.left);
      line.right = Math.max(line.right, r.right);
    } else {
      result.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
    }
  }
  return result;
}

/**
 * Text selection as rounded blue spans. ::selection can't round its corners, so the native
 * highlight is made transparent (globals.css) and this layer draws one span per selected line,
 * blended so the text shows through: multiply darkens light panels to the blue and keeps dark
 * text dark; screen lifts dark panels to a deeper blue and keeps light text light.
 *
 * A fixed layer is its own stacking context, so the blend sits on the layer, not the spans: one
 * layer per blend.
 *
 * Panels move with the scroll, so while something is selected the spans follow every frame.
 */
export function SelectionHighlight() {
  const light = useRef<HTMLDivElement>(null);
  const dark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const draw = () => {
      if (!light.current || !dark.current) return;
      const selection = getSelection();
      const spans: { onLight: HTMLElement[]; onDark: HTMLElement[] } = { onLight: [], onDark: [] };

      if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
        for (const line of lines(selection.getRangeAt(0))) {
          // The tone under the line picks the layer; the layers ignore the pointer, so aren't hit.
          const under = document.elementFromPoint(
            (line.left + line.right) / 2,
            (line.top + line.bottom) / 2,
          );
          const onDark = under?.closest("[data-tone]")?.getAttribute("data-tone") === "dark";
          const span = document.createElement("div");
          Object.assign(span.style, {
            position: "absolute",
            left: `${line.left - PAD_X}px`,
            top: `${line.top}px`,
            width: `${line.right - line.left + PAD_X * 2}px`,
            height: `${line.bottom - line.top}px`,
            borderRadius: `${RADIUS}px`,
            background: onDark ? DARK : LIGHT,
          });
          (onDark ? spans.onDark : spans.onLight).push(span);
        }
      }

      light.current.replaceChildren(...spans.onLight);
      dark.current.replaceChildren(...spans.onDark);
      const empty = !spans.onLight.length && !spans.onDark.length;
      frame = empty ? 0 : requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    document.addEventListener("selectionchange", start);
    return () => {
      document.removeEventListener("selectionchange", start);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={light}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 mix-blend-multiply"
      />
      <div
        ref={dark}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 mix-blend-screen"
      />
    </>
  );
}
