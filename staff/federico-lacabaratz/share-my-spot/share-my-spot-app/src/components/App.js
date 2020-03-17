import React, { useState, Fragment } from 'react'
import Register from './Register'
import Login from './Login'
// import Search from './search'
import { registerUser, authenticateUser, retrieveUser } from '../logic'

function App() {

  const [view, setView] = useState('login')
  const [noError, setError] = useState(undefined)
  const [data, setData] = useState(undefined)

  const __handleError__ = (error) => {
    if (error) setError({ error: error.message })
    else setError({ error: "Not answer" })
    setTimeout(() => {
      setError({ error: noError })
    }, 3000)
  }

  const handleRegister = async (name, surname, email, password) => {
    try {
      await registerUser(name, surname, email, password)
      return await setView('login')
      
    } catch (error) {
      return __handleError__(error)
    }
  }

  const handleLogin = async (email, password) => {
    try {
      const token = await authenticateUser(email, password)
      sessionStorage.token = token

      const data = await retrieveUser(token)
      setData(data)

      return await setView('search')

    } catch (error) {
      return __handleError__(error)

    }
  }

  const handleGoToRegister = async () => {
    await setView('register')
  }

  const handleGoToLogin = async () => {
    await setView('login')
  }


  return <Fragment>
    {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} />}
    {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} />}
    {/* {view === 'search' && <Home userData={data} />} */}
  </Fragment>

}

export default App
