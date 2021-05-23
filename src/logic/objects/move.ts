import { bubbleSize } from "../constants";
import { BubbleObject } from "./bubble";

export function moveBubble(object: BubbleObject): BubbleObject | undefined {
  const position = {
    x: object.position.x + object.velocity.x,
    y: object.position.y + object.velocity.y,
  };
  if (position.y < -bubbleSize) {
    return undefined;
  }
  return {
    ...object,
    position,
    velocity: {
      // drag
      x:
        object.velocity.x +
        -0.25 * Math.sign(object.velocity.x) * object.velocity.x ** 2,
      // water pressure + drag
      y:
        object.velocity.y -
        1 +
        -0.25 * Math.sign(object.velocity.y) * object.velocity.y ** 2,
    },
  };
}
