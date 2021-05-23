import { createContext, useContext } from "react";
import { Position, Velocity } from "../../logic/objects/dimension";

export type GameEventHandlers = {
  domEvent(eventName: string, position: Position, velocity: Velocity): void;
  removeObject(id: string): void;
};

const GameEventContext =
  createContext<GameEventHandlers | undefined>(undefined);

const noopHandlers: GameEventHandlers = {
  domEvent() {},
  removeObject() {},
};

export const GameEventProvider = GameEventContext.Provider;

export function useGameEventHandlers() {
  return useContext(GameEventContext) || noopHandlers;
}
