import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import TodosPage from './components/TodosPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <TodosPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
