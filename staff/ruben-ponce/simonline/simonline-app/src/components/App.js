import React, { useState, Fragment } from 'react'
import { Landing, Login, Register } from './'
import './App.sass'
import { authenticate, registerUser, retrieveUser, retrieveUserId } from '../logic'


function App() {

  const [view, setView] = useState('landing')
  const [token, setToken] = useState()
  const [user, setUser] = useState('rpxic')
  const [userId, setUserId] = useState()
  const [error, setError] = useState(undefined)


  async function handleLogin(username, password) {
    try {
      const auth = await authenticate(username, password)

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
      const register = await registerUser(username, password)

      setView('login')

      return register
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


  return (
    <Fragment>

      {view === 'landing' && <Landing goToLogin={handleGoToLogin} goToRegister={handleGoToRegister}/>}

      {view === 'login' && <Login onSubmit={handleLogin} goToRegister={handleGoToRegister} />}

      {view === 'register' && <Register onSubmit={handleRegister} goToLogin={handleGoToLogin} />}

    </Fragment>

  )
}

export default App;
