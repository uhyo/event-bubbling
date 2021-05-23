import { Position, Size } from "./dimension";

export type RectObject = {
  label: string;
  size: Size;
  position: Position;
};

export type CircleObject = {
  label: string;
  radius: number;
  position: Position;
};
