import React, { useState } from 'react';
import SongToGuess from './SongToGuess';
import './Dashboard.css';

const Dashboard = () => {
  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  const handleSoundmanClick = () => {
    setWrongGuessCount(wrongGuessCount + 1);
    // Add any additional logic for handling clicks on SoundmanDrawing
  };

  return (
    <div className="dashboard-container">
      <div className="song-container">
        <SongToGuess />
      </div>
    </div>
  );
};

export default Dashboard;
