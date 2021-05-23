import { CircleObject } from "./base";
import { Velocity } from "./dimension";

export type BubbleObject = CircleObject & {
  type: "bubble";
  id: string;
  velocity: Velocity;
};
