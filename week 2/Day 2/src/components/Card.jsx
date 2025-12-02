import React from 'react';

const Card = ({ children, className = '' }) => {
    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '10px 0',
        border: '1px solid #e0e0e0',
    };

    return (
        <div style={cardStyle} className={className}>
            {children}
        </div>
    );
};

export default Card;
