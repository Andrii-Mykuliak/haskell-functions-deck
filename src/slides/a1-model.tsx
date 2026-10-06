import React from "react";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Chip, Lead, M, Mark, Slide } from "../deck/ui";
import { Cell, clamp01 } from "./common";

/* 3 · Функція як модель обчислення */
const DOMAIN = [-2, -1, 0, 1, 2];
const RANGE: Record<number, number> = { 0: 530, 1: 600, 4: 670 };
const AX = 300;
const BX = 760;
const ay = (i: number) => 470 + i * 65;

const MappingDiagram: React.FC = () => {
  const { s } = useSteps();
  const p = s(1, 0, POP);
  return (
    <>
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", opacity: clamp01(p) }}>
        <ellipse cx={AX} cy={600} rx={140} ry={205} fill="rgba(196,181,253,0.06)" stroke={C.lav} strokeWidth={3} />
        <ellipse cx={BX} cy={600} rx={110} ry={150} fill="rgba(134,224,168,0.06)" stroke={C.mint} strokeWidth={3} />
        <text x={AX} y={370} fill={C.lav} fontFamily={F.head} fontWeight={600} fontSize={40} textAnchor="middle">
          A
        </text>
        <text x={BX} y={425} fill={C.mint} fontFamily={F.head} fontWeight={600} fontSize={40} textAnchor="middle">
          B
        </text>
      </svg>
      {DOMAIN.map((v, i) => (
        <At key={`a${i}`} x={AX - 40} y={ay(i) - 24} w={80} step={1} delay={8 + i * 4} size={36} font={F.mono} color={C.lav} align="center" pop dir="scale">
          {v}
        </At>
      ))}
      {Object.entries(RANGE).map(([v, y], i) => (
        <At key={`b${v}`} x={BX - 40} y={y - 24} w={80} step={1} delay={14 + i * 4} size={36} font={F.mono} color={C.mint} align="center" pop dir="scale">
          {v}
        </At>
      ))}
      {DOMAIN.map((v, i) => (
        <Arrow key={`e${i}`} x1={AX + 40} y1={ay(i)} x2={BX - 46} y2={RANGE[v * v]} step={1} delay={30 + i * 8} dur={12} color={C.amber} width={3} />
      ))}
      <At x={AX + 120} y={392} step={1} delay={26} size={32} font={F.mono} color={C.amber}>
        square
      </At>
    </>
  );
};

const S03: React.FC = () => (
  <Slide title="Функція як модель обчислення">
    <Lead>
      Функційне програмування описує обчислення як побудову значень за допомогою функцій, тобто як систему залежностей між аргументами та
      результатами.
    </Lead>
    <At x={1080} y={330} step={1} size={56} weight={600} font={F.head}>
      f : A → B
    </At>
    <MappingDiagram />
    <At x={96} y={830} w={900} step={1} delay={80} size={30} weight={400} color={C.dim}>
      кожному допустимому значенню з A відповідає <A>єдине</A> значення з B
    </At>
    <Code
      x={1080}
      y={460}
      size={52}
      step={2}
      code={`
        square x = x * x
        @2+20 square 5   -- 25
      `}
    />
    <At x={1080} y={680} w={760} step={3} size={38}>
      Результат визначається <A>аргументом</A>, а не попередньою історією стану.
    </At>
  </Slide>
);

/* 4 · Зв’язування і незмінність */
const BindRow: React.FC<{ y: number; name: string; value: string; step: number; delay?: number }> = ({ y, name, value, step, delay = 0 }) => (
  <>
    <At x={1060} y={y} step={step} delay={delay} dir="left" pop>
      <Chip size={36} color={C.lav} border={C.lav}>
        {name}
      </Chip>
    </At>
    <Arrow x1={1290} y1={y + 34} x2={1380} y2={y + 34} step={step} delay={delay + 10} dur={10} color={C.dim} />
    <At x={1400} y={y} step={step} delay={delay + 16} dir="left" pop>
      <Chip size={36}>{value}</Chip>
    </At>
  </>
);

