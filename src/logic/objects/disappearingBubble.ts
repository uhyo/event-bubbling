import { Position } from "./dimension";

export type DisappearingBubbleObject = {
  type: "disappearingBubble";
  id: string;
  label: string;
  position: Position;
};
