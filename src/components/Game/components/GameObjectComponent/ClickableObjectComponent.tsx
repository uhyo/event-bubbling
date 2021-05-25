import { useRef } from "react";
import {
  gameFieldLightBackgroundRGB,
  interactionInterval,
} from "../../../../logic/constants";
import { ClickableObject } from "../../../../logic/objects/clickable";
import { useGameEventHandlers } from "../../GameEventContext";

export const ClickableObjectComponent: React.VFC<{
  object: ClickableObject;
}> = ({ object }) => {
  const handlers = useGameEventHandlers();
  const lastClickTime = useRef<number>();

  return (
    <button
      className="clickable"
      onClick={(e) => {
        if (
          lastClickTime.current !== undefined &&
          lastClickTime.current + interactionInterval >= Date.now()
        ) {
          return;
        }
        lastClickTime.current = Date.now();
        handlers.domEvent(
          "click",
          {
            x: e.clientX,
            y: e.clientY,
          },
          {
            x: 0,
            y: 0,
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
          .clickable {
            position: absolute;
            left: 0;
            top: 0;
            border: 2px solid #ff9900;
            border-radius: 4px;
            background: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 5px,
              #ff9900 5px,
              #ff9900 7px
            );
            color: #ff9900;
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
