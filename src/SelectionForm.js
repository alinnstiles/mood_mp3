// SelectionForm.js
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const SelectionForm = ({ mood, setMood, genre, setGenre, timePeriod, setTimePeriod, onGeneratePlaylist, resetPlaylist }) => {
 const clearForm = () => {
    setMood("");
    setGenre("");
    setTimePeriod("");
    resetPlaylist(); // Call the passed function to reset the playlist
 };

 return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="moodSelection">
            <Form.Label></Form.Label>
            <Form.Select value={mood} onChange={e => setMood(e.target.value)}>
              <option value=""> Mood</option>
              <option value="moody">Moody</option>
              <option value="energetic">Energetic</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="genreSelection">
            <Form.Label></Form.Label>
            <Form.Select value={genre} onChange={e => setGenre(e.target.value)}>
              <option value=""> Genre</option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="hip hop">Hip Hop</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="timePeriodSelection">
            <Form.Label></Form.Label>
            <Form.Select value={timePeriod} onChange={e => setTimePeriod(e.target.value)}>
              <option value=""> Time Period</option>
              <option value="golden ages">Golden Ages</option>
              <option value="y2k">Y2K</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" onClick={onGeneratePlaylist}>Generate Playlist</Button>
          <Button variant="secondary" onClick={clearForm} className="ml-2">Clear Form</Button>
        </Col>
      </Row>
    </Form>
 );
};

export default SelectionForm;
