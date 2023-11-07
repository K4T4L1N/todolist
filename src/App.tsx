import React from 'react';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Navbar from './components/Navbar';
import TodosPage from './components/TodosPage';

function App() {
  return (
    <BrowserRouter>
    <Route>
      <Navbar />
      <Routes>
        <Route path="/">
          <TodosPage />
        </Route>
      </Routes>
    </Route>
    </BrowserRouter>
  );
}

export default App;
