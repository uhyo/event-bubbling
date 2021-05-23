import { ClickableObject } from "./clickable";
import { DisappearingBubbleObject } from "./disappearingBubble";
import { GoalObject } from "./goal";

export type GameObject =
  | ClickableObject
  | GoalObject
  | DisappearingBubbleObject;

export type GameObjectNoId = GameObject extends infer O
  ? O extends any
    ? Omit<O, "id">
    : never
  : never;
