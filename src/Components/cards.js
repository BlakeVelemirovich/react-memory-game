import { useEffect } from "react";
import { useState } from "react";

function Card(props) {
  const [cards, setCards] = useState([]);
  const [getNewCards, setGetNewCards] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  //Handle generation of new pokemon cards by fetching data with the pokemon api
  useEffect(() => {
    fetchData();

    return setGetNewCards(false);
  }, [getNewCards]);

  const fetchData = async () => {
    const newCards = [];
    const numOfCards = 12;
    for (let i = 0; i < numOfCards; i++) {
      const newCard = await getData();
      newCards.push(newCard);
    }
    setCards(newCards);
  };
  //Function for generating a random number between 1 and 151 (the first generation pokemon) to randomly select Pokemon during data fetch
  const getNum = () => {
    const min = 1;
    const max = 151;
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (getNum.generatedNumbers.includes(num));
    //This is to make sure we don't generate any duplicates
    getNum.generatedNumbers.push(num);
    return num;
  };
  //Keeping track of Pokemon already pulled
  getNum.generatedNumbers = [];
  //Function for fetching Pokemon data using Pokeapi
  const getData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${getNum()}`;
    try {
      const result = await fetch(url);
      const data = await result.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  //Game points logic, when an image is clicked on we will keep track of how many times each image has been clicked inside the cards object
  const handlePoints = (cardIndex) => {
    setCards(prevCards => {
      const newCards = [...prevCards];
      const clickedCard = newCards[cardIndex];
      if (clickedCard.clicks) clickedCard.clicks += 1;
      else clickedCard.clicks = 1;
      //Check if loss or if we should continue the game by updating the score
      let lives = 1;
      if (lives < clickedCard.clicks) {
        handleLoss();
        return newCards;
      }
      else {
        props.updateScore.increaseScores();
      }
      return newCards;
    });
    setCards(shuffle());
  };
  //If loss, change useEffect dependency to true so we can call a new set of calls from the Pokeapi
  const handleLoss = () => {
    //Clear random number array so we can reuse pokemon from the last round
    getNum.generatedNumbers = [];

    setGetNewCards(!getNewCards);
    props.updateScore.decreaseScore();
  }

  const shuffle = () => {
    let shuffledArray = [...cards];
    for (let i = cards.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomNum]] = [shuffledArray[randomNum], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const handleBlurr = () => {
    setIsBlurred(!isBlurred);
    setTimeout(() => setIsBlurred(false), 500); 
  }
  //Card rendering
  return (
    <div className="Card">
      {cards.map((card, index) => (
        <div key={index} onClick={() => handleBlurr()} className={isBlurred ? "blurred" : ''}>
          <img src={card.sprites.other['official-artwork'].front_default} alt={card.name} onClick={() => handlePoints(index)}/>
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;