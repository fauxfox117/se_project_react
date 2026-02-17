// React
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./App.css";

// Components
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

// Modals
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import SignUpModal from "../SignUpModal/SignUpModal.jsx";
import SignInModal from "../SignInModal/SignInModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

// Contexts
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

// Utils
import { apiKey } from "../../utils/constants.js";
import { getCurrentLocation } from "../../utils/geolocation.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import {
  signup,
  signin,
  getCurrentUser,
  updateUserData,
} from "../../utils/auth.js";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error checking token:", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleSignUp = (data) => {
    return signup(data).then(() => {
      return handleSignIn({ email: data.email, password: data.password });
    });
  };

  const handleSignIn = (data) => {
    return signin(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getCurrentUser(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeActiveModal();
  };

  const handleUpdateUser = (data) => {
    const token = localStorage.getItem("jwt");
    return updateUserData(token, data).then((updatedUser) => {
      setCurrentUser(updatedUser);
    });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    return addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const onDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    return removeItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id),
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        throw error;
      });
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

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
        const defaultCoordinates = {
          latitude: 34.85075,
          longitude: -82.398956,
        }; // GVL,SC
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

  const convertTemperature = (temp, unit) => {
    return Math.round(temp[unit]);
  };

  const handleToggleChange = (evt) => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
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
              isLoggedIn={isLoggedIn}
              onSignUpClick={() => setActiveModal("sign-up")}
              onSignInClick={() => setActiveModal("sign-in")}
              onLogout={handleLogout}
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
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      onLogout={handleLogout}
                      onUpdateUser={handleUpdateUser}
                      onCardLike={handleCardLike}
                      onEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          ></AddItemModal>
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={onDeleteItem}
            isLoggedIn={isLoggedIn}
          ></ItemModal>
          <SignUpModal
            isOpen={activeModal === "sign-up"}
            onClose={closeActiveModal}
            onSignUp={handleSignUp}
            onSwitchModal={() => setActiveModal("sign-in")}
          ></SignUpModal>
          <SignInModal
            isOpen={activeModal === "sign-in"}
            onClose={closeActiveModal}
            onSignIn={handleSignIn}
            onSwitchModal={() => setActiveModal("sign-up")}
          ></SignInModal>
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
