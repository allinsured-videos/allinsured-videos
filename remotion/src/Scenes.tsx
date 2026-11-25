import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, NAVY, NAVY_DARK, ORANGE, WHITE } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const useRise = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return {
    opacity: p,
    transform: `translateY(${interpolate(p, [0, 1], [60, 0])}px)`,
  };
};

const Bg: React.FC<{ color?: string; children: React.ReactNode }> = ({
  color = NAVY,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        fontFamily: FONT,
        color: WHITE,
        overflow: "hidden",
      }}
    >
      {/* soft orange glow drifting */}
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          left: -500 + frame * 1.5,
          top: -600,
          background: `radial-gradient(circle, ${ORANGE}33 0%, transparent 60%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const Shield: React.FC<{ size: number }> = ({ size }) => (
  <Img
    src={staticFile("logo-shield.png")}
    style={{ width: size, height: size * 1.067, display: "block" }}
  />
);

/* ---------- 1. Hook ---------- */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 8, fps, config: { damping: 12 } });
  const stripe = interpolate(frame, [0, 20], [-1200, 0], clamp);
  const sub = useRise(30);
  return (
    <Bg color={NAVY_DARK}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 40 }}
      >
        <div
          style={{
            transform: `scale(${spring({ frame, fps, config: { damping: 14 } })})`,
            marginBottom: 10,
          }}
        >
          <Shield size={170} />
        </div>
        <div
          style={{
            background: ORANGE,
            padding: "18px 48px",
            transform: `translateX(${stripe}px) rotate(-4deg)`,
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: 6,
          }}
        >
          ALL INSURED APRESENTA
        </div>
        <div
          style={{
            fontSize: 190,
            fontWeight: 900,
            lineHeight: 0.95,
            textAlign: "center",
            transform: `scale(${pop})`,
          }}
        >
          BLACK
          <br />
          <span style={{ color: ORANGE }}>FRIDAY</span>
        </div>
        <div
          style={{
            ...sub,
            fontSize: 52,
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 860,
          }}
        >
          Plano de saúde empresarial
        </div>
      </AbsoluteFill>
    </Bg>
  );
};

/* ---------- 2. Offer ---------- */
export const OfferScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round(
    interpolate(frame, [8, 38], [0, 50], {
      ...clamp,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    }),
  );
  const big = spring({ frame: frame - 5, fps, config: { damping: 10 } });
  const l0 = useRise(0);
  const l1 = useRise(34);
  const l2 = useRise(50);
  return (
    <Bg>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 90px",
          textAlign: "center",
        }}
      >
        <div style={{ ...l0, fontSize: 96, fontWeight: 900 }}>ATÉ</div>
        <div
          style={{
            fontSize: 360,
            fontWeight: 900,
            color: ORANGE,
            lineHeight: 1,
            letterSpacing: -10,
            transform: `scale(${0.6 + big * 0.4})`,
          }}
        >
          {count}%
        </div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 900,
            marginTop: -10,
            transform: `scale(${big})`,
          }}
        >
          OFF
        </div>
        <div style={{ ...l1, fontSize: 66, fontWeight: 800, marginTop: 20 }}>
          no plano de saúde
          <br />
          da sua empresa
        </div>
        <div
          style={{
            ...l2,
            marginTop: 60,
            fontSize: 44,
            fontWeight: 500,
            background: `${WHITE}1A`,
            border: `3px solid ${ORANGE}`,
            borderRadius: 24,
            padding: "26px 40px",
          }}
        >
          Desconto conforme a
          <br />
          <b style={{ color: ORANGE }}>operadora escolhida</b>
        </div>
      </AbsoluteFill>
    </Bg>
  );
};

/* ---------- 3. Benefits ---------- */
const Benefit: React.FC<{ text: string; delay: number }> = ({
  text,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const check = spring({ frame: frame - delay - 6, fps, config: { damping: 9 } });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 36,
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-200, 0])}px)`,
        background: WHITE,
        color: NAVY,
        borderRadius: 28,
        padding: "34px 40px",
        width: 900,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: ORANGE,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${check})`,
        }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24">
          <path
            d="M5 12.5 L10 17.5 L19 7"
            stroke={WHITE}
            strokeWidth={3.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.2 }}>
        {text}
      </div>
    </div>
  );
};

export const BenefitsScene: React.FC = () => {
  const title = useRise(0);
  return (
    <Bg color={NAVY_DARK}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 34 }}
      >
        <div
          style={{
            ...title,
            fontSize: 84,
            fontWeight: 900,
            textAlign: "center",
            marginBottom: 30,
            lineHeight: 1.1,
          }}
        >
          E tem mais:
          <br />
          <span style={{ color: ORANGE }}>tudo sem custo extra</span>
        </div>
        <Benefit delay={14} text="Inclusões, exclusões e movimentações por nossa conta" />
        <Benefit delay={26} text="Agendamento de consultas e exames" />
        <Benefit delay={38} text="Apoio em liberações especiais" />
        <Benefit delay={50} text="Seu RH sem demanda extra" />
      </AbsoluteFill>
    </Bg>
  );
};

/* ---------- 4. Social proof ---------- */
const Stat: React.FC<{
  to: number;
  prefix?: string;
  suffix: string;
  label: string;
  delay: number;
}> = ({ to, prefix = "", suffix, label, delay }) => {
  const frame = useCurrentFrame();
  const v = Math.round(
    interpolate(frame, [delay, delay + 30], [0, to], {
      ...clamp,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    }),
  );
  const s = useRise(delay);
  return (
    <div style={{ ...s, textAlign: "center" }}>
      {prefix ? (
        <div style={{ fontSize: 56, fontWeight: 700, marginBottom: -10 }}>
          {prefix}
        </div>
      ) : null}
      <div style={{ fontSize: 210, fontWeight: 900, color: ORANGE, lineHeight: 1 }}>
        {v.toLocaleString("pt-BR")}
        {suffix}
      </div>
      <div style={{ fontSize: 56, fontWeight: 700 }}>{label}</div>
    </div>
  );
};

export const ProofScene: React.FC = () => {
  const t = useRise(0);
  return (
    <Bg>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 70 }}
      >
        <div style={{ ...t, fontSize: 64, fontWeight: 800, textAlign: "center" }}>
          Quem já confia na gente
        </div>
        <Stat to={500} suffix="+" label="empresas clientes" delay={8} />
        <Stat to={3} prefix="quase" suffix=" mil" label="vidas protegidas" delay={24} />
      </AbsoluteFill>
    </Bg>
  );
};

/* ---------- 5. CTA ---------- */
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame, fps, config: { damping: 11 } });
  const a = useRise(14);
  const b = useRise(28);
  const c = useRise(40);
  const pulse = 1 + Math.sin(frame / 5) * 0.03;
  return (
    <Bg color={NAVY_DARK}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          textAlign: "center",
        }}
      >
        <div style={{ transform: `scale(${logo})` }}>
          <Shield size={220} />
        </div>
        <div style={{ ...a }}>
          <div style={{ fontSize: 110, fontWeight: 900, letterSpacing: -2 }}>
            All-insured
          </div>
          <div style={{ fontSize: 44, fontWeight: 500, color: ORANGE }}>
            Especialistas em Planos de Saúde
          </div>
        </div>
        <div
          style={{
            ...b,
            transform: `${b.transform} scale(${pulse})`,
            background: ORANGE,
            borderRadius: 999,
            padding: "34px 70px",
            fontSize: 58,
            fontWeight: 900,
            marginTop: 30,
          }}
        >
          CHAMA NO DIRECT
        </div>
        <div style={{ ...c, fontSize: 50, fontWeight: 700 }}>
          @julioallinsured
          <div style={{ fontSize: 40, fontWeight: 500, opacity: 0.8, marginTop: 10 }}>
            www.allinsured.com.br
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 110,
          width: "100%",
          textAlign: "center",
          fontSize: 30,
          opacity: 0.6,
        }}
      >
        *Consulte as condições da promoção.
      </div>
    </Bg>
  );
};
