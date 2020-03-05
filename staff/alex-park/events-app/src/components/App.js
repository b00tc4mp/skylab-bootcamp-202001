import React, { useState } from 'react'
import logo from './logo.svg'
import './App.sass'
import { Login, Register, Home, LastEvents } from '.'
import { registerUser, authenticateUser, retrieveUser, retrieveLastEvents } from '../logic'

function App() {
  const [view, setView] = useState('login')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [lastEvents, setLastEvents] = useState(undefined)

  function __handleError__(error) {
    setError(error)

    setTimeout(() => {
      setError('')
    }, 3000)
  }

  function handleGoToRegister() { setView('register') }
  function handleGoToLogin() { setView('login') }

  function handleLogin(email, password) {
    (async () => {
      try {
        const token = await authenticateUser(email, password)

        const user = await retrieveUser(token)
        setName(user.name)
        return setView('home')
        
      } catch ({ message }) {
        return __handleError__(message)
      }
    })();
  }

  function handleRegister(name, surname, email, password) {
    (async () => {
      try {
        await registerUser(name, surname, email, password)
        
        setView('login')
        
      } catch ({ message }) {
        if (message) __handleError__(message)
      }
    })();
  }

  function handlePublishEvent() { }

  function handleLastEvents() {
    try {
      return retrieveLastEvents()
        .then(events => setLastEvents(events))
        .catch(error => {
          if (error) return __handleError__(error.message)
        })
    } catch ({ message }) {
      return __handleError__(message)
    }
  }

  return (
    <div className="App">

      <img src={logo} className="App-logo" alt="logo" />

      {view === 'login' && <Login onToRegister={handleGoToRegister} onSubmit={handleLogin} error={error} />}
      {view === 'register' && <Register onToLogin={handleGoToLogin} onSubmit={handleRegister} error={error} />}
      {view === 'home' && <Home error={error} name={name} onPublishEvent={handlePublishEvent} onRetrieveLastEvents={handleLastEvents} />}
      {lastEvents && <LastEvents results={lastEvents} />}
    </div>
  )
}

export default App
