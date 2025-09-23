import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      setActiveModal("");
    }
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) closeActiveModal();
  };

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        handleOverlayClose={handleOverlayClose}
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
              className="modal__radio-input"
              onClick={handleRadioDeselect}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              name="weather"
              className="modal__radio-input"
              onClick={handleRadioDeselect}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              name="weather"
              className="modal__radio-input"
              onClick={handleRadioDeselect}
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
        handleOverlayClose={handleOverlayClose}
      ></ItemModal>
    </div>
  );
}

export default App;
