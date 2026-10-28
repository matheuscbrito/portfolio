import { Check, ChevronRight, Lock, Sparkles } from "lucide-react";
import type { Lang } from "@/lib/lang";

/**
 * Static pictures of Synapse, rebuilt from the platform's own screens and copy: the diagnostic
 * result that places a learner on the tower of "andares", and an exercise where the tests fail
 * and the AI tutor points where to look instead of giving the answer.
 *
 * Same card language as the No Foco pictures (ivory card, taupe panels, one dark block), with
 * Synapse's orange as the only accent.
 */

const ACCENT = "#d4621a";
const card =
  "rounded-[2rem] bg-[#faf9f6] p-3 text-[#1a1915] shadow-[0_1px_2px_rgba(26,25,21,0.06),0_30px_60px_-30px_rgba(26,25,21,0.25)] ring-1 ring-black/[0.04] sm:p-4";

const ENTRY = 3;
const TOTAL_FLOORS = 10;

const diagnosticCopy = {
  pt: {
    floors: [
      "Primeiros passos",
      "Ler e escrever valores",
      "Construir expressões",
      "Decidir e organizar dados",
      "Repetir e criar funções",
      "Coleções, arquivos e módulos",
    ],
    label: `Resultado do diagnóstico na Synapse: 12 questões, 9 certas, e o aluno começa no Andar ${ENTRY + 1}, com os ${ENTRY} primeiros já concluídos.`,
    done: "Diagnóstico concluído",
    start: "Você começa no Andar",
    stats: ["questões", "certas", "andares já seus"],
    here: "Você começa aqui",
    more: (n: number) => `mais ${n} andares pela frente`,
  },
  en: {
    floors: [
      "First steps",
      "Reading and writing values",
      "Building expressions",
      "Deciding and organizing data",
      "Loops and functions",
      "Collections, files and modules",
    ],
    label: `Synapse diagnostic result: 12 questions, 9 correct, and the student starts on Floor ${ENTRY + 1}, with the first ${ENTRY} already cleared.`,
    done: "Diagnostic complete",
    start: "You start on Floor",
    stats: ["questions", "correct", "floors already yours"],
    here: "You start here",
    more: (n: number) => `${n} more floors ahead`,
  },
};

