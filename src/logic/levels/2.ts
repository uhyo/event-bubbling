import { gameFieldHeight, gameFieldWidth } from "../constants";
import { GameObjectNoId } from "../objects";
import { createMovable } from "../objects/base";

const level: readonly GameObjectNoId[] = [
  {
    type: "clickable",
    label: "Click here",
    size: {
      width: 200,
      height: 40,
    },
    position: {
      x: gameFieldWidth / 2,
      y: gameFieldHeight - 30,
    },
  },
  {
    type: "goal",
    label: "",
    size: {
      width: gameFieldWidth / 2,
      height: 40,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 20,
    },
  },
  createMovable(
    {
      type: "rectWall",
      label: "",
      size: {
        width: 100,
        height: 30,
      },
      position: {
        x: 0,
        y: 0,
      },
      moveMetadata: {
        count: 0,
      },
    },
    function move(object) {
      const count = object.moveMetadata.count;
      const angle = (count * Math.PI * 2) / 120;
      return {
        ...object,
        position: {
          x: gameFieldWidth / 2 + 100 * Math.cos(angle),
          y: 150,
        },
        moveMetadata: {
          count: (count + 1) % 120,
        },
      };
    }
  ),
];

export default level;
