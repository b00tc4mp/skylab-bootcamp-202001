import React from 'react'
import { Home, Login, Register, Dashboard } from './components'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

function isLoggedIn() {
  console.log(localStorage)
}

export default () => {
  isLoggedIn()

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" >
          {true ? <Redirect to="/login" /> : <Home />}
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
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}