import { useState } from 'react'
import './App.css'
import StudentList from './components/StudentList'
import TaskList from './components/TaskList'
import FragmentVsDiv from './components/FragmentVsDiv'
import Button from './components/Button'
import Card from './components/Card'

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ])

  const [tasks, setTasks] = useState([
    'Complete React assignment',
    'Review Pull Requests',
    'Update documentation',
  ])

  const [showStudents, setShowStudents] = useState(true)

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id))
  }

  const handleResetStudents = () => {
    setStudents([
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
      { id: 3, name: 'Charlie Brown' },
    ])
  }

  return (
    <div className="app-container">
      <header>
        <h1>Week 2 Day 2: List Rendering & State Lifting</h1>
      </header>

      <main>
        <section>
          <h2>Student Management</h2>
          <div className="controls">
            <Button onClick={() => setShowStudents(!showStudents)}>
              {showStudents ? 'Hide Students' : 'Show Students'}
            </Button>
            <Button variant="secondary" onClick={handleResetStudents} style={{ marginLeft: '10px' }}>
              Reset List
            </Button>
          </div>

          {showStudents && (
            <StudentList
              students={students}
              onDelete={handleDeleteStudent}
            />
          )}
        </section>

        <section>
          <h2>Task Dashboard</h2>
          <TaskList tasks={tasks} />
        </section>

        <section>
          <h2>Concepts</h2>
          <FragmentVsDiv />
        </section>
      </main>
    </div>
  )
}

export default App
