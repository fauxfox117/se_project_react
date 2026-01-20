import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Sidebar({ onEditClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  // Create placeholder avatar with first letter of name
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{currentUser?.name}</p>
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser?.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_placeholder">
            {getInitial(currentUser?.name)}
          </div>
        )}
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={onEditClick}
          type="button"
          className="sidebar__btn sidebar__edit-btn"
        >
          Change Profile Data
        </button>
        <button
          onClick={onLogout}
          type="button"
          className="sidebar__btn sidebar__logout-btn"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
