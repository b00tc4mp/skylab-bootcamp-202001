import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.sass'
import { Login, Register } from '.'
import { registerUser, authenticateUser, retrieveUser } from '../logic'

function App({name}) {
  const [view, setView] = useState('login')
  let userName
  function handleGoToRegister() { setView('register') }
  function handleGoToLogin () { setView('login') }

  function handleLogin (email, password) {
    return authenticateUser(email, password)
    .then(token => retrieveUser(token))
    .then(user => {
      userName = user.name
      setView('home')
    })
  }

  function handleRegister (name, surname, email, password) { debugger
    return registerUser(name, surname, email, password)
    .then(() => { 
      alert('successfully registered!')
      setView('login')
    })
  }

  return (
    <div className="App">
      <h1>Hello, {name}!</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {view === 'login' && <Login onToRegister={handleGoToRegister} onSubmit={handleLogin}/>}
      {view === 'register' && <Register onToLogin={handleGoToLogin} onSubmit={handleRegister}/>}
      {view === 'home' && <h2>Hola, {userName}</h2> }
    </div>
  )
}

export default App
