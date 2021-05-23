import { gameFieldHeight, gameFieldWidth } from "../constants";
import { GameObjectNoId } from "../objects";

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
      width: gameFieldWidth,
      height: 30,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 300,
    },
  },
];

export default level;
