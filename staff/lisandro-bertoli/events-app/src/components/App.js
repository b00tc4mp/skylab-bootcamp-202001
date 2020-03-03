import React, { useState } from 'react'
import Register from './register'
import Login from './login'
import Home from './home'
import { authenticateUser, retrieveUser, registerUser } from '../logic'


function App() {

  const [view, setView] = useState('register')
  const [user, setUser] = useState()

  const handleLogin = (email, password) => {
    authenticateUser(email, password)
      .then(token => {
        sessionStorage.token = token
        return retrieveUser(token)
          .then(({ name }) => {
            setView('home')
            setUser(name)

          })
      })
      .catch(error => console.log(error))

  }

  const handleRegister = (name, surname, email, password) => {
    registerUser(name, surname, email, password)
      .then(() => {
        setView('login')
      })
  }


  return (
    <div className="App">
      <h1>Events-App</h1>
      {view === 'register' && <Register onSubmit={handleRegister} />}
      {view === 'login' && <Login onSubmit={handleLogin} />}
      {view === 'home' && <Home name={user} />}
    </div >
  )
}

export default App
