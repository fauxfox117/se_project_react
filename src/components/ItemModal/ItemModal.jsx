import "./ItemModal.css";
import { useState, useContext } from "react";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import Modal from "../Modal/Modal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemModal({
  card,
  isOpen,
  onClose,
  onDeleteItem,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  // Check if the current user is the owner of the current clothing item
  const isOwn = currentUser && card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "" : "modal__delete-btn_hidden"
  }`;

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteItem(card._id)
      .then(() => {
        setShowConfirm(false);
      })
      .catch(console.error);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    );
  }

  return (
    <Modal name="preview" isOpen={isOpen} onClose={onClose}>
      <img
        src={card.imageUrl}
        alt={card.name || " "}
        className="modal__image"
      />
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather"> Weather: {card.weather}</p>
        {isOwn && (
          <button
            className={itemDeleteButtonClassName}
            onClick={handleDelete}
            type="button"
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
