import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onLogout,
  onUpdateUser,
  isLoggedIn,
  onCardLike,
  onEditProfileClick,
}) {
  return (
    <section className="profile">
      <Sidebar onEditClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
