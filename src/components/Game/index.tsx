import { memo, useEffect, useRef, useState } from "react";
import { GameLogic } from "../../logic";
import {
  gameFieldHeight,
  gameFieldLightBackgroundRGB,
  gameFieldWidth,
} from "../../logic/constants";
import { GameObject } from "../../logic/objects";
import { GameObjectComponent } from "./components/GameObjectComponent";

type Props = {
  level: number;
};

export const Game: React.VFC<Props> = memo(({ level }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [objects, setObjects] = useState<readonly GameObject[]>([]);

  useEffect(() => {
    if (containerRef.current !== null) {
      const game = new GameLogic({
        level,
      });

      let rafHandle = requestAnimationFrame(mainLoop);

      return () => {
        cancelAnimationFrame(rafHandle);
        game.terminate();
      };

      function mainLoop() {
        const objects = game.getObjects();
        setObjects(objects);
        rafHandle = requestAnimationFrame(mainLoop);
      }
    }
  }, [level]);

  return (
    <div key={level} className="gameRoot" ref={containerRef}>
      {objects.map((object) => (
        <GameObjectComponent key={object.id} object={object} />
      ))}
      <style jsx>
        {`
          .gameRoot {
            box-sizing: content-box;
            position: relative;
            margin: 0 auto;
            width: ${gameFieldWidth}px;
            height: ${gameFieldHeight}px;
            border: 1px solid #cccccc;
            background-color: rgb(${gameFieldLightBackgroundRGB});
            background-image: conic-gradient(
                at 50% 50%,
                #f0f0f0 0turn,
                #f0f0f0 0.25turn,
                transparent 0.25turn
              ),
              conic-gradient(
                at 50% 50%,
                #f0f0f0 0turn,
                #f0f0f0 0.25turn,
                transparent 0.25turn
              );
            background-size: 40px 40px;
            background-position: 0 0, 20px 20px;
            transform-origin: 50% 0;
            overflow: hidden;
          }

          @media (min-width: 800px) and (min-height: 500px) {
            .gameRoot {
              transform: scale(1.5);
            }
          }
        `}
      </style>
    </div>
  );
});
