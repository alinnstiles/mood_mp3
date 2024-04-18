import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import SelectionForm from './SelectionForm';
import PlaylistDisplay from './PlaylistDisplay';

// Initialize Spotify API with client ID
const spotifyApi = new SpotifyWebApi({
 clientId: "cf051e6dabbe4a288bb966dd9c0566a1",
});

export default function Dashboard({ code }) {
 const accessToken = useAuth(code);
 const [search, setSearch] = useState("");
 const [searchResults, setSearchResults] = useState([]);
 const [playingTrack, setPlayingTrack] = useState();
 const [mood, setMood] = useState("");
 const [genre, setGenre] = useState("");
 const [timePeriod, setTimePeriod] = useState("");
 const [playlistUrl, setPlaylistUrl] = useState(""); // State for the playlist URL

 // Set access token for Spotify API when accessToken changes
 useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
 }, [accessToken]);

 // Search tracks using Spotify API when search or accessToken changes
 useEffect(() => {
    if (!search || !accessToken) return setSearchResults([]);

    let cancel = false;
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map(track => ({
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images.reduce(
            (smallest, image) => (image.height < smallest.height ? image : smallest),
            track.album.images[0]
          ).url,
        }))
      );
    });

    return () => (cancel = true);
 }, [search, accessToken]);

 // Function to set the currently playing track
 const setCurrentlyPlayingTrack = (track) => {
    setPlayingTrack(track);
 };

 // Function to select a track and clear search
 const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
 };

 // Function to generate the playlist based on user preferences
 const onGeneratePlaylist = () => {
    // Use the playlistMapping object to find the playlist URL
    const url = playlistMapping[mood.toLowerCase()][timePeriod.toLowerCase()][genre.toLowerCase()];

    // Set the playlist URL state
    setPlaylistUrl(url);
 };

 // Mapping of mood, time period, and genre to playlist URLs
 const playlistMapping = {
    "moody": {
        "golden ages": {
          "rock": "https://open.spotify.com/playlist/5p3WABVlNTOsZOe864I8R4",
          "pop": "https://open.spotify.com/playlist/0fCifjsq53iuYnY9X0XmBa",
          "hiphop": "https://open.spotify.com/playlist/4yONyY5rCq5vUJwV9Oa6WH"
        },
        "y2k": {
          "rock": "https://open.spotify.com/playlist/3mxQ78cwupIQgqGa1SQHTX",
          "pop": "https://open.spotify.com/playlist/6kh4cdX8kOTyt0UXn8kXYJ",
          "hiphop":"https://open.spotify.com/playlist/0RwvkEXODR92jGkb56nhwr"
        }
    },
    "energetic": {
        "golden ages": {
          "rock": "https://open.spotify.com/playlist/3M7e91cjy8clRXhaLBRt9Y",
          "pop": "https://open.spotify.com/playlist/5qFZsDwzC3TJSNTtnyOoZT",
          "hiphop": "https://open.spotify.com/playlist/0J9tUZL9vPKWiqn2fh94m4"
        },
        "y2k": {
          "rock": "https://open.spotify.com/playlist/7D7TB1ueHBYv1TIuQ3i3ur",
          "pop": "https://open.spotify.com/playlist/7LjzP7ViZQViXF2LW8ufsO",
          "hiphop": "https://open.spotify.com/playlist/7tGAHtLYhotWRdFGHpviEM"
        }
    }
 };

 // Function to add a track to the current playlist
 const addTrackToPlaylist = (trackUri) => {
    // Implementation of adding track to playlist
 };

 // Function to reset the playlist and search results
 const resetPlaylist = () => {
    setPlaylistUrl(""); // Reset playlist URL
    setSearchResults([]); // Clear search results
    setSearch(""); // Clear search input
 };

 // Render Dashboard UI
 return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <SelectionForm 
        mood={mood} 
        setMood={setMood} 
        genre={genre} 
        setGenre={setGenre} 
        timePeriod={timePeriod} 
        setTimePeriod={setTimePeriod} 
        onGeneratePlaylist={onGeneratePlaylist} 
        resetPlaylist={resetPlaylist} // Pass the function as a prop
      />
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
            addTrackToPlaylist={addTrackToPlaylist} // Pass the function as a prop
          />
        ))}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
      {playlistUrl && (
        <PlaylistDisplay accessToken={accessToken} playlistUrl={playlistUrl} setCurrentlyPlayingTrack={setCurrentlyPlayingTrack} />
      )}
      {playlistUrl && (
        <div className="fixed-bottom text-center">
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer">View Playlist</a>
        </div>
      )}
    </Container>
 );
}
