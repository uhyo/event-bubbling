import { memo, useEffect, useRef, useState } from "react";
import {
  bubbleSize,
  gameFieldLightBackgroundRGB,
  interactionInterval,
} from "../../../../logic/constants";
import { GameObject } from "../../../../logic/objects";
import { BubbleObject } from "../../../../logic/objects/bubble";
import { ClickableObject } from "../../../../logic/objects/clickable";
import { DisappearingBubbleObject } from "../../../../logic/objects/disappearingBubble";
import { useGameEventHandlers } from "../../GameEventContext";

type Props = {
  object: GameObject;
};

export const GameObjectComponent: React.VFC<Props> = memo(({ object }) => {
  switch (object.type) {
    case "clickable": {
      return <ClickableObjectComponent object={object} />;
    }
    case "goal": {
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
    }
    case "disappearingBubble": {
      return <DisappearingBubbleComponent object={object} />;
    }
  }
});

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
};

const ClickableObjectComponent: React.VFC<{
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

const DisappearingBubbleComponent: React.VFC<{
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
