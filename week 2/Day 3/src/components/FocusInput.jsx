import React, { useRef } from 'react';

const FocusInput = () => {
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus();
    };

    return (
        <div className="card">
            <h3>useRef Example: Focus Input</h3>
            <input ref={inputRef} type="text" placeholder="Click button to focus me" />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    );
};

export default FocusInput;
