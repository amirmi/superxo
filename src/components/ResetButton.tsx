export default function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="resetBtn" onClick={onClick} title="Restart Game">
      ↻
    </button>
  );
}
