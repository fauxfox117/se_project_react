import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  handleOverlayClose,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "add-garment" ? "modal__opened" : ""
      }`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          className="modal__close-btn"
          type="button"
        >
          CLOSE
        </button>
        <form className="modal__form">
          {children}

          <button className="modal__submit-btn" type="submit">
            {buttonText}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
