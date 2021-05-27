import { gameFieldHeight, gameFieldWidth } from "../constants";
import { GameObjectNoId } from "../objects";
import { createMovable } from "../objects/base";

const level: readonly GameObjectNoId[] = [
  {
    type: "pointerMove",
    label: "pointermove",
    size: {
      width: 150,
      height: 80,
    },
    position: {
      x: 75,
      y: gameFieldHeight - 30,
    },
  },
  {
    type: "goal",
    label: "",
    size: {
      width: 130,
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
        width: 260,
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
      const angle = (count * Math.PI * 2) / 60;
      return {
        ...object,
        position: {
          x: 130,
          y: 200 + 40 * Math.sin(angle),
        },
        moveMetadata: {
          count: (count + 1) % 120,
        },
      };
    }
  ),
  {
    type: "launcher",
    label: "A",
    size: 50,
    position: {
      x: 160,
      y: 150,
    },
    cycleMs: 800,
    intervalMs: 1500,
    dispatchVelocity: {
      x: 16,
      y: 0,
    },
  },
  {
    type: "flowArea",
    size: {
      width: 40,
      height: gameFieldHeight,
    },
    position: {
      x: gameFieldWidth - 20,
      y: gameFieldHeight / 2,
    },
    flow: {
      x: 0,
      y: -3,
    },
  },
];

export default level;
