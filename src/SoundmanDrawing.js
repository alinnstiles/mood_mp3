import React from 'react';
import './SoundmanDrawing.css';

import boothImage from './soundman.png/booth.png';
import headImage from './soundman.png/head.png';
import bodyImage from './soundman.png/body.png';
import headphoneImage from './soundman.png/headphones.png';
import leftRecordImage from './soundman.png/left_record.png';
import leftArmImage from './soundman.png/left_arm.png';
import rightRecordImage from './soundman.png/right_record.png';
import rightArmImage from './soundman.png/right_arm.png';

const BOOTH = <img key="booth" src={boothImage} alt="Booth" className="booth-img" />;
const HEAD = <img key="head" src={headImage} alt="Head" className="head-img" />;
const BODY = <img key="body" src={bodyImage} alt="Body" className="body-img" />;
const HEADPHONES = <img key="headphones" src={headphoneImage} alt="Headphones" className="headphones-img" />;
const LEFT_RECORD = <img key="left_record" src={leftRecordImage} alt="Left Record" className="left-record-img" />;
const LEFT_ARM = <img key="left_arm" src={leftArmImage} alt="Left Arm" className="left-arm-img" />;
const RIGHT_RECORD = <img key="right_record" src={rightRecordImage} alt="Right Record" className="right-record-img" />;
const RIGHT_ARM = <img key="right_arm" src={rightArmImage} alt="Right Arm" className="right-arm-img" />;

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

const SoundmanDrawing = ({ wrongGuessCount, handleSoundmanClick }) => {
  const boothComponent = (
    <div className="booth-container">
      {BOOTH}
    </div>
  );

  const bodyParts = BODY_PARTS.slice(1, wrongGuessCount + 1);

  return (
    <div className="soundman-container" onClick={handleSoundmanClick}>
      {[boothComponent, ...bodyParts].map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </div>
  );
};

export default SoundmanDrawing;
