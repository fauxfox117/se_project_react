import { handleServerResponse } from "./api.js";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then(handleServerResponse);
};

export const filterWeatherData = (data) => {
  console.log("Raw weather data:", data); // Debug log

  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);

  // Add weather condition from API
  result.condition = data.weather[0].main;

  // Determine if it's day or night based on sunrise/sunset
  const currentTime = data.dt;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  result.isDay = currentTime >= sunrise && currentTime < sunset;

  console.log("Filtered result:", result); // Debug log

  return result;
};

export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else if (temperature < 66) {
    return "cold";
  }
};
