import { TrendingUp } from "lucide-react";

/**
 * Horizontal rebuild of the No Foco "Próximo simulado" screen: the in-browser model's
 * forecast for the next mock exam, total plus one card per area.
 */

type Area = {
  name: string;
  color: string;
  /** Past mock exam scores, oldest first; the last one is "Última". */
  history: number[];
  predicted: number;
};

const areas: Area[] = [
  { name: "Linguagens", color: "#64d2ff", history: [29, 30, 29.6, 31, 30.6, 32], predicted: 33.1 },
  { name: "Humanas", color: "#ff9f0a", history: [32.5, 32.2, 33.2, 33.5, 33.2, 34], predicted: 34.6 },
  { name: "Natureza", color: "#30d158", history: [21.5, 22.2, 21.8, 23.2, 24, 25], predicted: 26.8 },
  { name: "Matemática", color: "#bf5af2", history: [25.2, 25.8, 25.5, 26.9, 27.3, 29], predicted: 30.7 },
];

const total = 125;
const totalDelta = 5.2;

function Sparkline({ history, predicted, color }: Omit<Area, "name">) {
  const width = 200;
  const height = 50;
  const pad = 5;
  const values = [...history, predicted];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values.map((value, i) => [
    pad + (i * (width - pad * 2)) / (values.length - 1),
    height - pad - ((value - min) / (max - min || 1)) * (height - pad * 2),
  ]);
  const toPath = (pts: number[][]) =>
    pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const last = points[points.length - 2];
  const next = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-auto w-full overflow-visible" aria-hidden="true">
      <path d={toPath(points.slice(0, -1))} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path
        d={toPath([last, next])}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="2 4"
        strokeLinecap="round"
      />
      <circle cx={next[0]} cy={next[1]} r="4.5" fill="#e8e3dd" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function Delta({ value, dark = false }: { value: number; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-semibold tabular-nums ${
        dark ? "border border-white/20 text-white" : "bg-[#f3f0ec] text-[#2f7a46]"
      }`}
    >
      <TrendingUp size={14} strokeWidth={2.25} />+{value.toFixed(1)}
      {dark && " vs. último"}
    </span>
  );
}

export function PredictionCard() {
  return (
    <div
      role="img"
      aria-label={`Previsão do próximo simulado: ${total} de 180 no total, ${areas
        .map((a) => `${a.name} ${a.predicted.toString().replace(".", ",")}`)
        .join(", ")}.`}
      className="rounded-[2rem] bg-[#faf9f6] p-3 shadow-[0_1px_2px_rgba(26,25,21,0.06),0_30px_60px_-30px_rgba(26,25,21,0.25)] ring-1 ring-black/[0.04] sm:p-4"
    >
      <p className="px-5 pt-5 pb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.02em] sm:px-6">
        Próximo simulado
      </p>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] sm:gap-4">
        <div className="flex flex-col justify-between gap-8 rounded-[1.5rem] bg-[#1d1a16] p-6 text-white">
          <p className="text-[0.9375rem] text-white/70">Total previsto</p>
          <div>
            <p className="flex items-baseline gap-2">
              <span className="font-serif text-[clamp(3.5rem,6vw,4.75rem)] leading-none tracking-[-0.03em]">
                {total}
              </span>
              <span className="text-lg text-white/50">/ 180</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Delta value={totalDelta} dark />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[0.8125rem] font-semibold">
                <span className="size-2 rounded-full bg-[#30d158]" />
                Confiança média
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {areas.map(({ name, color, history, predicted }) => (
            <div key={name} className="rounded-[1.5rem] bg-[#e8e3dd] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 text-[0.9375rem] font-semibold">
                  <span className="size-2.5 rounded-full" style={{ background: color }} />
                  {name}
                </span>
                <Delta value={predicted - history[history.length - 1]} />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <p className="flex items-baseline gap-1.5">
                  <span className="font-serif text-[2.25rem] leading-none tracking-[-0.02em] tabular-nums">
                    {predicted.toFixed(1)}
                  </span>
                  <span className="text-ink/45">/ 45</span>
                </p>
                <span className="text-[0.9375rem] text-ink/55">
                  Última {history[history.length - 1]}
                </span>
              </div>
              <Sparkline history={history} predicted={predicted} color={color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
