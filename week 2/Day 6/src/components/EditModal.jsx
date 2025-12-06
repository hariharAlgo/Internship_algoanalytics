import React, { useState, useEffect } from 'react'

const EditModal = ({ isOpen, todo, saveEdit, closeEditModal }) => {
    const [text, setText] = useState('')

    useEffect(() => {
        if (todo) {
            setText(todo.text)
        }
    }, [todo])

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim()) {
            saveEdit(text)
        }
    }

    return (
        <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        className="modal-input"
                    />
                    <div className="modal-actions">
                        <button type="button" onClick={closeEditModal} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditModal
