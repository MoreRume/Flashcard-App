import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error loading deck:', error);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  const handleNext = () => {
    if (cardIndex === deck.cards.length - 1) {
      const restart = window.confirm('Restart this deck?');
      if (restart) {
        setCardIndex(0);
        setIsFront(true);
      } else {
        history.push('/');
      }
    } else {
      setCardIndex(cardIndex + 1);
      setIsFront(true);
    }
  };

  if (!deck || deck.cards.length < 3) {
    return <div>Not enough cards...</div>; 
  }

  const currentCard = deck.cards[cardIndex];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{isFront ? currentCard.front : currentCard.back}</p>
          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Study;