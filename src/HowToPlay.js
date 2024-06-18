import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function HowToPlay() {
  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="link" className="how-to-play-link" onClick={handleShow}>
        How to Play
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to Play Soundman</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome to Soundman, the music-themed hangman game!</p>
          <p>Objective: Guess the hidden song title from Billboard's Hot 100.</p>
          <p>Gameplay:</p>
          <ul>
            <li>Start a new game by clicking on the "Play" button.</li>
            <li>Guess letters to uncover the hidden song title.</li>
            <li>You have 7 incorrect guesses allowed before losing.</li>
            <li>Successfully guess the song title before the Soundman figure is fully drawn to win!</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
