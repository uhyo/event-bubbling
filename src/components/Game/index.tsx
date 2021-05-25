import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { GameLogic } from "../../logic";
import {
  gameFieldHeight,
  gameFieldLightBackgroundRGB,
  gameFieldWidth,
  levelNumber,
} from "../../logic/constants";
import { GameObject } from "../../logic/objects";
import { BubbleObject } from "../../logic/objects/bubble";
import { GameObjectComponent } from "./components/GameObjectComponent";
import { BubbleObjectComponent } from "./components/GameObjectComponent/BubbleObjectComponent";
import { Success } from "./components/Success";
import { GameEventHandlers, GameEventProvider } from "./GameEventContext";

type Props = {
  level: number;
};

export const Game: React.VFC<Props> = memo(({ level }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [objects, setObjects] = useState<readonly GameObject[]>([]);
  const [bubbles, setBubbles] = useState<readonly BubbleObject[]>();
  const [gameEventHandlers, setGameEventHandlers] =
    useState<GameEventHandlers>();
  const [successLevel, setSuccessLevel] = useState(0);

  const router = useRouter();
  const successHandler = useCallback(() => {
    setSuccessLevel(level);
    if (level < levelNumber) {
      setTimeout(() => {
        router.push(`/level/${level + 1}`);
      }, 3000);
    }
  }, [level]);

  useEffect(() => {
    if (containerRef.current !== null) {
      const game = new GameLogic({
        container: containerRef.current,
        level,
        onSuccess: successHandler,
      });
      setGameEventHandlers(game.getHandlers());

      let rafHandle = requestAnimationFrame(mainLoop);

      return () => {
        cancelAnimationFrame(rafHandle);
        game.terminate();
      };

      function mainLoop() {
        game.proceedTime(Date.now());
        setObjects(game.getObjects());
        setBubbles(game.getBubbles());
        rafHandle = requestAnimationFrame(mainLoop);
      }
    }
  }, [level]);

  return (
    <div key={level} className="gameRoot">
      <div ref={containerRef}>
        <GameEventProvider value={gameEventHandlers}>
          {objects.map((object) => (
            <GameObjectComponent key={object.id} object={object} />
          ))}
          {bubbles?.map((object) => (
            <BubbleObjectComponent key={object.id} object={object} />
          ))}
          {successLevel === level && <Success />}
        </GameEventProvider>
      </div>
      <style jsx>
        {`
          .gameRoot {
            box-sizing: content-box;
            width: min-content;
            margin: 0 auto;
            border: 1px solid #cccccc;
            transform-origin: 50% 0;
          }
          .gameRoot > div {
            position: relative;
            width: ${gameFieldWidth}px;
            height: ${gameFieldHeight}px;
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
            overflow: hidden;
          }

          @media (min-width: 600px) and (min-height: 500px) {
            .gameRoot {
              transform: scale(1.5);
            }
          }
        `}
      </style>
    </div>
  );
});
