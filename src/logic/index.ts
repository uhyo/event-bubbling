import { v4 as uuidv4 } from "uuid";
import { GameEventHandlers } from "../components/Game/GameEventContext";
import { clientPositionToGamePosition } from "../components/Game/logic/convertPosition";
import { isNotNullish } from "../util/isNotNullish";
import { SortedArray } from "../util/sortedArray";
import { bubbleSize, frameInterval, skipThreshold } from "./constants";
import { GameObject, GameObjectNoId } from "./objects";
import { BubbleObject } from "./objects/bubble";
import { GameEventReceiver, getCollisionOfObject } from "./objects/collosions";
import { GameEvents } from "./objects/gameEvent";
import { checkObjectCollision, moveBubble } from "./objects/move";

type GameLogicOptions = {
  container: HTMLElement;
  level: number;
};

const bubbleSortKey = (item: BubbleObject) => item.position.y;

export class GameLogic {
  #container: HTMLElement;
  #lastFrameTime: number | undefined;

  #gameEventReceiver: GameEventReceiver;
  #objects: GameObject[] = [];
  #bubbles: SortedArray<BubbleObject> = new SortedArray(bubbleSortKey, []);

  constructor({ container, level }: GameLogicOptions) {
    this.#container = container;
    this.#gameEventReceiver = this.getGameEventHandlers();
    import(`./levels/${level}`)
      .then(({ default: level }: { default: readonly GameObjectNoId[] }) => {
        this.#objects.length = 0;
        for (const obj of level) {
          this.addObject(obj);
        }
      })
      .catch(console.error);
  }

  public proceedTime(now: number) {
    if (
      this.#lastFrameTime === undefined ||
      this.#lastFrameTime + skipThreshold < now
    ) {
      this.frame();
      this.#lastFrameTime = now;
      return;
    }
    while (this.#lastFrameTime + frameInterval < now) {
      this.frame();
      this.#lastFrameTime += frameInterval;
    }
  }

  private frame() {
    if (this.#bubbles.length === 0) {
      return;
    }
    const currentBubbles = this.#bubbles.snapshot();
    const collisions = this.#objects
      .map((obj) => getCollisionOfObject(obj, this.#gameEventReceiver))
      .filter(isNotNullish);
    this.#bubbles = new SortedArray(
      bubbleSortKey,
      this.#bubbles
        .map((object, index) => {
          return moveBubble(object, index, currentBubbles, collisions);
        })
        .filter(isNotNullish)
    );
    this.#bubbles.forEach((bubble, item) => {
      for (const collision of collisions) {
        checkObjectCollision(bubble, item, collision);
      }
    });
  }

  private getGameEventHandlers(): GameEventReceiver {
    const handlers = {
      goal: ({ bubbleIndex }: GameEvents["goal"]) => {
        // remove bubble
        const bubble = this.#bubbles.at(bubbleIndex);
        this.#bubbles.update(bubbleIndex, {
          ...bubble,
          position: {
            x: 0,
            y: -bubbleSize,
          },
        });
        this.addObject({
          type: "disappearingBubble",
          position: bubble.position,
          label: bubble.label,
        });
      },
    };

    return (type, payload) => {
      handlers[type](payload as never);
    };
  }

  public terminate() {}

  public addObject(object: GameObjectNoId) {
    this.#objects = this.#objects.concat({
      id: uuidv4(),
      ...object,
    });
  }

  public addBubble(object: Omit<BubbleObject, "type" | "id">) {
    this.#bubbles.add({
      type: "bubble",
      id: uuidv4(),
      ...object,
    });
  }

  public removeObject(id: string) {
    this.#objects = this.#objects.filter((object) => {
      return object.id !== id;
    });
  }

  public getObjects(): readonly GameObject[] {
    return this.#objects;
  }

  public getBubbles(): readonly BubbleObject[] {
    return this.#bubbles.snapshot();
  }

  public getHandlers(): GameEventHandlers {
    return {
      domEvent: (eventName, position, velocity) => {
        this.addBubble({
          label: eventName,
          position: clientPositionToGamePosition(
            this.#container,
            position.x,
            position.y
          ),
          velocity,
        });
      },
      removeObject: (id) => {
        this.removeObject(id);
      },
    };
  }
}
