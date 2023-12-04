import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Home from './Home'; // Import your Home component
import Study from './Study'; // Import your Study component
import CreateDeck from './CreateDeck'; // Import your CreateDeck component
import Deck from './Deck'; // Import your Deck component
import EditDeck from './EditDeck'; // Import your EditDeck component
import AddCard from './AddCard'; // Import your AddCard component
import EditCard from './EditCard'; // Import your EditCard component
import NotFound from './NotFound';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

