import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, createCard } from './utils/api/index';
import CardForm from './CardForm'; // Assuming the CardForm component exists

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);

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

  const handleCreateCard = async (newCardData) => {
    try {
      await createCard(deckId, newCardData);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error creating card:', error);
    }
  };

  if (!deck) {
    return <div>Loading or Deck not found...</div>; // You might want to show a loader or a message for deck not found
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}/cards/new`}>Add Card</Link></li>
          <li className="breadcrumb-item active">Add</li>
        </ol>
      </nav>
      <h2>Add Card to: {deck.name}</h2>
      <CardForm isEdit={false} onSubmit={handleCreateCard} />
    </div>
  );
}

export default AddCard;