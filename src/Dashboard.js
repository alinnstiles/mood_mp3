import React, { useState, useEffect } from 'react';
import SongToGuess from './SongToGuess';
import SoundmanDrawing from './SoundmanDrawing'; // Adjust import based on your component path
import { Container } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import useAuth from './useAuth';
import './Dashboard.css';

const spotifyApi = new SpotifyWebApi({
  clientId: '8b945ef10ea24755b83ac50cede405a0',
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [playingTrack, setPlayingTrack] = useState();
  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (playingTrack) {
      axios
        .get('http://localhost:3001/lyrics', {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
          },
        })
        .then((res) => {
          // Handle setting lyrics if needed
        });
    }
  }, [playingTrack]);

  const handleSoundmanClick = () => {
    setWrongGuessCount(wrongGuessCount + 1);
    // Add any additional logic for handling clicks on SoundmanDrawing
  };

  return (
    <Container className="dashboard-container">
      <div className="song-container">
        <SongToGuess accessToken={accessToken} />
      </div>
      {playingTrack && <SoundmanDrawing />} {/* Render Soundman if playingTrack is truthy */}
    </Container>
  );
};

export default Dashboard;
