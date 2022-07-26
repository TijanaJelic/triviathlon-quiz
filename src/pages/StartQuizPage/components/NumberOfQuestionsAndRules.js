import React from 'react';
import { useState } from 'react';
import '../start-quiz.css';

const NumberOfQuestionsAndRules = ({
  category,
  setNumOfQuestions,
  setParameters,
}) => {
  const [activeNumButton, setActiveNumButton] = useState('');

  const numberOfQuestions = [5, 10, 15, 20];

  return (
    <div className="right-wrapper">
      <div className="num-of-questions-container">
        <h2>Choose number of questions</h2>
        <div className="numbers">
          {numberOfQuestions.map((num) => (
            <button
              key={num}
              className={activeNumButton === num ? 'number active' : 'number'}
              onClick={(e) => {
                setActiveNumButton(num);
                setNumOfQuestions(e.target.textContent);
                setParameters([category, num]);
              }}>
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="rules-container">
        <h2>Rules</h2>
        <p>
          You have <b>20 seconds</b> to answer on every question.
        </p>
        <p>If you switch the tab the quiz will stop. No cheating! 🙂</p>
      </div>
    </div>
  );
};

export default NumberOfQuestionsAndRules;
