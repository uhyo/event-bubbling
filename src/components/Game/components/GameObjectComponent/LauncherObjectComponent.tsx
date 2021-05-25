import { useEffect, useState } from "react";
import { LauncherObject } from "../../../../logic/objects/launcher";
import { useGameEventHandlers } from "../../GameEventContext";

export const LauncherObjectComponent: React.VFC<{
  object: LauncherObject;
}> = ({ object }) => {
  const handlers = useGameEventHandlers();
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) {
      const id = setTimeout(() => {
        setPlaying(true);
      }, object.intervalMs);
      return () => clearTimeout(id);
    }
  }, [playing]);

  return (
    <div
      className="launcher"
      style={{
        transform: `translate(
          ${object.position.x - object.size / 2}px,
          ${object.position.y - object.size / 2}px
        )`,
      }}
    >
      <div
        className="wrapper"
        style={{
          animationPlayState: playing ? "running" : "paused",
        }}
        onAnimationIteration={(e) => {
          const domRect = e.currentTarget.getBoundingClientRect();
          handlers.domEvent(
            "animationiteration",
            {
              x: domRect.left + domRect.width / 2,
              y: domRect.top + domRect.height / 2,
            },
            object.dispatchVelocity
          );
          setPlaying(false);
        }}
      >
        <div className="border">
          <div>
            <span>{object.label}</span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .launcher {
            position: absolute;
            left: 0;
            top: 0;
            width: ${object.size}px;
            height: ${object.size}px;
            color: #6585f5;
          }

          .border {
            width: 100%;
            height: 100%;

            border: 3px solid #6585f5;
            padding: 3px;
            transform: rotate(45deg);
          }
          .border > div {
            width: 100%;
            height: 100%;

            border: 2px solid #6585f5;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
          }
          span {
            padding: 2px;
            border-radius: 4px;
            font-size: ${object.size * 0.5}px;
            line-height: 1;
            transform: rotate(-45deg);
          }
        `}
      </style>
      <style jsx>
        {`
          .wrapper {
            width: 100%;
            height: 100%;
            animation-name: launcherAnimation;
            animation-duration: ${object.cycleMs}ms;
            animation-iteration-count: infinite;
             {
              /* animation-timing-function: ease; */
            }
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.47, 1.15);
          }

          @keyframes launcherAnimation {
            from,
            5% {
              transform: rotate(0);
            }
            to {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
    </div>
  );
};
