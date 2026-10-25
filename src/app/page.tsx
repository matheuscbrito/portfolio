import { AriaPipeline } from "@/components/aria-pipeline";
import { Hero } from "@/components/hero";
import { PredictionCard } from "@/components/prediction-card";
import { NoFocoSchedule } from "@/components/no-foco-schedule";
import { RisingLayer, type Tone } from "@/components/rising-layer";
import { SectionNav, type NavItem } from "@/components/section-nav";

const EMAIL = "matheus.cavalcanti006@gmail.com";

const sections: NavItem[] = [
  { id: "sobre", label: "Sobre" },
  {
    label: "Projetos",
    children: [
      { id: "no-foco", label: "No Foco" },
      { id: "aria", label: "ARIA" },
      { id: "previsao-demanda", label: "Previsão de demanda" },
    ],
  },
  { id: "historico", label: "Histórico" },
  { id: "contato", label: "Contato" },
];

/** Each section is a panel in its own tone that rises over the previous one. */
const tones: Record<string, Tone> = {
  sobre: "light",
  "no-foco": "mist",
  aria: "dark",
  "previsao-demanda": "mist",
  historico: "light",
  contato: "dark",
};

/** What I did over time, newest first. */
const history: { year: string; items: { what: string; text: string }[] }[] = [
  {
    year: "2026",
    items: [
      {
        what: "Synapse",
        text: "Cofundei uma plataforma para ensinar programação na era da AI. Desenho os algoritmos que ajustam dificuldade, ordem dos tópicos e ritmo de cada aluno em tempo real.",
      },
      {
        what: "ARIA",
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
];

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

function History() {
  return (
    <dl className="type-body max-w-2xl divide-y divide-rule border-y border-rule">
      {history.map(({ year, items }) => (
        <div key={year} className="grid grid-cols-[4.5rem_1fr] gap-6 py-8">
          <dt className="text-ink/40 tabular-nums">{year}</dt>
          <dd className="space-y-6">
            {items.map(({ what, text }) => (
              <div key={what}>
                <p className="text-ink">{what}</p>
                <p className="mt-1 text-ink-soft">{text}</p>
              </div>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  return (
    <main className="flow-root overflow-clip">
      <Hero />

      <Section id="sobre" label="Sobre">
        <p className="type-title max-w-3xl text-ink">
          Acredito que pessoas comuns podem construir coisas extraordinárias.
        </p>
        <div className="mt-14">
          <P>
            E estou fazendo isso com AI. Comecei fundando a No Foco, uma
            assessoria pra Enem que já impactou mais de 40 pessoas e 6 assessores pelo Brasil.
            Agora tô construindo AI pra Medicina, ajudando a identificar risco de câncer de mama e de pulmão.
          </P>
          <P>
            Estudo Ciência da Computação na UFPB e toco bossa nova no violão.
          </P>
          <P>Se quiser conversar, me chama:</P>
          <Links className="mt-4" />
        </div>
      </Section>

      <Section id="no-foco" label="No Foco">
        <p className="type-title max-w-3xl text-ink">Impactei primeiro meu círculo social.</p>
        <div className="mt-14">
          <P>
            Estudei numa escola muito boa e achava que isso bastava para entrar nas universidades
            mais concorridas do Brasil. Não bastava. Tinha gente muito boa lá a um passo da
            aprovação, e o que faltava era um acompanhamento de verdade, de alta performance, para
            o ENEM.
          </P>
          <P>
            Percebi que era um problema grande o suficiente para as pessoas pagarem por ele. Então
            cofundei a No Foco e construí a plataforma do zero, do front-end ao back-end.
          </P>
        </div>
        <div className="my-24">
          <NoFocoSchedule />
        </div>
        <P>
          Construí o planejamento de estudos, o acompanhamento de desempenho, os streaks, os
          rankings e as métricas de prova.
        </P>
        <p className="type-figure mt-24">40+</p>
        <P>alunos pagantes nos primeiros 6 meses.</P>
        <div className="my-24">
          <PredictionCard />
        </div>
        <P>
          Também treinei e coloquei em produção um modelo de machine learning que roda no
          navegador do aluno. Ele usa o histórico de simulados e o comportamento de estudo
          para prever a nota do próximo simulado, por área. O plano de estudos se ajusta a
          essa previsão e mostra onde o aluno precisa de mais atenção.
        </P>
        <P>
          <A href="https://nofoco.app.br">nofoco.app.br</A>
        </P>
      </Section>

      <Section id="aria" label="ARIA">
        <p className="type-title max-w-3xl text-ink">
          Antes de treinar um modelo, é preciso confiar nos dados.
        </p>
        <div className="mt-14">
          <P>
            No ARIA, uma colaboração da University of Pennsylvania com a University of Bristol,
            pesquiso exames gerados por AI. Exames reais são escassos e sensíveis, e os sintéticos
            ajudam a treinar modelos que detectam câncer, mas só se forem fiéis.
          </P>
          <P>Por isso construí uma régua para medi-los e um ciclo que a usa para melhorá-los.</P>
        </div>
        <div className="my-24">
          <AriaPipeline />
        </div>
        <P>
          A régua compara cada imagem sintética com o exame real em qualidade, textura e realismo
          clínico, e não muda durante a busca. Assim dá para comparar com honestidade quem propõe os
          ajustes, e só o que se sustenta vai alimentar os modelos de câncer de mama e de pulmão.
        </P>
      </Section>

      <Section id="previsao-demanda" title="Previsão de demanda">
        <P>
          Construí um modelo que prevê a demanda de medicamentos em hospitais a partir do
          histórico de consumo.
        </P>
        <p className="type-figure mt-16">30%</p>
        <P>
          menos gastos que o baseline de hospitais comuns, em ambiente simulado. Menos estoque
          parado, menos compra emergencial.
        </P>
        <p className="type-body mt-16 max-w-xl text-ink-soft">
          Trabalho com Python, TypeScript, React, Node.js, PostgreSQL e Google Cloud Run.
        </p>
      </Section>

      <Section id="historico" title="Histórico">
        <History />
      </Section>

      <Section id="contato" title="Contato">
        <Links />
      </Section>

      {/* The blend sits on this fixed layer, the stacking context that composites over the panels. */}
      <div className="pointer-events-none fixed inset-y-0 right-16 z-50 hidden w-44 items-center mix-blend-difference lg:flex">
        <div className="pointer-events-auto">
          <SectionNav items={sections} />
        </div>
      </div>
    </main>
  );
}
