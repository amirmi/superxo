import { useState } from "react";
import "./App.css";
import Board from "./components/Board.tsx";
import { SlotState } from "./types/SlotState.tsx";
import ResetButton from "./components/ResetButton.tsx";
import Slot from "./components/Slot.tsx";

function App() {
  const [turn, setTurn] = useState<SlotState>(SlotState.X);
  const [levels, setLevels] = useState<number>(1);
  const [gameKey, setGameKey] = useState<number>(0);

  const toggleTurn = () =>
    setTurn((current) => (current === SlotState.X ? SlotState.O : SlotState.X));

  const [winner, setWinner] = useState<SlotState | null>(null);

  const reset = () => {
    setGameKey((current) => current + 1);
    setWinner(null);
    setTurn(Math.random() > 0.5 ? SlotState.X : SlotState.O);
  };

  return (
    <>
      <div className="toolbox">
        <span># of levels:</span>
        <input
          type="number"
          min={1}
          max={3}
          value={levels}
          onChange={(e) => {
            setLevels(+e.target.value);
            reset();
          }}
        />
        <span> | </span>
        <ResetButton onClick={reset} />
        <span> | </span>
        {winner == null ? (
          <>
            It's <Slot state={turn} isDisabled={false} />
            Turn
          </>
        ) : (
          <>
            <Slot state={winner} isDisabled={false} /> Wins!
          </>
        )}
      </div>
      <Board
        level={levels}
        turn={turn}
        toggleTurn={toggleTurn}
        key={gameKey}
        onDone={setWinner}
      />
    </>
  );
}

export default App;
