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
      width: 200,
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
      width: 100,
      height: 30,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 200,
    },
  },
];

export default level;
