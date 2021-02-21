import React, { useState, useEffect, useContext } from 'react'
import { Home, Login, Register } from './components/containers'
import { Drawer } from './components/presentational'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Context } from './components/containers/ContextProvider'
import RecoverPassword from './components/containers/recover-password/RecoverPassword'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET

export default () => {
  const [view, setView] = useState()
  const { token } = useContext(Context)

  function verifyToken() {
    try {
      if (!token) throw new Error("Token not found")
      jwt.verify(token, JWT_SECRET)
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
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/drawer">
          {verifyToken() ? <Drawer view='customers' /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/drawer/customers">
          {verifyToken() ? <Drawer view='customers' /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/drawer/credits">
          {verifyToken() ? <Drawer view='credits' /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/drawer/collect">
          {verifyToken() ? <Drawer view='collect' /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/drawer/report">
          {verifyToken() ? <Drawer view='report' /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/drawer/dashboard">
          {verifyToken() ? <Drawer view='dashboard' /> : <Redirect to="/login" />}
        </Route>
        <Route>
          <Redirect to={`/home`} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}