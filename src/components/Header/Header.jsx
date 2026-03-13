import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function Header({
  handleAddClick,
  location,
  weatherTemp,
  currentTemperatureUnit,
  onToggleChange,
  isLoggedIn,
  onSignUpClick,
  onSignInClick,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Create placeholder avatar with first letter of name
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-btn" type="button">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </NavLink>
      <p className="header__date-and-location">
        {`${currentDate}, ${location || "Loading..."}`}
      </p>
      <div className="header__temperature">
        {weatherTemp !== undefined &&
          `${weatherTemp}°${currentTemperatureUnit}`}
      </div>
      <ToggleSwitch
        isOn={currentTemperatureUnit === "C"}
        handleToggleChange={onToggleChange}
      />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}

      {!isLoggedIn ? (
        <div className="header__auth-buttons">
          <button
            onClick={onSignUpClick}
            type="button"
            className="header__auth-btn header__sign-up-btn"
          >
            Sign Up
          </button>
          <button
            onClick={onSignInClick}
            type="button"
            className="header__auth-btn header__sign-in-btn"
          >
            Log In
          </button>
        </div>
      ) : (
        <NavLink to="/profile" type="button" className="header__nav-link">
          <div className="header__user-container">
            <p className="header__username">{currentUser?.name}</p>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar header__avatar_placeholder">
                {getInitial(currentUser?.name)}
              </div>
            )}
          </div>
        </NavLink>
      )}
    </header>
  );
}

export default Header;
