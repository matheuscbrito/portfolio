import { useEffect, type RefObject } from "react";

/**
 * Caminho SVG de um retângulo com cantos contínuos (squircle), no estilo da Apple.
 * Mesma geometria da "corner smoothing" do Figma: a curva começa (1 + smoothing) × radius
 * antes do canto e passa por uma curva de Bézier → arco → Bézier, sem quebra de curvatura.
 */
export function squirclePath(width: number, height: number, radius: number, smoothing = 0.6) {
  const maxRadius = Math.min(width, height) / 2;
  const r = Math.min(radius, maxRadius);
  let p = (1 + smoothing) * r;
  let s = smoothing;
  if (p > maxRadius) {
    s = Math.max(0, maxRadius / r - 1);
    p = maxRadius;
  }

  const rad = (deg: number) => (deg * Math.PI) / 180;
  const arcMeasure = 90 * (1 - s);
  const arc = Math.sin(rad(arcMeasure / 2)) * r * Math.SQRT2;
  const alpha = (90 - arcMeasure) / 2;
  const p3ToP4 = r * Math.tan(rad(alpha / 2));
  const beta = 45 * s;
  const c = p3ToP4 * Math.cos(rad(beta));
  const d = c * Math.tan(rad(beta));
  const b = (p - arc - c - d) / 3;
  const a = 2 * b;
  const n = (value: number) => +value.toFixed(3);

  return [
    `M ${n(width - p)} 0`,
    `c ${n(a)} 0 ${n(a + b)} 0 ${n(a + b + c)} ${n(d)}`,
    `a ${n(r)} ${n(r)} 0 0 1 ${n(arc)} ${n(arc)}`,
    `c ${n(d)} ${n(c)} ${n(d)} ${n(b + c)} ${n(d)} ${n(a + b + c)}`,
    `L ${n(width)} ${n(height - p)}`,
    `c 0 ${n(a)} 0 ${n(a + b)} ${n(-d)} ${n(a + b + c)}`,
    `a ${n(r)} ${n(r)} 0 0 1 ${n(-arc)} ${n(arc)}`,
    `c ${n(-c)} ${n(d)} ${n(-(b + c))} ${n(d)} ${n(-(a + b + c))} ${n(d)}`,
    `L ${n(p)} ${n(height)}`,
    `c ${n(-a)} 0 ${n(-(a + b))} 0 ${n(-(a + b + c))} ${n(-d)}`,
    `a ${n(r)} ${n(r)} 0 0 1 ${n(-arc)} ${n(-arc)}`,
    `c ${n(-d)} ${n(-c)} ${n(-d)} ${n(-(b + c))} ${n(-d)} ${n(-(a + b + c))}`,
    `L 0 ${n(p)}`,
    `c 0 ${n(-a)} 0 ${n(-(a + b))} ${n(d)} ${n(-(a + b + c))}`,
    `a ${n(r)} ${n(r)} 0 0 1 ${n(arc)} ${n(-arc)}`,
    `c ${n(c)} ${n(-d)} ${n(b + c)} ${n(-d)} ${n(a + b + c)} ${n(-d)}`,
    "Z",
  ].join(" ");
}

export const supportsCornerShape = () => typeof CSS !== "undefined" && CSS.supports("corner-shape", "squircle");

// O CSS usa `corner-shape: superellipse(1.4)`; medido pixel a pixel, ele equivale à suavização
// de 60% da Figma com o raio 1,25× menor. Dividir aqui faz o fallback ficar igual ao nativo.
const CORNER_SHAPE_RADIUS_RATIO = 1.25;

function clipToSquircle(node: HTMLElement, smoothing: number) {
  // offsetWidth/Height ignoram transforms (ex.: scale no hover), ao contrário de getBoundingClientRect.
  const width = node.offsetWidth, height = node.offsetHeight;
  const radius = parseFloat(getComputedStyle(node).borderTopLeftRadius) / CORNER_SHAPE_RADIUS_RATIO;
  if (width && height && radius) node.style.clipPath = `path("${squirclePath(width, height, radius, smoothing)}")`;
}

/**
 * Fallback para navegadores sem `corner-shape`: recorta com o caminho squircle todo elemento
 * dentro de `root` que case com `selector` (inclusive os que aparecem depois, ao trocar de tela),
 * usando o border-radius do próprio elemento e atualizando quando o tamanho muda.
 * Onde `corner-shape` existe, o CSS cuida de tudo e este hook não faz nada.
 */
export function useSquircles(rootRef: RefObject<HTMLElement | null>, selector: string, smoothing = 0.6) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || supportsCornerShape()) return;
    const resize = new ResizeObserver((entries) => entries.forEach((entry) => clipToSquircle(entry.target as HTMLElement, smoothing)));
    const observed = new WeakSet<Element>();
    const scan = () => root.querySelectorAll<HTMLElement>(selector).forEach((node) => {
      if (observed.has(node)) return;
      observed.add(node);
      resize.observe(node);
    });
    const mutations = new MutationObserver(scan);
    mutations.observe(root, { childList: true, subtree: true });
    scan();
    return () => {
      resize.disconnect();
      mutations.disconnect();
    };
  }, [rootRef, selector, smoothing]);
}
