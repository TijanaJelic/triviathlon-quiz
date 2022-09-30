import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ParametersContext from '../../components/Context';
import './score.css';

const ScorePage = ({ finalScore }) => {
  const parameters = useContext(ParametersContext);

  return (
    <div className="score-container">
      Your score is{' '}
      <span className="result">
        <span className="num-box">{finalScore}</span> /{' '}
        <span className="num-box">{parameters[0][1]}</span>
      </span>
      <Link to={'/'} className="back-home-bttn">
        Back home
      </Link>
    </div>
  );
};

export default ScorePage;
