import { Position, Velocity } from "./dimension";

export type LauncherObject = {
  type: "launcher";
  id: string;
  label: string;
  size: number;
  position: Position;
  cycleMs: number;
  intervalMs: number;
  dispatchVelocity: Velocity;
};
