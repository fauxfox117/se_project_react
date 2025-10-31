import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-btn"
        >
          + Add new
        </button>
      </div>
      <div>
        <ul className="clothes-section__items">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
