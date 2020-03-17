import React, { useEffect, useContext } from 'react'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Control from './Control'
import { registerUser, isLoggedIn, authenticateUser, up, down, right, left, stop } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)

  useEffect(() => {
    if (isLoggedIn()) {
      setState({ page: 'home' })

      history.push('/home')
    } else {
      setState({ page: 'login' })

      history.push('/login')
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

      setState({page: 'home'})
    } catch ({message}) {
      setState({ error: message })
    }
  }

  async function handleUp() {
    try {
      await up()

    } catch ({message}) {
      console.log(message)
      setState({ error: message })
    }
  }

  async function handleDown() {
    try {
      await down()

    } catch ({message}) {
      setState({ error: message })
    }
  }

  async function handleRight() {
    try {
      await right()

    } catch ({message}) {
      setState({ error: message })
    }
  }

  async function handleLeft() {
    try {
      await left()

    } catch ({message}) {
      setState({ error: message })
    }
  }

  async function handleStop() {
    try {
      await stop()

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

  function handleGoToHome() {
    history.push('/home')
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }

  function handleMountControl() {
    setState({ page: 'control' })
  }

  const { page, error } = state

  return <div className="app">
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/register" />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} onGoToLogin={handleGoToLogin} error={error} onMount={handleMountRegister} />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" />: <Login onSubmit={handleLogin} onGoToRegister={handleGoToRegister} error={error} onMount={handleMountLogin}/>} />
      <Route path="/Control" render={() => isLoggedIn() ? <Control onUp={handleUp} onDown={handleDown} onRight={handleRight} onLeft={handleLeft} onStop={handleStop} onMount={handleMountControl} onGoToHome={handleGoToHome} />: <Redirect to="/login" />}/>
      <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />
    </Page>
  </div>
})
