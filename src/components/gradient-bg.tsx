"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Animated WebGL mesh gradient with film grain. Fills its positioned parent.
 * The shader mount handles resize itself and pauses when offscreen or the tab is hidden.
 */
export function GradientBg() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <MeshGradient
        width="100%"
        height="100%"
        colors={["#BFDBF7", "#F7FAFD", "#8FBCEB", "#DCE3EA"]}
        distortion={0.8}
        swirl={0.1}
        grainMixer={0.04}
        grainOverlay={0.06}
        speed={reduced ? 0 : 0.4}
        maxPixelCount={1920 * 1080 * 2}
      />
    </div>
  );
}
