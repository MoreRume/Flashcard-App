import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from './utils/api/index';

function Deck() {
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

  const handleDeleteDeck = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this deck?');
    if (confirmed) {
      try {
        await deleteDeck(deckId);
        history.push('/');
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error deleting deck:', error);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    const confirmed = window.confirm('Are you sure you want to delete this card?');
    if (confirmed) {
      try {
        await deleteCard(cardId);
        // Reload the deck after deleting the card
        const reloadedDeck = await readDeck(deckId);
        setDeck(reloadedDeck);
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error deleting card:', error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>; }
  else {return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`}>
        <button className="btn btn-secondary mr-2">
          <i className="bi bi-plus mr-1"></i>
          Edit
        </button>
          </Link>
        <Link to={`/decks/${deckId}/study`}>
        <button className="btn btn-primary mr-2">
           <i className="bi bi-plus mr-1"></i>
          Study
        </button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary">
            <i className="bi bi-plus mr-1"></i>
           Add Card
             </button>
                </Link>
      
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          Delete
        </button>
      </div>

      <div>
        <h4 className="mt-4">Cards</h4>
        {deck.cards.map((card) => (
          <div key={card.id} className="card mt-2">
            <div className="card-body">
              <h5 className="card-title">{card.front}</h5>
              <p className="card-text">{card.back}</p>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
              <button className="btn btn-secondary mr-2">
                <i className="bi bi-plus mr-1"></i>
                Edit
              </button>
              </Link>
              <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
  
}
export default Deck