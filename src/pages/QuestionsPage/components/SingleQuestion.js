import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/Spinner/LoadingSpinner';
import Countdown from 'react-countdown';

const randomNum = (maxNum) => Math.floor(Math.random() * Math.floor(maxNum));

const SingleQuestion = ({
  loading,
  questions,
  numOfQuestions,
  setFinalScore,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  // randomNum(questions[currentQuestion].incorrectAnswers.length) DODATI UMESTO 0 KOD SPLICE
  const getAnswers = () => {
    let answers = questions[currentQuestion].incorrectAnswers;
    if (!answers.includes(questions[currentQuestion].correctAnswer)) {
      answers.splice(0, 0, questions[currentQuestion].correctAnswer);
    }

    return (
      <div className="answers-container">
        {answers.map((answer) => (
          <button
            className="answer"
            key={answer}
            onClick={(e) => {
              setIsDisable(true);
              isCorrect(e);
              handleClickAnswer(e);
            }}
            disabled={isDisable}>
            {answer}
          </button>
        ))}
      </div>
    );
  };

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
      setIsDisable(false);
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
    <div className="questions-container">
      {loading && <LoadingSpinner />}
      <p className="current-question">
        {currentQuestion + 1}/{numOfQuestions}
      </p>
      <h2>
        {questions.length &&
          currentQuestion !== questions.length &&
          questions[currentQuestion].question}
      </h2>
      <div className="answers-and-countdown">
        {questions.length &&
          currentQuestion !== questions.length &&
          getAnswers()}
        <Countdown
          date={Date.now() + 100000}
          renderer={timerRenderer}
          overtime={true}
        />
      </div>
      <Link to={'/'} className="back-home">
        Back Home
      </Link>
    </div>
  );
};

export default SingleQuestion;
