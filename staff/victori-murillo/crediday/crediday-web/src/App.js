import React, { useState, useEffect, useContext } from 'react'
import { Home, Login, Register, Drawer } from './components'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// const jwt = require('jsonwebtoken') 
import jwt from 'jsonwebtoken'
import { Context } from './components/ContextProvider'

export default () => {
  const [view, setView] = useState()
  const { token, setToken } = useContext(Context)

  useEffect(() => {
    try {
      const { session } = sessionStorage
      if (!session) throw new Error('There is not token')
      
      jwt.verify(sessionStorage.session, 'i cant say it')

      setView('drawer')

    } catch (error) {
      const {lastSession} = localStorage

      console.log(error.message)

      if (lastSession) 
        setView('login')
      else
        setView('home')
    }

  })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" >
          {view && <Redirect to={`/${view}`} />}
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/drawer">
          <Drawer />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}