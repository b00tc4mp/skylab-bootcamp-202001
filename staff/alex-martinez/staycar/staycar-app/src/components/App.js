import React, { useEffect, useContext } from 'react';
import { login, entryVehicle } from '../logic'
import { Context } from './ContextProvider'

import { Home, Login, EntryVehicle } from '.'

import { Route, withRouter, Redirect } from 'react-router-dom'


export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)

  async function handleLogin(username, password) {
    try {
      await login(username, password)

      history.push('/home')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleEntryVehicle(carPlate) {
    try {
      await entryVehicle(carPlate)

    }catch({message}) {
      setState({ ...state, error: message })
    }
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }
  
  const { error } = state

  return <>
    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
    <Route path="/login" render={() => <> <Login onSubmit={handleLogin} error={error} /> </>}/>
    <Route path="/home" render={() =>  <Home /> }/>
    <Route path="/entrance" render={() => <> <Home /> <EntryVehicle onSubmit={handleEntryVehicle} error={error}/> </>} />
  </>

})


