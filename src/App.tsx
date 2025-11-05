import { SyntheticEvent, useState } from "react";
import "./App.css";
import Board from "./components/Board.tsx";
import { SlotState } from "./types/SlotState.tsx";
import ResetButton from "./components/ResetButton.tsx";

function App() {
  const [turn, setTurn] = useState<SlotState>(SlotState.X);
  const [levels, setLevels] = useState<number | null>(null);
  const [gameKey, setGameKey] = useState<number>(0);

  const toggleTurn = () =>
    setTurn((current) => (current === SlotState.X ? SlotState.O : SlotState.X));

  const [winner, setWinner] = useState<SlotState | null>(null);

  const reset = () => {
    setGameKey((current) => current + 1);
    setWinner(null);
    setTurn(Math.random() > 0.5 ? SlotState.X : SlotState.O);
  };

  const startGame = (gameLevels: number) => {
    setLevels(gameLevels);
    reset();
  };

  function onClick(gameLevels: number) {
    return (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startGame(gameLevels);
    };
  }

  if (levels === null) {
    return (
      <div className="game-mode-selection">
        <h1>Choose Your Game Mode</h1>
        <div className="mode-buttons">
          <button className="mode-button simple-xo" onClick={onClick(1)}>
            Simple XO
          </button>
          <button className="mode-button super-xo" onClick={onClick(2)}>
            Super XO
          </button>
        </div>
      </div>
    );
  }

  const backgroundClass =
    (winner ?? turn) === SlotState.X ? "x-turn-bg" : "o-turn-bg";

  return (
    <div className={`game-wrapper ${backgroundClass}`}>
      <div className="top-left-controls">
        <button className="back-button" onClick={() => setLevels(null)}>
          ←
        </button>
        <ResetButton onClick={reset} />
      </div>
      <h1 className="game-title">{levels === 1 ? "Simple XO" : "Super XO"}</h1>
      <div className="board-container">
        {winner === null && <div className="turn-container">{turn}</div>}
        <Board
          level={levels}
          turn={turn}
          toggleTurn={toggleTurn}
          key={gameKey}
          onDone={setWinner}
        />
      </div>
    </div>
  );
}

export default App;
