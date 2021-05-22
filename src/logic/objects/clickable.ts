import { RectObject } from "./base";

export type ClickableObject = RectObject & {
  id: string;
  type: "clickable";
};
