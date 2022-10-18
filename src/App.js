/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import Header from './containers/Header';
import routes from './routes';

function App() {
  const elements = useRoutes(routes);
  return (
    <div className="App">
      <Header />
      {elements}
    </div>
  );
}

export default App;
