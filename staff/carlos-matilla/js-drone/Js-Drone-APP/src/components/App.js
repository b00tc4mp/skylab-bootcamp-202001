import React, { useEffect, useState, useContext } from 'react'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'
import {Home, Page, Login, Register} from './'
import {login, registerUser, isLoggedIn} from './../logic'





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


  async function handleRegister(name, surname, email, password) {
    try {
      await registerUser(name, surname, email, password)

      history.push('/login')
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleLogin(email, password) {
    try {
      await login(email, password)

      history.push('/home')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  function handleGoToLogin() {
    history.push('/login')
  }

  function handleGoToRegister() {
    history.push('/register')
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }



  const { page, error } = state

  return <>
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />
    </Page>
  </>
})