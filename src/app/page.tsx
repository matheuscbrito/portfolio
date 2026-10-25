import { Figure } from "@/components/figure";
import { GradientBg } from "@/components/gradient-bg";
import { RisingLayer } from "@/components/rising-layer";
import { SectionNav, type NavItem } from "@/components/section-nav";

const EMAIL = "matheus.cavalcanti006@gmail.com";

const sections: NavItem[] = [
  { id: "sobre", label: "Sobre" },
  { id: "no-foco", label: "No Foco" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "projetos", label: "Projetos" },
  { id: "formacao", label: "Formação" },
  { id: "premios", label: "Prêmios" },
  { id: "contato", label: "Contato" },
];

const trajectory = [
  {
    when: "2026–",
    what: "Synapse",
    role: "Cofundador e engenheiro",
    text: "Uma plataforma para ensinar programação na era da IA. Desenho os algoritmos que ajustam dificuldade, ordem dos tópicos e ritmo de cada aluno em tempo real.",
  },
  {
    when: "2026–",
    what: "ARIA",
    role: "Pesquisador de IA",
    text: "Construo um framework para avaliar mamografias sintéticas geradas por IA, para que possam treinar com segurança modelos que detectam câncer de mama e de pulmão. Com a University of Pennsylvania e a University of Bristol.",
  },
  {
    when: "2026–",
    what: "No Foco",
    role: "Cofundador e engenheiro de software",
    text: "Construí a plataforma do zero, do front-end ao back-end, e o modelo de previsão de desempenho em produção.",
  },
  {
    when: "2026–",
    what: "Trilha",
    role: "Mentorado em engenharia de software",
    text: "Mentoria na UFPB com engenheiros que passaram por Tako, Sable, Brex, Pax, Telepatia e 11x.",
  },
];

const awards = [
  {
    when: "2024",
    text: "Finalista da Olimpíada Brasileira de Tecnologia. Apresentei meu app de preservação histórica e denúncia urbana para alunos do MIT.",
  },
  {
    when: "2016–18",
    text: "Ouro na Olimpíada Brasileira de Robótica, ouro no Canguru sem Fronteiras e bronze na Olimpíada Brasileira de Informática.",
  },
  {
    when: "2016–18",
    text: "Comenda José Lins do Rego e dois Votos de Aplauso, da Assembleia Legislativa da Paraíba e da Prefeitura de João Pessoa.",
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[15svh] py-[18svh] first:pt-[22svh]">
      <h2 className="type-title">{title}</h2>
      <div className="mt-10">{children}</div>
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

/** Dated rows: date in a narrow column, content beside it. */
function Rows({ children }: { children: React.ReactNode }) {
  return <dl className="type-body max-w-xl divide-y divide-rule border-y border-rule">{children}</dl>;
}

function Row({ when, children }: { when: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-6 py-6">
      <dt className="text-ink/40 tabular-nums">{when}</dt>
      <dd className="text-ink-soft">{children}</dd>
    </div>
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
            <Section id="sobre" title="Sobre">
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

            <Section id="trajetoria" title="Trajetória">
              <Rows>
                {trajectory.map(({ when, what, role, text }) => (
                  <Row key={what} when={when}>
                    <span className="text-ink">{what}</span>
                    <span className="text-ink/40"> · {role}</span>
                    <span className="mt-2 block">{text}</span>
                  </Row>
                ))}
              </Rows>
              <p className="type-body mt-10 max-w-xl text-ink-soft">
                Trabalho com Python, TypeScript, React, Node.js, PostgreSQL e Google Cloud Run.
              </p>
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
            </Section>

            <Section id="formacao" title="Formação">
              <P>
                Entrei em 1º lugar em Ciência da Computação na UFPB, na turma de 2026. Me formo em
                2029.
              </P>
              <P>
                Também fui selecionado para o Momento, que conecta universitários a ex-alunos de
                Harvard, MIT, Stanford e Berkeley.
              </P>
            </Section>

            <Section id="premios" title="Prêmios">
              <Rows>
                {awards.map(({ when, text }) => (
                  <Row key={text} when={when}>
                    {text}
                  </Row>
                ))}
              </Rows>
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
