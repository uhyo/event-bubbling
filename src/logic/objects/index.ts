import { ClickableObject } from "./clickable";
import { GoalObject } from "./goal";

export type GameObject = ClickableObject | GoalObject;

export type GameObjectNoId = GameObject extends infer O ? Omit<O, "id"> : never;
