import React, { useState } from 'react';
import './App.css';
import ToggleSwitch from './components/ToggleSwitch';
import Tooltip from './components/Tooltip';
import DropdownMenu from './components/DropdownMenu';
import Accordion from './components/Accordion';

function App() {
  const [isToggled, setIsToggled] = useState(false);

  const dropdownItems = [
    { label: 'Profile', onClick: () => alert('Profile Clicked') },
    { label: 'Settings', onClick: () => alert('Settings Clicked') },
    { label: 'Logout', onClick: () => alert('Logout Clicked') },
  ];

  const accordionItems = [
    { title: 'Section 1', content: 'This is the content for section 1. It can contain text, images, or other components.' },
    { title: 'Section 2', content: 'Here is some more content for section 2. Accordions are great for organizing large amounts of information.' },
    { title: 'Section 3', content: 'Finally, section 3 content goes here.' },
  ];

  return (
    <div className="app-container">
      <h1>Reusable React Components</h1>

      <section className="component-section">
        <h2>1. Toggle Switch</h2>
        <div className="demo-box">
          <ToggleSwitch
            isOn={isToggled}
            handleToggle={() => setIsToggled(!isToggled)}
            label="Enable Notifications"
          />
          <p>State: {isToggled ? 'ON' : 'OFF'}</p>
        </div>
      </section>

      <section className="component-section">
        <h2>2. Tooltip</h2>
        <div className="demo-box">
          <Tooltip text="I am a top tooltip!" position="top">
            <button className="btn">Hover me (Top)</button>
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip text="I am a right tooltip!" position="right">
            <button className="btn">Hover me (Right)</button>
          </Tooltip>
        </div>
      </section>

      <section className="component-section">
        <h2>3. Dropdown Menu</h2>
        <div className="demo-box">
          <DropdownMenu
            trigger={<button className="btn">Options &#9662;</button>}
            items={dropdownItems}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>4. Accordion</h2>
        <div className="demo-box" style={{ width: '100%' }}>
          <Accordion items={accordionItems} />
        </div>
      </section>
    </div>
  );
}

export default App;
