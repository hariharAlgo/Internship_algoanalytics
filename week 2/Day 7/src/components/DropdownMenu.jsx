import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ trigger, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-trigger" onClick={toggleDropdown}>
                {trigger}
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {items.map((item, index) => (
                        <li key={index} className="dropdown-item" onClick={() => {
                            if (item.onClick) item.onClick();
                            setIsOpen(false);
                        }}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
