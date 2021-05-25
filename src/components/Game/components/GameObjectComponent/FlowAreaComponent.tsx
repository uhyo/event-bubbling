import { useMemo } from "react";
import { frameInterval } from "../../../../logic/constants";
import { FlowAreaObject } from "../../../../logic/objects/flowArea";

export const FlowAreaComponent: React.VFC<{
  object: FlowAreaObject;
}> = ({ object }) => {
  const {
    innerWidth,
    innerHeight,
    fromX,
    fromY,
    toX,
    toY,
    animationDurationX,
    animationDurationY,
  } = useMemo(() => {
    const fax = Math.abs(object.flow.x);
    const fay = Math.abs(object.flow.y);

    const innerWidth = object.size.width * (1 + +!!fax);
    const innerHeight = object.size.height * (1 + +!!fay);

    const fromX = object.flow.x <= 0 ? 0 : -object.size.width;
    const fromY = object.flow.y <= 0 ? 0 : -object.size.height;
    const toX = object.flow.x < 0 ? -object.size.width : 0;
    const toY = object.flow.y < 0 ? -object.size.height : 0;

    // duration [frame] = innerWidth [px] / fax [px/frame]
    const animationDurationX = fax ? object.size.width / fax : 0;
    const animationDurationY = fay ? object.size.height / fay : 0;

    return {
      innerWidth,
      innerHeight,
      fromX,
      fromY,
      toX,
      toY,
      animationDurationX,
      animationDurationY,
    };
  }, [object.size, object.flow]);

  return (
    <div
      className="flowArea"
      style={{
        transform: `translate(
              ${object.position.x - object.size.width / 2}px,
              ${object.position.y - object.size.height / 2}px
            )`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
      }}
    >
      <div
        style={{
          width: `${innerWidth}px`,
          height: `${innerHeight}px`,
        }}
      >
        <div />
      </div>
      <style jsx>
        {`
          .flowArea {
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
          }
          .flowArea > div {
            animation-name: moveX;
            animation-duration: ${animationDurationX * frameInterval}ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
          .flowArea > div > div {
            width: 100%;
            height: 100%;
            background-color: rgba(192, 192, 192, 0.4);
            background-image: radial-gradient(
                circle at 20px 10px,
                rgba(255, 255, 255, 0.8) 0,
                rgba(255, 255, 255, 0.8) 10px,
                transparent 12px
              ),
              radial-gradient(
                circle at 50px 40px,
                rgba(255, 255, 255, 0.8) 0,
                rgba(255, 255, 255, 0.8) 12px,
                transparent 14px
              ),
              radial-gradient(
                circle at 75px 0px,
                rgba(255, 255, 255, 0.8) 0,
                rgba(255, 255, 255, 0.8) 15px,
                transparent 18px
              ),
              radial-gradient(
                circle at 85px 55px,
                rgba(255, 255, 255, 0.8) 0,
                rgba(255, 255, 255, 0.8) 8px,
                transparent 10px
              );
            background-size: 100px 100px;
            animation-name: moveY;
            animation-duration: ${animationDurationY * frameInterval}ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          @keyframes moveX {
            from {
              transform: translateX(${fromX}px);
            }
            to {
              transform: translateX(${toX}px);
            }
          }

          @keyframes moveY {
            from {
              transform: translateY(${fromY}px);
            }
            to {
              transform: translateY(${toY}px);
            }
          }
        `}
      </style>
    </div>
  );
};
