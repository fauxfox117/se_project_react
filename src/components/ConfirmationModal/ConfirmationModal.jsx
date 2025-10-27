import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onConfirm, handleOverlayClose }) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="confirm-modal__content">
        <button
          onClick={onClose}
          className="confirm-modal__image_close-btn"
          type="button"
        ></button>
        <h2 className="confirm-modal__title">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </h2>
        <div className="confirm-modal__buttons">
          <button
            type="button"
            className="confirm-modal__btn confirm-modal__btn_confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="confirm-modal__btn confirm-modal__btn_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
