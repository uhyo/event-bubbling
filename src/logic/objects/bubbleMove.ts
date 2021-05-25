import { SortedArray } from "../../util/sortedArray";
import { bubbleSize } from "../constants";
import { BubbleObject } from "./bubble";
import { Collision } from "./collosions";
import { Position, Velocity } from "./dimension";

const dragFactor = 0.03;
const waterPressiure = 0.3;
const bounceFactor = 0.03;

export function moveBubble(
  object: BubbleObject,
  index: number,
  currentBubbles: readonly BubbleObject[]
): BubbleObject | undefined {
  const oldPosition = object.position;
  const position = {
    x: object.position.x + object.velocity.x,
    y: object.position.y + object.velocity.y,
  };
  if (position.y < -bubbleSize) {
    return undefined;
  }
  const velocity = {
    // drag
    x:
      object.velocity.x +
      -dragFactor * Math.sign(object.velocity.x) * object.velocity.x ** 2,
    // water pressure + drag
    y:
      object.velocity.y -
      waterPressiure +
      -dragFactor * Math.sign(object.velocity.y) * object.velocity.y ** 2,
  };

  return {
    ...object,
    position,
    velocity,
  };
}

export function checkBubbleCollision(bubbles: SortedArray<BubbleObject>) {
  const appliedVelocities: Velocity[] = bubbles.map(() => ({ x: 0, y: 0 }));

  const snapshot = bubbles.snapshot();
  for (const [index, bubble] of snapshot.entries()) {
    for (let i = index + 1; i < snapshot.length; i++) {
      const wBubble = snapshot[i];
      if (bubble.position.y < wBubble.position.y - bubbleSize * 2) {
        break;
      }

      const disq = distanceSquare(bubble.position, wBubble.position);
      if (disq < bubbleSize ** 2) {
        // hit
        const arg = Math.atan2(
          bubble.position.y - wBubble.position.y,
          bubble.position.x - wBubble.position.x
        );
        const forceX = bounceFactor * Math.sqrt(disq) * Math.cos(arg);
        const forceY = bounceFactor * Math.sqrt(disq) * Math.sin(arg);
        appliedVelocities[index].x += forceX;
        appliedVelocities[index].y += forceY;
        appliedVelocities[i].x -= forceX;
        appliedVelocities[i].y -= forceY;
      }
    }
  }

  for (const [index, vel] of appliedVelocities.entries()) {
    // note: we mutate object in SortedArray because we know this does not change sorted order
    snapshot[index].velocity.x += vel.x;
    snapshot[index].velocity.y += vel.y;
  }
}

export function checkObjectCollision(
  bubble: BubbleObject,
  index: number,
  collision: Collision
) {
  const xdist = Math.abs(collision.position.x - bubble.position.x);
  const ydist = Math.abs(collision.position.y - bubble.position.y);
  if (xdist <= collision.size.width / 2 && ydist <= collision.size.height / 2) {
    // collision
    collision.onCollide(index);
  }
}

function distanceSquare(bubble1: Position, bubble2: Position): number {
  return (bubble1.x - bubble2.x) ** 2 + (bubble1.y - bubble2.y) ** 2;
}
