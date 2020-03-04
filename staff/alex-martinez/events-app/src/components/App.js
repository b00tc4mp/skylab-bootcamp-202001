import React, { useState } from 'react';
import RegisterUser from './register-user'

function App() {

  const [ view, setView] = useState('register')

  return (
    <div className="App">
      <h1>Events App</h1>
      { view === 'register' && <RegisterUser /> }
    </div>
  );
}

export default App;
