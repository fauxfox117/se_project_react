import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, handleSubmit }) {
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
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
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
            onClick={handleRadioDeselect}
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
            onClick={handleRadioDeselect}
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
            onClick={handleRadioDeselect}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
