import { useState } from "react";
import { NineGridState } from "../types/GameState";
import { SlotState } from "../types/SlotState";
import GridLayout from "./GridLayout.react";
import Slot from "./Slot";
import { checkWinner } from "../Utils";
import DoneBoard from "./DoneBoard";

export default function Board({
  level,
  turn,
  toggleTurn,
  isDisabled = false,
  onSetActiveBoard = emptyFunction,
  onDone = emptyFunction,
}: {
  level: number;
  turn: SlotState;
  toggleTurn: () => void;

  isDisabled?: boolean;
  onSetActiveBoard?: (
    newBoardIndex: number | null,
    originLevel: number
  ) => void;
  onDone?: (winner: SlotState) => void;
}) {
  const [grid, setGrid] = useState<NineGridState>(
    Array(9).fill(SlotState.NOTHING) as NineGridState
  );

  const [isDone, setIsDone] = useState<boolean>(false);

  /* Active board, could be a hook */
  const [activeBoard, setActiveBoard] = useState<number | null>(null); // in the leaf, a box is also a board!

  const _setActiveBoard = (index: number | null) => {
    setActiveBoard(index);
    onSetActiveBoard(index, level);
  };

  const _onSetActiveBoard = (index: number | null, originLevel: number) => {
    if (level == originLevel + 1) {
      setActiveBoard(index);
    }
  };

  // Validating active board
  if (activeBoard !== null) {
    const activeBoardState = grid[activeBoard];
    if (activeBoardState !== SlotState.NOTHING) {
      setActiveBoard(null);
    }
  }

  /* **/

  /* On Done **/
  const allFilled = grid.every((slotState) => slotState !== SlotState.NOTHING);

  const winner = allFilled
    ? SlotState.NOTHING
    : checkWinner(grid as NineGridState);

  if (winner && !isDone) {
    setIsDone(true);
    onDone(winner);
  }

  const _onDone = (index: number, winner: SlotState) => {
    setGrid((current) => {
      const newGrid = [...current];
      newGrid[index] = winner;
      return newGrid as NineGridState;
    });
  };

  return (
    <div
      style={{
        border: `${level != 2 ? 0 : 1}px dotted gray`,
        position: "relative",
        width: "fit-content",
        padding: "10px",
      }}
    >
      <GridLayout isDisabled={isDisabled} level={level}>
        {grid.map((slotState: SlotState, index: number) => {
          if (level == 1) {
            return (
              <Slot
                key={index}
                state={slotState == null ? SlotState.NOTHING : slotState}
                turn={turn}
                onClick={() => {
                  const newGrid = [...grid];
                  newGrid[index] = turn;

                  setGrid(newGrid as NineGridState);

                  toggleTurn();

                  _setActiveBoard(index);
                }}
                isDisabled={isDisabled}
              />
            );
          } else {
            const notTheActiveBoard =
              activeBoard !== null && activeBoard !== index;
            return (
              <Board
                key={index}
                level={level - 1}
                isDisabled={
                  isDisabled ||
                  grid[index] != SlotState.NOTHING ||
                  notTheActiveBoard
                }
                turn={turn}
                toggleTurn={toggleTurn}
                onSetActiveBoard={_onSetActiveBoard}
                onDone={(winner) => _onDone(index, winner)}
              />
            );
          }
        })}
      </GridLayout>
      {isDone === true ? (
        <DoneBoard slotState={winner ?? SlotState.NOTHING} />
      ) : null}
    </div>
  );
}
function emptyFunction(): void {
  // This function is a placeholder and does not need to do anything.
  // It is provided as a default prop value for nextTurn and markAsDone.
}
