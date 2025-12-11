import { useTheme } from './context/ThemeContext'
import TodoApp from './components/TodoApp'
import RecommendationCard from './components/RecommendationCard'
import SentimentAnalyzer from './components/SentimentAnalyzer'
import AutocompleteSearch from './components/AutocompleteSearch'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>AI Dashboard</h1>
          <p>Day 19-21: Final Project with Gemini AI</p>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <main className="app-main">
        <div className="dashboard-grid">
          <div className="dashboard-section todo-section">
            <TodoApp />
          </div>
          <div className="dashboard-section search-section">
            <AutocompleteSearch />
          </div>
          <div className="dashboard-section recommendation-section">
            <RecommendationCard />
          </div>
          <div className="dashboard-section sentiment-section">
            <SentimentAnalyzer />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Made by Harihar Bajpai</p>
      </footer>
    </div>
  )
}

export default App
