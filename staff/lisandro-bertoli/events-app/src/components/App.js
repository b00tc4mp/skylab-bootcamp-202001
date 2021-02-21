import React, { useEffect, useContext } from 'react'
import Register from './register'
import Login from './login'
import Home from './home'
import Page from './Page'
import { login, registerUser, isLoggedIn } from '../logic'
import { Context } from './ContextProvider'


function App() {
  const [state, setState] = useContext(Context)

  useEffect(() => {
    (async () => {
      try {
        if (isLoggedIn()) {
          setState({ page: 'home' })
        } else {
          setState({ page: 'login' })
        }

      } catch ({ message }) {
        setState({ error: message })
      }
    })()
  }, [])

  const handleLogin = async (email, password) => {
    try {
      await login(email, password)

      setState({ page: 'home' })

    } catch ({ message }) {
      setState({ error: message })

    }

  }

  const handleRegister = async (name, surname, email, password) => {
    try {
      await registerUser(name, surname, email, password)

      setState({ page: 'login' })

    } catch ({ message }) {
      setState({ error: message })
    }
  }

  const handleGoToRegister = () => {
    setState({ page: 'register', error: undefined })
  }

  const handleGoToLogin = () => {
    setState({ page: 'login', error: undefined })
  }

  const { page, error } = state
  return (

    <div className="App">
      <Page name={page}>
        {page === 'register' && <Register error={error} onSubmit={handleRegister} onToLogin={handleGoToLogin} />}
        {page === 'login' && <Login error={error} onSubmit={handleLogin} onToRegister={handleGoToRegister} />}
        {page === 'home' && <Home />}
      </Page>
    </div >
  )
}

export default App
