import React from "react";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Chip, Lead, M, Slide } from "../deck/ui";
import { Cell, clamp01 } from "./common";

/* 12 · Анонімна функція */
const S12: React.FC = () => (
  <Slide title="Анонімна функція">
    <Lead>
      <A>Анонімна функція</A>, або λ-функція, – функційне значення, записане без окремого імені; у Haskell вона позначається символом{" "}
      <M>\</M>.
    </Lead>
    <Code
      x={96}
      y={350}
      size={56}
      step={1}
      code={`
        [[-2|square]] x = x * x
        @2+20 \\x -> x * x
      `}
    />
    <At x={760} y={360} w={1060} step={2} delay={4} size={32} weight={400} color={C.dim}>
      прибираємо ім’я – функція лишається тією самою
    </At>
    <At x={760} y={442} w={1060} step={2} delay={30} size={32} weight={400} color={C.dim}>
      <M c={C.amber}>\</M> читається як <M c={C.amber}>λ</M>, <M c={C.amber}>-&gt;</M> відділяє параметр від тіла
    </At>
    <Code
      x={96}
      y={600}
      size={50}
      step={3}
      stagger={14}
      code={`
        (\\x -> x + 1) 5
        = 5 + 1
        = [[3@40|6]]
      `}
    />
    <At x={96} y={860} w={1720} step={4} size={38}>
      Ім’я функції не є частиною самої функції. Його можна не вводити, якщо функція потрібна <A>локально</A>.
    </At>
  </Slide>
);

/* 13 · Каррування */
const FnChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Chip size={36} color={C.text} border={C.accent} bg={C.panel2}>
    {children}
  </Chip>
);

const S13: React.FC = () => {
  const { s } = useSteps();
  const R1 = 470;
  const R2 = 640;
  return (
    <Slide title="Каррування">
      <Lead>
        <A>Каррування</A> – подання функції багатьох аргументів як послідовності функцій одного аргументу.
      </Lead>
      <At x={96} y={320} step={1} size={52} weight={600} font={F.head}>
        A × B → C
      </At>
      <Arrow x1={420} y1={358} x2={540} y2={358} step={1} delay={14} dur={12} color={C.dim} />
      <At x={570} y={320} step={1} delay={20} size={52} weight={600} font={F.head} color={C.accentHi}>
        A → (B → C)
      </At>
      <Code
        x={96}
        y={460}
        size={42}
        step={2}
        code={`
          add :: Int -> Int -> Int
          add x y = x + y
          add = \\x -> (\\y -> x + y)
        `}
      />
      <At x={1060} y={R1} step={3} dir="left" pop>
        <Chip size={36} color={C.lav} border={C.lav}>
          3
        </Chip>
      </At>
      <Arrow x1={1140} y1={R1 + 34} x2={1200} y2={R1 + 34} step={3} delay={8} dur={8} color={C.dim} />
      <At x={1216} y={R1} step={3} delay={10} dir="left" pop>
        <FnChip>add</FnChip>
      </At>
      <Arrow x1={1340} y1={R1 + 34} x2={1400} y2={R1 + 34} step={3} delay={20} dur={8} color={C.dim} />
      <At x={1416} y={R1} step={3} delay={24} dir="left" pop>
        <FnChip>add 3</FnChip>
      </At>
      <At x={1416} y={R1 + 82} step={3} delay={34} size={28} weight={400} color={C.dim} font={F.mono} style={{ fontVariantLigatures: "none" }}>
        {"= \\y -> 3 + y"}
      </At>
      <At x={1060} y={R2} step={4} dir="left" pop>
        <Chip size={36} color={C.lav} border={C.lav}>
          4
        </Chip>
      </At>
      <Arrow x1={1140} y1={R2 + 34} x2={1200} y2={R2 + 34} step={4} delay={8} dur={8} color={C.dim} />
      <At x={1216} y={R2} step={4} delay={10} dir="left" pop>
        <FnChip>add 3</FnChip>
      </At>
      <Arrow x1={1400} y1={R2 + 34} x2={1460} y2={R2 + 34} step={4} delay={20} dur={8} color={C.dim} />
      <Cell x={1480} y={R2 + 2} w={90} label={7} appear={s(4, 24, POP)} glow={s(4, 26) * (1 - s(4, 46))} />
      <At x={1060} y={R2 + 96} w={780} step={4} delay={36} size={28} weight={400} color={C.dim} font={F.mono}>
        {"add 3 4 = (add 3) 4"}
      </At>
      <At x={96} y={850} w={1720} step={5} size={38}>
        Тип <M>Int -&gt; Int -&gt; Int</M> читається як <M c={C.accentHi}>Int -&gt; (Int -&gt; Int)</M>.
      </At>
    </Slide>
  );
};

