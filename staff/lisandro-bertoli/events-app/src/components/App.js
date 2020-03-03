import React, { useState } from 'react'
import Register from './register'

function App() {

  const [view, setView] = useState('register')

  const changeView = (newView) => {

    setView(newView)
  }

  return (
    <div className="App">
      <h1>Events-App</h1>
      {view === 'register' && <Register onToLogin={changeView} />}
      {view === 'login' && <h2>Login</h2>}
    </div >
  )
}

export default App
