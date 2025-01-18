import { SlotState } from "./SlotState";

export type NineGridState = [
  SlotState,
  SlotState,
  SlotState,
  SlotState,
  SlotState,
  SlotState,
  SlotState,
  SlotState,
  SlotState
];
export type GameState = [
  [NineGridState, NineGridState, NineGridState],
  [NineGridState, NineGridState, NineGridState],
  [NineGridState, NineGridState, NineGridState]
];
