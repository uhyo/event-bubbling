export type GameEvents = {
  goal: {
    bubbleIndex: number;
  };
  wallHit: {
    bubbleIndex: number;
  };
};

export type GameEventType = keyof GameEvents;
