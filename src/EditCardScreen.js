import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, readCard, updateCard } from './utils/api/index';
import CardForm from './CardForm'; // Assuming the CardForm component exists

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    const loadDeckAndCard = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        const loadedCard = await readCard(cardId);
        setDeck(loadedDeck);
        setCard(loadedCard);
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error loading deck or card:', error);
      }
    };

    loadDeckAndCard();
  }, [deckId, cardId]);

  const handleUpdateCard = async (updatedCardData) => {
    try {
      await updateCard(updatedCardData);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error updating card:', error);
    }
  };

  if (!deck || !card) {
    return <div>Loading or Card not found...</div>; // You might want to show a loader or a message for card not found
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}/cards/${cardId}/edit`}>Edit Card {cardId}</Link></li>
          <li className="breadcrumb-item active">Edit</li>
        </ol>
      </nav>
      <h2>Edit Card: {cardId}</h2>
      <CardForm isEdit={true} initialData={card} onSubmit={handleUpdateCard} />
    </div>
  );
}

export default EditCard;