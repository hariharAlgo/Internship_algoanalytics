import { useState } from 'react';

function Counter() {
    // Standard counter state - starting at 0
    const [count, setCount] = useState(0);

    return (
        <div className="card">
            <h2>Counter</h2>
            <p>Current Count: <strong>{count}</strong></p>

            <div className="button-group">
                <button onClick={() => setCount(count - 1)} className="btn danger">
                    Decrease
                </button>

                <button onClick={() => setCount(count + 1)} className="btn success">
                    Increase
                </button>

                <button onClick={() => setCount(0)} className="btn">
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Counter;
