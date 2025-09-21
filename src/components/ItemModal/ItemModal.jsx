import "./ItemModal.css";

function ItemModal({ selectedCard, activeModal, handleCloseClick }) {
  return (
    <div className="modal">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          className="modal__close-btn"
          type="button"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
