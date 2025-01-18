export default function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="resetBtn" onClick={onClick}>
      Reset
    </button>
  );
}
