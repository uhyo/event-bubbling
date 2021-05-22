import { Position } from "../logic/objects/dimension";

export function getLocalEventPosition(
  e: React.MouseEvent<HTMLElement>
): Position {
  const domRect = e.currentTarget.getBoundingClientRect();
  return {
    x: e.clientX - domRect.left,
    y: e.clientY - domRect.top,
  };
}
