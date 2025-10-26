import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  handleOverlayClose,
  onSubmit,
  isFormValid = true,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close-btn"
          type="button"
        ></button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button
            className={`modal__submit-btn ${
              !isFormValid ? "modal__submit-btn_disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            {buttonText}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
