import classes from "./Slot.module.css";
import { SlotState } from "../types/SlotState";

type Props = {
  state: SlotState;
  onClick?: () => void;
  isDisabled: boolean;
  turn?: SlotState;
};

export default function Slot({
  state,
  onClick = () => {},
  isDisabled,
  turn,
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
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={_onClick}
    >
      {state}
    </button>
  );
}
