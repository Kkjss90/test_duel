import React from 'react';

const Menu = ({ position, currentColor, onClose, onColorChange }) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

    return (
        <div
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                padding: '10px',
                backgroundColor: 'white',
                border: '1px solid black',
                zIndex: 1000
            }}
        >
            <h3>Choose Spell Color</h3>
            {colors.map(color => (
                <button
                    key={color}
                    onClick={() => {
                        onColorChange(color);
                        onClose();
                    }}
                    style={{
                        backgroundColor: color,
                        padding: '10px',
                        margin: '5px',
                        border: currentColor === color ? '2px solid black' : '1px solid grey',
                        cursor: 'pointer'
                    }}
                >
                    {color}
                </button>
            ))}
            <button onClick={onClose} style={{ display: 'block', marginTop: '10px' }}>
                Close
            </button>
        </div>
    );
};

export default Menu;
