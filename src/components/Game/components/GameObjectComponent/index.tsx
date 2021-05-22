import { memo } from "react";
import { gameFieldLightBackgroundRGB } from "../../../../logic/constants";
import { GameObject } from "../../../../logic/objects";

type Props = {
  object: GameObject;
};

export const GameObjectComponent: React.VFC<Props> = memo(({ object }) => {
  switch (object.type) {
    case "clickable": {
      return (
        <div className="clickable">
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
  }
});
