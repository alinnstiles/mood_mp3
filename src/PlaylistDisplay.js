import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
 clientId: 'cf051e6dabbe4a288bb966dd9c0566a1',
});

// Function to extract playlist ID from URL
const extractPlaylistId = (url) => {
 const regex = /https:\/\/open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/;
 const match = url.match(regex);
 return match ? match[1] : null;
};

const PlaylistDisplay = ({ accessToken, playlistUrl, setCurrentlyPlayingTrack }) => {
 const [playlist, setPlaylist] = useState(null);
 const [tracks, setTracks] = useState([]);

 useEffect(() => {
    if (!accessToken || !playlistUrl) return;

    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) return;

    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getPlaylist(playlistId).then(data => {
      setPlaylist(data.body);
    }).catch(err => console.error(err));

    spotifyApi.getPlaylistTracks(playlistId).then(data => {
      setTracks(data.body.items.map(item => item.track));
    }).catch(err => console.error(err));
 }, [accessToken, playlistUrl]);

 if (!playlist) return <div>Loading...</div>;

 // Function to handle track click
 const handleTrackClick = (track) => {
 setCurrentlyPlayingTrack(track);
 };

 return (
    <div>
      <div className="text-center">
        <img src={playlist.images[0].url} alt={playlist.name} style={{ width: '200px', height: '200px' }} />
        <h3>{playlist.name}</h3>
        <p>{playlist.description}</p>
      </div>
      <div className="d-flex flex-column">
        {tracks.map(track => (
          <div key={track.id} className="d-flex align-items-center mb-3" onClick={() => handleTrackClick(track)}>
            <img src={track.album.images[0].url} alt={track.name} style={{ width: '100px', height: '100px' }} />
            <div className="ml-3">
              <h4>{track.name}</h4>
              <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
 );
};

export default PlaylistDisplay;
