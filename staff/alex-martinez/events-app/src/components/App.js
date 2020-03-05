import React, { useState, useEffect } from 'react'
import Register from './register'
import Login from './login'
import Home from './home'
import { authenticateUser, retrieveUser, registerUser } from '../logic'


function App() {

  const [view, setView] = useState('login')
  const [user, setUser] = useState()

  const handleLogin = async (email, password) => {
    try {
      const token = await authenticateUser(email, password)

      sessionStorage.token = token

      const user = await retrieveUser(token)

      setView('home')
      setUser(user.name)

    } catch (error) {
      console.log(error.message)
    }

  }

  const handleRegister = async (name, surname, email, password) => {
    try {
      await registerUser(name, surname, email, password)
      debugger
      setView('login')

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    (async () => {
      const { token } = sessionStorage

      try {
        if (token) {
          const user = await retrieveUser(token)

          setView('home')
          setUser(user.name)
        } else {
          setView('login')
        }

      } catch (error) {
        console.log(error.message)
      }

    })()
  }, [])


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
