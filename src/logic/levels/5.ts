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
      x: gameFieldWidth / 2,
      y: 20,
    },
  },
  {
    type: "rectWall",
    label: "",
    size: {
      width: 160,
      height: 30,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 220,
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
      height: 40,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 100,
    },
    flow: {
      x: -5,
      y: 0,
    },
  },
];

export default level;
