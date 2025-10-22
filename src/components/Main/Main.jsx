import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit.jsx";

function Main({ weatherData, handleCardClick }) {
  const { temperatureUnit } = useContext(CurrentTempUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {temperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C}{" "}
          &deg; {temperatureUnit} You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
