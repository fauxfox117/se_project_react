import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose, handleOverlayClose }) {
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
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
