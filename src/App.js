/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import Header from './containers/Header';
import LoginDialogSlide from './containers/LoginDialogSlide';
import routes from './routes';

function App() {
  const elements = useRoutes(routes);
  return (
    <div className="App">
      <Header />
      <LoginDialogSlide />
      {elements}
    </div>
  );
}

export default App;
