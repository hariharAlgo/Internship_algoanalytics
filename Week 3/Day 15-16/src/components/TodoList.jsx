import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    clearCompleted,
    fetchTodos,
} from '../store/slices/todosSlice'
import './TodoList.css'

function TodoList() {
    const { items, status, error, filter } = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    const [newTodo, setNewTodo] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')

    const filteredTodos = items.filter((todo) => {
        if (filter === 'pending') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    const pendingCount = items.filter((t) => !t.completed).length
    const completedCount = items.filter((t) => t.completed).length

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newTodo.trim()) {
            dispatch(addTodo(newTodo.trim()))
            setNewTodo('')
        }
    }

    const handleEdit = (todo) => {
        setEditingId(todo.id)
        setEditText(todo.title)
    }

    const handleSaveEdit = (id) => {
        if (editText.trim()) {
            dispatch(editTodo({ id, title: editText.trim() }))
        }
        setEditingId(null)
        setEditText('')
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditText('')
    }

    return (
        <div className="todo-container">
            <h2>Todo List</h2>

            <div className="todo-stats">
                <span className="stat">{pendingCount} Pending</span>
                <span className="stat">{completedCount} Completed</span>
            </div>

            <form onSubmit={handleSubmit} className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button type="submit" className="btn">Add</button>
            </form>

            <div className="filter-buttons">
                <button
                    onClick={() => dispatch(setFilter('all'))}
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                >
                    All
                </button>
                <button
                    onClick={() => dispatch(setFilter('pending'))}
                    className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                >
                    Pending
                </button>
                <button
                    onClick={() => dispatch(setFilter('completed'))}
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                >
                    Completed
                </button>
            </div>

            <div className="api-section">
                <button
                    onClick={() => dispatch(fetchTodos())}
                    className="btn fetch-btn"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Loading...' : 'Fetch Todos from API'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>

            <ul className="todo-list">
                {filteredTodos.map((todo) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        {editingId === todo.id ? (
                            <div className="edit-mode">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="edit-input"
                                    autoFocus
                                />
                                <button onClick={() => handleSaveEdit(todo.id)} className="action-btn">✓</button>
                                <button onClick={handleCancelEdit} className="action-btn">✕</button>
                            </div>
                        ) : (
                            <>
                                <div className="todo-content" onClick={() => dispatch(toggleTodo(todo.id))}>
                                    <span className="checkbox">{todo.completed ? '✓' : ''}</span>
                                    <span className="todo-text">{todo.title}</span>
                                </div>
                                <div className="todo-actions">
                                    <button onClick={() => handleEdit(todo)} className="action-btn">✎</button>
                                    <button onClick={() => dispatch(deleteTodo(todo.id))} className="action-btn delete">✕</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {completedCount > 0 && (
                <button onClick={() => dispatch(clearCompleted())} className="btn clear-btn">
                    Clear Completed
                </button>
            )}
        </div>
    )
}

export default TodoList
