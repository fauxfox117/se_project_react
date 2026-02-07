import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/325x283?text=Image+Not+Found"; // Fallback image
  };

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked =
    item.likes &&
    currentUser &&
    item.likes.some((id) => id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  } ${!isLoggedIn ? "card__like-btn_hidden" : ""}`;

  const handleLike = (evt) => {
    evt.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <div className="card__image-container">
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
          onError={handleImageError}
        />
        {isLoggedIn && (
          <button
            onClick={handleLike}
            className={itemLikeButtonClassName}
            type="button"
          >
            
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
