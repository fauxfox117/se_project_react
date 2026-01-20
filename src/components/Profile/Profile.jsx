import "./Profile.css";
import { useState } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onLogout,
  currentUser,
  onUpdateUser,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleCloseEditModal();
    }
  };

  return (
    <section className="profile">
      <Sidebar
        onEditClick={handleEditClick}
        onLogout={onLogout}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        handleOverlayClose={handleOverlayClose}
        onUpdateUser={onUpdateUser}
      />
    </section>
  );
}

export default Profile;
