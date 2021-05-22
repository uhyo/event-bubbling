import { v4 as uuidv4 } from "uuid";
import { GameEventHandlers } from "../components/Game/GameEventContext";
import { clientPositionToGamePosition } from "../components/Game/logic/convertPosition";
import { defaultBubbleSize } from "./constants";
import { GameObject, GameObjectNoId } from "./objects";

type GameLogicOptions = {
  container: HTMLElement;
  level: number;
};

export class GameLogic {
  #container: HTMLElement;
  #objects: GameObject[] = [];
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
          size: {
            width: defaultBubbleSize,
            height: defaultBubbleSize,
          },
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
