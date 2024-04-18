import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Login.css";

// Create authentication URL following Spotify's auth code flow 
//client id, response type, redirect uri, and scopes needed to access 
const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id=cf051e6dabbe4a288bb966dd9c0566a1&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
 return (
    <Container className="login-container">
      {/* Heading for the Login page */}
      <h1 className="login-title mb-4">MOOD.MP3</h1>
      {/* Button for initiating the Spotify authentication process */}
      <Button variant="success" size="lg" href={AUTH_URL} className="custom-button">
        Generate Playlist
      </Button>
    </Container>
 );
}
