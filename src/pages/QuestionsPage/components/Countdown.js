import { React, useEffect } from 'react';

const Countdown = ({ showNextQuestion, seconds, setSeconds }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  if (seconds === 0) {
    setSeconds(20);
    showNextQuestion();
  }

  return (
    <p className="countdown">0:{seconds >= 10 ? seconds : '0' + seconds}</p>
  );
};

export default Countdown;
