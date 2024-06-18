import React, { useState } from 'react';
import './SoundmanDrawing.css';

// Import images (assuming these are correctly imported as described in the question)
import boothImage from './soundman.png/booth.png';
import headImage from './soundman.png/head.png';
import bodyImage from './soundman.png/body.png';
import headphoneImage from './soundman.png/headphones.png';
import leftRecordImage from './soundman.png/left_record.png';
import leftArmImage from './soundman.png/left_arm.png';
import rightRecordImage from './soundman.png/right_record.png';
import rightArmImage from './soundman.png/right_arm.png';

// Define the images as constants
const BOOTH = <img src={boothImage} alt="Booth" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;
const HEAD = <img src={headImage} alt="Head" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;
const BODY = <img src={bodyImage} alt="Body" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;
const HEADPHONES = <img src={headphoneImage} alt="Headphones" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;
const LEFT_RECORD = <img src={leftRecordImage} alt="Left Record" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;
const LEFT_ARM = <img src={leftArmImage} alt="Left Arm" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;
const RIGHT_RECORD = <img src={rightRecordImage} alt="Right Record" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;
const RIGHT_ARM = <img src={rightArmImage} alt="Right Arm" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />;

const BODY_PARTS = [
    BOOTH,
    HEAD,
    BODY,
    HEADPHONES,
    LEFT_RECORD,
    LEFT_ARM,
    RIGHT_RECORD,
    RIGHT_ARM,
];

const MAX_GUESSES = 7; // Maximum number of wrong guesses allowed

export function SoundmanDrawing({ numberOfGuesses }) {
    // State to keep track of the number of wrong guesses
    const [wrongGuessCount, setWrongGuessCount] = useState(0);

    // Function to handle wrong letter click
    const handleWrongGuess = () => {
        if (wrongGuessCount < MAX_GUESSES) {
            setWrongGuessCount(wrongGuessCount + 1);
        }
    };

    // Determine whether to show the initial message or the adjusted parts
    const componentContent = wrongGuessCount > 0 ? (
        <div style={{ position: "relative" }}>
            {BODY_PARTS.slice(0, wrongGuessCount).map((part, index) => (
                <React.Fragment key={index}>{part}</React.Fragment>
            ))}
        </div>
    ) : (
        BOOTH // Display only the booth image when there are no guesses yet
    );

    return (
        <div className="soundman-drawing" onClick={handleWrongGuess}>
            {componentContent}
        </div>
    );
}
