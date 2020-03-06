import React, { useState, useEffect } from 'react'
import Register from './register'
import Login from './login'
import Home from './home'
import Page from './Page'
import { authenticateUser, retrieveUser, registerUser } from '../logic'


function App() {

  const [page, setPage] = useState()
  const [user, setUser] = useState()
  const [error, setError] = useState()

  const handleLogin = async (email, password) => {
    try {
      const token = await authenticateUser(email, password)

      sessionStorage.token = token

      const user = await retrieveUser(token)

      setPage('home')
      setUser(user.name)

    } catch ({ message }) {
      setError(message)
    }

  }

  const handleRegister = async (name, surname, email, password) => {
    try {
      await registerUser(name, surname, email, password)

      setPage('login')

    } catch ({ message }) {
      setError(message)
    }
  }

  useEffect(() => {
    (async () => {
      const { token } = sessionStorage

      try {
        if (token) {
          const user = await retrieveUser(token)

          setPage('home')
          setUser(user.name)
        } else {
          setPage('register')
        }

      } catch ({ message }) {
        setError(message)
      }

    })()
  }, [])


  return (
    <div className="App">
      <Page name={page}>
        {page === 'register' && <Register error={error} onSubmit={handleRegister} />}
        {page === 'login' && <Login error={error} onSubmit={handleLogin} />}
        {page === 'home' && <Home name={user} />}
      </Page>
    </div >
  )
}

export default App
