import React from 'react';
import { Link } from 'react-router-dom';
import './play-again.css';

const PlayAgain = () => {
  return (
    <div className="play-again-box">
      <p>You switched the tab and broke the rules!</p>
      <Link to={'/'}>Back home</Link>
    </div>
  );
};

export default PlayAgain;
