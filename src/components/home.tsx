import { AriaPipeline } from "@/components/aria-pipeline";
import { Hero } from "@/components/hero";
import { PredictionCard } from "@/components/prediction-card";
import { NoFocoSchedule } from "@/components/no-foco-schedule";
import { SynapseDiagnostic, SynapseExercise } from "@/components/synapse-visuals";
import { RisingLayer, type Tone } from "@/components/rising-layer";
import { ScrollLink } from "@/components/scroll-link";
import { SectionNav, type NavItem } from "@/components/section-nav";
import type { Lang } from "@/lib/lang";

const EMAIL = "matheus.cavalcanti006@gmail.com";

/** Each section is a panel in its own tone that rises over the previous one. */
const tones: Record<string, Tone> = {
  sobre: "light",
  trajetoria: "dark",
  "no-foco": "light",
  aria: "dark",
  synapse: "light",
  "previsao-demanda": "mist",
  contato: "dark",
};

type History = { year: string; items: { what: string; text: string; section?: string }[] }[];

/** Everything the page says, per language. Section ids stay the same in both. */
const copy = {
  pt: {
    nav: [
      { id: "sobre", label: "Sobre" },
      { id: "trajetoria", label: "Trajetória" },
      {
        label: "Projetos",
        children: [
          { id: "no-foco", label: "No Foco" },
          { id: "aria", label: "ARIA" },
          { id: "synapse", label: "Synapse" },
          { id: "previsao-demanda", label: "Previsão de demanda" },
        ],
      },
      { id: "contato", label: "Contato" },
    ] satisfies NavItem[],
    navLabel: "Seções",
    // What I did over time, newest first. `section` links an item to the project's section below.
    history: [
      {
        year: "2026",
        items: [
          {
            what: "Synapse",
            section: "synapse",
            text: "Cofundei uma plataforma para ensinar programação na era da AI. Desenho os algoritmos que ajustam dificuldade, ordem dos tópicos e ritmo de cada aluno em tempo real.",
          },
          {
            what: "ARIA",
            section: "aria",
            text: "Comecei a pesquisar AI para detecção de câncer de mama e de pulmão, com a University of Pennsylvania e a University of Bristol. Construo o framework que avalia mamografias sintéticas antes de elas treinarem modelos de diagnóstico.",
          },
          {
            what: "Trilha e Momento",
            text: "Fui selecionado para duas mentorias. A Trilha, de engenharia de software na UFPB, com engenheiros que passaram por Tako, Sable, Brex, Pax, Telepatia e 11x. E o Momento, que conecta universitários a ex-alunos de Harvard, MIT, Stanford e Berkeley.",
          },
          {
            what: "UFPB",
            text: "Entrei em 1º lugar em Ciência da Computação.",
          },
          {
            what: "No Foco",
            section: "no-foco",
            text: "Cofundei e construí a plataforma do zero. 40+ alunos pagantes nos primeiros 6 meses.",
          },
        ],
      },
      {
        year: "2024",
        items: [
          {
            what: "Olimpíada Brasileira de Tecnologia",
            text: "Fui finalista e apresentei meu app de preservação histórica e denúncia urbana para alunos do MIT.",
          },
          {
            what: "Uma calculadora no Minecraft",
            text: "Construí uma calculadora dentro do jogo que faz contas em binário e converte o resultado para decimal. Eu ainda nem estudava computação.",
          },
        ],
      },
      {
        year: "2018",
        items: [
          { what: "OBI", text: "Bronze na Olimpíada Brasileira de Informática." },
          {
            what: "Honrarias",
            text: "Entre 2016 e 2018, recebi a Comenda José Lins do Rego e dois Votos de Aplauso, da Assembleia Legislativa da Paraíba e da Prefeitura de João Pessoa.",
          },
        ],
      },
      {
        year: "2017",
        items: [{ what: "Canguru sem Fronteiras", text: "Ouro." }],
      },
      {
        year: "2016",
        items: [{ what: "OBR", text: "Ouro na Olimpíada Brasileira de Robótica, na modalidade teórica." }],
      },
    ] satisfies History,
    sobre: {
      title: "Acredito que construir coisas extraordinárias não deveria depender de onde você começa.",
      body: [
        "É o que tento fazer com AI. Comecei pela educação: cofundei a No Foco, uma assessoria para o ENEM que já acompanhou mais de 40 alunos pelo Brasil com 6 assessores, e a Synapse, que ensina programação sem entregar a resposta pronta.",
        "Agora também levo AI para a medicina. Pesquiso detecção de câncer de mama e de pulmão com a University of Pennsylvania e a University of Bristol.",
        "Estudo Ciência da Computação na UFPB e toco bossa nova no violão.",
        "Se quiser conversar, me chama:",
      ],
    },
    noFoco: {
      title: "Impactei primeiro meu círculo social.",
      intro: [
        "Estudei numa escola muito boa e achava que isso bastava para entrar nas universidades mais concorridas do Brasil. Não bastava. Tinha gente muito boa lá a um passo da aprovação, e o que faltava era um acompanhamento de verdade, de alta performance, para o ENEM.",
        "Percebi que era um problema grande o suficiente para as pessoas pagarem por ele. Então cofundei a No Foco e construí a plataforma do zero, do front-end ao back-end.",
      ],
      features:
        "Construí o planejamento de estudos, o acompanhamento de desempenho, os streaks, os rankings e as métricas de prova.",
      figure: "alunos pagantes nos primeiros 6 meses.",
      model:
        "Também treinei e coloquei em produção um modelo de machine learning que roda no navegador do aluno. Ele usa o histórico de simulados e o comportamento de estudo para prever a nota do próximo simulado, por área. O plano de estudos se ajusta a essa previsão e mostra onde o aluno precisa de mais atenção.",
    },
    aria: {
      title: "Antes de treinar um modelo, é preciso confiar nos dados.",
      intro: [
        "No ARIA, uma colaboração da University of Pennsylvania com a University of Bristol, pesquiso exames gerados por AI. Exames reais são escassos e sensíveis, e os sintéticos ajudam a treinar modelos que detectam câncer, mas só se forem fiéis.",
        "Por isso construí uma régua para medi-los e um ciclo que a usa para melhorá-los.",
      ],
      outro:
        "A régua compara cada imagem sintética com o exame real em qualidade, textura e realismo clínico, e não muda durante a busca. Assim dá para comparar com honestidade quem propõe os ajustes, e só o que se sustenta vai alimentar os modelos de câncer de mama e de pulmão.",
    },
    synapse: {
      title: "Copiar não é aprender.",
      intro: [
        "Os melhores alunos sempre aprenderam sozinhos. O segredo não era talento, era método: tentar, errar, entender o erro e tentar de novo. Quanto mais rápido esse ciclo gira, mais rápido se aprende.",
        "A AI podia fazer esse ciclo girar para qualquer pessoa. Mas ela costuma entregar a resposta pronta e pula justamente a parte de entender. Por isso cofundei a Synapse: para ensinar a aprender com AI.",
        "Ninguém começa do zero. Um diagnóstico que se adapta às respostas descobre o que você já sabe, e a trilha pula o que você já domina.",
      ],
      exercise:
        "Depois, você escreve o código e os testes respondem na hora. Quando erra, a AI aponta onde olhar, mas quem resolve é você. E o que você aprendeu volta em revisões, antes de você esquecer.",
      outro:
        "Desenho os algoritmos por trás disso, que ajustam a dificuldade, a ordem dos tópicos e o ritmo de cada aluno.",
    },
    demand: {
      title: "Previsão de demanda",
      intro:
        "Construí um modelo que prevê a demanda de medicamentos em hospitais a partir do histórico de consumo.",
      figure:
        "menos gastos que o baseline de hospitais comuns, em ambiente simulado. Menos estoque parado, menos compra emergencial.",
      stack: "Trabalho com Python, TypeScript, React, Node.js, PostgreSQL e Google Cloud Run.",
    },
    contact: "Contato",
  },
  en: {
    nav: [
      { id: "sobre", label: "About" },
      { id: "trajetoria", label: "Journey" },
      {
        label: "Projects",
        children: [
          { id: "no-foco", label: "No Foco" },
          { id: "aria", label: "ARIA" },
          { id: "synapse", label: "Synapse" },
          { id: "previsao-demanda", label: "Demand forecasting" },
        ],
      },
      { id: "contato", label: "Contact" },
    ] satisfies NavItem[],
    navLabel: "Sections",
    history: [
      {
        year: "2026",
        items: [
          {
            what: "Synapse",
            section: "synapse",
            text: "I co-founded a platform that teaches programming in the age of AI. I design the algorithms that adjust each student's difficulty, topic order and pace in real time.",
          },
          {
            what: "ARIA",
            section: "aria",
            text: "I started researching AI for breast and lung cancer detection with the University of Pennsylvania and the University of Bristol. I build the framework that evaluates synthetic mammograms before they train diagnostic models.",
          },
          {
            what: "Trilha and Momento",
            text: "I was selected for two mentorship programs. Trilha, in software engineering at UFPB, with engineers who worked at Tako, Sable, Brex, Pax, Telepatia and 11x. And Momento, which connects college students with alumni from Harvard, MIT, Stanford and Berkeley.",
          },
          {
            what: "UFPB",
            text: "Ranked 1st in admission to Computer Science.",
          },
          {
            what: "No Foco",
            section: "no-foco",
            text: "I co-founded it and built the platform from scratch. 40+ paying students in the first 6 months.",
          },
        ],
      },
      {
        year: "2024",
        items: [
          {
            what: "Brazilian Technology Olympiad",
            text: "I was a finalist and presented my app for historical preservation and urban issue reporting to MIT students.",
          },
          {
            what: "A calculator in Minecraft",
            text: "I built a calculator inside the game that does arithmetic in binary and converts the result to decimal. I wasn't even studying computing yet.",
          },
        ],
      },
      {
        year: "2018",
        items: [
          { what: "OBI", text: "Bronze at the Brazilian Olympiad in Informatics." },
          {
            what: "Honors",
            text: "Between 2016 and 2018, I received the José Lins do Rego Commendation and two Votes of Applause, from the Legislative Assembly of Paraíba and the City of João Pessoa.",
          },
        ],
      },
      {
        year: "2017",
        items: [{ what: "Kangaroo Math Competition", text: "Gold." }],
      },
      {
        year: "2016",
        items: [{ what: "OBR", text: "Gold at the Brazilian Robotics Olympiad, theory track." }],
      },
    ] satisfies History,
    sobre: {
      title: "I believe building extraordinary things shouldn't depend on where you start.",
      body: [
        "That's what I try to do with AI. I started with education: I co-founded No Foco, a coaching service for the ENEM, Brazil's national university entrance exam, that has guided more than 40 students across the country with 6 coaches, and Synapse, which teaches programming without handing over the answer.",
        "Now I'm also bringing AI to medicine. I research breast and lung cancer detection with the University of Pennsylvania and the University of Bristol.",
        "I study Computer Science at UFPB and play bossa nova on the guitar.",
        "If you'd like to talk, reach out:",
      ],
    },
    noFoco: {
      title: "I made an impact on my own circle first.",
      intro: [
        "I went to a very good school and thought that was enough to get into Brazil's most competitive universities. It wasn't. There were very capable people there one step away from getting in, and what they lacked was real, high-performance coaching for the ENEM.",
        "I saw it was a problem big enough for people to pay for. So I co-founded No Foco and built the platform from scratch, front end to back end.",
      ],
      features:
        "I built the study planning, performance tracking, streaks, rankings and exam metrics.",
      figure: "paying students in the first 6 months.",
      model:
        "I also trained and shipped a machine learning model that runs in the student's browser. It uses past mock exams and study behavior to predict the score on the next mock exam, by subject area. The study plan adapts to that forecast and shows where the student needs more attention.",
    },
    aria: {
      title: "Before training a model, you gotta trust the data.",
      intro: [
        "At ARIA, a collaboration between the University of Pennsylvania and the University of Bristol, I research AI-generated medical exams. Real exams are scarce and sensitive, and synthetic ones help train models that detect cancer, but only if they're faithful.",
        "So I built a yardstick to measure them and a loop that uses it to improve them.",
      ],
      outro:
        "The yardstick compares each synthetic image with the real exam on quality, texture and clinical realism, and it doesn't change during the search. That makes it possible to compare whoever proposes the adjustments honestly, and only what holds up goes on to feed the breast and lung cancer models.",
    },
    synapse: {
      title: "Copying isn't learning.",
      intro: [
        "The best students have always taught themselves. The secret wasn't talent, it was method: try, get it wrong, understand the mistake and try again. The faster that loop turns, the faster you learn.",
        "AI could turn that loop for anyone. But it tends to hand over the finished answer and skip exactly the part where you understand. That's why I co-founded Synapse: to teach people to learn with AI.",
        "Nobody starts from zero. A diagnostic that adapts to your answers finds out what you already know, and your path skips what you've already mastered.",
      ],
      exercise:
        "Then you write the code and the tests answer right away. When you get it wrong, the AI points where to look, but you're the one who solves it. And what you learned comes back in reviews, before you forget it.",
      outro:
        "I design the algorithms behind it, which adjust each student's difficulty, topic order and pace.",
    },
    demand: {
      title: "Demand forecasting",
      intro:
        "I built a model that forecasts medication demand in hospitals from their consumption history.",
      figure:
        "lower costs than the typical hospital baseline, in a simulated environment. Less idle stock, fewer emergency purchases.",
      stack: "I work with Python, TypeScript, React, Node.js, PostgreSQL and Google Cloud Run.",
    },
    contact: "Contact",
  },
};