export function SynapseDiagnostic({ lang }: { lang: Lang }) {
  const t = diagnosticCopy[lang];
  const floors = t.floors;
  return (
    <div role="img" aria-label={t.label} className={card}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col justify-between gap-10 px-3 pt-3 pb-2 sm:px-4">
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-[#1a1915]/55 uppercase">
              {t.done}
            </p>
            <p className="mt-4 font-serif text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
              {t.start}{"\u00a0"}{ENTRY + 1}.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-2">
            {[
              ["12", t.stats[0]],
              ["9", t.stats[1]],
              [String(ENTRY), t.stats[2]],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse justify-end gap-2 rounded-2xl bg-[#e8e3dd] p-4">
                <dt className="text-xs text-[#1a1915]/60">{label}</dt>
                <dd className="font-serif text-[2rem] leading-none tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl bg-[#e8e3dd] p-3 sm:p-4">
          <ol className="flex flex-col gap-2">
            {floors.map((name, index) => {
              const state = index < ENTRY ? "cleared" : index === ENTRY ? "entry" : "ahead";
              return (
                <li
                  key={name}
                  className={`flex min-h-14 items-center gap-4 rounded-2xl px-4 py-3 text-[0.9375rem] ${
                    state === "cleared"
                      ? "bg-[#faf9f6]"
                      : state === "entry"
                        ? "bg-[#fbeee4] shadow-[0_12px_28px_-16px_rgba(212,98,26,0.55)] ring-[1.5px] ring-[#d4621a]/60 ring-inset"
                        : "text-[#1a1915]/40 ring-1 ring-[#1a1915]/10 ring-inset"
                  }`}
                >
                  <span className="grid size-5 shrink-0 place-items-center">
                    {state === "cleared" && (
                      <span className="grid size-5 place-items-center rounded-full" style={{ background: ACCENT }}>
                        <Check size={12} strokeWidth={3} className="text-white" />
                      </span>
                    )}
                    {state === "entry" && <ChevronRight size={18} strokeWidth={2.5} style={{ color: ACCENT }} />}
                    {state === "ahead" && <Lock size={15} strokeWidth={2} />}
                  </span>
                  <span className="w-6 shrink-0 tabular-nums text-[#1a1915]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className={state === "entry" ? "font-semibold" : ""}>{name}</span>
                    {state === "entry" && (
                      <span
                        className="text-[0.6875rem] font-semibold tracking-[0.08em] uppercase"
                        style={{ color: ACCENT }}
                      >
                        {t.here}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="px-4 pt-3 pb-1 text-[0.8125rem] text-[#1a1915]/50">
            {t.more(TOTAL_FLOORS - floors.length)}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Syntax colors for the dark editor, from the page's blues and warm neutrals. */
const syntax = {
  keyword: "#8fbceb",
  name: "#f2f0eb",
  string: "#e8b48f",
  number: "#e8c96a",
  plain: "#a29f97",
};

/** The exercise's code, with the function, argument and results named in each language. */
const codeFor = (fn: string, arg: string, pass: string, fail: string) =>
  [
    [
      { text: "def ", color: "keyword" },
      { text: fn, color: "name" },
      { text: `(${arg}):`, color: "plain" },
    ],
    [
      { text: "    if ", color: "keyword" },
      { text: `${arg} `, color: "name" },
      { text: ">", color: "name" },
      { text: " 7", color: "number" },
      { text: ":", color: "plain" },
    ],
    [
      { text: "        return ", color: "keyword" },
      { text: `"${pass}"`, color: "string" },
    ],
    [
      { text: "    return ", color: "keyword" },
      { text: `"${fail}"`, color: "string" },
    ],
  ] satisfies { text: string; color: keyof typeof syntax }[][];

const exerciseCopy = {
  pt: {
    code: codeFor("situacao", "nota", "Aprovado", "Recuperação"),
    tests: [
      { call: "situacao(9)", result: '"Aprovado"', ok: true },
      { call: "situacao(7)", result: 'esperado "Aprovado", recebeu "Recuperação"', ok: false },
      { call: "situacao(5)", result: '"Recuperação"', ok: true },
    ],
    reviews: ["Hoje", "3 dias", "1 semana", "1 mês"],
    label:
      "Exercício na Synapse: a função falha em um de três testes, e o tutor de AI pergunta se a condição da linha 2 é verdadeira para nota 7, sem dar a resposta. Ao lado, a revisão do conteúdo agendada para daqui a 3 dias.",
    topic: "Condicionais · Escrever código",
    prompt: "Complete a função: “Aprovado” para nota 7 ou mais.",
    testsTitle: "Testes",
    passed: "2 de 3",
    hintCount: "dica 1 de 3",
    hint: (code: React.ReactNode) => (
      <>
        Com {code}, a condição da linha 2 é verdadeira? Releia o enunciado:{" "}
        <strong>“7 ou mais”</strong>.
      </>
    ),
    arg: "nota = 7",
    yours: "A resposta é sua.",
    review: "Revisão agendada",
    reviewWhen: "em 3 dias, antes de você esquecer",
  },
  en: {
    code: codeFor("status", "grade", "Pass", "Retake"),
    tests: [
      { call: "status(9)", result: '"Pass"', ok: true },
      { call: "status(7)", result: 'expected "Pass", got "Retake"', ok: false },
      { call: "status(5)", result: '"Retake"', ok: true },
    ],
    reviews: ["Today", "3 days", "1 week", "1 month"],
    label:
      "Synapse exercise: the function fails one of three tests, and the AI tutor asks whether the condition on line 2 is true for a grade of 7, without giving the answer. Beside it, a review of the topic scheduled 3 days from now.",
    topic: "Conditionals · Write code",
    prompt: "Complete the function: “Pass” for a grade of 7 or more.",
    testsTitle: "Tests",
    passed: "2 of 3",
    hintCount: "hint 1 of 3",
    hint: (code: React.ReactNode) => (
      <>
        With {code}, is the condition on line 2 true? Reread the prompt:{" "}
        <strong>“7 or more”</strong>.
      </>
    ),
    arg: "grade = 7",
    yours: "The answer is yours.",
    review: "Review scheduled",
    reviewWhen: "in 3 days, before you forget",
  },
};

export function SynapseExercise({ lang }: { lang: Lang }) {
  const t = exerciseCopy[lang];
  const { code, tests, reviews } = t;
  return (
    <div role="img" aria-label={t.label} className={card}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="px-3 pt-3 sm:px-4">
            <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-[#1a1915]/55 uppercase">
              {t.topic}
            </p>
            <p className="mt-3 text-[1.1875rem] leading-snug font-semibold tracking-[-0.01em]">
              {t.prompt}
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-[#1d1a16] font-mono text-[0.875rem] leading-7">
            <div className="min-w-[30rem] py-5">
              {code.map((line, index) => (
                <div
                  key={index}
                  className={`flex px-5 ${index === 1 ? "bg-white/[0.06]" : ""}`}
                >
                  <span className="w-8 shrink-0 text-white/25 tabular-nums">{index + 1}</span>
                  <span className="whitespace-pre">
                    {line.map((token, t) => (
                      <span
                        key={t}
                        style={{ color: syntax[token.color] }}
                        className={
                          index === 1 && token.text === ">"
                            ? "rounded-sm bg-[#d4621a]/35 px-0.5 shadow-[inset_0_-2px_0_#d4621a]"
                            : undefined
                        }
                      >
                        {token.text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
              <div className="mt-5 border-t border-white/[0.08] px-5 pt-4">
                <p className="flex justify-between font-sans text-xs font-semibold tracking-[0.08em] text-white/45 uppercase">
                  {t.testsTitle}{" "}
                  <span className="tracking-normal text-white/80 normal-case">{t.passed}</span>
                </p>
                <ul className="mt-2">
                  {tests.map(({ call, result, ok }) => (
                    <li key={call} className="flex items-center gap-3 whitespace-pre">
                      <span
                        className={`grid size-4 shrink-0 place-items-center rounded-full ${ok ? "bg-white/25" : ""}`}
                        style={ok ? undefined : { background: ACCENT }}
                      >
                        {ok ? (
                          <Check size={10} strokeWidth={3.5} className="text-[#1d1a16]" />
                        ) : (
                          <span className="block h-0.5 w-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="w-28 shrink-0 text-[#f2f0eb]">{call}</span>
                      <span className={ok ? "text-white/45" : "text-[#f0a27a]"}>
                        {ok ? `→ ${result}` : result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col gap-4 rounded-3xl bg-[#e8e3dd] p-5">
            <p className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#fbeee4]">
                <Sparkles size={17} strokeWidth={2} style={{ color: ACCENT }} />
              </span>
              <span className="font-semibold">Tutor AI</span>
              <span className="ml-auto text-xs text-[#1a1915]/50">{t.hintCount}</span>
            </p>
            <p className="text-[0.9375rem] leading-relaxed">
              {t.hint(
                <code className="rounded-md bg-[#faf9f6] px-1.5 py-0.5 font-mono text-[0.8125rem]">
                  {t.arg}
                </code>,
              )}
            </p>
            <p className="mt-auto text-[0.8125rem] text-[#1a1915]/55">{t.yours}</p>
          </div>

          <div className="rounded-3xl bg-[#e8e3dd] p-5">
            <p className="font-semibold">{t.review}</p>
            <p className="mt-1 text-[0.8125rem] text-[#1a1915]/60">{t.reviewWhen}</p>
            <ol className="mt-5 grid grid-cols-4">
              {reviews.map((label, index) => (
                <li key={label} className="relative flex flex-col items-center gap-2 text-[0.75rem]">
                  {index > 0 && (
                    <span
                      aria-hidden
                      className="absolute top-[5px] right-1/2 h-0.5 w-full"
                      style={{ background: index === 1 ? ACCENT : "rgba(26,25,21,0.12)" }}
                    />
                  )}
                  <span
                    className={`relative size-3 rounded-full ${index > 1 ? "bg-[#faf9f6] ring-[1.5px] ring-[#1a1915]/15 ring-inset" : ""}`}
                    style={
                      index === 0
                        ? { background: ACCENT }
                        : index === 1
                          ? { background: "#faf9f6", boxShadow: `inset 0 0 0 2.5px ${ACCENT}, 0 0 0 4px #fbeee4` }
                          : undefined
                    }
                  />
                  <span className={index === 1 ? "font-semibold" : "text-[#1a1915]/55"}>{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
