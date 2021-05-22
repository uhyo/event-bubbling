import { gameFieldHeight, gameFieldWidth } from "../../../logic/constants";
import { Position } from "../../../logic/objects/dimension";

export function clientPositionToGamePosition(
  wrapper: HTMLElement,
  x: number,
  y: number
): Position {
  const rect = wrapper.getBoundingClientRect();
  const scaleX = rect.width / gameFieldWidth;
  const scaleY = rect.height / gameFieldHeight;
  return {
    x: (x - rect.left) / scaleX,
    y: (y - rect.top) / scaleY,
  };
}
