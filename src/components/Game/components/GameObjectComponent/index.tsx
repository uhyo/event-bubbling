import { memo } from "react";
import { gameFieldLightBackgroundRGB } from "../../../../logic/constants";
import { GameObject } from "../../../../logic/objects";
import { useGameEventHandlers } from "../../GameEventContext";

type Props = {
  object: GameObject;
};

export const GameObjectComponent: React.VFC<Props> = memo(({ object }) => {
  const handlers = useGameEventHandlers();
  switch (object.type) {
    case "clickable": {
      return (
        <div
          className="clickable"
          onClick={(e) => {
            handlers.event(
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
        >
          <style jsx>
            {`
              .clickable {
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(
                  ${object.position.x - object.size.width / 2}px,
                  ${object.position.y - object.size.height / 2}px
                );
                width: ${object.size.width}px;
                height: ${object.size.height}px;
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
        </div>
      );
    }
    case "goal": {
      return (
        <div className="goal">
          <style jsx>
            {`
              .goal {
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(
                  ${object.position.x - object.size.width / 2}px,
                  ${object.position.y - object.size.height / 2}px
                );
                box-sizing: border-box;
                width: ${object.size.width}px;
                height: ${object.size.height}px;
                border: 2px solid #33dd33;
                background: repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 5px,
                  #33dd33 5px,
                  #33dd33 7px
                );
                color: #33dd33;
                font-weight: bold;

                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
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
        </div>
      );
    }
    case "bubble": {
      return (
        <div className="bubble">
          <style jsx>
            {`
              .bubble {
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(
                  ${object.position.x - object.size.width / 2}px,
                  ${object.position.y - object.size.height / 2}px
                );
                box-sizing: border-box;
                width: ${object.size.width}px;
                height: ${object.size.height}px;
                border: 0.5px solid rgb(34, 153, 221, 0.2);
                border-radius: 9999px;
                background: radial-gradient(
                  circle ${object.size.width / 2}px at 45% 45%,
                  rgba(101, 191, 244, 0.6),
                  rgba(101, 191, 244, 0.4) 40%,
                  rgba(221, 234, 240, 0.9) 100%
                );
                color: #2299dd;
                font-weight: bold;
                font-size: 0.75em;

                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
              }

              span {
                padding: 2px;
                border-radius: 4px;
              }
            `}
          </style>
          <span>{object.label}</span>
        </div>
      );
    }
  }
});
