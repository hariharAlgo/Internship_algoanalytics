import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, toggleTodo, deleteTodo, openEditModal }) => {
    if (todos.length === 0) {
        return <div className="empty-state">No tasks found. Add some!</div>
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    openEditModal={openEditModal}
                />
            ))}
        </div>
    )
}

export default TodoList
