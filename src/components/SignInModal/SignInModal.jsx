import "./SignInModal.css";
import { useState } from "react";
import useForm from "../../hooks/useForm.jsx";

function SignInModal({
  isOpen,
  onClose,
  handleOverlayClose,
  onSignIn,
  isFormValid = true,
}) {
  const [error, setError] = useState("");
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    onSignIn(values)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        setError(
          typeof err === "string" ? err : "An error occurred during sign in",
        );
      });
  };

  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content">
        <h2 className="modal__title">Sign In</h2>
        <button
          onClick={onClose}
          className="modal__close-btn"
          type="button"
        ></button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="modal__label">
            Email*{" "}
            <input
              type="email"
              className="modal__input"
              id="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password" className="modal__label">
            Password{" "}
            <input
              type="password"
              className="modal__input"
              id="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="modal__error">{error}</p>}
          <button
            className={`modal__submit-btn ${
              !isFormValid ? "modal__submit-btn_disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;
