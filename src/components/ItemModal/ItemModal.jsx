import "./ItemModal.css";
import { useState, useContext } from "react";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemModal({
  card,
  isOpen,
  onClose,
  handleOverlayClose,
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

  function handleConfirmOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      handleCancelDelete();
    }
  }

  return (
    <div
      className={`modal ${isOpen && !showConfirm ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__image_close-btn"
          type="button"
        ></button>
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
      </div>
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        handleOverlayClose={handleConfirmOverlayClose}
      />
    </div>
  );
}

export default ItemModal;
