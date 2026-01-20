import "./EditProfileModal.css";
import { useState, useContext, useEffect } from "react";
import useForm from "../../hooks/useForm.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function EditProfileModal({
  isOpen,
  onClose,
  handleOverlayClose,
  onUpdateUser,
}) {
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
    onUpdateUser(values)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        setError(
          typeof err === "string"
            ? err
            : "An error occurred while updating profile",
        );
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      handleOverlayClose={handleOverlayClose}
      title="Edit Profile"
      buttonText="Save Changes"
      onSubmit={handleSubmit}
    >
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
