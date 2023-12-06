import React, { Fragment, useState } from "react";
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Home from './Home'; // Import the Home component
import Study from '../StudyScreen'; // Import the Study component
import CreateDeck from '../CreateDeckScreen'; // Import the CreateDeck component
import Deck from '../Deck'; // Import the Deck component
import EditDeck from '../EditDeckScreen'; // Import the EditDeck component
import AddCard from '../AddCardScreen'; // Import the AddCard component
import EditCard from '../EditCardScreen'; // Import the EditCard component
import NotFound from './NotFound';
import DeckForm from '../DeckForm'


function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
      <Switch>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
      <Route exact path="/">
          <Home />
        </Route>     
         <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  </div>
  );
}

export default Layout;