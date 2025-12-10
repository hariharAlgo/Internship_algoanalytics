import { useState } from 'react'
import { useTheme } from './context/ThemeContext'
import FacebookComments from './components/FacebookComments'
import GmailInbox from './components/GmailInbox'
import NetflixRow from './components/NetflixRow'
import YouTubeLayout from './components/YouTubeLayout'
import './App.css'

const tabs = [
  { id: 'facebook', label: 'Facebook Comments' },
  { id: 'gmail', label: 'Gmail Inbox' },
  { id: 'netflix', label: 'Netflix (Lazy Load)' },
  { id: 'youtube', label: 'YouTube Layout' },
]

function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('facebook')

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>FANG UI Clones</h1>
          <p>Day 17-18: UI Patterns from Top Companies</p>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <nav className="tab-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeTab === 'facebook' && <FacebookComments />}
        {activeTab === 'gmail' && <GmailInbox />}
        {activeTab === 'netflix' && <NetflixRow />}
        {activeTab === 'youtube' && <YouTubeLayout />}
      </main>

      <footer className="app-footer">
        <p>Made by Harihar Bajpai</p>
      </footer>
    </div>
  )
}

export default App
