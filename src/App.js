import './App.scss';
import Card from './Components/cards';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const updateScore = () => {
    setScore(prevScore => prevScore + 1);
    setHighScore(prevHighScore => Math.max(prevHighScore, score + 1));
  }

  return (
    <div className="App">
      <Card updateScore={updateScore}/>
    </div>
  );
}

export default App;
