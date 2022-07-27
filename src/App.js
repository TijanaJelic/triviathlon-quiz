import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParametersContext from './components/Context';
import ScorePage from './pages/ScorePage/ScorePage';
import Questions from './pages/QuestionsPage/QuestionsPage';
import StartQuiz from './pages/StartQuizPage/StartQuizPage';
import PlayAgain from './pages/PlayAgainPage/PlayAgain';

function App() {
  const parameters = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  return (
    <ParametersContext.Provider value={parameters}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartQuiz />} />
          <Route
            path="questions"
            element={<Questions setFinalScore={setFinalScore} />}
          />
          <Route path="score" element={<ScorePage finalScore={finalScore} />} />
          <Route path="play-again" element={<PlayAgain />} />
        </Routes>
      </BrowserRouter>
    </ParametersContext.Provider>
  );
}

export default App;
