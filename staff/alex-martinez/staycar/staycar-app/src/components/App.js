import React, { useEffect, useContext } from 'react';
import { login, isLoggedIn } from '../logic'
import { Context } from './ContextProvider'

import { Home, Login, EntryCar } from '.'

import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)

  /* useEffect(() => {
    if (isLoggedIn()) {
      setState({page: 'home'})

      history.push('/home')
    } else {
      setState({page:'home'})

      history.push('/home')
    }
  }, []) */

  async function handleLogin(username, password) {
    try {
      await login(username, password)

      history.push('/home')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }
  
  const { error } = state

  return <>
    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
    <Route path="/login" render={() => <> <Login onSubmit={handleLogin} error={error} onMount={handleMountLogin} /> </>}/>
    <Route path="/home" render={() =>  <Home /> }/>
    <Route path="/entrance" render={() => <> <Home /> <EntryCar /> </>} />
  </>

})


