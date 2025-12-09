import Counter from './components/Counter'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Redux Toolkit Demo</h1>
        <p>Day 15-16: Redux Basics + API + DevTools</p>
      </header>
      <main className="app-main">
        <section className="section">
          <Counter />
        </section>
        <section className="section">
          <TodoList />
        </section>
      </main>
      <footer className="app-footer">
        <p>Made by Harihar Bajpai</p>
      </footer>
    </div>
  )
}

export default App
