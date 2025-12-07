import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children, position = 'top', delay = 200 }) => {
    let timeout;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, delay);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {active && (
                <div className={`tooltip-tip ${position}`}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
