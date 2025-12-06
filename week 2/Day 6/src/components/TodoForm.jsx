import { useState } from 'react'

const TodoForm = ({ addTodo }) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        addTodo(text)
        setText('')
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="todo-input"
            />
            <button type="submit" className="todo-btn-add">Add</button>
        </form>
    )
}

export default TodoForm
