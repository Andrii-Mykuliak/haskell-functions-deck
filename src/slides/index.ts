import type { SlideDef } from "../deck/steps";
import { agendaSlide, introSlides } from "./intro";
import { a1Slides, a2Slides } from "./a1-model";
import { a3Slides, a4Slides } from "./a2-syntax";
import { a5Slides } from "./a3-hof";
import { a6Slides } from "./a4-lambda";
import { a7Slides, summarySlide } from "./a5-compose";
import { outroSlide } from "./outro";

export const SLIDES: SlideDef[] = [
  ...introSlides,
  ...a1Slides,
  agendaSlide(1),
  ...a2Slides,
  agendaSlide(2),
  ...a3Slides,
  agendaSlide(3),
  ...a4Slides,
  agendaSlide(4),
  ...a5Slides,
  agendaSlide(5),
  ...a6Slides,
  agendaSlide(6),
  ...a7Slides,
  summarySlide,
  outroSlide,
];
