import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <header className="App-header">
        <h1>Simonline</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <a href="#">Login</a>
        <a href="#">Register</a>
      </header>
    </div>
  );
}

export default App;
