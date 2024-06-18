import React from 'react';
import axios from 'axios';
import useAuth from './useAuth'; // Adjust the path according to your project structure
import { SoundmanDrawing } from './SoundmanDrawing';
import SongToGuess from './SongToGuess';
import Keyboard from './Keyboard';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code); // Assuming useAuth handles token retrieval

  return (
    <div className="dashboard-container">
      <div className="soundman-container">
        <SoundmanDrawing />
      </div>
      <div className="song-container">
        {accessToken && <SongToGuess accessToken={accessToken} />}
      </div>
      <div className="keyboard-container">
        <Keyboard />
      </div>
    </div>
  );
};

export default Dashboard;