const S04: React.FC = () => (
  <Slide title="Зв’язування і незмінність">
    <Lead>
      <A>Зв’язування</A> – встановлення відповідності між іменем та значенням. У Haskell знак <M>=</M> задає рівняння або визначення, а не
      операцію зміни пам’яті.
    </Lead>
    <Code
      x={96}
      y={350}
      size={48}
      step={1}
      code={`
        taxRate = 0.2
        square x = x * x
      `}
    />
    <BindRow y={346} name="taxRate" value="0.2" step={1} delay={10} />
    <BindRow y={436} name="square" value="\x -> x * x" step={1} delay={24} />
    <Code x={96} y={560} size={44} step={2} code={`[[!2|taxRate = 0.3]]`} />
    <At x={560} y={566} w={1260} step={2} delay={14} size={32} weight={400} color={C.dim}>
      <M c={C.red}>Multiple declarations of ‘taxRate’</M>: ім’я в модулі зв’язується один раз
    </At>
    <Code x={96} y={680} size={44} step={3} code={`x = x + 1`} />
    <At x={560} y={686} w={1260} step={3} delay={14} size={32} weight={400} color={C.dim}>
      не «збільшити x», а рівняння без розв’язку: обчислення <M>x</M> не завершиться
    </At>
    <At x={96} y={850} w={1720} step={4} size={40}>
      Зв’язане з іменем значення не змінюється: це і є <A>незмінність</A>.
    </At>
  </Slide>
);

/* 5 · Чиста функція */
const CALL_Y = [570, 650, 730];

const S05: React.FC = () => {
  const { s } = useSteps();
  return (
    <Slide title="Чиста функція">
      <Lead>
        <A>Чиста функція</A> повертає результат, що визначається лише її аргументами, і не має спостережуваних побічних ефектів.
      </Lead>
      <At x={96} y={330} step={1} size={30} weight={700} color={C.mint}>
        чиста функція
      </At>
      <Code x={96} y={380} size={40} step={1} delay={6} code={`square x = x * x`} />
      {CALL_Y.map((y, i) => (
        <React.Fragment key={i}>
          <Code x={96} y={y} size={40} step={1} delay={20 + i * 14} code={`square 5`} />
          <Arrow x1={330} y1={y + 30} x2={410} y2={y + 30} step={1} delay={26 + i * 14} dur={8} color={C.dim} width={3} />
          <Cell x={430} y={y} w={90} label={25} appear={s(1, 30 + i * 14, POP)} />
          <Mark ok step={1} delay={38 + i * 14} x={545} y={y + 8} size={44} />
        </React.Fragment>
      ))}
      <At x={1000} y={330} step={2} size={30} weight={700} color={C.pink}>
        нечиста (псевдокод зі станом)
      </At>
      <Code
        x={1000}
        y={380}
        size={30}
        step={2}
        delay={6}
        stagger={4}
        code={`
          counter = 0
          next():
            counter = counter + 1
            return counter
        `}
      />
      {CALL_Y.map((y, i) => (
        <React.Fragment key={i}>
          <Code x={1000} y={y} size={40} step={2} delay={24 + i * 14} code={`next()`} />
          <Arrow x1={1190} y1={y + 30} x2={1270} y2={y + 30} step={2} delay={30 + i * 14} dur={8} color={C.dim} width={3} />
          <Cell x={1290} y={y} w={90} label={i + 1} color={C.pink} appear={s(2, 34 + i * 14, POP)} />
          {i > 0 && <Mark ok={false} step={2} delay={42 + i * 14} x={1405} y={y + 8} size={44} />}
        </React.Fragment>
      ))}
      <At x={96} y={850} w={1720} step={3} size={38}>
        Однаковий аргумент завжди дає однаковий результат. Функція не читає <A>прихований стан</A> і не змінює зовнішній світ.
      </At>
    </Slide>
  );
};

/* 6 · Прозорість посилань */
const S06: React.FC = () => (
  <Slide title="Прозорість посилань">
    <Lead>
      <A>Прозорість посилань</A> означає, що вираз можна замінити його значенням без зміни спостережуваної поведінки програми.
    </Lead>
    <At x={96} y={330} step={1} size={60} weight={600} font={F.head}>
      square 5 ≡ 25
    </At>
    <Code
      x={96}
      y={470}
      size={56}
      step={2}
      code={`
        @2 2 + [[3|square 5]]
        @3 = 2 + [[3@14|25]]
        @4 = [[4|27]]
      `}
    />
    <At x={900} y={560} w={900} step={3} delay={20} size={34} weight={400} color={C.dim}>
      підставили значення замість виразу – результат той самий
    </At>
    <At x={96} y={820} w={1720} step={5} size={40}>
      Це основа міркування: програмні вирази можна аналізувати як <A>математичні рівності</A>.
    </At>
  </Slide>
);

export const a1Slides: SlideDef[] = [{ id: "model", title: "Функція як модель обчислення", steps: [40, 110, 60, 55], C: S03 }];
export const a2Slides: SlideDef[] = [
  { id: "binding", title: "Зв’язування", steps: [40, 70, 60, 60, 55], C: S04 },
  { id: "pure", title: "Чиста функція", steps: [40, 90, 90, 55], C: S05 },
  { id: "transparency", title: "Прозорість посилань", steps: [40, 50, 45, 55, 45, 55], C: S06 },
];
