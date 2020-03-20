import React, { useState, useEffect, useContext } from 'react'
import { Home, Login, Register } from './components'
import { Drawer } from './components/presentational'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Context } from './components/ContextProvider'

import RecoverPassword from './components/recover-password/RecoverPassword'
// import Calendar from './components/calendar/Calendar'

import jwt from 'jsonwebtoken'

// const { env: { REACT_APP_JWT_SECRET: JWT_SECRET } } = process
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET

export default () => {
  const [view, setView] = useState()

  useContext(Context)

  function verifyToken() {
    try {
      const { session } = sessionStorage

      if (!session) throw new Error("theres no session in session storage")
      jwt.verify(session, JWT_SECRET)
      return true

    } catch (error) {

      sessionStorage.clear()
      return false
    }
  }

  useEffect(() => {
    try {
      const { session } = sessionStorage
      if (!session) throw new Error('There is not token in session storage')

      verifyToken()
      setView('drawer')

    } catch (error) {
      const { lastSession } = localStorage

      // go to login or Home (public routes)
      lastSession ? setView('login') : setView('home')
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

        <Route exact path="/password" component={RecoverPassword} />

        <Route exact path="/login/:companyId" component={Login} />

        {/* <Route exact path="/calendar" component={Calendar} /> */}

        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/drawer">
          {verifyToken() ? <Drawer /> : <Redirect to="/login" />}
        </Route>
        <Route>
          <Redirect to={`/home`} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}