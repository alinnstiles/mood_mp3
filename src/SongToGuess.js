import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import Player from './Player';
import SoundmanDrawing from './SoundmanDrawing';
import './SongToGuess.css';

const SongToGuess = ({ accessToken }) => {
  const songTitles = [
    { title: "ESPRESSO", uri: "spotify:track:2qSkIjg1o9h3YT9RAgYN75" },
    { title: "I HAD SOME HELP", uri: "spotify:track:7221xIgOnuakPdLqT0F3nP" },
    { title: "NOT LIKE US", uri: "spotify:track:6AI3ezQ4o3HUoP6Dhudph3" },
    { title: "LUNCH", uri: "spotify:track:629DixmZGHc7ILtEntuiWE" },
    { title: "TOO SWEET", uri: "spotify:track:4IadxL6BUymXlh8RCJJu7T" },
    { title: "REDRUM", uri: "spotify:track:52eIcoLUM25zbQupAZYoFh" },
    { title: "CLUB CLASSICS", uri: "spotify:track:0CySZwyRJ0vyUqtSjM9i2k" }
  ];

  const getRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songTitles.length);
    return songTitles[randomIndex];
  };

  const [currentSong, setCurrentSong] = useState(getRandomSong());
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [guessesLeft, setGuessesLeft] = useState(7);
  const [message, setMessage] = useState('');
  const [showAlbum, setShowAlbum] = useState(false);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [showPlayAgain, setShowPlayAgain] = useState(false); // State to control the display of Play Again button

  useEffect(() => {
    setCurrentSong(getRandomSong());
    setGuessedLetters(new Set());
    setGuessesLeft(7);
    setMessage('');
    setShowAlbum(false);
    setWrongGuessCount(0);
    setShowPlayAgain(false); // Hide Play Again button
  }, []); // Initialize state on component mount

  const handleGuess = (key) => {
    const normalizedKey = key.toUpperCase();
    if (!guessedLetters.has(normalizedKey)) {
      const newGuessedLetters = new Set(guessedLetters);
      newGuessedLetters.add(normalizedKey);
      setGuessedLetters(newGuessedLetters);

      if (currentSong.title.includes(normalizedKey)) {
        // Correct guess logic
      } else {
        // Incorrect guess logic
        setGuessesLeft(guessesLeft - 1);
        setWrongGuessCount(wrongGuessCount + 1);
      }
    }
  };

  const allLettersGuessed = () => {
    const uniqueLettersInTitle = new Set(currentSong.title.replace(/ /g, '').toUpperCase());
    for (let char of uniqueLettersInTitle) {
      if (!guessedLetters.has(char)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (allLettersGuessed()) {
      setMessage("Wooo! The song is...");
      setShowAlbum(true);
      setShowPlayAgain(true); // Show Play Again button
    } else if (guessesLeft === 0) {
      setMessage('Tough luck...The song is...');
      setShowAlbum(true);
      setShowPlayAgain(true); // Show Play Again button
    }
  }, [guessedLetters, guessesLeft]);

  const handlePlayAgain = () => {
    setCurrentSong(getRandomSong());
    setGuessedLetters(new Set());
    setGuessesLeft(7);
    setMessage('');
    setShowAlbum(false);
    setWrongGuessCount(0);
    setShowPlayAgain(false); // Hide Play Again button
  };

  const renderSongTitle = () => {
    const uniqueLettersInTitle = new Set(currentSong.title.replace(/ /g, '').toUpperCase());
  
    return (
      <div className="song-title">
        {currentSong.title.split("").map((char, index) => (
          <span key={index} className="song-char">
            {char === ' ' ? ' ' : (guessedLetters.has(char.toUpperCase()) ? char : (uniqueLettersInTitle.has(char.toUpperCase()) ? '_' : char))}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="song-to-guess">
      <div className="soundman-header">
        <SoundmanDrawing wrongGuessCount={wrongGuessCount} />
        <h2 className="guess-song-title">{message ? message : "Guess the Song Title:"}</h2>
      </div>
      {showAlbum && (
        <div className="song-player-container">
          <Player accessToken={accessToken} trackUri={currentSong.uri} />
        </div>
      )}
      <div className="keyboard-container">
        {renderSongTitle()}
        {guessesLeft > 0 && !allLettersGuessed() && (
          <Keyboard onKeyPress={handleGuess} />
        )}
          {showPlayAgain && (
        <div className="play-again-container">
          <button className="btn btn-primary" onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
      </div>
      {message && (
        <div className={`message ${message.includes('Wooo') ? 'message-success' : 'message-failure'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default SongToGuess;
