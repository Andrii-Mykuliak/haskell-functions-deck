import React from "react";
import { interpolate } from "remotion";
import { C, F } from "../deck/theme";
import { mix, POP, SlideDef, useSteps } from "../deck/steps";
import { Arrow, At, HaskellLogo, Slide } from "../deck/ui";
import { AuthorBlock } from "../deck/Author";
import { Cell, clamp01 } from "./common";

const TitleSlide: React.FC = () => {
  const { s, t } = useSteps();
  const lines = ["Основи", "функційного", "програмування"];
  const letters = (str: string, base: number) =>
    str.split("").map((ch, i) => {
      const p = s(0, base + i * 1.4);
      return (
        <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * 60}px)`, whiteSpace: "pre" }}>
          {ch}
        </span>
      );
    });
  const glow = interpolate(t(0, 40), [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Slide>
      <div style={{ position: "absolute", right: 0, top: 14, width: 760, height: 540, background: "#141821", opacity: s(0, 0) }} />
      <div style={{ position: "absolute", right: 60, top: 70, filter: `drop-shadow(0 0 ${40 * glow}px rgba(143,78,139,0.35))` }}>
        <HaskellLogo size={680} p1={s(0, 4, POP)} p2={s(0, 12, POP)} p3={s(0, 22, POP)} />
      </div>
      <At x={116} y={190} step={0} delay={8} size={60} weight={800} color={C.pink}>
        Лекція 2
      </At>
      <div style={{ position: "absolute", left: 110, top: 300, fontFamily: F.head, fontWeight: 800, fontSize: 100, lineHeight: 1.12, color: C.text }}>
        {lines.map((l, i) => (
          <div key={i}>{letters(l, 14 + i * 12)}</div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 670,
          height: 6,
          width: mix(0, 520, s(0, 56)),
          background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
          borderRadius: 3,
        }}
      />
      <At x={116} y={710} step={0} delay={62} size={36} weight={400} color={C.dim} font={F.mono} style={{ fontVariantLigatures: "none" }}>
        {"applyTwice f x = f (f x)"}
      </At>
      <AuthorBlock />
    </Slide>
  );
};

/* Epigraph: the same sum of squares, once by overwriting state and once by building new values. */
const PANEL = { y: 320, h: 380, w: 820 };
const LEFT_X = 112;
const RIGHT_X = 1920 - 112 - PANEL.w;
const ITER = (i: number) => 40 + i * 44;
const TOTALS = [0, 1, 5, 14];

const Panel: React.FC<{ x: number; p: number; color: string; title: string; children: React.ReactNode }> = ({ x, p, color, title, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: PANEL.y,
      width: PANEL.w,
      height: PANEL.h,
      borderRadius: 20,
      background: C.panel,
      border: `3px solid ${color}`,
      boxSizing: "border-box",
      opacity: clamp01(p),
      transform: `translateY(${(1 - p) * 24}px)`,
    }}
  >
    <div style={{ position: "absolute", left: 32, top: 22, fontFamily: F.body, fontWeight: 800, fontSize: 28, color }}>{title}</div>
    {children}
  </div>
);

const ImperativePanel: React.FC = () => {
  const { s, t } = useSteps();
  const f = t(0);
  const iter = [0, 1, 2].filter((i) => f >= ITER(i)).length - 1;
  const updated = [0, 1, 2].filter((i) => f >= ITER(i) + 22).length;
  const line = (text: string, i: number, active: boolean) => (
    <div
      key={i}
      style={{
        whiteSpace: "pre",
        borderRadius: 8,
        background: active ? "rgba(178,95,168,0.22)" : "transparent",
        padding: "0 8px",
        marginLeft: -8,
      }}
    >
      {text}
    </div>
  );
  return (
    <Panel x={LEFT_X} p={s(0, 6, POP)} color={C.pink} title="імперативно: змінюємо стан">
      <div style={{ position: "absolute", left: 32, top: 78, fontFamily: F.mono, fontWeight: 600, fontSize: 30, lineHeight: "46px", color: C.text, fontVariantLigatures: "none" }}>
        {line("total = 0", 0, false)}
        {line(iter >= 0 ? `for x in [1, 2, 3]:      x = ${iter + 1}` : "for x in [1, 2, 3]:", 1, false)}
        {line("    total = total + x * x", 2, iter >= 0 && f < ITER(2) + 30)}
      </div>
      <div style={{ position: "absolute", left: 32, top: 248, fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.dim }}>total</div>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 232,
          width: 110,
          height: 64,
          borderRadius: 12,
          border: `3px solid ${C.pink}`,
          background: "rgba(178,95,168,0.16)",
          color: C.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 34,
          boxShadow: updated > 0 ? `0 0 ${24 * (1 - s(0, ITER(updated - 1) + 34))}px ${C.pink}` : undefined,
        }}
      >
        {TOTALS[updated]}
      </div>
      {TOTALS.slice(0, updated).map((v, i) => {
        const p = s(0, ITER(i) + 22);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 300 + i * 90,
              top: 244,
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 30,
              color: C.faint,
              textDecoration: "line-through",
              textDecorationColor: C.red,
              opacity: 0.85 * clamp01(p),
              transform: `translateX(${(1 - p) * -60}px)`,
            }}
          >
            {v}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 32, top: 316, fontFamily: F.body, fontSize: 26, color: C.dim, opacity: clamp01(s(0, ITER(2) + 40)) }}>
        попередні значення total перезаписано
      </div>
    </Panel>
  );
};

const FunctionalPanel: React.FC = () => {
  const { s } = useSteps();
  const R = [44, 96, 152];
  const X0 = 32;
  const P = 74;
  return (
    <Panel x={RIGHT_X} p={s(0, 12, POP)} color={C.mint} title="функційно: будуємо нові значення">
      <div style={{ position: "absolute", left: 32, top: 78, fontFamily: F.mono, fontWeight: 600, fontSize: 30, color: C.mint, whiteSpace: "pre", fontVariantLigatures: "none" }}>
        {"sum (map (^2) [1, 2, 3])"}
      </div>
      {[1, 2, 3].map((v, i) => (
        <Cell key={`a${i}`} x={X0 + i * P} y={232} w={64} h={60} label={v} color={C.lav} appear={s(0, R[0] + i * 4, POP)} />
      ))}
      <Arrow x1={X0 + 3 * P} y1={262} x2={X0 + 3 * P + 60} y2={262} step={0} delay={R[1] - 10} dur={10} color={C.dim} width={3} />
      <div style={{ position: "absolute", left: X0 + 3 * P - 18, top: 196, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.amber, opacity: clamp01(s(0, R[1] - 10)) }}>
        map (^2)
      </div>
      {[1, 4, 9].map((v, i) => (
        <Cell key={`b${i}`} x={X0 + 3 * P + 80 + i * P} y={232} w={64} h={60} label={v} appear={s(0, R[1] + i * 6, POP)} />
      ))}
      <Arrow x1={X0 + 6 * P + 80} y1={262} x2={X0 + 6 * P + 140} y2={262} step={0} delay={R[2] - 10} dur={10} color={C.dim} width={3} />
      <div style={{ position: "absolute", left: X0 + 6 * P + 88, top: 196, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.amber, opacity: clamp01(s(0, R[2] - 10)) }}>
        sum
      </div>
      <Cell x={X0 + 6 * P + 160} y={232} w={80} h={60} label={14} appear={s(0, R[2], POP)} glow={s(0, R[2]) * (1 - s(0, R[2] + 24))} />
      <div style={{ position: "absolute", left: 32, top: 316, fontFamily: F.body, fontSize: 26, color: C.dim, opacity: clamp01(s(0, R[2] + 20)) }}>
        кожен проміжний результат – нове значення
      </div>
    </Panel>
  );
};

const QuoteSlide: React.FC = () => {
  const { s } = useSteps();
  const words = (str: string, base: number, color?: string) =>
    str.split(" ").map((w, i) => {
      const p = s(0, base + i * 5, POP);
      return (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 40}px)`, color }}>
          {w + " "}
        </span>
      );
    });
  return (
    <Slide>
      <div style={{ position: "absolute", left: 110, top: 110, width: 1720, fontFamily: F.head, fontWeight: 800, fontSize: 60, lineHeight: 1.22, color: C.text }}>
        <div>
          {words("A language that doesn't affect", 8)}
          {words("the way you think", 38, C.accentHi)}
        </div>
        <div>{words("about programming, is not worth knowing.", 58)}</div>
      </div>
      <ImperativePanel />
      <FunctionalPanel />
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 740,
          height: 6,
          width: mix(0, 420, s(1, 0)),
          background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
          borderRadius: 3,
        }}
      />
      <At x={110} y={770} w={1700} step={1} delay={6} size={44} weight={600} color={C.text}>
        Мова, яка не змінює вашого способу думати про програмування, не варта того, щоб її знати.
      </At>
      <At x={110} y={900} step={1} delay={24} size={34} weight={400} color={C.dim} font={F.mono}>
        Alan J. Perlis
      </At>
      <At x={110} y={950} w={1600} step={1} delay={36} size={30} weight={400} color={C.dim}>
        «Epigrams on Programming», 1982
      </At>
    </Slide>
  );
};

