import { bubbleSize } from "../../../../logic/constants";
import { BubbleObject } from "../../../../logic/objects/bubble";

export const BubbleObjectComponent: React.VFC<{
  object: BubbleObject;
}> = ({ object }) => {
  return (
    <div
      className="bubble"
      style={{
        transform: `translate(
          ${object.position.x - bubbleSize / 2}px,
          ${object.position.y - bubbleSize / 2}px
        )`,
      }}
    >
      <span>{object.label}</span>
      <style jsx>
        {`
          .bubble {
            position: absolute;
            left: 0;
            top: 0;
            width: ${bubbleSize}px;
            height: ${bubbleSize}px;
            background: radial-gradient(
              circle ${bubbleSize}px at 35% 35%,
              rgba(221, 234, 240, 0.9),
              rgba(101, 191, 244, 0.4) 40%,
              rgba(101, 191, 244, 0.6) 60%,
              rgba(221, 234, 240, 0.9) 80%
            );
            box-sizing: border-box;
            border: 0.5px solid rgb(34, 153, 221, 0.2);
            border-radius: 9999px;
            color: #2299dd;
            font-weight: bold;
            font-size: 0.75em;
            word-break: break-all;
            text-align: center;

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
    </div>
  );
};
