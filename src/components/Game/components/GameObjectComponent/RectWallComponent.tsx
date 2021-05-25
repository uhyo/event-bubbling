import { gameFieldLightBackgroundRGB } from "../../../../logic/constants";
import { RectWallObject } from "../../../../logic/objects/rectWall";

export const RectWallComponent: React.VFC<{ object: RectWallObject }> = ({
  object,
}) => {
  return (
    <div
      className="rectWall"
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
          .rectWall {
            position: absolute;
            left: 0;
            top: 0;
            box-sizing: border-box;
            border: 2px solid #666666;
            background: #aaaaaa;
            color: #666666;
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
      {object.label && <span>{object.label}</span>}
    </div>
  );
};
