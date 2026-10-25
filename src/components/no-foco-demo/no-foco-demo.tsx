"use client";

// Mock interativo da plataforma, portado da landing do No Foco (plataforma-no-foco/src/pages/Landing.tsx).
import { BarChart2, BookMarked, Calendar, Check, ListChecks, RotateCcw, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { useSquircles } from "@/lib/squircle";
import "./no-foco-demo.css";

// Elementos com canto contínuo; precisa bater com o bloco @supports (corner-shape) do CSS.
const SQUIRCLE_SELECTOR = ".demo-window, .demo-goals, .demo-sim, .demo-chart, .demo-content, .demo-sim dl div, .demo-block, .demo-subjects button";

type View = "cronograma" | "metricas" | "conteudos";

const views: { id: View; label: string; icon: LucideIcon; title: string; text: string; hint: string }[] = [
  { id: "cronograma", label: "Cronograma", icon: Calendar, title: "Seu próximo passo já está definido.", text: "Uma semana organizada com seu mentor, com metas claras para você estudar sem perder tempo decidindo o que vem depois.", hint: "Abra Metas e marque o que já fez" },
  { id: "metricas", label: "Métricas", icon: BarChart2, title: "Evolução que dá para enxergar.", text: "Cada simulado vira um sinal claro: onde você cresceu, onde travou e qual ajuste fazer agora.", hint: "Adicione o Simulado 07 e veja os gráficos" },
  { id: "conteudos", label: "Conteúdos", icon: BookMarked, title: "Tudo o que falta, no lugar certo.", text: "O progresso de cada matéria em um só lugar, para transformar estudo solto em avanço consistente.", hint: "Toque numa matéria para ver o progresso dela" },
];

type Tone = "blue" | "green" | "orange" | "pink" | "purple" | "teal" | "yellow" | "rest";
const times = ["07:00", "08:00", "09:00", "10:00"];
const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const blocks: { day: number; row: number; span: number; label: string; tone: Tone }[] = [
  { day: 1, row: 1, span: 2, label: "Matemática", tone: "blue" },
  { day: 1, row: 3, span: 1, label: "Redação", tone: "pink" },
  { day: 1, row: 4, span: 1, label: "Descanso", tone: "rest" },
  { day: 2, row: 1, span: 1, label: "Biologia", tone: "green" },
  { day: 2, row: 2, span: 3, label: "Simulado", tone: "teal" },
  { day: 3, row: 1, span: 1, label: "Descanso", tone: "rest" },
  { day: 3, row: 2, span: 1, label: "Química", tone: "purple" },
  { day: 3, row: 3, span: 2, label: "Correção", tone: "orange" },
  { day: 4, row: 1, span: 2, label: "Física", tone: "yellow" },
  { day: 4, row: 3, span: 1, label: "História", tone: "orange" },
  { day: 4, row: 4, span: 1, label: "Revisão", tone: "teal" },
  { day: 5, row: 1, span: 1, label: "Redação", tone: "pink" },
  { day: 5, row: 2, span: 2, label: "Questões", tone: "blue" },
  { day: 5, row: 4, span: 1, label: "Descanso", tone: "rest" },
];
const goals = ["Revisar funções do 2º grau", "Fazer 20 questões de Natureza", "Corrigir o Simulado 06", "Treinar redação", "Revisar Biologia", "Organizar materiais"];

function ScheduleView() {
  const [tab, setTab] = useState<"semana" | "metas">("semana");
  const [done, setDone] = useState<number[]>([0, 1, 4]);
  const progress = Math.round((done.length / goals.length) * 100);
  const shown = Math.round(useSpring(progress, 0.5));
  const status = progress === 100 ? { text: "semana completa", tone: "is-done" } : progress >= 80 ? { text: "quase lá", tone: "is-good" } : progress >= 50 ? { text: "continue assim", tone: "is-good" } : progress > 0 ? { text: "bom começo", tone: "is-warm" } : { text: "comece pela primeira", tone: "" };
  const toggle = (index: number) => setDone((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  return <div className="demo-schedule">
    <div className="demo-panel-head">
      <div><strong>Semana 24</strong><span>10 – 14 jun</span></div>
      <div className="demo-toggle" role="group" aria-label="Visualização">
        <button type="button" aria-pressed={tab === "semana"} onClick={() => setTab("semana")}><Calendar size={14} />Semana</button>
        <button type="button" aria-pressed={tab === "metas"} onClick={() => setTab("metas")}><ListChecks size={14} />Metas<em>{done.length}/{goals.length}</em></button>
      </div>
    </div>
    {tab === "semana"
      ? <div className="demo-calendar" key="semana">
          <div className="demo-times" aria-hidden="true">{times.map((time) => <span key={time}>{time}</span>)}</div>
          <div className="demo-grid">
            {days.map((day, index) => <span className="demo-day" style={{ gridColumn: index + 1 }} key={day}>{day}</span>)}
            {blocks.map((block, index) => <i className={`demo-block is-${block.tone}${block.day === days.length && block.row + block.span - 1 === times.length ? " is-corner" : ""}`} style={{ gridColumn: block.day, gridRow: `${block.row + 1} / span ${block.span}` }} key={index}><span>{block.label}</span><span aria-hidden="true">{block.label === "Matemática" ? "Mat." : block.label}</span></i>)}
          </div>
        </div>
      : <div className="demo-goals" key="metas">
          <div className="demo-goals-score"><span><ListChecks size={14} />Metas da semana</span><strong className={progress === 100 ? "is-complete" : ""}>{shown}%</strong></div>
          <div className={`demo-meter ${progress === 100 ? "is-complete" : ""}`} aria-hidden="true"><b style={{ width: `${progress}%` }} /></div>
          <p className="demo-goals-meta"><b>{done.length} / {goals.length}</b> metas concluídas<em className={status.tone} key={status.text}>{status.text}</em></p>
          <ul>{goals.map((goal, index) => { const checked = done.includes(index); return <li key={goal}><button type="button" className={checked ? "is-done" : ""} aria-pressed={checked} onClick={() => toggle(index)}><i>{checked && <Check size={12} strokeWidth={3} />}</i>{goal}</button></li>; })}</ul>
        </div>}
  </div>;
}

type Area = "Linguagens" | "Humanas" | "Natureza" | "Matemática";
const areaTone: Record<Area, string> = { Linguagens: "#64d2ff", Humanas: "#ff9f0a", Natureza: "#30d158", Matemática: "#bf5af2" };
const areaHistory: Record<Area, number[]> = { Linguagens: [24, 27, 25, 29, 28, 30], Humanas: [10, 12, 11, 14, 13, 15], Natureza: [35, 38, 37, 41, 40, 45], Matemática: [28, 31, 30, 36, 38, 42] };
const simulado07: Record<Area, number> = { Linguagens: 34, Humanas: 22, Natureza: 44, Matemática: 43 };
const areas = Object.keys(areaHistory) as Area[];

// Mola criticamente amortecida (damping 1.0): sempre parte do valor e da velocidade atuais,
// então pode ser invertida no meio do caminho sem saltos.
function useSpring(target: number, response = 0.5) {
  const [value, setValue] = useState(target);
  const state = useRef({ x: target, v: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stiffness = (2 * Math.PI / response) ** 2, damping = 2 * Math.sqrt(stiffness);
    const epsilon = 0.0005 * Math.max(1, Math.abs(target));
    let frame = 0, last = performance.now();
    const tick = (now: number) => {
      const s = state.current;
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      s.v += (-stiffness * (s.x - target) - damping * s.v) * dt;
      s.x += s.v * dt;
      if (reduce || (Math.abs(s.x - target) < epsilon && Math.abs(s.v) < epsilon)) {
        state.current = { x: target, v: 0 };
        setValue(target);
        return;
      }
      setValue(s.x);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, response]);

  return value;
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

// `values` tem os 7 simulados; `progress` (0→1) leva o último ponto do Simulado 06 até o 07.
// A escala usa os 7 valores desde o início, então os pontos antigos nunca se mexem.
function chartPath(values: number[], progress: number, width: number, height: number) {
  const min = Math.min(...values) - 2, max = Math.max(...values) + 2, pad = 6;
  const all = values.map((value, index) => [pad + (index * (width - pad * 2)) / (values.length - 1), height - pad - ((value - min) / (max - min)) * (height - pad * 2)]);
  const ghost = all[all.length - 1], anchor = all[all.length - 2];
  const points = progress > 0.001 ? [...all.slice(0, -1), [lerp(anchor[0], ghost[0], progress), lerp(anchor[1], ghost[1], progress)]] : all.slice(0, -1);
  const f = (point: number[]) => `${point[0].toFixed(1)} ${point[1].toFixed(1)}`;
  let d = `M${f(points[0])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] ?? p2;
    d += ` C${f([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${f([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${f(p2)}`;
  }
  const end = points[points.length - 1];
  return { line: d, area: `${d} L${end[0].toFixed(1)} ${height} L${points[0][0]} ${height} Z`, points, end, ghost };
}

function Chart({ label, values, progress, color, width, height }: { label: string; values: number[]; progress: number; color: string; width: number; height: number }) {
  const { line, area, points, end, ghost } = chartPath(values, progress, width, height);
  const id = useId().replace(/:/g, "");
  const fade = Math.min(28, (end[0] - points[0][0]) / 3);
  const value = Math.round(lerp(values[values.length - 2], values[values.length - 1], progress));
  return <div className="demo-chart" style={{ "--tone": color } as CSSProperties}>
    <div className="demo-chart-head"><span>{label}</span><strong>{value}</strong></div>
    <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        {/* Mesmo preenchimento da plataforma (30% → 0% na vertical) */}
        <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1"><stop offset=".05" stopColor={color} stopOpacity=".3" /><stop offset=".95" stopColor={color} stopOpacity="0" /></linearGradient>
        {/* Esmaece as pontas da área na horizontal, para ela não terminar num corte seco */}
        <linearGradient id={`${id}-edge`} gradientUnits="userSpaceOnUse" x1={points[0][0]} x2={end[0]} y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset={fade / Math.max(1, end[0] - points[0][0])} stopColor="#fff" />
          <stop offset={1 - fade / Math.max(1, end[0] - points[0][0])} stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}><rect width={width} height={height} fill={`url(#${id}-edge)`} /></mask>
      </defs>
      <path d={area} fill={`url(#${id}-fill)`} mask={`url(#${id}-mask)`} />
      <path className="demo-chart-line" d={line} pathLength={1} />
      <circle className="demo-chart-ghost" cx={ghost[0]} cy={ghost[1]} r="3" style={{ opacity: 1 - progress }} />
      {points.map(([x, y], index) => <circle key={index} className="demo-chart-dot" cx={x} cy={y} r={index === points.length - 1 ? 3.5 : 2.5} />)}
    </svg>
  </div>;
}

function SimuladoCard({ title, date, scores, action }: { title: string; date: string; scores: Record<Area, number>; action: ReactNode }) {
  const total = areas.reduce((sum, area) => sum + scores[area], 0);
  return <article className="demo-sim">
    <header><div><h4>{title}</h4><span>{date}</span></div>{action}</header>
    <dl>{areas.map((area) => <div key={area}><dt>{area}</dt><dd style={{ color: areaTone[area] }}>{scores[area]}</dd></div>)}</dl>
    <p>Total <strong>{total}</strong><span> / 180</span></p>
  </article>;
}

function MetricsView() {
  const [added, setAdded] = useState(false);
  const progress = useSpring(added ? 1 : 0, 0.9);
  const series = (area: Area) => [...areaHistory[area], simulado07[area]];
  const totals = series(areas[0]).map((_, index) => areas.reduce((sum, area) => sum + series(area)[index], 0));
  const simulado06 = Object.fromEntries(areas.map((area) => [area, areaHistory[area][5]])) as Record<Area, number>;

  return <div className="demo-metrics">
    <div className="demo-sims">
      <SimuladoCard title="Simulado 06" date="15 jun" scores={simulado06} action={<span className="demo-badge"><Check size={12} strokeWidth={3} />Registrado</span>} />
      <SimuladoCard title="Simulado 07" date="22 jun" scores={simulado07} action={added
        ? <button type="button" className="demo-ghost" onClick={() => setAdded(false)}><RotateCcw size={12} />Refazer</button>
        : <button type="button" className="demo-add" onClick={() => setAdded(true)}>Adicionar</button>} />
    </div>
    <div className="demo-charts">
      <div className="demo-chart-total"><Chart label="Total" values={totals} progress={progress} color="#e8c96a" width={420} height={84} /></div>
      {areas.map((area) => <Chart key={area} label={area} values={series(area)} progress={progress} color={areaTone[area]} width={200} height={64} />)}
    </div>
  </div>;
}

const subjects = [
  { name: "Geografia", done: 9, total: 41, color: "#64d2ff" },
  { name: "História", done: 8, total: 42, color: "#ff9f0a" },
  { name: "Filosofia", done: 22, total: 24, color: "#bf5af2" },
  { name: "Sociologia", done: 12, total: 24, color: "#ffd60a" },
  { name: "Biologia", done: 16, total: 52, color: "#30d158" },
  { name: "Física", done: 14, total: 48, color: "#5ac8fa" },
  { name: "Química", done: 30, total: 46, color: "#ff375f" },
  { name: "Matemática", done: 12, total: 97, color: "#0a84ff" },
];

function ContentView() {
  const [selected, setSelected] = useState<number | null>(null);
  const subject = selected === null ? null : subjects[selected];
  const done = subject?.done ?? subjects.reduce((sum, item) => sum + item.done, 0);
  const total = subject?.total ?? subjects.reduce((sum, item) => sum + item.total, 0);
  const circumference = 2 * Math.PI * 42;

  return <div className="demo-content">
    <div className="demo-ring" style={{ "--tone": subject?.color ?? "#ff1b6b" } as CSSProperties}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><linearGradient id="demo-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff1b6b" /><stop offset="100%" stopColor="#ff4500" /></linearGradient></defs>
        <circle cx="50" cy="50" r="42" stroke="url(#demo-ring-gradient)" opacity=".13" />
        <circle className="is-value" cx="50" cy="50" r="42" stroke="url(#demo-ring-gradient)" strokeDasharray={`${(done / total) * circumference} ${circumference}`} />
      </svg>
      <div><small>{subject?.name ?? "Geral"}</small><strong>{done}</strong><span>de {total} tópicos</span></div>
    </div>
    <ul className="demo-subjects">{subjects.map((item, index) => <li key={item.name}><button type="button" className={selected === index ? "is-active" : ""} aria-pressed={selected === index} onClick={() => setSelected(selected === index ? null : index)} style={{ "--tone": item.color } as CSSProperties}><span>{item.name}</span><i><b style={{ width: `${(item.done / item.total) * 100}%` }} /></i><small>{Math.round((item.done / item.total) * 100)}%</small></button></li>)}</ul>
  </div>;
}

export function NoFocoDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSquircles(rootRef, SQUIRCLE_SELECTOR);
  const [view, setView] = useState<View>("cronograma");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = views.find((item) => item.id === view)!;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (views.findIndex((item) => item.id === view) + delta + views.length) % views.length;
    setView(views[next].id);
    tabRefs.current[next]?.focus();
  };

  return <div className="demo" ref={rootRef}>
    <div className="demo-stage">
      <div className="demo-nav" role="tablist" aria-label="Telas da plataforma" onKeyDown={onKeyDown}>
        {views.map((item, index) => { const Icon = item.icon; const selected = item.id === view; return <button key={item.id} ref={(node) => { tabRefs.current[index] = node; }} type="button" role="tab" id={`demo-tab-${item.id}`} aria-selected={selected} aria-controls="demo-panel" tabIndex={selected ? 0 : -1} className={selected ? "is-active" : ""} onClick={() => setView(item.id)}><Icon size={15} strokeWidth={2} />{item.label}</button>; })}
      </div>
      <div className="demo-window-shell"><div className="demo-window">
      <div className="demo-topbar">
        <span className="demo-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div className="demo-body" role="tabpanel" id="demo-panel" aria-labelledby={`demo-tab-${view}`} key={view}>
        {view === "cronograma" && <ScheduleView />}
        {view === "metricas" && <MetricsView />}
        {view === "conteudos" && <ContentView />}
      </div>
    </div></div>
    <p className="type-small text-ink-soft" key={view}>{active.hint}</p>
    </div>
  </div>;
}
