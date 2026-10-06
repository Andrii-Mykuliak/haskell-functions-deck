import React from "react";
import { C } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Lead, M, Mark, Slide } from "../deck/ui";
import { Cell, Num } from "./common";

const CH = 0.6;

/* 7 · Опис функції в Haskell */
const Note: React.FC<{ cx: number; y: number; step: number; delay?: number; color?: string; children: React.ReactNode }> = ({
  cx,
  y,
  step,
  delay = 0,
  color = C.amber,
  children,
}) => (
  <At x={cx - 200} y={y} w={400} step={step} delay={delay} size={28} weight={600} color={color} align="center">
    ↑ {children}
  </At>
);

const S07: React.FC = () => {
  const SZ = 56;
  const col = (c: number) => 96 + c * CH * SZ;
  return (
    <Slide title="Опис функції в Haskell">
      <Lead>
        Функція у Haskell задається іменем, параметрами та виразом результату. Тіло функції саме є виразом, тому окремий оператор{" "}
        <M>return</M> не потрібний.
      </Lead>
      <Code x={96} y={330} size={SZ} step={1} code={`increment :: Int -> Int`} />
      <Code x={96} y={500} size={SZ} step={1} delay={10} code={`increment x = x + 1`} />
      <Note cx={col(4.5)} y={418} step={2}>
        ім’я
      </Note>
      <Note cx={col(17.5)} y={418} step={2} delay={10}>
        тип: з Int у Int
      </Note>
      <Note cx={col(10.5)} y={588} step={2} delay={22} color={C.lav}>
        параметр
      </Note>
      <Note cx={col(16.5)} y={630} step={2} delay={32} color={C.mint}>
        вираз результату
      </Note>
      <Code
        x={1180}
        y={360}
        size={48}
        step={3}
        stagger={14}
        code={`
          increment 4
          = 4 + 1
          = [[3@40|5]]
        `}
      />
      <At x={1180} y={600} w={640} step={3} delay={10} size={30} weight={400} color={C.dim}>
        аплікація функції до аргументу
      </At>
      <At x={96} y={840} w={1720} step={4} size={38}>
        Сигнатура описує <A>тип</A>. Рівняння описує <A>обчислення</A>. Вираз <M>increment 4</M> є аплікацією функції до аргументу.
      </At>
    </Slide>
  );
};

/* 8 · Еквівалентні записи функції */
const FORMS = ["add10 x = add 10 x", "add10 = add 10", "add10 = \\x -> add 10 x", "add10 = (+) 10"];

const S08: React.FC = () => {
  const { s } = useSteps();
  return (
    <Slide title="Еквівалентні записи функції">
      <Lead>
        <A>Еквівалентні записи функції</A> – це різні синтаксичні форми, які задають те саме відображення аргументів у результат.
      </Lead>
      <Code x={96} y={330} size={34} step={0} delay={20} style={{ color: C.dim }} code={`add x y = x + y`} />
      {FORMS.map((f, i) => {
        const y = 410 + i * 96;
        return (
          <React.Fragment key={i}>
            <Code x={96} y={y} size={44} step={i + 1} code={f} />
            <Code x={1060} y={y} size={40} step={i + 1} delay={12} style={{ color: C.dim }} code={`add10 5`} />
            <Arrow x1={1250} y1={y + 32} x2={1320} y2={y + 32} step={i + 1} delay={18} dur={8} color={C.dim} width={3} />
            <Cell x={1340} y={y} w={90} label={15} appear={s(i + 1, 22, POP)} />
            <Mark ok step={i + 1} delay={30} x={1455} y={y + 8} size={44} />
          </React.Fragment>
        );
      })}
      <At x={96} y={840} w={1720} step={5} size={38}>
        У всіх варіантах <M>add10</M> є функцією <A>одного аргументу</A>, яка додає до нього 10.
      </At>
    </Slide>
  );
};

/* 9 · Функції як об’єкти першого класу */
const FIRST: { text: string; code: string }[] = [
  { text: "зв’язувати функцію з іменем або зберігати як значення", code: "f = square\nfs = [square, (+ 1)]" },
  { text: "передавати функцію як аргумент", code: "applyTwice f x = f (f x)" },
  { text: "повертати функцію як результат", code: "makeShift k = \\x -> x + k" },
  { text: "створювати функцію безпосередньо у виразі", code: "map (\\x -> x * 2) [1, 2, 3]" },
];

const S09: React.FC = () => (
  <Slide title="Функції як об’єкти першого класу">
    <Lead>
      Функція є <A>об’єктом першого класу</A>, якщо мова дозволяє працювати з нею як зі звичайним значенням.
    </Lead>
    {FIRST.map((r, i) => {
      const y = 340 + i * 140;
      return (
        <React.Fragment key={i}>
          <At x={96} y={y} step={i + 1} dir="left" pop>
            <Num n={i + 1} size={52} />
          </At>
          <At x={190} y={y + 4} w={760} step={i + 1} delay={6} size={34} weight={600}>
            {r.text}
          </At>
          <Code x={1000} y={y} size={38} step={i + 1} delay={14} code={r.code} />
        </React.Fragment>
      );
    })}
  </Slide>
);

export const a3Slides: SlideDef[] = [
  { id: "syntax", title: "Опис функції", steps: [40, 50, 60, 70, 55], C: S07 },
  { id: "equivalent", title: "Еквівалентні записи", steps: [45, 55, 55, 55, 55, 55], C: S08 },
];
export const a4Slides: SlideDef[] = [{ id: "first-class", title: "Першокласні функції", steps: [40, 50, 50, 50, 50], C: S09 }];
