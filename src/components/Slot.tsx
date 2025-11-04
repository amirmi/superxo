import classes from "./Slot.module.css";
import { SlotState } from "../types/SlotState";

type Props = {
  state: SlotState;
  onClick?: () => void;
  isDisabled: boolean;
  turn?: SlotState;
  isGameDone?: boolean;
};

export default function Slot({
  state,
  onClick = () => {},
  isDisabled,
  turn,
  isGameDone = false,
}: Props) {
  const _onClick = () => {
    if (state != SlotState.NOTHING) {
      return;
    }

    if (isDisabled) {
      return;
    }

    onClick();
  };

  return (
    <button
      className={[
        classes.slot,
        state == SlotState.NOTHING && classes.empty,
        turn == SlotState.X && classes.xTurn,
        turn == SlotState.O && classes.oTurn,
        isDisabled && classes.isDisabled,
        state == SlotState.X && classes.x,
        state == SlotState.O && classes.o,
        isGameDone && classes.isGameDone,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={_onClick}
    >
      {state}
    </button>
  );
}
