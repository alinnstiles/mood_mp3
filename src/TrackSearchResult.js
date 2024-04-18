import React from 'react';

const TrackSearchResult = ({ track, chooseTrack, addTrackToPlaylist }) => {
 const handlePlay = () => {
    chooseTrack(track);
 };

 const handleAddToPlaylist = () => {
    addTrackToPlaylist(track.uri);
 };

 return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: 'pointer' }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} alt="" style={{ height: '64px', width: '64px' }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
        <button onClick={handleAddToPlaylist}>Add to Playlist</button>
      </div>
    </div>
 );
};

export default TrackSearchResult;
