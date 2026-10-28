import { Check } from "lucide-react";
import type { Lang } from "@/lib/lang";

/**
 * Static picture of a No Foco study week, in the same language as the "Próximo simulado" card:
 * ivory card, taupe panels and one dark block.
 */

// ENEM area colors, the same as the prediction card; neutral marks what belongs to no area.
const AREA = {
  linguagens: "#64d2ff",
  humanas: "#ff9f0a",
  natureza: "#30d158",
  matematica: "#bf5af2",
  neutro: "#8a877f",
};

const hours = ["07:00", "08:00", "09:00", "10:00", "11:00"];
type Subject =
  | "math"
  | "essay"
  | "rest"
  | "biology"
  | "exam"
  | "chemistry"
  | "correction"
  | "physics"
  | "history"
  | "review"
  | "questions";

/** `row` and `span` count hours from 07:00. */
const blocks: {
  day: number;
  row: number;
  span: number;
  label: Subject;
  color?: string;
  kind?: "rest" | "exam";
}[] = [
  { day: 1, row: 1, span: 2, label: "math", color: AREA.matematica },
  { day: 1, row: 3, span: 1, label: "essay", color: AREA.linguagens },
  { day: 1, row: 4, span: 1, label: "rest", kind: "rest" },
  { day: 2, row: 1, span: 1, label: "biology", color: AREA.natureza },
  { day: 2, row: 2, span: 3, label: "exam", kind: "exam" },
  { day: 3, row: 1, span: 1, label: "rest", kind: "rest" },
  { day: 3, row: 2, span: 1, label: "chemistry", color: AREA.natureza },
  { day: 3, row: 3, span: 2, label: "correction", color: AREA.neutro },
  { day: 4, row: 1, span: 2, label: "physics", color: AREA.natureza },
  { day: 4, row: 3, span: 1, label: "history", color: AREA.humanas },
  { day: 4, row: 4, span: 1, label: "review", color: AREA.neutro },
  { day: 5, row: 1, span: 1, label: "essay", color: AREA.linguagens },
  { day: 5, row: 2, span: 2, label: "questions", color: AREA.matematica },
  { day: 5, row: 4, span: 1, label: "rest", kind: "rest" },
];

/** Which goals are done, in the order of each language's list. */
const goalsDone = [true, true, false, false, true, false];
const doneCount = goalsDone.filter(Boolean).length;
const progress = Math.round((doneCount / goalsDone.length) * 100);

const copy = {
  pt: {
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    subjects: {
      math: "Matemática",
      essay: "Redação",
      rest: "Descanso",
      biology: "Biologia",
      exam: "Simulado",
      chemistry: "Química",
      correction: "Correção",
      physics: "Física",
      history: "História",
      review: "Revisão",
      questions: "Questões",
    } satisfies Record<Subject, string>,
    goals: [
      "Revisar funções do 2º grau",
      "Fazer 20 questões de Natureza",
      "Corrigir o Simulado 06",
      "Treinar redação",
      "Revisar Biologia",
      "Organizar materiais",
    ],
    goalsTitle: "Metas da semana",
    of: "de",
    week: "Semana 24",
    dates: "10 – 14 de junho",
    label: `Semana de estudos na No Foco: ${doneCount} de ${goalsDone.length} metas concluídas e um cronograma de segunda a sexta, com simulado na terça.`,
  },
  en: {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    subjects: {
      math: "Math",
      essay: "Essay",
      rest: "Rest",
      biology: "Biology",
      exam: "Mock exam",
      chemistry: "Chemistry",
      correction: "Correction",
      physics: "Physics",
      history: "History",
      review: "Review",
      questions: "Questions",
    } satisfies Record<Subject, string>,
    goals: [
      "Review quadratic functions",
      "Do 20 science questions",
      "Correct Mock exam 06",
      "Practice the essay",
      "Review Biology",
      "Organize materials",
    ],
    goalsTitle: "Weekly goals",
    of: "of",
    week: "Week 24",
    dates: "June 10 – 14",
    label: `A study week on No Foco: ${doneCount} of ${goalsDone.length} goals done and a Monday to Friday schedule, with a mock exam on Tuesday.`,
  },
};

