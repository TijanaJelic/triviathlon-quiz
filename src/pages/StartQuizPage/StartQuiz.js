import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { questionCategoriesUrl } from '../../api/urls';
import ParametersContext from '../../components/Context';
import './start-quiz.css';

const StartQuiz = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [parameters, setParameters] = useContext(ParametersContext);
  const [activeClass, setActiveClass] = useState('');
  const [activeNumButton, setActiveNumButton] = useState('');

  const numberOfQuestions = [5, 10, 15, 20];

  const fetchCategories = async () => {
    const url = questionCategoriesUrl;

    const response = await fetch(url);
    const json = await response.json();
    setCategories(json);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="start-quiz-container">
      <h1>Triviathlon</h1>
      <div className="wrapper">
        <div className="categories-container">
          <h2>Choose category</h2>
          <div className="all-categories">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                className={
                  activeClass === category ? 'category active' : 'category'
                }
                onClick={(e) => {
                  setActiveClass(category);
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
              You have <b>20 seconds</b> to answer on every question.
            </p>
            <p>If you switch the tab the quiz will stop. No cheating! 🙂</p>
          </div>
        </div>
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