const AGENDA = [
  "Функція як модель обчислення",
  "Зв’язування, чистота і прозорість посилань",
  "Способи опису функцій у Haskell",
  "Функції як об’єкти першого класу",
  "Функції вищого порядку і функціонали",
  "Анонімні функції, каррування, часткове застосування",
  "Замикання, декомпозиція і композиція",
];

const Agenda: React.FC<{ active?: number }> = ({ active }) => {
  const { s } = useSteps();
  const full = active === undefined;
  const Y0 = 190;
  const GAP = 108;
  const hl = full ? 0 : s(0, 6);
  return (
    <Slide title="План">
      {AGENDA.map((item, i) => {
        const p = full ? s(0, 8 + i * 5, POP) : 1;
        const on = full ? 1 : i === active ? s(0, 10) : 0;
        const dim = full ? 1 : i === active ? 1 : 0.35;
        const isActive = !full && i === active;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 84,
              top: Y0 + i * GAP,
              display: "flex",
              alignItems: "center",
              gap: 34,
              padding: "10px 34px 10px 20px",
              opacity: p * dim,
              transform: `translateX(${(1 - p) * -40}px)`,
            }}
          >
            {isActive && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 14,
                  background: "rgba(141,118,220,0.13)",
                  border: `2px solid rgba(141,118,220,${0.5 * hl})`,
                  clipPath: `inset(0 ${(1 - hl) * 100}% 0 0 round 14px)`,
                }}
              />
            )}
            <div
              style={{
                position: "relative",
                width: 76,
                height: 64,
                borderRadius: 8,
                background: i % 2 ? "#5e5086" : C.pink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: F.body,
                fontWeight: 800,
                fontSize: 40,
                color: C.text,
                flexShrink: 0,
                boxShadow: on ? `0 0 ${30 * on}px rgba(178,95,168,${0.6 * on})` : undefined,
                transform: `scale(${1 + 0.12 * on})`,
              }}
            >
              {i + 1}
            </div>
            <div style={{ position: "relative", fontFamily: F.body, fontSize: 48, fontWeight: on ? 700 : 400, color: C.text, whiteSpace: "nowrap" }}>
              {item}
            </div>
          </div>
        );
      })}
    </Slide>
  );
};

export const introSlides: SlideDef[] = [
  { id: "title", title: "Титул", steps: [110], C: TitleSlide },
  { id: "quote", title: "Епіграф", steps: [240, 120], C: QuoteSlide },
  { id: "agenda", title: "План", steps: [60], C: () => <Agenda /> },
];

export const agendaSlide = (active: number): SlideDef => ({
  id: `agenda-${active + 1}`,
  title: `План ${active + 1}`,
  steps: [40],
  C: () => <Agenda active={active} />,
});
