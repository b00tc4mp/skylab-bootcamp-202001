import React, { useEffect, useContext } from 'react';
import { login, entryVehicle, createParking } from '../logic'
import { Context } from './ContextProvider'
import { isLoggedIn } from '../logic'

import { Home, Login, EntryVehicle, Config, CreateParking } from '.'

import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)

  function __handleError__(error) {
      
      setState({...state, error: error.message })

      setTimeout(() => {
        setState({ error: undefined })
      }, 3000)
  
  }

  useEffect(() => {
    if (isLoggedIn()) {
      
      history.push('/home')
    } else {
    
      history.push('/login')
    }
  }, [])

  async function handleLogin(username, password) {
    try {
      await login(username, password)

      history.push('/home')
    } catch (error) {
      
      return __handleError__(error)
    }
  }


  async function handleCreateParking(parkingName, rate, totalLots){
    
    try{
     
      await createParking(parkingName, rate, totalLots)
      
      history.push('/home')
    
    }catch(error){
      
      return __handleError__(error)
    }
  }

  async function handleEntryVehicle(carPlate) {
    try {
      await entryVehicle(carPlate)
    
    }catch(error) {
      return __handleError__(error)
    }
  }

  
  const { error } = state

  return <>
    <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home"/> : <Redirect to="/login"/>}/>
    <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home"/> : <Login onSubmit={handleLogin} error={error} /> }/>
    <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />}/>
    <Route path="/entrance" render={() => isLoggedIn() ? <> <Home /> <EntryVehicle onSubmit={handleEntryVehicle} error={error}/> </> : <Redirect to="/login"/>} />
    <Route path="/config" render={() => isLoggedIn() ? <Config /> : <Redirect to="/login" /> } />
    <Route path="/create" render={() => isLoggedIn() ? <> <Config /> <CreateParking onSubmit={handleCreateParking} error={error} /> </> : <Redirect to="/login" />}/>
  </>

})


