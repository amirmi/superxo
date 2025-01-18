import { SlotState } from "../types/SlotState";
import Slot from "./Slot";
import classnames from "./DoneBoard.module.css";

export default function DoneBoard({ slotState }: { slotState: SlotState }) {
  return (
    <div className={classnames.doneBoard}>
      <Slot state={slotState} isDisabled={false} onClick={() => {}} />
    </div>
  );
}
