import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'
import EditModal from './components/EditModal'

function App() {
  const [todos, setTodos] = useLocalStorage('react-todo-app-v1', [])
  const [filter, setFilter] = useState('all') // all, pending, completed
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([newTodo, ...todos]) // Add new to top
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const openEditModal = (todo) => {
    setCurrentTodo(todo)
    setIsModalOpen(true)
  }

  const closeEditModal = () => {
    setCurrentTodo(null)
    setIsModalOpen(false)
  }

  const saveEdit = (newText) => {
    if (currentTodo) {
      editTodo(currentTodo.id, newText)
      closeEditModal()
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Basic stats
  const pendingCount = todos.filter(t => !t.completed).length

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Todo App</h1>
        <p className="subtitle">{pendingCount} tasks remaining</p>
      </header>

      <div className="main-content">
        <TodoForm addTodo={addTodo} />

        <FilterBar filter={filter} setFilter={setFilter} />

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          openEditModal={openEditModal}
        />
      </div>

      <EditModal
        isOpen={isModalOpen}
        todo={currentTodo}
        saveEdit={saveEdit}
        closeEditModal={closeEditModal}
      />
    </div>
  )
}

export default App
