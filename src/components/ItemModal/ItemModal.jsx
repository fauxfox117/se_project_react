import "./ItemModal.css";
import { removeItem } from "../../utils/api.js";

function ItemModal({
  card,
  isOpen,
  onClose,
  handleOverlayClose,
  onDeleteItem,
}) {
  const handleDelete = () => {
    onDeleteItem(card._id);
    onClose();
  };

  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__image_close-btn"
          type="button"
        ></button>
        <img src={card.imageUrl} alt="{card.name}" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather"> Weather: {card.weather}</p>
          <button
            className="modal__delete-btn"
            onClick={handleDelete}
            type="button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
