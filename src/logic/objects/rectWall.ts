import { Movable, RectObject } from "./base";

export type RectWallObject = RectObject &
  Movable & {
    type: "rectWall";
    id: string;
  };
