import "./Sidebar.css";
import avatarDefault from "../../assets/avatar.png";

function Sidebar() {
  const username = "Terrance Tegegne";
  const avatar = avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{username}</p>
        <img
          src={avatar || avatarDefault}
          alt="Terrence Tegegne"
          className="sidebar__avatar"
        />
      </div>
    </aside>
  );
}

export default Sidebar;
