import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { WHITE } from "../theme";
import {
  Bar,
  BarChart,
  BarLabels,
  Bg,
  Bug,
  Center,
  Counter,
  H,
  Item,
  Kicker,
  O,
  Outro,
  P,
  Progress,
  Stamp,
  useRise,
} from "./kit";

export const T = 8;
type Scene = [number, React.ReactNode];
export const total = (s: Scene[]) =>
  s.reduce((a, [d]) => a + d, 0) - T * (s.length - 1);

const Run: React.FC<{ scenes: Scene[] }> = ({ scenes }) => (
  <AbsoluteFill>
    <TransitionSeries>
      {scenes.flatMap(([d, el], i) => {
        const seq = (
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={d}>
            {el}
          </TransitionSeries.Sequence>
        );
        return i === 0
          ? [seq]
          : [
              <TransitionSeries.Transition
                key={`t${i}`}
                presentation={fade()}
                timing={linearTiming({ durationInFrames: T })}
              />,
              seq,
            ];
      })}
    </TransitionSeries>
    <Progress />
  </AbsoluteFill>
);

const Scn: React.FC<{ dark?: boolean; children: React.ReactNode; gap?: number }> = ({
  dark,
  children,
  gap,
}) => (
  <Bg dark={dark}>
    <Bug />
    <Center gap={gap}>{children}</Center>
  </Bg>
);

const Source: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const s = useRise(30, 10);
  return (
    <div style={{ ...s, fontSize: 28, opacity: 0.6, fontWeight: 500 }}>
      {children}
    </div>
  );
};

/* ===== 1. Reajuste ===== */
const reajusteBars: Bar[] = [
  { label: "Individual", note: "teto ANS 26/27", value: 5.11 },
  { label: "Coletivo", note: "média início 2026", value: 9.9 },
  { label: "Empresas < 30 vidas", note: "média 2025", value: 14.24, hi: true },
];
export const s1: Scene[] = [
  [
    80,
    <Scn dark>
      <Kicker>Dono de empresa</Kicker>
      <H size={110}>
        Seu plano de saúde subiu <O>mais</O> que o dos outros?
      </H>
    </Scn>,
  ],
  [
    165,
    <Scn gap={30}>
      <H size={64}>Reajuste anual de plano de saúde</H>
      <BarChart bars={reajusteBars} max={15} delay={10} height={640} />
      <BarLabels bars={reajusteBars} delay={10} />
      <Source>Fonte: ANS</Source>
    </Scn>,
  ],
  [
    130,
    <Scn dark gap={26}>
      <H size={84}>Por quê?</H>
      <Item delay={8} text="Plano individual tem teto definido pela ANS" />
      <Item delay={24} kind="x" text="Plano empresarial não tem teto: é negociação" />
      <Item delay={40} kind="x" text="Empresa pequena negocia pouco… e paga a conta" />
    </Scn>,
  ],
  [
    95,
    <Scn>
      <H size={104}>
        Reajuste <O>não é sentença.</O>
      </H>
      <P delay={14}>Dá pra negociar, mudar de linha ou de operadora — sem perder a rede.</P>
    </Scn>,
  ],
  [
    95,
    <Outro
      cta={
        <>
          Comente <span style={{ color: "#1F2247" }}>REAJUSTE</span>
        </>
      }
      sub="que eu olho o caso da sua empresa"
    />,
  ],
];

/* ===== 2. 3 sinais ===== */
export const s2: Scene[] = [
  [
    80,
    <Scn dark>
      <Kicker>Checklist rápido</Kicker>
      <H size={104}>
        3 sinais de que sua empresa <O>paga caro</O> no plano de saúde
      </H>
    </Scn>,
  ],
  [
    200,
    <Scn gap={30}>
      <Item kind="num" n={1} delay={6} text="Ninguém acompanha a sinistralidade mês a mês" />
      <Item kind="num" n={2} delay={55} text="Dependentes que não usam o plano há mais de 12 meses" />
      <Item kind="num" n={3} delay={105} text="O reajuste foi aceito sem contraproposta" />
    </Scn>,
  ],
  [
    95,
    <Scn dark>
      <H size={100}>
        Marcou 2 de 3?
      </H>
      <P delay={14} size={58}>
        Tem dinheiro saindo do caixa <O>todo mês</O>.
      </P>
    </Scn>,
  ],
  [
    95,
    <Outro cta="Envie pro RH da sua empresa" sub="e comente CHECKLIST" />,
  ],
];

