import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, NAVY, NAVY_DARK, ORANGE, WHITE } from "../theme";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const useRise = (delay = 0, dist = 60) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return {
    opacity: p,
    transform: `translateY(${interpolate(p, [0, 1], [dist, 0])}px)`,
  };
};

export const usePop = (delay = 0, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

/* ---------- background ---------- */
export const Bg: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? NAVY_DARK : NAVY,
        fontFamily: FONT,
        color: WHITE,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 1500,
          borderRadius: "50%",
          left: -600 + frame * 1.2,
          top: -700,
          background: `radial-gradient(circle, ${ORANGE}30 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          right: -700,
          bottom: -600 + frame * 0.6,
          background: `radial-gradient(circle, #5A62B355 0%, transparent 60%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/* ---------- persistent brand bug ---------- */
export const Bug: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 90,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      opacity: 0.9,
    }}
  >
    <Img src={staticFile("logo-shield.png")} style={{ width: 54, height: 58 }} />
    <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>
      @julioallinsured
    </div>
  </div>
);

/* ---------- typography ---------- */
export const Center: React.FC<{
  children: React.ReactNode;
  gap?: number;
  style?: React.CSSProperties;
}> = ({ children, gap = 36, style }) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "220px 90px 200px",
      gap,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame - delay, [0, 14], [-900, 0], {
    ...clamp,
    easing: easeOut,
  });
  return (
    <div
      style={{
        background: ORANGE,
        padding: "14px 36px",
        fontSize: 46,
        fontWeight: 800,
        letterSpacing: 3,
        transform: `translateX(${x}px) rotate(-3deg)`,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
};

export const H: React.FC<{
  children: React.ReactNode;
  size?: number;
  delay?: number;
  color?: string;
}> = ({ children, size = 96, delay = 0, color = WHITE }) => {
  const s = useRise(delay);
  return (
    <div
      style={{
        ...s,
        fontSize: size,
        fontWeight: 900,
        lineHeight: 1.05,
        color,
        letterSpacing: -1,
      }}
    >
      {children}
    </div>
  );
};

export const P: React.FC<{
  children: React.ReactNode;
  size?: number;
  delay?: number;
  weight?: number;
}> = ({ children, size = 50, delay = 0, weight = 600 }) => {
  const s = useRise(delay, 40);
  return (
    <div style={{ ...s, fontSize: size, fontWeight: weight, lineHeight: 1.25 }}>
      {children}
    </div>
  );
};

export const O: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: ORANGE }}>{children}</span>
);

/* ---------- counter ---------- */
export const Counter: React.FC<{
  from?: number;
  to: number;
  delay?: number;
  dur?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  size?: number;
  color?: string;
}> = ({
  from = 0,
  to,
  delay = 0,
  dur = 30,
  decimals = 0,
  prefix = "",
  suffix = "",
  size = 220,
  color = ORANGE,
}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + dur], [from, to], {
    ...clamp,
    easing: easeOut,
  });
  const pop = usePop(delay, 14);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 900,
        color,
        lineHeight: 1,
        letterSpacing: -6,
        transform: `scale(${0.7 + pop * 0.3})`,
        opacity: pop,
      }}
    >
      {prefix}
      {v.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </div>
  );
};

