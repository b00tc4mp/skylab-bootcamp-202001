import './App.sass'
import React, { useState, useEffect } from 'react'
import { Landing, Login, Register, Home, Multiplayer, Create, Join, WaitingRoom, Game } from './'
import { register, login, isLoggedIn, createGame, logout } from '../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [gameId, setGameId] = useState()
  const [error, setError] = useState(undefined)

  async function handleRegister(username, password) {
    try {
      await register(username, password)
        history.push('./landing')
    } catch (error) {
      setError(error.message)
      setTimeout(()=> setError(undefined), 3000)
    }
  }

  async function handleLogin(username, password) {
    try {
      await login(username, password)
        history.push('/home')
    } catch (error) {
      setError(error.message)
      setTimeout(()=> setError(undefined), 3000)
    }
  }

  async function handleCreateGame(name, owner) {
    try {
      await createGame(name, owner)
        history.push('/multiplayer')
    } catch (error) {
      setError(error.message)
      setTimeout(()=> setError(undefined), 3000)    }
  }

  async function handleJoin(gameId) {
    try {
      setGameId(gameId)
        history.push('/waiting')
    } catch (error) {
        setError(error.message)
        setTimeout(()=> setError(undefined), 3000)
    }
  }

  function goTo(props) {
    if (props === 'logout') {
      logout()
      history.push('/landing')
    } else history.push(`/${props}`)
  }

  return <div className="app">
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/landing" />} />
      <Route path="/landing" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Landing goTo={goTo} />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} goTo={goTo} error={error} />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} goTo={goTo} error={error}/>} />
      <Route path="/home/" render={() => isLoggedIn() ? <Home goTo={goTo} /> : <Redirect to="/landing" />} />
      <Route path="/multiplayer" render={() => isLoggedIn() ? <Multiplayer goTo={goTo} /> : <Redirect to="/landing" />} />
      <Route path="/create" render={() => isLoggedIn() ? <Create handleCreateGame={handleCreateGame} goTo={goTo}/> : <Redirect to="/landing" />} />
      <Route path="/join" render={() => isLoggedIn() ? <Join handleJoin={handleJoin} goTo={goTo} /> : <Redirect to="/landing" />} />
      <Route path="/waiting" render={() => isLoggedIn() ? <WaitingRoom gameId={gameId} goTo={goTo}/> : <Redirect to="/landing" />} />
      <Route path="/game" render={() => isLoggedIn() ? <Game goTo={goTo}/> : <Redirect to="/landing" />} />
  </div>
})