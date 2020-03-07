import React, { useEffect, useState, useContext } from 'react'
import './App.sass'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { isLoggedIn, registerUser, login } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  // const [view, setView] = useState('login')
  // const [name, setName] = useState('')
  // const [error, setError] = useState('')
  // const [lastEvents, setLastEvents] = useState(undefined)
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

      setState({ page: 'login' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleLogin(email, password) {
    try {
      await Login(email, password)

      history.push('/home')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  // function __handleError__(error) {
  //   setError(error)

  //   setTimeout(() => {
  //     setError('')
  //   }, 3000)
  // }

  function handleGoToRegister() { history.push('/register') }
  function handleGoToLogin() { history.push('/login') }
  function handleMountLogin() { setState({ page: 'login' }) }
  function handleMountRegister() { setState({ page: 'register' }) }

  const { page, error } = state

  // function handleLogin(email, password) {
  //   (async () => {
  //     try {
  //       const token = await authenticateUser(email, password)

  //       const user = await retrieveUser(token)
  //       setName(user.name)
  //       return setView('home')

  //     } catch ({ message }) {
  //       return __handleError__(message)
  //     }
  //   })();
  // }

  // function handleRegister(name, surname, email, password) {
  //   (async () => {
  //     try {
  //       await registerUser(name, surname, email, password)

  //       setView('login')

  //     } catch ({ message }) {
  //       if (message) __handleError__(message)
  //     }
  //   })();
  // }

  // function handlePublishEvent() { }

  // function handleLastEvents() {
  //   try {
  //     return retrieveLastEvents()
  //       .then(events => setLastEvents(events))
  //       .catch(error => {
  //         if (error) return __handleError__(error.message)
  //       })
  //   } catch ({ message }) {
  //     return __handleError__(message)
  //   }
  // }

  return <div className='app'>
    <Page name={page}>
      <Route exact path='/' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Redirect to='/login' />} />
      <Route path="/home/:id" render={props => <h1>{props.match.params.id}</h1>} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home"/> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister}/>}/>
      <Route path="login" render={() => isLoggedIn() ? <Redirect to="/home"/> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />}/>
      <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to='/login'/> }/>
    </Page>
  </div>
  // <div className="App">

  //   <img src={logo} className="App-logo" alt="logo" />

  //   {view === 'login' && <Login onToRegister={handleGoToRegister} onSubmit={handleLogin} error={error} />}
  //   {view === 'register' && <Register onToLogin={handleGoToLogin} onSubmit={handleRegister} error={error} />}
  //   {view === 'home' && <Home error={error} name={name} onPublishEvent={handlePublishEvent} onRetrieveLastEvents={handleLastEvents} />}
  //   {lastEvents && <LastEvents results={lastEvents} />}
  // </div>

}
