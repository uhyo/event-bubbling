import { v4 as uuidv4 } from "uuid";
import { GameObject, GameObjectNoId } from "./objects";

type GameLogicOptions = {
  // container: HTMLElement;
  level: number;
};

export class GameLogic {
  #objects: GameObject[] = [];
  constructor({ level }: GameLogicOptions) {
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
}
