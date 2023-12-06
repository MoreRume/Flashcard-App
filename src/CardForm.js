import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readDeck, createCard, updateCard } from './utils/api/index';

function CardForm({ isEdit }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ front: '', back: '' });

  useEffect(() => {
    if (isEdit) {
      const loadCard = async () => {
        try {
          const deck = await readDeck(deckId);
          const cardToEdit = deck.cards.find((card) => card.id === +cardId);
          if (cardToEdit) {
            setFormData({ front: cardToEdit.front, back: cardToEdit.back });
          }
        } catch (error) {
          // Handle error (e.g., display an error message)
          console.error('Error loading card:', error);
        }
      };

      loadCard();
    }
  }, [deckId, cardId, isEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateCard({ ...formData, id: +cardId, deckId: +deckId });
      } else {
        await createCard(+deckId, formData);
      }
      history.push(`/decks/${deckId}`);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error saving card:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          value={formData.front}
          onChange={handleChange}
          rows="3"
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          value={formData.back}
          onChange={handleChange}
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        {isEdit ? 'Save' : 'Submit'}
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>
        Done
      </button>
    </form>
  );
}

export default CardForm;