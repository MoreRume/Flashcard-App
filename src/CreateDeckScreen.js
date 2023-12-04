import React from 'react';
import { Link } from 'react-router-dom';
import DeckForm from './DeckForm'; // Assuming the DeckForm component exists

function CreateDeck() {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/decks/new">Create Deck</Link></li>
          <li className="breadcrumb-item active">Create</li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <DeckForm isEdit={false} />
    </div>
  );
}

export default CreateDeck;