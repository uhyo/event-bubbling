import { RectObject } from "./base";
import { Velocity } from "./dimension";

export type BubbleObject = RectObject & {
  type: "bubble";
  id: string;
  velocity: Velocity;
};
