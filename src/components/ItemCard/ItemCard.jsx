import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeIcon from "../../assets/like.png";
import likeActiveIcon from "../../assets/liked.png";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__name">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={itemLikeButtonClassName}
            type="button"
            onClick={handleLike}
          >
            <img
              src={isLiked ? likeActiveIcon : likeIcon}
              alt={isLiked ? "Unlike" : "Like"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
