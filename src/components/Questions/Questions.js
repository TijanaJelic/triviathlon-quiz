import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParametersContext from '../Context';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import Countdown from 'react-countdown';
import './questions.css';

const randomNum = (maxNum) => Math.floor(Math.random() * Math.floor(maxNum));

const Questions = ({ setFinalScore }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const parameters = useContext(ParametersContext);
  const category = parameters[0][0];
  const numOfQuestions = parameters[0][1];

  const fetcQuestion = async () => {
    const url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=${numOfQuestions}`;

    const response = await fetch(url);
    const json = await response.json();
    setQuestions(json);
    setLoading(false);
  };

  useEffect(() => {
    fetcQuestion();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  // const getAnswers = () => {
  //   if(questions.length) {
  //     const answers = questions[currentQuestion].incorrectAnswers
  //     answers.splice(randomNum(questions[currentQuestion].incorrectAnswers.length), 0, questions[currentQuestion].correctAnswer)
  //     console.log(answers)
  //     return (
  //       <div>
  //         {answers.map((answer) => {
  //           <div key={answer}>{answer}</div>
  //         })}
  //       </div>
  //     )
  //   }
  // }

  const showNextQuestion = () => {
    if (currentQuestion + 1 === questions.length) {
      setFinalScore(score);
      navigate('/score');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleClickAnswer = (e) => {
    const handleAnswer = () => {
      if (e.target.textContent === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      showNextQuestion();
    };

    setTimeout(handleAnswer, 500);
  };

  const isCorrect = (e) => {
    if (e.target.textContent === questions[currentQuestion].correctAnswer) {
      e.target.style.backgroundColor = '#1C7C54';
      e.target.style.color = '#fff';
    } else {
      e.target.style.backgroundColor = '#92140C';
      e.target.style.color = '#fff';
    }
  };

  const timerRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      showNextQuestion();
    } else {
      return (
        <span className="countdown">
          {minutes}:{seconds < 10 ? <span>0{seconds}</span> : seconds}
        </span>
      );
    }
  };

  return (
    <div className="questions-wrapper">
      <div className="questions-container">
        {loading && <LoadingSpinner />}
        <h2>
          {questions.length &&
            currentQuestion !== questions.length &&
            questions[currentQuestion].question}
        </h2>
        <div className="answers-and-countdown">
          <div className="answers-container">
            {questions.length &&
              currentQuestion !== questions.length &&
              [
                questions[currentQuestion].correctAnswer,
                ...questions[currentQuestion].incorrectAnswers,
              ].map((answer) => (
                <button
                  className="answer"
                  key={answer}
                  onClick={(e) => {
                    isCorrect(e);
                    handleClickAnswer(e);
                  }}>
                  {answer}
                </button>
              ))}
          </div>
          <Countdown
            date={Date.now() + 5000}
            renderer={timerRenderer}
            overtime={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