/* 14 · Часткове застосування */
const SlotBox: React.FC<{ x: number; y: number; name: string; p: number; slots: { label: string; value: number; force: number }[] }> = ({
  x,
  y,
  name,
  p,
  slots,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      padding: "18px 22px",
      borderRadius: 18,
      border: `3px solid ${C.accent}`,
      background: C.panel2,
      display: "flex",
      alignItems: "center",
      gap: 18,
      opacity: clamp01(p),
      transform: `scale(${0.7 + 0.3 * p})`,
      transformOrigin: "left center",
    }}
  >
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 38, color: C.text, marginRight: 6 }}>{name}</div>
    {slots.map((sl, i) => (
      <div key={i} style={{ position: "relative", width: 84, height: 64 }}>
        <Cell x={0} y={0} w={84} label={sl.value} thunkLabel={sl.label} color={C.lav} force={sl.force} />
      </div>
    ))}
  </div>
);

const S14: React.FC = () => {
  const { s } = useSteps();
  return (
    <Slide title="Часткове застосування">
      <Lead>
        <A>Часткове застосування</A> – застосування функції лише до частини її аргументів; результатом є нова функція, яка очікує решту
        аргументів.
      </Lead>
      <Code
        x={96}
        y={350}
        size={50}
        step={1}
        code={`
          add x y = x + y
          add10 = add 10
          @3 add10 7   -- 17
        `}
      />
      <SlotBox
        x={1000}
        y={350}
        name="add"
        p={s(1, 10, POP)}
        slots={[
          { label: "x", value: 10, force: s(2, 6) },
          { label: "y", value: 7, force: 0 },
        ]}
      />
      <Arrow x1={1160} y1={470} x2={1160} y2={540} step={2} delay={18} dur={10} color={C.dim} />
      <SlotBox x={1000} y={560} name="add10" p={s(2, 26, POP)} slots={[{ label: "y", value: 7, force: s(3, 6) }]} />
      <At x={1000} y={680} w={820} step={2} delay={36} size={30} weight={400} color={C.dim}>
        нова функція: чекає лише <M c={C.lav}>y</M>
      </At>
      <Arrow x1={1340} y1={608} x2={1430} y2={608} step={3} delay={16} dur={10} color={C.dim} />
      <Cell x={1450} y={576} w={96} label={17} appear={s(3, 22, POP)} glow={s(3, 24) * (1 - s(3, 44))} />
      <At x={96} y={850} w={1720} step={4} size={38}>
        Оскільки <M>add 10</M> уже повертає функцію, це не «незавершений виклик», а повноцінне <A>функційне значення</A>.
      </At>
    </Slide>
  );
};

export const a6Slides: SlideDef[] = [
  { id: "lambda", title: "Анонімна функція", steps: [40, 50, 70, 70, 55], C: S12 },
  { id: "currying", title: "Каррування", steps: [40, 55, 55, 60, 70, 55], C: S13 },
  { id: "partial", title: "Часткове застосування", steps: [40, 50, 70, 60, 55], C: S14 },
];
