import { v4 as uuidv4 } from "uuid";
import { GameEventHandlers } from "../components/Game/GameEventContext";
import { clientPositionToGamePosition } from "../components/Game/logic/convertPosition";
import { isNotNullish } from "../util/isNotNullish";
import { defaultBubbleSize, frameInterval, skipThreshold } from "./constants";
import { GameObject, GameObjectNoId, isBubble } from "./objects";
import { moveBubble } from "./objects/move";

type GameLogicOptions = {
  container: HTMLElement;
  level: number;
};

export class GameLogic {
  #container: HTMLElement;
  #objects: GameObject[] = [];
  #lastFrameTime: number | undefined;
  constructor({ container, level }: GameLogicOptions) {
    this.#container = container;
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
    let changed = false;
    const newObjects = this.#objects
      .map((object) => {
        if (isBubble(object)) {
          changed = true;
          return moveBubble(object);
        } else {
          return object;
        }
      })
      .filter(isNotNullish);
    if (changed) {
      this.#objects = newObjects;
    }
  }

  public terminate() {}

  public addObject(object: GameObjectNoId) {
    this.#objects = this.#objects.concat({
      id: uuidv4(),
      ...object,
    });
  }

  public getObjects(): readonly GameObject[] {
    return this.#objects;
  }

  public getHandlers(): GameEventHandlers {
    return {
      event: (eventName, position, velocity) => {
        this.addObject({
          type: "bubble",
          label: eventName,
          radius: defaultBubbleSize,
          position: clientPositionToGamePosition(
            this.#container,
            position.x,
            position.y
          ),
          velocity,
        });
      },
    };
  }
}
