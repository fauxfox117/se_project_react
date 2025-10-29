import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { apiKey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import { getItems, addItem, removeItem } from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit.jsx";
import { getCurrentLocation } from "../../utils/geolocation.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    if (!activeModal) return;
    const onEsc = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [activeModal]);

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems(() => [data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const onDeleteItem = (id) => {
    removeItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
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

  // In your App function, update the useEffect that fetches weather:
  useEffect(() => {
    getCurrentLocation()
      .then((coordinates) => {
        return getWeather(coordinates, apiKey);
      })
      .then((data) => {
        const processedData = filterWeatherData(data);
        setWeatherData(processedData);
      })
      .catch((error) => {
        console.error("Error getting location or weather:", error);
        // Fallback to default coordinates if geolocation fails
        const defaultCoordinates = { latitude: 40.7128, longitude: -74.006 }; // NYC
        return getWeather(defaultCoordinates, apiKey)
          .then((data) => {
            const processedData = filterWeatherData(data);
            setWeatherData(processedData);
          })
          .catch(console.error);
      });
    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);
  // useEffect(() => {
  //   getWeather(coordinates, apiKey)
  //     .then((data) => {
  //       const filteredData = filterWeatherData(data);
  //       setWeatherData(filteredData);
  //     })
  //     .catch(console.error);

  const convertTemperature = (temp, unit) => {
    // Just return the temperature in the correct unit
    return Math.round(temp[unit]);
  };

  const handleToggleChange = (evt) => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            handleAddClick={handleAddClick}
            location={weatherData?.city || "Loading..."}
            weatherTemp={
              weatherData?.temp
                ? convertTemperature(weatherData.temp, currentTemperatureUnit)
                : ""
            }
            currentTemperatureUnit={currentTemperatureUnit}
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
                  onDeleteItem={onDeleteItem}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  // onDeleteItem={onDeleteItem}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          handleOverlayClose={handleOverlayClose}
          onAddItem={onAddItem}
        ></AddItemModal>
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          handleOverlayClose={handleOverlayClose}
          onDeleteItem={onDeleteItem}
        ></ItemModal>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
