import { ClickableObject } from "./clickable";
import { DisappearingBubbleObject } from "./disappearingBubble";
import { GoalObject } from "./goal";
import { RectWallObject } from "./rectWall";

export type GameObject =
  | RectWallObject
  | ClickableObject
  | GoalObject
  | DisappearingBubbleObject;

export type GameObjectNoId = GameObject extends infer O
  ? O extends any
    ? Omit<O, "id">
    : never
  : never;
