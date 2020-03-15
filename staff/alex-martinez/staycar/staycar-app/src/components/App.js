import React, { useEffect, useContext } from 'react';
import { isLoggedIn } from '../logic'
import { Context } from './ContextProvider'

import { Header, Home, Map, EntryCar, ExitCar, Report, Login } from '.'

import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function({history}) {

  const [state, setState] = useContext(Context)

  /* useEffect(() => {
    if (isLoggedIn()) {
      setState({ page: 'home' })

      history.push('/home')
    } else {
      setState({ page: 'login' })

      history.push('/login')
    }
  }, []) */

  return <div>

    <Header />
    <Home />
    <EntryCar />
  </div>
    
  
})


