import { Position, Velocity } from "./dimension";

export type BubbleObject = {
  type: "bubble";
  id: string;
  label: string;
  position: Position;
  velocity: Velocity;
};
