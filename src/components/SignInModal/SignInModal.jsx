import "./SignInModal.css";

function SignInModal({
  children,
  buttonText,
  isOpen,
  onClose,
  handleOverlayClose,
  onSubmit,
  isFormValid = true,
}) {
  return (
    <div className={`modal modal__opened`} onClick={handleOverlayClose}>
      <div className="modal__content">
        <h2 className="modal__title">Sign Up</h2>
        <button
          onClick={onClose}
          className="modal__close-btn"
          type="button"
        ></button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="email"
              className="modal__input"
              id="email"
              name="email"
              placeholder="email"
              // value={values.email}
              //   onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="password"
              className="modal__input"
              id="password"
              name="password"
              placeholder="password"
              // value={values.password}
              //   onChange={handleChange}
              required
            />
          </label>

          <button
            className={`modal__submit-btn ${
              !isFormValid ? "modal__submit-btn_disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;
