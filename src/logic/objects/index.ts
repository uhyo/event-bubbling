import { ClickableObject } from "./clickable";
import { DisappearingBubbleObject } from "./disappearingBubble";
import { FlowAreaObject } from "./flowArea";
import { GoalObject } from "./goal";
import { LauncherObject } from "./launcher";
import { PointerMoveObject } from "./pointerMove";
import { RectWallObject } from "./rectWall";

export type GameObject =
  | RectWallObject
  | ClickableObject
  | PointerMoveObject
  | LauncherObject
  | FlowAreaObject
  | GoalObject
  | DisappearingBubbleObject;

export type GameObjectNoId = GameObject extends infer O
  ? O extends any
    ? Omit<O, "id">
    : never
  : never;