/* ===== 3. Case 22% ===== */
export const s3: Scene[] = [
  [
    85,
    <Scn dark>
      <Kicker>Caso real</Kicker>
      <H size={108}>
        Cortamos <O>22%</O> do plano de uma empresa
      </H>
      <P delay={16} size={56}>sem tirar nenhum hospital.</P>
    </Scn>,
  ],
  [
    120,
    <Scn gap={20}>
      <P size={46}>Empresa de 180 vidas · custo por ano</P>
      <div style={{ fontSize: 80, fontWeight: 800, opacity: 0.55, textDecoration: "line-through" }}>
        R$ 1,2 milhão
      </div>
      <Counter from={1200} to={936} delay={20} dur={45} prefix="R$ " suffix=" mil" size={170} />
      <P delay={50} size={48}>
        Mesma rede. Mesmo time. <O>Nenhum benefício cortado.</O>
      </P>
    </Scn>,
  ],
  [
    170,
    <Scn dark gap={24}>
      <H size={72}>O que foi feito</H>
      <Item delay={8} size={42} text="Mesma rede, outra linha de contrato" />
      <Item delay={30} size={42} text="Coparticipação só em eletivos" />
      <Item delay={52} size={42} text="Saída de dependentes inativos há +12 meses" />
      <Item delay={74} size={42} text="Sinistralidade acompanhada todo mês" />
    </Scn>,
  ],
  [
    105,
    <Scn>
      <P size={52}>Nessa empresa, cada 1% de reajuste evitado vale</P>
      <Counter to={12} delay={12} dur={25} prefix="R$ " suffix=" mil" size={190} />
      <P delay={30} size={52}>por ano.</P>
    </Scn>,
  ],
  [95, <Outro cta="Comente ECONOMIA" sub="e eu te explico como fazer na sua" />],
];

/* ===== 4. Mito ou verdade ===== */
const Myth: React.FC<{ q: string; a: React.ReactNode }> = ({ q, a }) => (
  <Scn gap={44}>
    <H size={74}>“{q}”</H>
    <Stamp text="MITO" good={false} delay={40} />
    <P delay={55} size={46} weight={500}>
      {a}
    </P>
  </Scn>
);
export const s4: Scene[] = [
  [
    75,
    <Scn dark>
      <Kicker>Mito ou verdade?</Kicker>
      <H size={100}>
        3 coisas que te contaram sobre <O>plano de saúde</O>
      </H>
    </Scn>,
  ],
  [
    135,
    <Myth
      q="Quem tem plano não pode usar o SUS."
      a={<>O SUS é direito de todos. E, se o plano cobre o atendimento, <O>a operadora ressarce o SUS</O>.</>}
    />,
  ],
  [
    135,
    <Myth
      q="A operadora pode recusar quem tem doença preexistente."
      a={<>Não pode recusar. Pode aplicar <O>CPT por até 24 meses</O>, só no que foi declarado.</>}
    />,
  ],
  [
    135,
    <Myth
      q="Plano empresarial sempre tem carência."
      a={<>Com <O>30 vidas ou mais</O> e entrada em até 30 dias, pode não ter carência.</>}
    />,
  ],
  [95, <Outro cta="Salve e mande pra quem precisa" sub="Qual mito você já ouviu? Comenta aí" />],
];

