import "./ToggleSwitch.css";
import React from "react";

export default function ToggleSwitch({ isOn, handleToggleChange }) {
  return (
    <>
      <label className="toggle__switch-label" htmlFor={`toggle-switch-new`}>
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
    </>
  );
}
