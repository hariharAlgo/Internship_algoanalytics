import React from 'react';
import FocusInput from './components/FocusInput';
import CounterReducer from './components/CounterReducer';
import TodoReducer from './components/TodoReducer';
import useToggle from './hooks/useToggle';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [isDark, toggleTheme] = useToggle(false);
  const [name, setName] = useLocalStorage('username', 'Guest');

  return (
    <div className={`app ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <header>
        <h1>React Hooks Mastery</h1>
        <button onClick={toggleTheme}>
          Switch to {isDark ? 'Light' : 'Dark'} Theme
        </button>
        <div className="header-content">
          <label>
            Hello,
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="name-input"
            />
          </label>
        </div>
      </header>

      <main className="main-content">
        <section>
          <FocusInput />
        </section>
        <section>
          <CounterReducer />
        </section>
        <section>
          <TodoReducer />
        </section>
      </main>
    </div>
  );
}

export default App;
