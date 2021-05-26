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
      x: gameFieldWidth / 2 + 20,
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
      x: gameFieldWidth / 2,
      y: 20,
    },
  },
  {
    type: "launcher",
    label: "A",
    size: 50,
    position: {
      x: 30,
      y: 350,
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
      width: gameFieldWidth,
      height: 40,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 300,
    },
    flow: {
      x: 5,
      y: 0,
    },
  },
  {
    type: "flowArea",
    size: {
      width: gameFieldWidth,
      height: 100,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 130,
    },
    flow: {
      x: -4,
      y: 0,
    },
  },
  {
    type: "flowArea",
    size: {
      width: gameFieldWidth / 2,
      height: 40,
    },
    position: {
      x: gameFieldWidth * 0.75,
      y: 260,
    },
    flow: {
      x: 4,
      y: 4,
    },
  },
];

export default level;