type Copy = (typeof copy)[Lang];

function Goals({ t }: { t: Copy }) {
  const goals = t.goals.map((text, i) => ({ text, done: goalsDone[i] }));
  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-[#1d1a16] p-6 text-white">
      <p className="text-[0.9375rem] text-white/70">{t.goalsTitle}</p>
      <p className="flex items-baseline gap-2">
        <span className="font-serif text-[4.5rem] leading-none tracking-[-0.03em] tabular-nums">
          {progress}%
        </span>
        <span className="text-[1.0625rem] text-white/50">
          {doneCount} {t.of} {goals.length}
        </span>
      </p>
      <div className="h-1.5 rounded-full bg-white/12">
        <div className="h-full rounded-full bg-[#30d158]" style={{ width: `${progress}%` }} />
      </div>
      <ul className="mt-1 flex flex-col">
        {goals.map(({ text, done }) => (
          <li
            key={text}
            className={`flex min-h-11 items-center gap-3 text-sm ${done ? "text-white/50" : "text-white"}`}
          >
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full ${
                done ? "bg-[#30d158]" : "ring-[1.5px] ring-white/30 ring-inset"
              }`}
            >
              {done && <Check size={12} strokeWidth={3} className="text-[#1d1a16]" />}
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Calendar({ t }: { t: Copy }) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-[#e8e3dd] p-5">
      <div className="grid h-full min-w-[34rem] grid-cols-[2.75rem_repeat(5,minmax(0,1fr))] grid-rows-[1.5rem_repeat(4,minmax(4.5rem,1fr))] gap-2">
        <span />
        {t.days.map((day) => (
          <span key={day} className="text-[0.8125rem] font-semibold text-[#1a1915]/55">
            {day}
          </span>
        ))}
        {hours.slice(0, 4).map((hour, index) => (
          <span
            key={hour}
            className="text-xs tabular-nums text-[#1a1915]/50"
            style={{ gridColumn: 1, gridRow: index + 2 }}
          >
            {hour}
          </span>
        ))}
        {blocks.map((block) => {
          const place = { gridColumn: block.day + 1, gridRow: `${block.row + 1} / span ${block.span}` };
          const time = `${hours[block.row - 1]} – ${hours[block.row - 1 + block.span]}`;
          const key = `${block.day}-${block.row}`;

          if (block.kind === "rest") {
            return (
              <div
                key={key}
                style={place}
                className="rounded-2xl p-3 text-[0.8125rem] text-[#1a1915]/50 ring-[1.5px] ring-[#1a1915]/12 ring-inset"
              >
                {t.subjects[block.label]}
              </div>
            );
          }
          if (block.kind === "exam") {
            return (
              <div
                key={key}
                style={place}
                className="flex flex-col justify-between rounded-2xl bg-[#1d1a16] p-3 text-white"
              >
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold">{t.subjects[block.label]}</span>
                  <span className="text-xs text-white/60">{time}</span>
                </span>
                <span className="font-serif text-[2.125rem] leading-none tracking-[-0.02em]">07</span>
              </div>
            );
          }
          return (
            <div key={key} style={place} className="flex flex-col gap-1.5 rounded-2xl bg-[#faf9f6] p-3">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="size-2 shrink-0 rounded-full" style={{ background: block.color }} />
                {t.subjects[block.label]}
              </span>
              <span className="text-xs text-[#1a1915]/50">{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NoFocoSchedule({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div
      role="img"
      aria-label={t.label}
      className="rounded-[2rem] bg-[#faf9f6] p-3 text-[#1a1915] shadow-[0_1px_2px_rgba(26,25,21,0.06),0_30px_60px_-30px_rgba(26,25,21,0.25)] ring-1 ring-black/[0.04] sm:p-4"
    >
      <div className="px-3 pt-3 pb-1 sm:px-4">
        <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.02em]">
          {t.week}
        </p>
        <p className="mt-2 text-[0.9375rem] text-[#1a1915]/60">{t.dates}</p>
      </div>
      <div className="mt-4 grid gap-4 lg:h-[35rem] lg:grid-cols-[18.75rem_minmax(0,1fr)]">
        <Goals t={t} />
        <Calendar t={t} />
      </div>
    </div>
  );
}
