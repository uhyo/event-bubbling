import { GameObject } from ".";
import { assertNever } from "../../util/assertNever";
import { Position, Size } from "./dimension";
import { GameEvents, GameEventType } from "./gameEvent";

export type Collision = {
  position: Position;
  size: Size;
  onCollide: (bubbleIndex: number) => void;
};

export type GameEventReceiver = <Type extends GameEventType>(
  eventType: Type,
  payload: GameEvents[GameEventType]
) => void;

export function getCollisionOfObject(
  object: GameObject,
  eventReceiver: GameEventReceiver
): Collision | undefined {
  switch (object.type) {
    case "clickable": {
      return undefined;
    }
    case "goal": {
      return {
        position: object.position,
        size: object.size,
        onCollide(bubbleIndex) {
          eventReceiver("goal", { bubbleIndex });
        },
      };
    }
    case "disappearingBubble": {
      return undefined;
    }
    case "rectWall": {
      return {
        position: object.position,
        size: object.size,
        onCollide(bubbleIndex) {
          eventReceiver("wallHit", { bubbleIndex });
        },
      };
    }
    default: {
      assertNever(object);
    }
  }
}
