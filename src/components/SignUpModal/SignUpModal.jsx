import "./SignUpModal.css";
import { useState } from "react";
import useForm from "../../hooks/useForm.jsx";

function SignUpModal({
  isOpen,
  onClose,
  handleOverlayClose,
  onSignUp,
  onSwitchModal,
  isFormValid = true,
}) {
  const [error, setError] = useState("");
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    onSignUp(values)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        setError(
          typeof err === "string" ? err : "An error occurred during sign up",
        );
      });
  };

  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content">
        <h2 className="modal__title">Sign Up</h2>
        <button
          onClick={onClose}
          className="modal__close-btn"
          type="button"
        ></button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="modal__label">
            Email{" "}
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
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="avatar" className="modal__label">
            Avatar URL{" "}
            <input
              type="url"
              className="modal__input"
              id="avatar"
              name="avatar"
              placeholder="Avatar URL"
              value={values.avatar}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="modal__error">{error}</p>}
          <div className="modal__buttons">
            <button
              className={`modal__submit-btn ${
                !isFormValid ? "modal__submit-btn_disabled" : ""
              }`}
              type="submit"
              disabled={!isFormValid}
            >
              Sign Up!
            </button>
            <button
              className="modal__secondary-btn"
              type="button"
              onClick={onSwitchModal}
            >
              or Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
