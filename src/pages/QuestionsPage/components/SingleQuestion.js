import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/Spinner/LoadingSpinner';
import Countdown from './Countdown';

const randomNum = (maxNum) => Math.floor(Math.random() * Math.floor(maxNum));

const SingleQuestion = ({
  loading,
  questions,
  numOfQuestions,
  setFinalScore,
}) => {
  const [tabHasFocus, setTabHasFocus] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFocus = () => {
      setTabHasFocus(true);
    };

    const handleBlur = () => {
      navigate('/');
      setTabHasFocus(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    setFinalScore(score);
  }, [score]);

  const getAnswers = () => {
    let answers = questions[currentQuestion].incorrectAnswers;
    if (!answers.includes(questions[currentQuestion].correctAnswer)) {
      answers.splice(
        randomNum(questions[currentQuestion].incorrectAnswers.length),
        0,
        questions[currentQuestion].correctAnswer,
      );
    }

    return (
      <div className="answers-container">
        {answers.map((answer) => (
          <button
            className="answer"
            key={answer}
            onClick={(e) => {
              setIsDisable(true);
              handleClickAnswer(e);
            }}
            disabled={isDisable}>
            {answer}
          </button>
        ))}
      </div>
    );
  };

  const handleClickAnswer = (e) => {
    isCorrect(e);
    const handleAnswer = () => {
      showNextQuestion();
      setIsDisable(false);
      setSeconds(20);
    };
    setTimeout(handleAnswer, 500);
  };

  const showNextQuestion = () => {
    if (currentQuestion + 1 === questions.length) {
      navigate('/score');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const isCorrect = (e) => {
    if (e.target.textContent === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      e.target.style.backgroundColor = '#1C7C54';
      e.target.style.color = '#fff';
    } else {
      e.target.style.backgroundColor = '#92140C';
      e.target.style.color = '#fff';
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
          showNextQuestion={showNextQuestion}
          seconds={seconds}
          setSeconds={setSeconds}
        />
      </div>
      <Link to={'/'} className="back-home">
        Back Home
      </Link>
    </div>
  );
};

export default SingleQuestion;
