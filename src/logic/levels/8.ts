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
];

export default level;
