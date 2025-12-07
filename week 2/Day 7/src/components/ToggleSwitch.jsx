import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ isOn, handleToggle, label, onColor = '#06D6A0', id }) => {
    return (
        <div className="toggle-switch-container">
            {label && <span className="toggle-label">{label}</span>}
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={id || `react-switch-new`}
                type="checkbox"
            />
            <label
                style={{ background: isOn && onColor }}
                className="react-switch-label"
                htmlFor={id || `react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </div>
    );
};

export default ToggleSwitch;
