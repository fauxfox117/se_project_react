import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close-btn" type="button">
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
