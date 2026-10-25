/**
 * The idea behind the research as a loop: fixed inputs feed the generator, a fixed judge
 * compares each synthetic exam with its real one, and only an adjustment that beats the best so
 * far is kept, which sets up the next one.
 *
 * On wide screens the three inputs share a row and a line on the right closes the loop back to
 * the adjustments; rows have a fixed height so that line can meet both ends at their middle.
 */

type Kind = "fixed" | "loop" | "judge";

const kinds: Record<Kind, { label: string; box: string; swatch: string }> = {
  fixed: {
    label: "fixo",
    box: "border border-dashed border-ink-soft/45",
    swatch: "border border-dashed border-ink-soft/60",
  },
  loop: {
    label: "ciclo",
    box: "bg-ink/[0.07] ring-1 ring-inset ring-ink/10",
    swatch: "bg-ink/20",
  },
  // The light blue of the hero gradient.
  judge: {
    label: "avaliador",
    box: "bg-[#8fbceb]/12 ring-1 ring-inset ring-[#8fbceb]/40",
    swatch: "bg-[#8fbceb]/70",
  },
};

const steps: { title: string; detail: string; kind: Kind; wide?: boolean }[] = [
  { title: "Gerador", detail: "treinado uma vez, nunca alterado", kind: "fixed" },
  { title: "Exames reais", detail: "a mesma base em toda rodada", kind: "fixed" },
  { title: "Ajuste", detail: "como as imagens são geradas", kind: "loop" },
  {
    title: "Geração",
    detail: "a AI cria a versão sintética de cada exame",
    kind: "loop",
    wide: true,
  },
  {
    title: "Avaliação",
    detail: "compara com o exame real: qualidade, textura e realismo",
    kind: "judge",
    wide: true,
  },
  {
    title: "Decisão",
    detail: "o ajuste só fica se superar o melhor até agora",
    kind: "loop",
    wide: true,
  },
];

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 48"
      className="absolute top-full left-1/2 h-12 w-3 -translate-x-1/2 text-ink-soft/60"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8v32M2 36l4 4 4-4" />
    </svg>
  );
}

export function AriaPipeline() {
  return (
    <figure>
      <ul className="type-small flex flex-wrap gap-x-6 gap-y-2 text-ink-soft">
        {Object.values(kinds).map(({ label, swatch }) => (
          <li key={label} className="flex items-center gap-2">
            <span aria-hidden className={`size-3 rounded-[0.25rem] ${swatch}`} />
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-x-3 gap-y-12 lg:grid-cols-[repeat(3,minmax(0,1fr))_2.5rem] lg:grid-rows-[repeat(4,6rem)]">
        <ol className="contents">
          {steps.map(({ title, detail, kind, wide }, index) => (
            <li
              key={title}
              className={`relative flex min-h-[6rem] flex-col justify-center gap-1 rounded-2xl px-4 py-4 text-center ${
                kinds[kind].box
              } ${wide ? "lg:col-span-3 lg:col-start-1" : ""}`}
            >
              <span className="text-[0.9375rem] font-semibold text-ink">{title}</span>
              <span className="text-[0.8125rem] text-ink-soft">{detail}</span>
              {index < steps.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>

        {/* Loop: from the decision's right edge, up, into the adjustment's right edge. */}
        <div aria-hidden className="relative col-start-4 row-span-4 row-start-1 hidden lg:block">
          <div className="absolute inset-x-0 top-[3rem] bottom-[3rem] mr-2 rounded-r-xl border-y-[1.5px] border-r-[1.5px] border-ink-soft/60" />
          <svg
            viewBox="0 0 8 12"
            className="absolute top-[3rem] -left-px h-3 w-2 -translate-y-1/2 text-ink-soft/60"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 1L2 6l5 5" />
          </svg>
        </div>
      </div>

      <figcaption className="type-small mt-8 text-ink-soft">
        Cada decisão leva ao próximo ajuste, e o ciclo recomeça.
      </figcaption>
    </figure>
  );
}
