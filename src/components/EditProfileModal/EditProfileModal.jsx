// Styles
import "./EditProfileModal.css";

// React
import { useState, useContext, useEffect } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

// Hooks
import useForm from "../../hooks/useForm.jsx";

// Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const [error, setError] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues, resetForm } = useForm({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  // Update form values when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    onUpdateUser(values).catch((err) => {
      setError(
        typeof err === "string"
          ? err
          : "An error occurred while updating profile",
      );
    });
  };

  return (
    <ModalWithForm
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      buttonText="Save Changes"
      onSubmit={handleSubmit}
    >
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

export default EditProfileModal;
