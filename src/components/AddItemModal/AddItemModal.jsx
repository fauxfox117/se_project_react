import useForm from "../../hooks/useForm.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, setValues, handleChange, isFormValid } =
    useForm(defaultValues);

  const requiredFields = ["name", "imageUrl", "weather"];

  const formIsValid = isFormValid(requiredFields);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
    setValues(defaultValues);
  }

  const handleRadioDeselect = (evt) => {
    if (evt.target.getAttribute("data-was-checked") === "true") {
      evt.target.checked = false;
      evt.target.setAttribute("data-was-checked", "false");
    } else {
      document
        .querySelectorAll(`input[name="${evt.target.name}"]`)
        .forEach((radio) => {
          radio.setAttribute("data-was-checked", "false");
        });
      evt.target.setAttribute("data-was-checked", "true");
    }
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={formIsValid}
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
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleChange}
            onClick={handleRadioDeselect}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
            onClick={handleRadioDeselect}
            required
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
            onClick={handleRadioDeselect}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
