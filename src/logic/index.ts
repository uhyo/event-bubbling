import { v4 as uuidv4 } from "uuid";
import { GameEventHandlers } from "../components/Game/GameEventContext";
import { clientPositionToGamePosition } from "../components/Game/logic/convertPosition";
import { isNotNullish } from "../util/isNotNullish";
import { frameInterval, skipThreshold } from "./constants";
import { GameObject, GameObjectNoId } from "./objects";
import { BubbleObject } from "./objects/bubble";
import { moveBubble } from "./objects/move";

type GameLogicOptions = {
  container: HTMLElement;
  level: number;
};

export class GameLogic {
  #container: HTMLElement;
  #objects: GameObject[] = [];
  #bubbles: BubbleObject[] = [];
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
    if (this.#bubbles.length === 0) {
      return;
    }
    this.#bubbles = this.#bubbles
      .map((object) => {
        return moveBubble(object);
      })
      .filter(isNotNullish);
  }

  public terminate() {}

  public addObject(object: GameObjectNoId) {
    this.#objects = this.#objects.concat({
      id: uuidv4(),
      ...object,
    });
  }

  public addBubble(object: Omit<BubbleObject, "type" | "id">) {
    this.#bubbles = this.#bubbles.concat({
      type: "bubble",
      id: uuidv4(),
      ...object,
    });
  }

  public getObjects(): readonly GameObject[] {
    return this.#objects;
  }

  public getBubbles(): readonly BubbleObject[] {
    return this.#bubbles;
  }

  public getHandlers(): GameEventHandlers {
    return {
      event: (eventName, position, velocity) => {
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
    };
  }
}
