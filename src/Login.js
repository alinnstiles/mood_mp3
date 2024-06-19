import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Login.css";
import logo from './soundman.png/right_arm.png';
import HowToPlay from "./HowToPlay.js";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=cf051e6dabbe4a288bb966dd9c0566a1&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <Container className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>
      <div className="parent-container">
    <div className="text-container">
        7 incorrect guesses, <br />
        Billboard's Hot 100.
        <br />
        Can you guess the song?
    </div>
</div>


      <Button variant="success" size="lg" href={AUTH_URL} className="custom-button">
        Play
      </Button>
      <HowToPlay className="how-to-play-container"/>
    </Container>
  );
}
