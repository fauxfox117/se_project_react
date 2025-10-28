import { useContext } from "react";

import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit.jsx";

export default function ToggleSwitch({ isOn }) {
  const { handleToggleChange } = useContext(CurrentTempUnitContext);

  return (
    <label className="toggle__switch-label">
      <input
        checked={isOn}
        onChange={handleToggleChange}
        className="toggle__switch-btn"
        id={`toggle-switch-new`}
        type="checkbox"
      />
      <span className={`toggle__switch-circle`} />
      <span className={`toggle__switch-text toggle__switch-text-F`}>F</span>
      <span className={`toggle__switch-text toggle__switch-text-C`}>C</span>
    </label>
  );
}
