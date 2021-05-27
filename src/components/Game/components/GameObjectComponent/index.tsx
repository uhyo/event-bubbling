import { memo } from "react";
import { GameObject } from "../../../../logic/objects";
import { ClickableObjectComponent } from "./ClickableObjectComponent";
import { DisappearingBubbleComponent } from "./DisappearingBubbleComponent";
import { FlowAreaComponent } from "./FlowAreaComponent";
import { GoalComponent } from "./GoalComponent";
import { LauncherObjectComponent } from "./LauncherObjectComponent";
import { PointerMoveObjectComponent } from "./PointerMoveObjectComponent";
import { RectWallComponent } from "./RectWallComponent";
import { ShareButtonObjectComponent } from "./ShareButtonComponent";

type Props = {
  object: GameObject;
};

export const GameObjectComponent: React.VFC<Props> = memo(({ object }) => {
  switch (object.type) {
    case "clickable": {
      return <ClickableObjectComponent object={object} />;
    }
    case "goal": {
      return <GoalComponent object={object} />;
    }
    case "disappearingBubble": {
      return <DisappearingBubbleComponent object={object} />;
    }
    case "rectWall": {
      return <RectWallComponent object={object} />;
    }
    case "launcher": {
      return <LauncherObjectComponent object={object} />;
    }
    case "flowArea": {
      return <FlowAreaComponent object={object} />;
    }
    case "pointerMove": {
      return <PointerMoveObjectComponent object={object} />;
    }
    case "shareButton": {
      return <ShareButtonObjectComponent object={object} />;
    }
  }
});
