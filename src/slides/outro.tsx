import React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { C, F } from "../deck/theme";
import { mix, POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { At, Chip } from "../deck/ui";
import { Cell, clamp01 } from "./common";

/* Final slide: values run through three separate functions, then the functions fuse into one composed function. */

const FNS: { label: string; f: (v: number) => number; color: string }[] = [
  { label: "(+1)", f: (v) => v + 1, color: C.amber },
  { label: "(*2)", f: (v) => v * 2, color: C.pink },
  { label: "(^2)", f: (v) => v * v, color: C.mint },
];
const INPUTS = [1, 2, 3, 4, 5, 6];
const RAIL = { x0: 900, x1: 1820, y: 485 };
const BOX = { y: 440, w: 200, h: 90 };
const boxX = (k: number, fuse: number) => mix(1000 + k * 260, 1060 + k * 200, fuse);
const LAUNCH = (j: number) => 24 + j * 26;
const TRAVEL = 96;
const FUSE_AT = LAUNCH(INPUTS.length - 1) + TRAVEL + 24;
const FUSE_DUR = 30;
const LAST_AT = FUSE_AT + FUSE_DUR + 16;
const DONE_AT = LAST_AT + TRAVEL + 10;
const OUT = { x: 1000, y: 650, pitch: 112 };

const ease = Easing.inOut(Easing.cubic);
const run = (v: number, upto: number) => FNS.slice(0, upto).reduce((acc, fn) => fn.f(acc), v);
const stageColors = [C.lav, C.amber, C.pink, C.mint];

const rnd = (n: number) => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: rnd(i * 5 + 1) * 1920,
  y: rnd(i * 7 + 2) * 1080,
  r: 1 + rnd(i * 11 + 3) * 2,
  v: 0.2 + rnd(i * 13 + 4) * 0.5,
  ph: rnd(i * 17 + 5) * 6.28,
}));

const Token: React.FC<{ f: number; start: number; input: number; fused: boolean }> = ({ f, start, input, fused }) => {
  const u = clamp01((f - start) / TRAVEL);
  if (f < start || u >= 1) return null;
  const x = RAIL.x0 + (RAIL.x1 - RAIL.x0) * ease(u);
  const centers = FNS.map((_, k) => boxX(k, fused ? 1 : 0) + BOX.w / 2);
  const passed = centers.filter((c) => x >= c).length;
  const inside = fused && x > boxX(0, 1) - 20 && x < boxX(2, 1) + BOX.w + 20;
  const shown = fused ? (x >= boxX(2, 1) + BOX.w ? run(input, 3) : input) : run(input, passed);
  const color = fused ? (x >= boxX(2, 1) + BOX.w ? C.mint : C.lav) : stageColors[passed];
  return (
    <div
      style={{
        position: "absolute",
        left: x - 40,
        top: RAIL.y - 28,
        width: 80,
        height: 56,
        borderRadius: 28,
        border: `3px solid ${color}`,
        background: C.panel,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: 28,
        boxSizing: "border-box",
        opacity: inside ? 0 : Math.min(1, u * 8),
        zIndex: 0,
      }}
    >
      {shown}
    </div>
  );
};

