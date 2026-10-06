import React from "react";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Lead, M, Slide } from "../deck/ui";
import { Card, clamp01, Num } from "./common";

/* 10 · Функція вищого порядку */
const S10: React.FC = () => (
  <Slide title="Функція вищого порядку">
    <Lead>
      <A>Функція вищого порядку</A> – функція, яка приймає іншу функцію як аргумент та/або повертає функцію як результат.
    </Lead>
    <Code
      x={96}
      y={340}
      size={46}
      step={1}
      code={`
        applyTwice :: [[2|(a -> a)]] -> a -> a
        applyTwice f x = f (f x)

        double x = x * 2
      `}
    />
    <At x={1160} y={345} w={700} step={2} size={36} weight={600}>
      <M c={C.amber}>(a -&gt; a)</M> – аргумент сам є функцією
    </At>
    <Code
      x={1160}
      y={470}
      size={44}
      step={3}
      code={`
        @3 applyTwice double 3
        @4 = double (double 3)
        @5 = double 6
        @6 = [[6|12]]
      `}
    />
    <At x={96} y={860} w={1720} step={7} size={40}>
      Параметр <M>f</M> є не числом, а <A>операцією</A>. Загальна схема обчислення відокремлена від конкретної дії.
    </At>
  </Slide>
);

/* 11 · Функціонали і функційні значення */
type Shape = "fn" | "val";
const KINDS: { title: string; sig: string; from: Shape; to: Shape; code: string; ex: string }[] = [
  { title: "Функціонал", sig: "функція → звичайне значення", from: "fn", to: "val", code: "applyTo3 f = f 3", ex: "applyTo3 (* 2)   -- 6" },
  {
    title: "Функціонал з функційним значенням",
    sig: "функція → функція",
    from: "fn",
    to: "fn",
    code: "makeTwice f = \\x -> f (f x)",
    ex: "makeTwice (+ 1) 5   -- 7",
  },
  {
    title: "Функція з функційним значенням",
    sig: "звичайні дані → функція",
    from: "val",
    to: "fn",
    code: "makeShift k = \\x -> x + k",
    ex: "makeShift 3 10   -- 13",
  },
];

const ShapeBox: React.FC<{ x: number; y: number; kind: Shape; p: number }> = ({ x, y, kind, p }) => {
  const fn = kind === "fn";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 96,
        height: 72,
        borderRadius: fn ? 36 : 12,
        border: `3px solid ${fn ? C.accentHi : C.mint}`,
        background: fn ? "rgba(141,118,220,0.18)" : "rgba(134,224,168,0.16)",
        color: fn ? C.accentHi : C.mint,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: fn ? 40 : 34,
        opacity: clamp01(p),
        transform: `scale(${0.6 + 0.4 * p})`,
        boxSizing: "border-box",
      }}
    >
      {fn ? "λ" : "5"}
    </div>
  );
};

const KindCard: React.FC<{ i: number }> = ({ i }) => {
  const { s } = useSteps();
  const k = KINDS[i];
  const step = i + 1;
  const p = s(step, 0, POP);
  return (
    <Card x={96 + i * 600} y={336} w={560} h={556} p={p}>
      <Num n={i + 1} size={52} />
      <div style={{ marginTop: 18, fontFamily: F.head, fontWeight: 600, fontSize: 34, lineHeight: 1.2, height: 82 }}>{k.title}</div>
      <div style={{ marginTop: 6, fontFamily: F.body, fontSize: 28, color: C.dim }}>{k.sig}</div>
      <ShapeBox x={40} y={290} kind={k.from} p={s(step, 12, POP)} />
      <Arrow x1={150} y1={326} x2={250} y2={326} step={step} delay={20} dur={10} color={C.dim} />
      <ShapeBox x={270} y={290} kind={k.to} p={s(step, 28, POP)} />
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 410,
          fontFamily: F.mono,
          fontWeight: 600,
          fontSize: 27,
          lineHeight: "42px",
          whiteSpace: "pre",
          fontVariantLigatures: "none",
          opacity: clamp01(s(step, 34)),
        }}
      >
        <div style={{ color: C.mint }}>{k.code}</div>
        <div style={{ color: C.dim, marginTop: 10 }}>{k.ex}</div>
      </div>
    </Card>
  );
};

const S11: React.FC = () => (
  <Slide title="Функціонали і функційні значення">
    <Lead>
      Класифікація уточнює, де саме з’являється <A>функційне значення</A>: серед аргументів, у результаті або в обох місцях.
    </Lead>
    {KINDS.map((_, i) => (
      <KindCard key={i} i={i} />
    ))}
    <At x={96} y={918} w={1720} step={4} size={30} weight={400} color={C.dim}>
      <span style={{ color: C.accentHi, fontFamily: F.mono, fontWeight: 700 }}>λ</span> – функція,{" "}
      <span style={{ color: C.mint, fontFamily: F.mono, fontWeight: 700 }}>5</span> – звичайне значення
    </At>
  </Slide>
);

export const a5Slides: SlideDef[] = [
  { id: "hof", title: "Функція вищого порядку", steps: [40, 55, 45, 30, 30, 30, 35, 55], C: S10 },
  { id: "functionals", title: "Функціонали", steps: [40, 60, 60, 60, 45], C: S11 },
];
