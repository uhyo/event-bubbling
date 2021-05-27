import { gameFieldLightBackgroundRGB } from "../../../../logic/constants";
import { ShareButtonObject } from "../../../../logic/objects/shareButton";

export const ShareButtonObjectComponent: React.VFC<{
  object: ShareButtonObject;
}> = ({ object }) => {
  return (
    <div
      className="shareButton"
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
          .shareButton {
            position: absolute;
            left: 0;
            top: 0;
            box-sizing: border-box;
            border: 2px solid #1da1f2;
            background: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 5px,
              #1da1f2 5px,
              #1da1f2 7px
            );
            color: #1da1f2;
            border-radius: 6px;
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