function Section({
  id,
  title,
  label,
  children,
}: {
  id: string;
  /** Without a title the section still needs a name for the nav and screen readers. */
  title?: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <RisingLayer tone={tones[id]} last={id === Object.keys(tones).at(-1)}>
      {/* Right padding keeps content clear of the fixed side nav: its 11rem plus 4rem each side. */}
      <section
        id={id}
        aria-label={title ? undefined : label}
        className="px-6 pt-[20svh] pb-[18svh] sm:px-12 lg:pr-[19rem] lg:pl-16"
      >
        {title && <h2 className="type-title mb-10">{title}</h2>}
        {children}
      </section>
    </RisingLayer>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="type-lead max-w-xl text-ink-soft [&+&]:mt-6">{children}</p>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      className="text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
    >
      {children}
    </a>
  );
}

/** Where to reach me: email, then profiles, on one line that wraps on small screens. */
function Links({ className = "" }: { className?: string }) {
  return (
    <p className={`type-lead flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
      <span className="text-ink/20" aria-hidden="true">/</span>
      <A href="https://www.linkedin.com/in/matheuscbrito">LinkedIn</A>
      <span className="text-ink/20" aria-hidden="true">/</span>
      <A href="https://github.com/matheuscbrito">GitHub</A>
    </p>
  );
}

function Trajectory({ history }: { history: History }) {
  return (
    <dl className="type-body max-w-2xl divide-y divide-rule border-y border-rule">
      {history.map(({ year, items }) => (
        <div key={year} className="grid grid-cols-[4.5rem_1fr] gap-6 py-8">
          <dt className="text-ink/40 tabular-nums">{year}</dt>
          <dd className="space-y-6">
            {items.map(({ what, text, section }) => (
              <div key={what}>
                <p className="text-ink">
                  {section ? (
                    <ScrollLink
                      to={section}
                      className="group inline-flex items-baseline gap-1.5 active:opacity-60"
                    >
                      <span className="underline decoration-ink/25 underline-offset-4 transition-colors group-hover:decoration-ink">
                        {what}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-ink/40 transition-transform group-hover:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </ScrollLink>
                  ) : (
                    what
                  )}
                </p>
                <p className="mt-1 text-ink-soft">{text}</p>
              </div>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Home({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const label = (id: string) =>
    (t.nav as NavItem[])
      .flatMap((item) => ("children" in item ? item.children : [item]))
      .find((link) => link.id === id)!.label;

  return (
    <main lang={lang === "pt" ? "pt-BR" : "en"} className="flow-root overflow-clip">
      <Hero lang={lang} />

      <Section id="sobre" label={label("sobre")}>
        <p className="type-title max-w-3xl text-ink">{t.sobre.title}</p>
        <div className="mt-14">
          {t.sobre.body.map((text) => (
            <P key={text}>{text}</P>
          ))}
          <Links className="mt-4" />
        </div>
      </Section>

      <Section id="trajetoria" title={label("trajetoria")}>
        <Trajectory history={t.history} />
      </Section>

      <Section id="no-foco" label="No Foco">
        <p className="type-title max-w-3xl text-ink">{t.noFoco.title}</p>
        <div className="mt-14">
          {t.noFoco.intro.map((text) => (
            <P key={text}>{text}</P>
          ))}
        </div>
        <div className="my-24">
          <NoFocoSchedule lang={lang} />
        </div>
        <P>{t.noFoco.features}</P>
        <p className="type-figure mt-24">40+</p>
        <P>{t.noFoco.figure}</P>
        <div className="my-24">
          <PredictionCard lang={lang} />
        </div>
        <P>{t.noFoco.model}</P>
        <P>
          <A href="https://nofoco.app.br">nofoco.app.br</A>
        </P>
      </Section>

      <Section id="aria" label="ARIA">
        <p className="type-title max-w-3xl text-ink">{t.aria.title}</p>
        <div className="mt-14">
          {t.aria.intro.map((text) => (
            <P key={text}>{text}</P>
          ))}
        </div>
        <div className="my-24">
          <AriaPipeline lang={lang} />
        </div>
        <P>{t.aria.outro}</P>
      </Section>

      <Section id="synapse" label="Synapse">
        <p className="type-title max-w-3xl text-ink">{t.synapse.title}</p>
        <div className="mt-14">
          {t.synapse.intro.map((text) => (
            <P key={text}>{text}</P>
          ))}
        </div>
        <div className="my-24">
          <SynapseDiagnostic lang={lang} />
        </div>
        <P>{t.synapse.exercise}</P>
        <div className="my-24">
          <SynapseExercise lang={lang} />
        </div>
        <P>{t.synapse.outro}</P>
      </Section>

      <Section id="previsao-demanda" title={t.demand.title}>
        <P>{t.demand.intro}</P>
        <p className="type-figure mt-16">30%</p>
        <P>{t.demand.figure}</P>
        <p className="type-body mt-16 max-w-xl text-ink-soft">{t.demand.stack}</p>
      </Section>

      <Section id="contato" title={t.contact}>
        <Links />
      </Section>

      {/* The blend sits on this fixed layer, the stacking context that composites over the panels. */}
      <div className="pointer-events-none fixed inset-y-0 right-16 z-50 hidden w-44 items-center mix-blend-difference lg:flex">
        <div className="pointer-events-auto">
          <SectionNav items={t.nav} label={t.navLabel} />
        </div>
      </div>
    </main>
  );
}
