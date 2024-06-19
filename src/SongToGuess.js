import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import SongPlayer from './SongPlayer';
import SoundmanDrawing from './SoundmanDrawing';
import './SongToGuess.css';

const SongToGuess = () => {
  const songTitles = [
    { title: "ESPRESSO", spotifyLink: "https://open.spotify.com/track/2qSkIjg1o9h3YT9RAgYN75?si=25f8bc86e2874662" },
    { title: "I HAD SOME HELP", spotifyLink: "https://open.spotify.com/track/7221xIgOnuakPdLqT0F3nP?si=2f5fd9724fd24189" },
    { title: "NOT LIKE US", spotifyLink: "https://open.spotify.com/track/6AI3ezQ4o3HUoP6Dhudph3?si=6d39fbee2bfb4847" },
    { title: "LUNCH", spotifyLink: "https://open.spotify.com/track/629DixmZGHc7ILtEntuiWE?si=f8c805d097194ad4" },
    { title: "TOO SWEET", spotifyLink: "https://open.spotify.com/track/4IadxL6BUymXlh8RCJJu7T?si=649ea76b32f14be6" },
    { title: "REDRUM", spotifyLink: "https://open.spotify.com/track/52eIcoLUM25zbQupAZYoFh?si=f24f1fb546f04af2" },
    { title: "CLUB CLASSICS", spotifyLink: "https://open.spotify.com/track/0CySZwyRJ0vyUqtSjM9i2k?si=e3c04a706a174e81" }
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
      setMessage('Nice job! Refresh to try again.');
      setShowAlbum(true);
      setShowPlayAgain(true); // Show Play Again button
    } else if (guessesLeft === 0) {
      setMessage('Nice try! Refresh to try again.');
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
    return (
      <div className="song-title">
        {currentSong.title.split("").map((char, index) => (
          <span key={index} className="song-char">
            {char === ' ' ? ' ' : (guessedLetters.has(char.toUpperCase()) || guessesLeft === 0 ? char : '_')}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="song-to-guess">
      <div className="soundman-header">
        <SoundmanDrawing wrongGuessCount={wrongGuessCount} />
        <h2>Guess the Song Title</h2>
      </div>
      {renderSongTitle()}
      <div className="keyboard-container">
        {guessesLeft > 0 && !allLettersGuessed() && (
          <Keyboard onKeyPress={handleGuess} />
        )}
      </div>
      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
      {showAlbum && (
        <div className="song-player-container">
          <SongPlayer spotifyLink={currentSong.spotifyLink} />
        </div>
      )}
      {showPlayAgain && (
        <div className="play-again-container">
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default SongToGuess;
