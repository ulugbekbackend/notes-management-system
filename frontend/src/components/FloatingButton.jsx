import { FaPlus } from "react-icons/fa";
import "./FloatingButton.css";

export default function FloatingButton({ openModal }) {
  return (
    <button
      className="floating-btn"
      onClick={openModal}
    >
      <FaPlus />
    </button>
  );
}