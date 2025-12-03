import React, { useReducer } from 'react';

const initialState = { count: 0 };

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initialState;
        default:
            throw new Error();
    }
};

const CounterReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="card">
            <h3>useReducer Example: Counter</h3>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </div>
    );
};

export default CounterReducer;
