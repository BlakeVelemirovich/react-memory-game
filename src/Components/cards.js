import { useEffect } from "react";
import { useState } from "react";

function Card() {
  const [cards, setCards] = useState([]);

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

  const getNum = () => {
    const min = 1;
    const max = 150;
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (getNum.generatedNumbers.includes(num));
    getNum.generatedNumbers.push(num);
    return num;
  };
  
  getNum.generatedNumbers = [];

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

  return (
    <div className="Card">
      {cards.map((card, index) => (
        <div key={index}>
          <img src={card.sprites.front_default} alt={card.name} />
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;