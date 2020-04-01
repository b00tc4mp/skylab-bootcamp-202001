import React, { useState, useEffect } from "react"
import './App.sass'
import { RegisterUser, Login, Home, Feedback, Events } from "./"
import {
  registerUser,
  authenticateUser,
  retrieveLastEvents,
  publishEvent
} from "../logic"

function App() {
  const [view, setView] = useState("login")
  const [error, setError] = useState()
  const [lastEvents, setLastEvents] = useState()

  useEffect(() => {
    setTimeout(() => setError(), 3000)
  }, [error])

  useEffect(() => {
    const {token} = sessionStorage

    if(token) {
      setView('home')

    } else {
      setView('login')
    }
  })

  async function handleRegister(name, surname, email, password) {
    try {
      await registerUser(name, surname, email, password)
      setView("login")
    } catch (error) {
      setError(error.message)
    }
  }

  function handleLogin(email, password) {
    try {
      return authenticateUser(email, password)
        .then(token => (sessionStorage.token = token))
        .then(() => setView("home"))
        .catch(error => {
          return setError(error.message)
        })
    } catch (error) {
      setError(error.message)
    }
  }

  function handleLastEvents() {
    try {
      return retrieveLastEvents().then(events => {
        console.log(events)
        return setLastEvents(events)
      })
    } catch (error) {
      setError(error.message)
    }
  }

  const handlePublishEvent = async newEvent => {
    try {
      const { token } = sessionStorage
      await publishEvent(token, newEvent)
      handleLastEvents()
    } catch (error) {
      //setError(error.message)
    }
  }

  return (
    <div className="App">
      <h1>Events App</h1>
      {view === "register" && (
        <RegisterUser
          onSubmit={handleRegister}
          setView={setView}
          error={error}
        />
      )}
      {view === "login" && (
        <Login onSubmit={handleLogin} setView={setView} error={error} />
      )}
      {view === "home" && (
        <Home lastEvents={handleLastEvents} createEvent={handlePublishEvent} />
      )}
      {lastEvents && <Events results={lastEvents} />}
    </div>
  )
}

export default App
