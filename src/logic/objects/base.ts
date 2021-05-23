import { GameObject, GameObjectNoId } from ".";
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

export type Movable = {
  move?: (object: Movable) => GameObject;
  moveMetadata: unknown;
};

export function createMovable<Obj extends GameObjectNoId>(
  object: Obj,
  move: (object: Obj) => Obj
): Obj {
  return {
    ...object,
    move,
  };
}