const Outro: React.FC = () => {
  const { s, frame: f } = useSteps();
  const fuse = ease(clamp01((f - FUSE_AT) / FUSE_DUR));
  const fused = f >= FUSE_AT + FUSE_DUR;
  const results = [...INPUTS, 7].map((v, j) => ({
    v: run(v, 3),
    at: j < INPUTS.length ? LAUNCH(j) + TRAVEL : LAST_AT + TRAVEL,
  }));
  const credit = s(0, DONE_AT + 20);
  const lyah = s(0, DONE_AT + 4, POP);
  const sweep = interpolate(f, [DONE_AT + 30, DONE_AT + 80], [-30, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const letters = (str: string, base: number) =>
    str.split("").map((ch, i) => {
      const p = s(0, base + i * 2, POP);
      return (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 50}px)` }}>
          {ch}
        </span>
      );
    });

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 72% 50%, rgba(141,118,220,${0.14 + 0.1 * fuse}) 0%, ${C.bg} 60%)` }} />
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        {STARS.map((st, i) => (
          <circle key={i} cx={st.x} cy={(st.y - f * st.v + 1080 * 4) % 1080} r={st.r} fill="#c4b5fd" opacity={0.22 + 0.22 * Math.sin(f * 0.08 + st.ph)} />
        ))}
        <line x1={RAIL.x0} y1={RAIL.y} x2={RAIL.x0 + (RAIL.x1 - RAIL.x0) * s(0, 6)} y2={RAIL.y} stroke={C.line} strokeWidth={4} strokeDasharray="10 10" />
      </svg>

      <div
        style={{
          position: "absolute",
          left: boxX(0, 1) - 20,
          top: BOX.y - 20,
          width: boxX(2, 1) + BOX.w + 20 - (boxX(0, 1) - 20),
          height: BOX.h + 40,
          borderRadius: 22,
          border: `4px solid ${C.accentHi}`,
          background: "rgba(141,118,220,0.10)",
          boxShadow: `0 0 ${40 * fuse}px rgba(141,118,220,0.45)`,
          opacity: fuse,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: boxX(0, 1) - 20,
          top: BOX.y - 74,
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 30,
          color: C.accentHi,
          whiteSpace: "pre",
          opacity: fuse,
        }}
      >
        {"pipeline = (^2) . (*2) . (+1)"}
      </div>
      {FNS.map((fn, k) => {
        const p = s(0, 8 + k * 6, POP);
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: boxX(k, fuse),
              top: BOX.y,
              width: BOX.w,
              height: BOX.h,
              borderRadius: 16,
              border: `3px solid ${fn.color}`,
              background: C.panel2,
              color: fn.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 38,
              opacity: Math.min(1, p) * (1 - 0.45 * fuse),
              transform: `scale(${0.7 + 0.3 * p})`,
              zIndex: 1,
            }}
          >
            {fn.label}
          </div>
        );
      })}
      {INPUTS.map((v, j) => (
        <Token key={j} f={f} start={LAUNCH(j)} input={v} fused={false} />
      ))}
      <Token f={f} start={LAST_AT} input={7} fused={fused} />
      {results.map((r, j) => (
        <Cell
          key={j}
          x={OUT.x + j * OUT.pitch}
          y={OUT.y}
          w={96}
          label={r.v}
          appear={s(0, r.at, POP)}
          glow={s(0, r.at) * (1 - s(0, r.at + 20))}
          color={j === INPUTS.length ? C.accentHi : C.mint}
        />
      ))}
      <div style={{ position: "absolute", left: OUT.x, top: OUT.y + 84, fontFamily: F.mono, fontWeight: 600, fontSize: 26, color: C.dim, opacity: s(0, LAUNCH(0) + TRAVEL) }}>
        {fused ? "map pipeline [1 .. 7]" : "результати"}
      </div>

      <div style={{ position: "absolute", left: 90, top: 150, fontFamily: F.head, fontWeight: 800, fontSize: 104, lineHeight: 1.12, color: C.text }}>
        <div>{letters("Дякую", 6)}</div>
        <div>{letters("за увагу!", 18)}</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 430,
          height: 6,
          width: 440 * s(0, 36),
          borderRadius: 3,
          background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
        }}
      />
      <Code x={96} y={500} size={30} step={0} delay={30} code={`pipeline = (^2) . (*2) . (+1)`} />
      <At x={96} y={590} step={0} delay={44} dir="left" pop>
        <Chip size={32} color={fused ? C.accentHi : C.amber} border={fused ? C.accentHi : C.amber}>
          {fused ? "три функції – одна нова" : "три окремі функції"}
        </Chip>
      </At>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 760,
          fontFamily: F.head,
          fontWeight: 800,
          fontSize: 44,
          color: C.amber,
          opacity: Math.min(1, lyah),
          transform: `translateY(${(1 - lyah) * 30}px)`,
        }}
      >
        Learn You a <span style={{ color: "#5b8def" }}>Haskell</span> for Great Good!
      </div>
      <div style={{ position: "absolute", left: 96, top: 900, opacity: credit, transform: `translateY(${(1 - credit) * 16}px)` }}>
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 600,
            fontSize: 34,
            letterSpacing: 2,
            backgroundImage: `linear-gradient(100deg, ${C.dim} 0%, ${C.dim} ${sweep - 12}%, #ffffff ${sweep}%, ${C.dim} ${sweep + 12}%, ${C.dim} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          made with Claude Opus 5.5
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const outroSlide: SlideDef = { id: "thanks", title: "Дякую за увагу", steps: [DONE_AT + 130], C: Outro };
