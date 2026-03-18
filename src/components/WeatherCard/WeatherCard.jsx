import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit";

//Weather Daytime Images
import sunny from "../../assets/sunny.png";
import cloudy from "../../assets/cloudy.png";
import rain from "../../assets/rain.png";
import snow from "../../assets/snow.png";
import storm from "../../assets/storm.png";
import fog from "../../assets/fog.png";

//Weather Nighttime Images
import fogNight from "../../assets/fog_night.png";
import stormNight from "../../assets/storm_night.png";
import snowNight from "../../assets/snow_night.png";
import rainNight from "../../assets/rain_night.png";
import cloudyNight from "../../assets/cloudy_night.png";
import sunnyNight from "../../assets/sunny_night.png";

const weatherImages = {
  day: {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rain,
    Drizzle: rain,
    Thunderstorm: storm,
    Snow: snow,
    Mist: fog,
    Fog: fog,
    Haze: fog,
  },
  night: {
    Clear: sunnyNight,
    Clouds: cloudyNight,
    Rain: rainNight,
    Drizzle: rainNight,
    Thunderstorm: stormNight,
    Snow: snowNight,
    Mist: fogNight,
    Fog: fogNight,
    Haze: fogNight,
  },
};

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);

  console.log("WeatherCard received:", weatherData); // Debug log

  const timeOfDay = weatherData.isDay ? "day" : "night";
  const weatherCondition = weatherData.condition || "Clear";
  const weatherImage = weatherImages[timeOfDay][weatherCondition] || sunny;

  console.log(
    "Time of day:",
    timeOfDay,
    "Condition:",
    weatherCondition,
    "Image:",
    weatherImage,
  ); // Debug log

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={
          weatherData.condition === "sunny"
            ? sunny
            : weatherData.condition === "cloudy"
              ? cloudy
              : weatherData.condition === "rainy"
                ? rain
                : snow
        }
        alt={weatherData.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
