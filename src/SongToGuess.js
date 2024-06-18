import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongToGuess = () => {
  const [songTitle, setSongTitle] = useState('');

  useEffect(() => {
    fetchRandomSong();
  }, []); // Fetch random song on component mount

  const fetchRandomSong = async () => {
    try {
      // Replace 'your_playlist_id_here' with the actual playlist ID
      const response = await axios.get('http://localhost:5000/random-track/6UeSakyzhiEt4NB3UAd6NQ');
      // Adjust based on the structure of your response
      const { name: songTitle } = response.data.track; // Assuming the track name is nested under 'track'
      setSongTitle(songTitle);
    } catch (error) {
      console.error('Error fetching random song:', error);
      // Handle error state or display message
    }
  };

  return (
    <div className="song-to-guess">
      <h2>Guess the Song</h2>
      <p>Song Title: {songTitle}</p>
    </div>
  );
};

export default SongToGuess;
