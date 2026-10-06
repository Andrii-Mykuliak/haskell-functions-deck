import React from "react";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Chip, HaskellLogo, Lead, M, Slide } from "../deck/ui";
import { Cell, clamp01 } from "./common";

/* 15 · Замикання */
const S15: React.FC = () => {
  const { s } = useSteps();
  const BX = 1040;
  const BY = 350;
  const box = s(2, 0, POP);
  const env = s(2, 20, POP);
  return (
    <Slide title="Замикання">
      <Lead>
        <A>Замикання</A> – функційне значення разом із лексичним оточенням, яке зберігає потрібні захоплені зв’язування.
      </Lead>
      <Code
        x={96}
        y={350}
        size={46}
        step={1}
        code={`
          makeShift k = \\x -> x + k
          shiftBy3 = makeShift 3
          @3 shiftBy3 10   -- 13
        `}
      />
      <div
        style={{
          position: "absolute",
          left: BX,
          top: BY,
          width: 520,
          padding: "22px 28px",
          borderRadius: 20,
          border: `3px solid ${C.accent}`,
          background: C.panel,
          opacity: clamp01(box),
          transform: `translateY(${(1 - box) * 30}px)`,
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontFamily: F.body, fontWeight: 800, fontSize: 28, color: C.accentHi }}>shiftBy3</div>
        <div style={{ marginTop: 12, fontFamily: F.mono, fontWeight: 700, fontSize: 40, color: C.mint, whiteSpace: "pre", fontVariantLigatures: "none" }}>
          {"\\x -> x + "}
          <span style={{ color: C.amber }}>k</span>
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
        <line x1={BX + 300} y1={BY + 150} x2={BX + 300} y2={BY + 200} stroke={C.amber} strokeWidth={3} strokeDasharray="6 6" opacity={clamp01(env)} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: BX + 200,
          top: BY + 204,
          opacity: clamp01(env),
          transform: `scale(${0.7 + 0.3 * env})`,
        }}
      >
        <Chip size={34} color={C.amber} border={C.amber}>
          {"оточення: k = 3"}
        </Chip>
      </div>
      <At x={BX} y={BY + 290} w={800} step={3} size={30} weight={400} color={C.dim}>
        виклик <M>shiftBy3 10</M>:
        <br />
        <M c={C.lav}>x = 10</M> з аргументу, <M c={C.amber}>k = 3</M> з оточення
      </At>
      <Code x={BX} y={BY + 390} size={42} step={3} delay={20} stagger={14} code={`10 + 3\n= [[3@40|13]]`} />
      <At x={96} y={900} w={1720} step={4} size={38}>
        Повернена функція використовує <M c={C.lav}>x</M> як власний параметр і <M c={C.amber}>k</M> як <A>захоплене значення</A> з
        оточення.
      </At>
    </Slide>
  );
};

/* 16 · Функційна декомпозиція */
const S16: React.FC = () => {
  const { s } = useSteps();
  const Y = 640;
  const frame = s(2, 0, POP);
  return (
    <Slide title="Функційна декомпозиція">
      <Lead>
        <A>Функційна декомпозиція</A> – побудова складного обчислення з малих функцій, кожна з яких має чіткі аргументи, результат і
        відповідальність.
      </Lead>
      <Code
        x={96}
        y={330}
        size={44}
        step={1}
        stagger={8}
        code={`
          scale k x = k * x
          shift b x = x + b
          calibrate k b x = shift b (scale k x)
        `}
      />
      <div
        style={{
          position: "absolute",
          left: 330,
          top: Y - 64,
          width: 800,
          height: 196,
          borderRadius: 22,
          border: `3px dashed ${C.accent}`,
          opacity: clamp01(frame),
          boxSizing: "border-box",
        }}
      />
      <At x={354} y={Y - 52} step={2} delay={4} size={28} weight={700} color={C.accentHi} font={F.mono}>
        calibrate 2 1
      </At>
      <At x={96} y={Y + 8} step={2} delay={10} dir="left" pop>
        <Chip size={38} color={C.lav} border={C.lav}>
          5
        </Chip>
      </At>
      <Arrow x1={180} y1={Y + 44} x2={370} y2={Y + 44} step={2} delay={16} dur={12} color={C.dim} />
      <At x={390} y={Y + 8} step={2} delay={24} dir="left" pop>
        <Chip size={38} color={C.text} border={C.accent} bg={C.panel2}>
          scale 2
        </Chip>
      </At>
      <Arrow x1={620} y1={Y + 44} x2={700} y2={Y + 44} step={2} delay={34} dur={10} color={C.dim} />
      <Cell x={716} y={Y + 12} w={84} label={10} color={C.amber} appear={s(2, 40, POP)} />
      <Arrow x1={816} y1={Y + 44} x2={880} y2={Y + 44} step={2} delay={48} dur={10} color={C.dim} />
      <At x={896} y={Y + 8} step={2} delay={54} dir="left" pop>
        <Chip size={38} color={C.text} border={C.accent} bg={C.panel2}>
          shift 1
        </Chip>
      </At>
      <Arrow x1={1110} y1={Y + 44} x2={1250} y2={Y + 44} step={2} delay={64} dur={12} color={C.dim} />
      <Cell x={1270} y={Y + 12} w={90} label={11} appear={s(2, 72, POP)} glow={s(2, 74) * (1 - s(2, 96))} />
      <At x={1400} y={Y + 18} w={460} step={2} delay={80} size={28} weight={400} color={C.dim} font={F.mono}>
        {"shift 1 (scale 2 5)"}
      </At>
      <At x={96} y={880} w={1720} step={3} size={38}>
        Складне перетворення розкладається на <A>прості, перевірювані</A> частини.
      </At>
    </Slide>
  );
};

