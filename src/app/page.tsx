import { Figure } from "@/components/figure";
import { GradientBg } from "@/components/gradient-bg";
import { RisingLayer } from "@/components/rising-layer";
import { SectionNav, type NavItem } from "@/components/section-nav";

const EMAIL = "matheus.cavalcanti006@gmail.com";

const sections: NavItem[] = [
  { id: "sobre", label: "Sobre" },
  { id: "no-foco", label: "No Foco" },
  { id: "projetos", label: "Projetos" },
  { id: "historico", label: "Histórico" },
  { id: "fora-da-tela", label: "Fora da tela" },
  { id: "contato", label: "Contato" },
];

/** What I did over time, newest first. */
const history: { year: string; items: { what: string; text: string }[] }[] = [
  {
    year: "2026",
    items: [
      {
        what: "Synapse",
        text: "Cofundei uma plataforma para ensinar programação na era da IA. Desenho os algoritmos que ajustam dificuldade, ordem dos tópicos e ritmo de cada aluno em tempo real.",
      },
      {
        what: "ARIA",
        text: "Comecei a pesquisar IA para detecção de câncer de mama e de pulmão, com a University of Pennsylvania e a University of Bristol. Construo o framework que avalia mamografias sintéticas antes de elas treinarem modelos de diagnóstico.",
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
    <section
      id={id}
      aria-label={title ? undefined : label}
      className="scroll-mt-[15svh] py-[18svh] first:pt-[22svh]"
    >
      {title && <h2 className="type-title mb-10">{title}</h2>}
      {children}
    </section>
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
    <main className="flow-root">
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-[#D6E6F5] px-6 pb-16 sm:px-12 sm:pb-24">
        <GradientBg />
        <div className="relative z-10 max-w-6xl">
          <h1 className="type-display">Matheus Cavalcanti Brito</h1>
          <p className="type-lead mt-5 text-ink-soft">Engenharia, produto e design</p>
        </div>
      </section>

      <RisingLayer>
        <div className="grid gap-x-16 px-6 sm:px-12 lg:grid-cols-[1fr_10rem] lg:px-16">
          <div className="min-w-0">
            <Section id="sobre" label="Sobre">
              <p className="type-title max-w-3xl text-ink">
                Acredito que pessoas comuns conseguem construir coisas extraordinárias.
              </p>
              <div className="mt-14">
                <P>
                  E me anima muito o quanto a IA deixa isso mais perto de qualquer um. Quero
                  construir coisas que pessoas de verdade usam e que mudam algo na vida delas.
                </P>
                <P>
                  Comecei pelo No Foco, uma plataforma de preparação para o ENEM que construí do
                  zero e que já tem mais de 40 alunos pagantes. Hoje também pesquiso IA para
                  detecção de câncer de mama e de pulmão, e estou cofundando a Synapse.
                </P>
                <P>
                  Estudo Ciência da Computação na UFPB. Gosto de times pequenos, no começo, onde dá
                  para construir do zero. Se você está construindo algo assim, me escreve:{" "}
                  <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
                </P>
              </div>
            </Section>

            <Section id="no-foco" title="No Foco">
              <P>
                Cofundei o No Foco e construí a plataforma do zero, do front-end ao back-end. É
                onde estudantes se preparam para o ENEM.
              </P>
              <Figure alt="Imagem: interface do No Foco" />
              <p className="type-figure">40+</p>
              <P>alunos pagantes nos primeiros 6 meses.</P>
              <Figure alt="Imagem: plano de estudos, streaks e rankings" aspect="aspect-[4/3]" />
              <P>
                Construí o planejamento de estudos, o acompanhamento de desempenho, os streaks, os
                rankings e as métricas de prova.
              </P>
              <P>
                Também treinei e coloquei em produção um modelo de machine learning. Ele usa o
                histórico de simulados e o comportamento de estudo de cada aluno para prever a nota
                da próxima prova. O plano de estudos se ajusta a essa previsão e mostra onde ele
                precisa de mais atenção.
              </P>
              <P>
                <A href="https://nofoco.app.br">nofoco.app.br</A>
              </P>
            </Section>

            <Section id="projetos" title="Projetos">
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

            <Section id="fora-da-tela" title="Fora da tela">
              <P>
                Já joguei vários campeonatos de vôlei, toquei violino e treinei tênis de mesa. Hoje
                o que não larga é o violão, e se for bossa nova, melhor ainda.
              </P>
              <div className="mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
                <Figure alt="Foto 1" aspect="aspect-[4/5]" className="" />
                <Figure alt="Foto 2" aspect="aspect-[4/5]" className="" />
              </div>
            </Section>

            <Section id="contato" title="Contato">
              <P>
                <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
              </P>
              <P>
                <A href="https://github.com/matheuscbrito">GitHub</A>
                <span className="mx-3 text-ink/20">/</span>
                <A href="https://www.linkedin.com/in/matheuscbrito">LinkedIn</A>
              </P>
            </Section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[var(--rise-lead,0px)] flex h-svh items-center">
              <SectionNav items={sections} />
            </div>
          </aside>
        </div>
      </RisingLayer>
    </main>
  );
}