/* ---------- vertical bar chart ---------- */
export type Bar = { label: string; value: number; hi?: boolean; note?: string };
export const BarChart: React.FC<{
  bars: Bar[];
  max: number;
  delay?: number;
  unit?: string;
  height?: number;
  decimals?: number;
}> = ({ bars, max, delay = 0, unit = "%", height = 760, decimals = 2 }) => {
  const frame = useCurrentFrame();
  const barW = Math.min(240, 820 / bars.length - 40);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 50,
        height: height + 200,
        borderBottom: `4px solid ${WHITE}55`,
        paddingBottom: 0,
      }}
    >
      {bars.map((b, i) => {
        const d = delay + i * 10;
        const p = interpolate(frame, [d, d + 28], [0, 1], {
          ...clamp,
          easing: easeOut,
        });
        const h = (b.value / max) * height * p;
        return (
          <div
            key={b.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: barW,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: b.hi ? ORANGE : WHITE,
                opacity: p,
                marginBottom: 12,
              }}
            >
              {(b.value * p).toLocaleString("pt-BR", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })}
              {unit}
            </div>
            <div
              style={{
                width: "100%",
                height: h,
                borderRadius: "18px 18px 0 0",
                background: b.hi
                  ? `linear-gradient(180deg, ${ORANGE}, #B8401F)`
                  : `linear-gradient(180deg, #8A90D6, #4A5099)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export const BarLabels: React.FC<{ bars: Bar[]; delay?: number }> = ({
  bars,
  delay = 0,
}) => {
  const barW = Math.min(240, 820 / bars.length - 40);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 50 }}>
      {bars.map((b, i) => {
        const s = useRise(delay + i * 10, 20);
        return (
          <div
            key={b.label}
            style={{
              ...s,
              width: barW,
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.15,
              color: b.hi ? ORANGE : WHITE,
            }}
          >
            {b.label}
            {b.note ? (
              <div style={{ fontSize: 26, fontWeight: 500, opacity: 0.75 }}>
                {b.note}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

/* ---------- check / x list ---------- */
export const Item: React.FC<{
  text: React.ReactNode;
  delay: number;
  kind?: "check" | "x" | "num";
  n?: number;
  size?: number;
}> = ({ text, delay, kind = "check", n = 1, size = 46 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const icon = spring({ frame: frame - delay - 6, fps, config: { damping: 9 } });
  const iconBg = kind === "x" ? "#D93A3A" : ORANGE;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-160, 0])}px)`,
        background: WHITE,
        color: NAVY,
        borderRadius: 26,
        padding: "28px 34px",
        width: 900,
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: iconBg,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${icon})`,
          color: WHITE,
          fontSize: 50,
          fontWeight: 900,
        }}
      >
        {kind === "num" ? (
          n
        ) : (
          <svg width="50" height="50" viewBox="0 0 24 24">
            <path
              d={kind === "x" ? "M6 6 L18 18 M18 6 L6 18" : "M5 12.5 L10 17.5 L19 7"}
              stroke={WHITE}
              strokeWidth={3.4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.2 }}>
        {text}
      </div>
    </div>
  );
};

/* ---------- stamp (MITO / VERDADE) ---------- */
export const Stamp: React.FC<{ text: string; good: boolean; delay: number }> = ({
  text,
  good,
  delay,
}) => {
  const p = usePop(delay, 8);
  return (
    <div
      style={{
        border: `10px solid ${good ? "#3BC46B" : "#E5484D"}`,
        color: good ? "#3BC46B" : "#E5484D",
        fontSize: 120,
        fontWeight: 900,
        padding: "6px 50px",
        borderRadius: 24,
        transform: `rotate(-8deg) scale(${interpolate(p, [0, 1], [2.2, 1])})`,
        opacity: p,
        letterSpacing: 4,
      }}
    >
      {text}
    </div>
  );
};

/* ---------- progress bar (retention cue) ---------- */
export const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 12,
        width: `${(frame / durationInFrames) * 100}%`,
        background: ORANGE,
      }}
    />
  );
};

/* ---------- outro ---------- */
export const Outro: React.FC<{ cta: React.ReactNode; sub?: React.ReactNode }> = ({
  cta,
  sub,
}) => {
  const frame = useCurrentFrame();
  const logo = usePop(0, 11);
  const a = useRise(10);
  const b = useRise(22);
  const pulse = 1 + Math.sin(frame / 5) * 0.03;
  return (
    <Bg dark>
      <Center gap={34}>
        <Img
          src={staticFile("logo-shield.png")}
          style={{ width: 190, height: 203, transform: `scale(${logo})` }}
        />
        <div style={a}>
          <div style={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }}>
            All-insured
          </div>
          <div style={{ fontSize: 42, fontWeight: 500, color: ORANGE }}>
            Especialistas em Planos de Saúde
          </div>
        </div>
        <div
          style={{
            ...b,
            transform: `${b.transform} scale(${pulse})`,
            background: ORANGE,
            borderRadius: 40,
            padding: "30px 56px",
            fontSize: 52,
            fontWeight: 900,
            marginTop: 20,
            lineHeight: 1.15,
          }}
        >
          {cta}
        </div>
        {sub ? (
          <div style={{ ...b, fontSize: 40, fontWeight: 600, opacity: 0.9 }}>
            {sub}
          </div>
        ) : null}
      </Center>
    </Bg>
  );
};
