import { useEffect } from "react";
import { useState } from "react";

function Card() {
  const [cards, setCards] = useState([]);
  //Handle generation of new pokemon cards by fetching data with the pokemon api
  useEffect(() => {
    const fetchData = async () => {
      const newCards = [];
      const numOfCards = 12;
      for (let i = 0; i < numOfCards; i++) {
        const newCard = await getData();
        newCards.push(newCard);
      }
      setCards(newCards);
    };
    fetchData();
  }, []);
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
  //Game points logic, when an image is clicked on we will keep track of how many times each image has been clicked inside the card's object
  const handlePoints = (cardIndex) => {
    setCards(prevCards => {
      const newCards = [...prevCards];
      const clickedCard = newCards[cardIndex];
      if (clickedCard.clicks) clickedCard.clicks += 1;
      else clickedCard.clicks = 1;
      return newCards;
    });
  };
  //Card rendering
  return (
    <div className="Card">
      {cards.map((card, index) => (
        <div key={index}>
          <img src={card.sprites.front_default} alt={card.name} onClick={() => handlePoints(index)}/>
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;