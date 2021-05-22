import { RectObject } from "./base";

export type GoalObject = RectObject & {
  type: "goal";
  id: string;
};
