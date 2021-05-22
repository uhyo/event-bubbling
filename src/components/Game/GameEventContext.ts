import { createContext, useContext } from "react";
import { Position, Velocity } from "../../logic/objects/dimension";

export type GameEventHandlers = {
  event(eventName: string, position: Position, velocity: Velocity): void;
};

const GameEventContext =
  createContext<GameEventHandlers | undefined>(undefined);

const noopHandlers: GameEventHandlers = {
  event() {},
};

export const GameEventProvider = GameEventContext.Provider;

export function useGameEventHandlers() {
  return useContext(GameEventContext) || noopHandlers;
}
