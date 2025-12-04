import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import MultiStepForm from './components/MultiStepForm';
import './App.css';

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="app-content">
        <header className="app-header">
          <h1>Multi-Step Form with Theme</h1>
          <ThemeToggler />
        </header>
        <main>
          <MultiStepForm />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
