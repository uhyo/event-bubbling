export type GameEvents = {
  goal: {
    bubbleIndex: number;
  };
};

export type GameEventType = keyof GameEvents;
