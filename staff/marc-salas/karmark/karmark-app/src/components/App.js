import React, { useEffect, useContext } from 'react'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Control from './Control'
import Programe from './Programe'
import { registerUser, isLoggedIn, authenticateUser, up, down, right, left, stop, play, logeOut, retrieveUser } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)
  let code = []

  useEffect(() => {
    if (isLoggedIn()) {
        setState({ page: 'login' })

        history.push('/login')

    } else {
      setState({ page: 'login' })

      history.push('/login')
    }
  }, [])

  async function handleRegister(name, surname, username, password) {
    try {
      await registerUser(name, surname, username, password)

      setState({ page: 'login' })
      history.push('/login')
    } catch ({ message }) {
      history.push('/register')
      
      setState({ page: 'register', error: message })
    }
  }

  async function handleLogin(username, password) {
    try {
      await authenticateUser(username, password)

      setState({page: 'home'})
    } catch ({message}) {
      history.push('/login')
      
      setState({ page: 'login', error: message })
    }
  }

  async function handleUp() {
    try {
      await up()

    } catch ({message}) {
      history.push('/control')
      
      setState({ page: 'control', error: message })
    }
  }

  async function handleDown() {
    try {
      await down()

    } catch ({message}) {
      history.push('/control')
      
      setState({ page: 'control', error: message })
    }
  }

  async function handleRight() {
    try {
      await right()

    } catch ({message}) {
      history.push('/control')
      
      setState({ page: 'control', error: message })
    }
  }

  async function handleLeft() {
    try {
      await left()

    } catch ({message}) {
      history.push('/control')
      
      setState({ page: 'control', error: message })
    }
  }

  async function handleStop() {
    try {
      await stop()

    } catch ({message}) {
      history.push('/control')
      
      setState({ page: 'control', error: message })
    }
  }

  async function handleOnPlay() {
    try {
      await play(code)

    } catch ({message}) {
      history.push('/programe')
      setState({ page: 'programe', error: message })
    }
  }

  function handleSaveUp(){
    code.push('up', 'stop')   

  }

  function handleSaveDown(){
    code.push('down', 'stop')
    console.log(code)

  }

  function handleSaveRight(){
    code.push('right', 'stop')     

  }

  function handleSaveLeft(){
    code.push('left', 'stop')     

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

  function handleMountPrograme() {
    setState({ page: 'programe' })
  }

  const { page, error} = state
  debugger
  return <div className="app">
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/register" />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} onGoToLogin={handleGoToLogin} error={error} onMount={handleMountRegister} />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" />: <Login onSubmit={handleLogin} onGoToRegister={handleGoToRegister} error={error} onMount={handleMountLogin}/>} />
      <Route path="/control" render={() => isLoggedIn() ? <Control onUp={handleUp} onDown={handleDown} onRight={handleRight} onLeft={handleLeft} onStop={handleStop} onMount={handleMountControl} onGoToHome={handleGoToHome} error={error} />: <Redirect to="/login" />}/>
      <Route path="/programe" render={() => isLoggedIn() ? <Programe onUp={handleSaveUp} onDown={handleSaveDown} onRight={handleSaveRight} onLeft={handleSaveLeft} onStop={handleStop} onPlay={handleOnPlay} onMount={handleMountPrograme} onGoToHome={handleGoToHome} error={error} />: <Redirect to="/login" />}/>
      <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />
    </Page>
  </div>
})
