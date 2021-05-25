import { gameFieldLightBackgroundRGB } from "../../../../logic/constants";
import { GoalObject } from "../../../../logic/objects/goal";

export const GoalComponent: React.VFC<{
  object: GoalObject;
}> = ({ object }) => {
  return (
    <div
      className="goal"
      style={{
        transform: `translate(
              ${object.position.x - object.size.width / 2}px,
              ${object.position.y - object.size.height / 2}px
            )`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
      }}
    >
      <style jsx>
        {`
          .goal {
            position: absolute;
            left: 0;
            top: 0;
            box-sizing: border-box;
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
            opacity: 1;
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
};
