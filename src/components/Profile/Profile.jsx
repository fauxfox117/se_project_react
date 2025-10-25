import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile() {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection />
    </section>
  );
}

export default Profile;
