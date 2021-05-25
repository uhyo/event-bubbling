import { gameFieldHeight, gameFieldWidth } from "../constants";
import { GameObjectNoId } from "../objects";

const level: readonly GameObjectNoId[] = [
  {
    type: "clickable",
    label: "Click",
    size: {
      width: 100,
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
      width: 100,
      height: 40,
    },
    position: {
      x: gameFieldWidth - 50,
      y: 20,
    },
  },
  {
    type: "launcher",
    label: "A",
    size: 50,
    position: {
      x: 250,
      y: 150,
    },
    cycleMs: 800,
    intervalMs: 1500,
    dispatchVelocity: {
      x: -16,
      y: 0,
    },
  },
  {
    type: "rectWall",
    label: "",
    size: {
      width: 100,
      height: 30,
    },
    position: {
      x: gameFieldWidth - 50,
      y: 220,
    },
  },
];

export default level;
