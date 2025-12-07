import React, { useState } from 'react';
import './Accordion.css';

const AccordionItem = ({ title, content, isActive, onClick }) => {
    return (
        <div className="accordion-item">
            <div className={`accordion-title ${isActive ? 'active' : ''}`} onClick={onClick}>
                <span>{title}</span>
                <span className="accordion-icon">{isActive ? '-' : '+'}</span>
            </div>
            {isActive && <div className="accordion-content">{content}</div>}
        </div>
    );
};

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isActive={index === activeIndex}
                    onClick={() => onTitleClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;
