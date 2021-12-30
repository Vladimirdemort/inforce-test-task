export default function AddButton({ onClick, text }) {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
}
