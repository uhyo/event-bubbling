import { useEffect, useState } from "react";
import { bubbleSize } from "../../../../logic/constants";
import { DisappearingBubbleObject } from "../../../../logic/objects/disappearingBubble";
import { useGameEventHandlers } from "../../GameEventContext";

export const DisappearingBubbleComponent: React.VFC<{
  object: DisappearingBubbleObject;
}> = ({ object }) => {
  const handlers = useGameEventHandlers();
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setAnimate(true);
    });
    const timer = setTimeout(() => {
      handlers.removeObject(object.id);
    }, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);
  return (
    <div
      className={animate ? "disappearingBubble animate" : "disappearingBubble"}
      style={{
        transform: `translate(
          ${object.position.x - bubbleSize / 2}px,
          ${object.position.y - bubbleSize / 2}px
        ) scale(${animate ? 2.5 : 1})`,
      }}
    >
      <style jsx>
        {`
          .disappearingBubble {
            position: absolute;
            left: 0;
            top: 0;
            width: ${bubbleSize}px;
            height: ${bubbleSize}px;
            background: radial-gradient(
              circle ${bubbleSize}px at 35% 35%,
              rgba(221, 234, 240, 0.3),
              rgba(101, 191, 244, 0.1) 40%,
              rgba(101, 191, 244, 0.2) 60%,
              rgba(221, 234, 240, 0.5) 80%
            );
            box-sizing: border-box;
            border-radius: 9999px;

            opacity: 1;
            transition: transform 0.4s ease-out, opacity 0.4s ease-in;
          }
          .animate {
            opacity: 0;
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