/* ===== 5. CNPJ ===== */
const cnpjBars: Bar[] = [
  { label: "Dez/2019", value: 2.7 },
  { label: "Mai/2026", value: 4.9, hi: true },
];
export const s5: Scene[] = [
  [
    80,
    <Scn dark>
      <Kicker>MEI e pequenas empresas</Kicker>
      <H size={106}>
        Plano de saúde com <O>CNPJ</O> pode sair mais barato?
      </H>
    </Scn>,
  ],
  [
    160,
    <Scn gap={26}>
      <H size={60}>Pessoas em contratos empresariais de 1 a 5 vidas</H>
      <BarChart bars={cnpjBars} max={5.2} delay={10} height={600} unit=" mi" decimals={1} />
      <BarLabels bars={cnpjBars} delay={10} />
      <H size={90} delay={50}>
        <O>+81%</O>
      </H>
      <Source>Fonte: dados da ANS (levantamento Arquitetos da Saúde)</Source>
    </Scn>,
  ],
  [
    150,
    <Scn dark gap={26}>
      <H size={76}>Vale a pena se…</H>
      <Item delay={8} text="Você tem CNPJ ativo (MEI também conta)" />
      <Item delay={28} text="A tabela empresarial costuma ser menor que a individual" />
      <Item delay={48} kind="x" text="Atenção: no empresarial, o reajuste não tem teto da ANS" />
    </Scn>,
  ],
  [95, <Outro cta="Comente CNPJ" sub="que eu faço a comparação pra você" />],
];

/* ===== 6. POV melhor plano ===== */
export const s6: Scene[] = [
  [
    85,
    <Scn dark>
      <Kicker>POV</Kicker>
      <H size={100}>
        O cliente pergunta: “Qual é o <O>MELHOR</O> plano?”
      </H>
    </Scn>,
  ],
  [
    60,
    <Scn>
      <H size={165}>Depende.</H>
      <div style={{ fontSize: 140 }}>😅</div>
    </Scn>,
  ],
  [
    180,
    <Scn dark gap={28}>
      <H size={64}>As 3 perguntas que eu faço antes:</H>
      <Item kind="num" n={1} delay={10} text="Onde você e seu time moram e trabalham?" />
      <Item kind="num" n={2} delay={45} text="Quais hospitais não podem faltar?" />
      <Item kind="num" n={3} delay={80} text="Quanto a empresa pode pagar por vida?" />
    </Scn>,
  ],
  [
    95,
    <Scn>
      <H size={88}>
        O melhor plano é o que cabe na sua <O>rede</O> e no seu <O>caixa</O>.
      </H>
    </Scn>,
  ],
  [95, <Outro cta="Me chama no direct" sub="e responde as 3 perguntas" />],
];

/* ===== 7. Renovação timeline ===== */
const Step: React.FC<{ d: string; t: string; delay: number }> = ({ d, t, delay }) => {
  const s = useRise(delay, 40);
  return (
    <div style={{ ...s, display: "flex", alignItems: "center", gap: 34, width: 900, textAlign: "left" }}>
      <div
        style={{
          width: 210,
          height: 210,
          borderRadius: "50%",
          border: `8px solid #F05C38`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        <div style={{ fontSize: 80 }}>{d}</div>
        <div style={{ fontSize: 30, fontWeight: 700 }}>dias antes</div>
      </div>
      <div style={{ fontSize: 48, fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>{t}</div>
    </div>
  );
};
export const s7: Scene[] = [
  [
    85,
    <Scn dark>
      <Kicker>Renovação do plano</Kicker>
      <H size={100}>
        O erro é esperar a <O>carta de reajuste</O> chegar.
      </H>
    </Scn>,
  ],
  [
    190,
    <Scn gap={44}>
      <Step d="90" t="Raio-X: sinistralidade, vidas e uso da rede" delay={6} />
      <Step d="60" t="Contraproposta e cotação no mercado" delay={50} />
      <Step d="30" t="Decisão: negociar, migrar ou trocar" delay={94} />
    </Scn>,
  ],
  [
    95,
    <Scn dark>
      <H size={92}>
        Quem chega com dados <O>negocia</O>.
      </H>
      <P delay={14} size={56}>Quem chega sem, aceita.</P>
    </Scn>,
  ],
  [95, <Outro cta="Comente RENOVAÇÃO" sub="e me diga o mês de aniversário do seu contrato" />],
];

export const V1 = () => <Run scenes={s1} />;
export const V2 = () => <Run scenes={s2} />;
export const V3 = () => <Run scenes={s3} />;
export const V4 = () => <Run scenes={s4} />;
export const V5 = () => <Run scenes={s5} />;
export const V6 = () => <Run scenes={s6} />;
export const V7 = () => <Run scenes={s7} />;
