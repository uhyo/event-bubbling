import { useRef } from "react";
import {
  frameInterval,
  gameFieldLightBackgroundRGB,
  pointerInteractionInterval,
} from "../../../../logic/constants";
import { PointerMoveObject } from "../../../../logic/objects/pointerMove";
import { useGameEventHandlers } from "../../GameEventContext";

export const PointerMoveObjectComponent: React.VFC<{
  object: PointerMoveObject;
}> = ({ object }) => {
  const handlers = useGameEventHandlers();
  const lastEventTime = useRef<number>();
  const lastPointerMoveTime = useRef<number>();

  return (
    <button
      className="pointerMove"
      onPointerMove={(e) => {
        const now = Date.now();
        const lpm = lastPointerMoveTime.current;
        if (
          lastEventTime.current === undefined ||
          (lpm !== undefined && lpm + pointerInteractionInterval >= Date.now())
        ) {
          lastEventTime.current = now;
          return;
        }

        lastPointerMoveTime.current = now;
        const timeDiff = now - lastEventTime.current;
        handlers.domEvent(
          "pointermove",
          {
            x: e.clientX,
            y: e.clientY,
          },
          {
            // v [px/frame] = diff [px] / diff [ms] * frameInterval [ms/frame]
            x: (e.movementX / timeDiff) * frameInterval,
            y: (e.movementY / timeDiff) * frameInterval,
          }
        );
      }}
      style={{
        transform: `translate(${object.position.x - object.size.width / 2}px,
              ${object.position.y - object.size.height / 2}px
            )`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
      }}
    >
      <style jsx>
        {`
          .pointerMove {
            position: absolute;
            left: 0;
            top: 0;
            border: 2px solid #fc88eb;
            border-radius: 4px;
            background: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 5px,
              #fc88ab 5px,
              #fc88ab 7px
            );
            color: #fc88ab;
            font-weight: bold;
            font-size: 1rem;

            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 1;
          }

          span {
            padding: 2px;
            border-radius: 4px;
            background-color: rgba(${gameFieldLightBackgroundRGB} / 0.8);
          }
        `}
      </style>
      <span>{object.label}</span>
    </button>
  );
};
