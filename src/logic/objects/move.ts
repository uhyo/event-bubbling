import { bubbleSize } from "../constants";
import { BubbleObject } from "./bubble";
import { Collision } from "./collosions";
import { Position } from "./dimension";

const dragFactor = 0.1;
const waterPressiure = 0.4;

export function moveBubble(
  object: BubbleObject,
  index: number,
  currentBubbles: readonly BubbleObject[],
  collisions: readonly Collision[]
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

  // bubble collisions (up)
  for (let i = index - 1; i >= 0; i--) {
    const b = currentBubbles[i];
    if (oldPosition.y - b.position.y > bubbleSize * 2) {
      continue;
    }
    checkBubbleCollision(b);
  }
  // bubble collisions (down)
  for (let i = index + 1; i < currentBubbles.length; i++) {
    const b = currentBubbles[i];
    if (oldPosition.y - b.position.y > bubbleSize * 2) {
      continue;
    }
    checkBubbleCollision(b);
  }

  return {
    ...object,
    position,
    velocity,
  };

  function checkBubbleCollision(bubble: BubbleObject) {
    const disq = distanceSquare(oldPosition, bubble.position);
    if (disq < bubbleSize ** 2) {
      // hit
      // TODO: nicer calculation
      const arg = Math.atan2(
        oldPosition.y - bubble.position.y,
        oldPosition.x - bubble.position.x
      );
      velocity.x += 0.1 * Math.sqrt(disq) * Math.cos(arg);
      velocity.y += 0.1 * Math.sqrt(disq) * Math.sin(arg);
    }
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
