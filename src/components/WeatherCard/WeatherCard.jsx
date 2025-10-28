import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit";

import sunny from "../../assets/sunny.png";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg; {currentTemperatureUnit}
      </p>
      <img src={sunny} alt="clear day" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
