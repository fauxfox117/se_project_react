// Styles
import "./SignUpModal.css";

// React
import { useState } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

// Hooks
import useForm from "../../hooks/useForm.jsx";

function SignUpModal({
  isOpen,
  onClose,
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
    <ModalWithForm
      name="signup"
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      buttonText="Sign Up!"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      secondaryButtonText="or Sign In"
      onSecondaryButtonClick={onSwitchModal}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default SignUpModal;
