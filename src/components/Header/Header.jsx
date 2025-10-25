import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function Header({
  handleAddClick,
  location,
  weatherTemp,
  temperatureUnit,
  onToggleChange,
}) {
  const username = "Terrance Tegegne";
  const avatar = avatarDefault;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-and-location">
        {`${currentDate}, ${location || "Loading..."}`}
      </p>
      <div className="header__temperature">
        {weatherTemp !== undefined && `${weatherTemp}°${temperatureUnit}`}
      </div>
      <ToggleSwitch
        isOn={temperatureUnit === "C"}
        handleToggleChange={onToggleChange}
      />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">{username}</p>
        <img
          src={avatar || avatarDefault}
          alt="Terrence Tegegne"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