/* 17 · Композиція функцій */
const PIPE: { x: number; label: string; kind: "val" | "fn"; color: string }[] = [
  { x: 96, label: "3", kind: "val", color: C.lav },
  { x: 270, label: "square", kind: "fn", color: C.text },
  { x: 566, label: "9", kind: "val", color: C.amber },
  { x: 742, label: "double", kind: "fn", color: C.text },
  { x: 1038, label: "18", kind: "val", color: C.mint },
];
const PIPE_ARROWS = [180, 476, 652, 948];

const S17: React.FC = () => {
  const PY = 640;
  return (
    <Slide title="Композиція функцій">
      <Lead>
        <A>Композиція</A> створює нову функцію: результат однієї функції стає аргументом іншої. У Haskell це записується оператором{" "}
        <M>(.)</M>
      </Lead>
      <At x={96} y={316} step={1} size={72} weight={600} font={F.head}>
        (g ∘ f)(x) = g(f(x))
      </At>
      <Code
        x={96}
        y={450}
        size={44}
        step={2}
        stagger={10}
        code={`
          squareThenDouble x = double (square x)
          squareThenDouble = double . square
        `}
      />
      {PIPE.map((n, i) => (
        <At key={i} x={n.x} y={PY} step={3} delay={8 + i * 12} dir="left" pop>
          {n.kind === "fn" ? (
            <Chip size={40} color={C.text} border={C.accent} bg={C.panel2}>
              {n.label}
            </Chip>
          ) : (
            <Chip size={40} color={n.color} border={n.color}>
              {n.label}
            </Chip>
          )}
        </At>
      ))}
      {PIPE_ARROWS.map((x, i) => (
        <Arrow key={i} x1={x} y1={PY + 36} x2={x + 70} y2={PY + 36} step={3} delay={14 + i * 12} dur={10} color={C.dim} />
      ))}
      <At x={96} y={790} w={1720} step={4} size={36}>
        Оператор <M>(.)</M> створює нову функцію, а оператор <M>($)</M> лише застосовує функцію до конкретного значення.
      </At>
      <Code
        x={96}
        y={880}
        size={38}
        step={4}
        delay={16}
        stagger={10}
        code={`
          double . square      -- нова функція
          double $ square 3    -- значення 18
        `}
      />
    </Slide>
  );
};

/* 18 · Підсумок */
const POINTS = [
  "функційна програма описує залежності між значеннями",
  "чистота і прозорість посилань дозволяють міркувати рівняннями",
  "функції першого класу роблять операції звичайними значеннями",
  "каррування, часткове застосування і замикання пояснюють побудову нових функцій",
  "композиція і декомпозиція формують структуру функційної програми",
];

const S18: React.FC = () => {
  const { s } = useSteps();
  return (
    <Slide>
      <div style={{ position: "absolute", right: 90, top: 90, opacity: 0.25 * s(0, 10) }}>
        <HaskellLogo size={420} p1={s(0, 4, POP)} p2={s(0, 10, POP)} p3={s(0, 16, POP)} />
      </div>
      <At x={130} y={180} step={0} delay={4} size={80} weight={800} font={F.head}>
        Підсумок
      </At>
      {POINTS.map((p, i) => (
        <At key={i} x={170} y={350 + i * 104} w={1680} step={0} delay={18 + i * 9} size={38} weight={600}>
          <A c={C.pink}>•</A> {p}
        </At>
      ))}
    </Slide>
  );
};

export const a7Slides: SlideDef[] = [
  { id: "closure", title: "Замикання", steps: [40, 50, 60, 80, 55], C: S15 },
  { id: "decomposition", title: "Декомпозиція", steps: [40, 55, 120, 55], C: S16 },
  { id: "composition", title: "Композиція", steps: [40, 50, 50, 90, 70], C: S17 },
];
export const summarySlide: SlideDef = { id: "summary", title: "Підсумок", steps: [100], C: S18 };
