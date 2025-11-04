import { SlotState } from "../types/SlotState";
import Slot from "./Slot";
import classnames from "./DoneBoard.module.css";

export default function DoneBoard({
  slotState,
  isGameDone = false,
}: {
  slotState: SlotState;
  isGameDone?: boolean;
}) {
  return (
    <div className={classnames.doneBoard}>
      <Slot
        isGameDone={isGameDone}
        state={slotState}
        isDisabled={false}
        onClick={() => {}}
      />
    </div>
  );
}
