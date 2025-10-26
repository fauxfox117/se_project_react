import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleImageError = (e) => {
    console.log("Image failed to load:", item.imageUrl);
    e.target.src = "https://via.placeholder.com/325x283?text=Image+Not+Found"; // Fallback image
  };

  // const handleDelete = (evt) => {
  //   onDeleteItem(item._id);
  // };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onError={handleImageError}
        // onDeleteItem={onDeleteItem}
      />
    </li>
  );
}

export default ItemCard;
