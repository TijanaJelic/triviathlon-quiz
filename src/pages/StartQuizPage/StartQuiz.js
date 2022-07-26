import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParametersContext from '../../components/Context';
import Categories from './components/Categories';
import NumberOfQuestionsAndRules from './components/NumberOfQuestionsAndRules';
import './start-quiz.css';

const StartQuiz = () => {
  const [category, setCategory] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [parameters, setParameters] = useContext(ParametersContext);

  return (
    <div className="start-quiz-container">
      <h1>Triviathlon</h1>
      <div className="wrapper">
        <Categories
          setCategory={setCategory}
          numOfQuestions={numOfQuestions}
          setParameters={setParameters}
        />
        <NumberOfQuestionsAndRules
          setNumOfQuestions={setNumOfQuestions}
          category={category}
          setParameters={setParameters}
        />
      </div>
      <Link to="/questions" className="play-bttn">
        <button disabled={!category.length || !numOfQuestions.length}>
          Play
        </button>
      </Link>
    </div>
  );
};

export default StartQuiz;
