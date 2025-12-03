import React, { useReducer, useState } from 'react';

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'toggle':
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'delete':
            return state.filter(todo => todo.id !== action.payload);
        default:
            throw new Error();
    }
};

const TodoReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch({ type: 'add', payload: text });
            setText('');
        }
    };

    return (
        <div className="card">
            <h3>useReducer Example: Todo List</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a todo"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {state.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <span onClick={() => dispatch({ type: 'toggle', payload: todo.id })} style={{ cursor: 'pointer' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'delete', payload: todo.id })} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoReducer;
