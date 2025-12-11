import { useState, useEffect } from 'react'
import './TodoApp.css'

function TodoApp() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('dashboard-todos')
        return saved ? JSON.parse(saved) : []
    })
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState('all')
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')

    useEffect(() => {
        localStorage.setItem('dashboard-todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (e) => {
        e.preventDefault()
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }])
            setInput('')
        }
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id))
    }

    const startEdit = (todo) => {
        setEditingId(todo.id)
        setEditText(todo.text)
    }

    const saveEdit = (id) => {
        if (editText.trim()) {
            setTodos(todos.map(t => t.id === id ? { ...t, text: editText.trim() } : t))
        }
        setEditingId(null)
        setEditText('')
    }

    const filteredTodos = todos.filter(t => {
        if (filter === 'pending') return !t.completed
        if (filter === 'completed') return t.completed
        return true
    })

    const pendingCount = todos.filter(t => !t.completed).length

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h2>Todo List</h2>
                <span className="todo-count">{pendingCount} pending</span>
            </div>

            <form onSubmit={addTodo} className="todo-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button type="submit" className="add-btn">Add</button>
            </form>

            <div className="filter-tabs">
                {['all', 'pending', 'completed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        {editingId === todo.id ? (
                            <div className="edit-row">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="edit-input"
                                    autoFocus
                                />
                                <button onClick={() => saveEdit(todo.id)} className="save-btn">✓</button>
                                <button onClick={() => setEditingId(null)} className="cancel-btn">✕</button>
                            </div>
                        ) : (
                            <>
                                <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
                                    <span className="checkbox">{todo.completed ? '✓' : ''}</span>
                                    <span className="todo-text">{todo.text}</span>
                                </div>
                                <div className="todo-actions">
                                    <button onClick={() => startEdit(todo)} className="edit-btn">✎</button>
                                    <button onClick={() => deleteTodo(todo.id)} className="delete-btn">✕</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {filteredTodos.length === 0 && (
                <p className="empty-message">No tasks to show</p>
            )}
        </div>
    )
}

export default TodoApp
