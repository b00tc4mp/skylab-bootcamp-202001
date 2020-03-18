import React, { useState, Fragment, useEffect, useContext  } from 'react'

import { Landing, Login, Register, Home, Multiplayer, Create, Join, Page } from './'
import './App.sass'
import { login, register, retrieveUser, retrieveUserId, isLoggedIn, logout } from '../logic'
import { Context } from './ContextProvider'

function App() {

  const [state, setState] = useContext(Context)

  useEffect(() => {
    isLoggedIn() ? setView('home') : setView('join')
  }, [])

  const [view, setView] = useState('landing')
  const [token, setToken] = useState()
  const [user, setUser] = useState('rpxic')
  const [userId, setUserId] = useState()
  const [error, setError] = useState(undefined)

  async function handleLogin(username, password) {
    try {
      const auth = await login(username, password)

      const token = await auth

      setToken(token)

      const userId = retrieveUserId(token)
      setUserId(userId)

      const user = await retrieveUser(token)

      const change = await setUser(user)

      if (!user.error)
        setView('home')

      return change

    } catch (error) {
      setError(error.message)
      setTimeout(()=> setError(undefined), 3000)
    }
  }

  async function handleRegister(username, password) {
    try {
      const registerUser = await register(username, password)

      setView('login')

      return registerUser
    }
    catch (error) {
      setError(error.message)
      setTimeout(()=> setError(undefined), 3000)
    }
  }

  function handleGoToRegister() {
    setView('register')
  }

  function handleGoToLogin() {
    setView('login')
  }

  function handleGoToLanding() {
    setView('landing')
  }


  return (
    <Fragment>

      {view === 'landing' && <Landing goToLogin={handleGoToLogin} goToRegister={handleGoToRegister}/>}

      {view === 'login' && <Login onSubmit={handleLogin} goToRegister={handleGoToRegister} goToLanding={handleGoToLanding} error={error} />}

      {view === 'register' && <Register onSubmit={handleRegister} goToLogin={handleGoToLogin} goToLanding={handleGoToLanding} error={error} />}

      {view === 'home' && <Home />}

      {view === 'multiplayer' && <Multiplayer />}

      {view === 'create' && <Create />}

      {view === 'join' && <Join />}

    </Fragment>

  )
}

export default App;
