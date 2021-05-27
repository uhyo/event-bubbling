import { RectObject } from "./base";

export type PointerMoveObject = RectObject & {
  id: string;
  type: "pointerMove";
};
