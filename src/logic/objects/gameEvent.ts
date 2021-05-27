import { Velocity } from "./dimension";

export type GameEvents = {
  goal: {
    bubbleIndex: number;
  };
  wallHit: {
    bubbleIndex: number;
  };
  forced: {
    bubbleIndex: number;
    velocity: Velocity;
  };
  share: {
    bubbleIndex: number;
  };
};

export type GameEventType = keyof GameEvents;
