import React from 'react';

const SongPlayer = ({ songTitle, spotifyLink }) => {
  const playSong = () => {
    window.open(spotifyLink, '_blank');
  };

  return (
    <div className="song-player">
      <h3>{songTitle}</h3>
      <button onClick={playSong}>Play Song</button>
      <p>Listen to the full track on Spotify</p>
    </div>
  );
};

export default SongPlayer;
