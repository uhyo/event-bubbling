import { Position, Size, Velocity } from "./dimension";

export type FlowAreaObject = {
  type: "flowArea";
  id: string;
  position: Position;
  size: Size;
  flow: Velocity;
};
