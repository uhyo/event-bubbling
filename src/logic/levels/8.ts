import { gameFieldHeight, gameFieldWidth } from "../constants";
import { GameObjectNoId } from "../objects";

const level: readonly GameObjectNoId[] = [
  {
    type: "clickable",
    label: "Thank you for playing!",
    size: {
      width: 200,
      height: 100,
    },
    position: {
      x: gameFieldWidth / 2,
      y: gameFieldHeight / 2,
    },
  },
  {
    type: "shareButton",
    label: "Share on Twitter",
    size: {
      width: 200,
      height: 40,
    },
    position: {
      x: gameFieldWidth / 2,
      y: 50,
    },
  },
];

export default level;
