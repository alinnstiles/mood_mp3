import React, { useState, useEffect } from 'react';
import './Keyboard.css'; // Import your CSS file for styling

const Keyboard = ({ onKeyPress }) => {
  const [highlightedKeys, setHighlightedKeys] = useState([]);

  const handleKeyPress = (key) => {
    // Call the parent component's callback function only if it's a letter (A-Z)
    if (/[A-Z]/.test(key)) {
      onKeyPress(key);
      // Check if the key is already highlighted
      if (!highlightedKeys.includes(key)) {
        // Add the key to the array
        setHighlightedKeys(prevState => [...prevState, key]);
      }
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    if (/[A-Z]/.test(key)) {
      // Call the parent component's callback function only if it's a letter (A-Z)
      onKeyPress(key);
      // Prevent adding the key if it's already highlighted
      if (!highlightedKeys.includes(key)) {
        setHighlightedKeys(prevState => [...prevState, key]);
      }
    }
  };

  // Effect to add event listeners on component mount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [highlightedKeys, onKeyPress]); // Add onKeyPress to dependency array

  return (
    <div className="keyboard">
      <div className="row">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
          <button
            key={key}
            className={`key ${highlightedKeys.includes(key) ? 'highlighted' : ''}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="row">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
          <button
            key={key}
            className={`key ${highlightedKeys.includes(key) ? 'highlighted' : ''}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="row">
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => (
          <button
            key={key}
            className={`key ${highlightedKeys.includes(key) ? 'highlighted' : ''}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
