import React from "react";
import { useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ParametersContext from "./components/Context";
import StartQuiz from './StartQuiz/StartQuiz'
import Questions from "./components/Questions/Questions";
import ScorePage from "./components/ScorePage/ScorePage";

function App() {
  const parameters = useState([])
  const [finalScore, setFinalScore] = useState(0)
  return (
    <ParametersContext.Provider value={parameters}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<StartQuiz />}/>
            <Route path='questions' element={<Questions setFinalScore={setFinalScore}/>} />
            <Route path="score" element={<ScorePage finalScore={finalScore} />} />
        </Routes>
      </BrowserRouter>
    </ParametersContext.Provider>
  );
}

export default App;
