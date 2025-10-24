import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile() {
  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection />
    </div>
  );
}

export default Profile;
