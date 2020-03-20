import React, { useEffect, useContext, useState } from 'react';
import { isLoggedIn, login, entryVehicle, createParking, retrieveTicket, retrieveParking } from '../logic'
import { Context } from './ContextProvider'

import './style/App.sass'

import { Home, Login, EntryVehicle, Config, CreateParking, Atm, Map } from '.'

import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)

  const [dataTicket, setDataTicket ] = useState()

  function __handleError__(error) {
      
      setState({...state, error: error.message })

      setTimeout(() => {
        setState({ error: undefined })
      }, 3000)
  
  }

  useEffect(() => {
    if (isLoggedIn()) {

      (async () => {
        try {
            await retrieveParking()
            history.push('/config')

        } catch ({ message }) {
            setState({ error: message })
        }
    })()
  
    } else {
    
      history.push('/login')
    }
  }, [])



  async function handleLogin(username, password) {
    try {
      await login(username, password)

      history.push('/home')
      
    } catch (error) {

      //setState({...state, stateLogin: false})
      
       __handleError__(error)
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

  async function handleAtm(carPlate) {
    try{
      const infoTicket = await retrieveTicket(carPlate)
      setDataTicket(infoTicket)
      debugger

    }catch(error){
      return __handleError__(error)
    }
  }
  
  const { error } = state
  
  return <div className="app">
    <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home"/> : <Redirect to="/login"/>}/>
    <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home"/> : <Login onSubmit={handleLogin} error={error} /> }/>
    <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />}/>
    <Route path="/entrance" render={() => isLoggedIn() ? <> <Home error={error} /> <EntryVehicle onSubmit={handleEntryVehicle} error={error}/> </> : <Redirect to="/login"/>} />
    <Route path="/config" render={() => isLoggedIn() ? <Config /> : <Redirect to="/login" /> } />
    <Route path="/create" render={() => isLoggedIn() ? <> <Config /> <CreateParking onSubmit={handleCreateParking} error={error} /> </> : <Redirect to="/login" />}/>
    <Route path="/atm" render={() => isLoggedIn() ? <> <Home /> <Atm onSubmit={handleAtm} infoTicket={dataTicket} error={error}/> </> : <Redirect to="/login"/>} />
    <Route path="/map" render= {() => isLoggedIn() ? <> <Home/> <Map/> </> : <Redirect to="/login" />}/>
    </div>

})

