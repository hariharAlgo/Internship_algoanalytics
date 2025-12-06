import React from 'react'

const TodoItem = ({ todo, toggleTodo, deleteTodo, openEditModal }) => {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                />
                <span className="todo-text" onClick={() => toggleTodo(todo.id)}>
                    {todo.text}
                </span>
            </div>
            <div className="todo-actions">
                <button onClick={() => openEditModal(todo)} className="btn-icon edit" aria-label="Edit">
                    ✏️
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="btn-icon delete" aria-label="Delete">
                    🗑️
                </button>
            </div>
        </div>
    )
}

export default TodoItem
