import "./ConfirmationModal.css";
import Modal from "../Modal/Modal.jsx";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <Modal name="confirm" isOpen={isOpen} onClose={onClose}>
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
    </Modal>
  );
}

export default ConfirmationModal;
