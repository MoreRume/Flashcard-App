import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from './utils/api/index';
import DeckForm from './DeckForm'; 

function EditDeck() {
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

  const handleUpdateDeck = async (updatedDeckData) => {
    try {
      await updateDeck(updatedDeckData);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error updating deck:', error);
    }
  };

  if (!deck) {
    return <div>Loading or Deck not found...</div>; 
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}/edit`}>Edit Deck</Link></li>
          <li className="breadcrumb-item active">Edit</li>
        </ol>
      </nav>
      <h2>Edit Deck: {deck.name}</h2>
      <DeckForm isEdit={true} />
    </div>
  );
}

export default EditDeck;