import { useState } from 'react';

function Toggle() {
    // Boolean state to track visibility
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="card">
            <h2>Toggle Visibility</h2>

            <button onClick={toggleVisibility} className="btn primary">
                {isVisible ? 'Hide Message' : 'Show Message'}
            </button>

            {/* Conditional rendering using short-circuit evaluation */}
            {isVisible && (
                <p className="message-box">
                    🎉 This is a secret message! Click the button above to hide me.
                </p>
            )}
        </div>
    );
}

export default Toggle;
