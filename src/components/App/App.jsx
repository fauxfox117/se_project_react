import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit.jsx";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temperatureUnit, setTemperatureUnit] = useState("F");

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

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      link: inputValues.link,
      weather: inputValues.weather,
    };
    setClothingItems([...clothingItems, newCardData]);
    closeActiveModal();
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

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  const convertTemperature = (temp, unit) => {
    // Just return the temperature in the correct unit
    return Math.round(temp[unit]);
  };

  const handleToggleChange = (evt) => {
    setTemperatureUnit(temperatureUnit === "F" ? "C" : "F");
  };

  return (
    <CurrentTempUnitContext.Provider
      value={{ temperatureUnit, handleToggleChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            handleAddClick={handleAddClick}
            location={weatherData?.city || "Loading..."}
            weatherTemp={
              weatherData?.temp
                ? convertTemperature(weatherData.temp, temperatureUnit)
                : ""
            }
            temperatureUnit={temperatureUnit}
            onToggleChange={handleToggleChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route path="/profile" element={<p>PROFILE</p>} />
            <Route path="/clothes" element={<p>Clothes Section</p>} />
          </Routes>
        </div>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          handleOverlayClose={handleOverlayClose}
          onAddItem={onAddItem}
        ></AddItemModal>
        {/* <ModalWithForm
          isOpen={activeModal === "add-garment"}
          title="New Garment"
          buttonText="Add Garment"
          onClose={closeActiveModal}
          handleOverlayClose={handleOverlayClose}
        >
         
        </ModalWithForm> */}
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          handleOverlayClose={handleOverlayClose}
        ></ItemModal>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
