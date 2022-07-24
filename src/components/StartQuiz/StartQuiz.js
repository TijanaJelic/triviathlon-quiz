import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParametersContext from '../Context';
import './start-quiz.css';

const StartQuiz = () => {
  const [category, setCategory] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [parameters, setParameters] = useContext(ParametersContext);
  const categories = [
    'Food & Drink',
    'Arts & Literature',
    'Film & TV',
    'Music',
    'General Knowledge',
    'Science',
    'Geography',
    'Society & Culture',
    'History',
    'Sport & Leisure',
  ];
  const numberOfQuestions = [5, 10, 15, 20];
  const [activeCategoryButton, setActiveCategoryButton] = useState('');
  const [activeNumButton, setActiveNumButton] = useState('');

  return (
    <div className="start-quiz-container">
      <h1>Triviathlon</h1>
      <div className="wrapper">
        <div className="categories-container">
          <h2>Choose Category</h2>
          <div className="all-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategoryButton === category
                    ? 'category active'
                    : 'category'
                }
                onClick={(e) => {
                  setActiveCategoryButton(category);
                  setCategory(e.target.textContent);
                  setParameters([category, numOfQuestions]);
                }}>
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="right-wrapper">
          <div className="num-of-questions-container">
            <h2>Choose number of questions</h2>
            <div className="numbers">
              {numberOfQuestions.map((num) => (
                <button
                  key={num}
                  className={
                    activeNumButton === num ? 'number active' : 'number'
                  }
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
              You have <b>10 seconds</b> to answer on every question.
            </p>
            <p>If you switch the tab the quiz will stop. No cheating! 🙂</p>
          </div>
        </div>
      </div>
      <Link to="/questions">
        <button
          className="play-bttn"
          disabled={!category.length || !numOfQuestions.length}>
          Play
        </button>
      </Link>
    </div>
  );
};

export default StartQuiz;
