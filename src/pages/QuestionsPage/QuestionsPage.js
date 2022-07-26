import React, { useContext, useState, useEffect } from 'react';
import ParametersContext from '../../components/Context';
import SingleQuestion from './components/SingleQuestion';
import './questions.css';

const Questions = ({ setFinalScore }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  const parameters = useContext(ParametersContext);
  const category = parameters[0][0];
  const numOfQuestions = parameters[0][1];

  const fetchQuestions = async () => {
    const url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=${numOfQuestions}`;
    const response = await fetch(url);
    const json = await response.json();
    setQuestions(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="questions-wrapper">
      <SingleQuestion
        loading={loading}
        questions={questions}
        setFinalScore={setFinalScore}
      />
    </div>
  );
};

export default Questions;
