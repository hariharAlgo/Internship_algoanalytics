import Counter from './components/Counter';
import Toggle from './components/Toggle';
import UserFetcher from './components/UserFetcher';
import './App.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Week 2 Day 1: React Basics</h1>
        <p>Practice: useState, useEffect, Props, Conditional Rendering</p>
      </header>

      <main className="grid">
        <Counter />
        <Toggle />
        <UserFetcher />
      </main>
    </div>
  );
}

export default App;
