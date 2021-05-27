import { RectObject } from "./base";

export type ShareButtonObject = RectObject & {
  id: string;
  type: "shareButton";
};
