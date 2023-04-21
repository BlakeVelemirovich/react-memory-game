import './App.scss';
import Card from './Components/cards';
import Header from './Components/header';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const updateScore = {
    increaseScores: () => { 
      setScore(prevScore => prevScore + 1);
      setHighScore(prevHighScore => Math.max(prevHighScore, score + 1));
    },

    decreaseScore: () => {
      setScore(prevScore => prevScore = 0);
    }
  };

  return (
    <div className="App">
      <Header score={score} highScore={highScore}/>
      <Card updateScore={updateScore}/>
    </div>
  );
}

export default App;
