import { Context } from './ContextProvider'
import './App.sass'
import React, { useState, useEffect, useContext } from 'react'
import { Landing, Login, Register, Home, Multiplayer, Create, Join, WaitingRoom } from './'
import { register, login, isLoggedIn, createGame, retrieveUserId, retrieveGames, join, logout } from '../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)

  const [games, setGames] = useState()
  const [userId, setUserId] = useState()
  const [players, setPlayers] = useState()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (isLoggedIn()) {
      history.push('/home')
    } else {
      history.push('/landing')
    }
  }, [])

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
    } catch ({ message }) {
        setState({ ...state, error: message })
    }
  }

  async function handleJoin(gameId) {
    try {
      debugger
        const game = await retrieveGames()

        const userId = await retrieveUserId(sessionStorage.token)
        
        const _players = await join(userId, gameId)
        setPlayers(_players)

        history.push('/waiting')
    } catch ({ message }) {
        setError(message)
    }
  }

  function goLogin() {
    history.push('/login')
  }

  function goRegister() {
    history.push('/register')
  }

  function goLanding() {
    history.push('/landing')
  }

  function goHome() {
    history.push('/home')
  }

  function goMultiplayer() {
    history.push('/multiplayer')
  }

  function goJoin() {
    history.push('/join')
  }

  function goCreate() {
    history.push('/create')
  }

  function handleLogout() {
    logout()
    history.push('/landing')
  }

  // const { error } = state

  return <div className="app">
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/landing" />} />
      <Route path="/landing" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Landing goLogin={goLogin} goRegister={goRegister} />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} goLogin={goLogin} goLanding={goLanding}/>} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} goRegister={goRegister} goLanding={goLanding}/>} />
      <Route path="/home/" render={() => isLoggedIn() ? <Home handleLogout={handleLogout} goMultiplayer={goMultiplayer} /> : <Redirect to="/landing" />} />
      <Route path="/multiplayer" render={() => isLoggedIn() ? <Multiplayer handleLogout={handleLogout} goHome={goHome} goJoin={goJoin} goCreate={goCreate}/> : <Redirect to="/landing" />} />
      <Route path="/create" render={() => isLoggedIn() ? <Create handleCreateGame={handleCreateGame} /> : <Redirect to="/landing" />} />
      <Route path="/join" render={() => isLoggedIn() ? <Join handleLogout={handleLogout} goMultiplayer={goMultiplayer} handleJoin={handleJoin}/> : <Redirect to="/landing" />} />
      <Route path="/waiting" render={() => isLoggedIn() ? <WaitingRoom players={players} goMultiplayer={goMultiplayer} handleLogout={handleLogout}/> : <Redirect to="/landing" />} />
  </div>
})