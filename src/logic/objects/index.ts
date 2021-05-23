import { BubbleObject } from "./bubble";
import { ClickableObject } from "./clickable";
import { GoalObject } from "./goal";

export type GameObject = ClickableObject | GoalObject | BubbleObject;

export type GameObjectNoId = GameObject extends infer O
  ? O extends any
    ? Omit<O, "id">
    : never
  : never;

export function isBubble(object: GameObject): object is BubbleObject {
  return object.type === "bubble";
}
