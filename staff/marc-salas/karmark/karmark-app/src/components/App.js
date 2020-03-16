import React, { useEffect, useContext } from 'react'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import { registerUser, isLoggedIn, authenticateUser } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)

  useEffect(() => {
    if (isLoggedIn()) {
      setState({ page: 'home' })

      history.push('/home')
    } else {
      setState({ page: 'register' })

      history.push('/register')
    }
  }, [])

  async function handleRegister(name, surname, username, password) {
    try {
      await registerUser(name, surname, username, password)

      setState({ page: 'login' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleLogin(username, password) {
    try {
      await authenticateUser(username, password)

    } catch ({message}) {
      setState({ error: message })
    }
  }

  function handleGoToLogin() {
    history.push('/login')
  }

  function handleGoToRegister() {
    history.push('/register')
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }

  const { page, error } = state

  return <div className="app">
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/register" />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} onGoToLogin={handleGoToLogin} error={error} onMount={handleMountRegister} />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" />: <Login onSubmit={handleLogin} onGoToRegister={handleGoToRegister} error={error} onMount={handleMountLogin}/>} />
    </Page>
  </div>
})
