import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readDeck, createDeck, updateDeck } from './utils/api/index';

function DeckForm({ isEdit }) {
  const { deckId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (isEdit) {
      const loadDeck = async () => {
        try {
          const loadedDeck = await readDeck(deckId);
          setFormData({ name: loadedDeck.name, description: loadedDeck.description });
        } catch (error) {
          // Handle error (e.g., display an error message)
          console.error('Error loading deck:', error);
        }
      };

      loadDeck();
    }
  }, [deckId, isEdit]);

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
        await updateDeck({ ...formData, id: deckId });
      } else {
        await createDeck(formData);
      }
      history.push('/');
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error saving deck:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3> Create Deck</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        {isEdit ? 'Save' : 'Submit'}
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => history.push('/')}>
        Cancel
      </button>
    </form>
  );
}

export default DeckForm;