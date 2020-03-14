import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import {
  Register,
  Login
} from './src/components'

import {
  registerUser,
  authenticateUser
} from './src/logic'

export default function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [ready, setReady] = useState(false)
  const [view, setView] = useState('register')
  const [error, setError] = useState(null)
  const [token, setToken] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setLatitude(pos.coords.latitude)
      setLongitude(pos.coords.longitude)
    })
  })

  function __handleError__(message) {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }
  // BASIC FUNCTIONS
  async function handleRegister(name, surname, email, password, age, gender) {
    try {
      await registerUser(name, surname, email, password, age, gender)
      setView('login')

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  async function handleLogin(email, password) {
    try {
      const response = await authenticateUser(email, password)
      setToken(response)
      setView('landing')
    } catch ({ message }) {
      __handleError__(message)
    }
  }

  // ROUTE FUNCTIONS
  function handleGoToLogin() {
    setView('login')
  }

  function handleGoToRegister() {
    setView('register')
  }

  // THE RENDER ITSELF
  return (<View style={styles.container}>
    {view === 'login' && <Login onSubmit={handleLogin} error={error} goToRegister={handleGoToRegister} />}
    {view === 'register' && <Register onSubmit={handleRegister} error={error} goToLogin={handleGoToLogin} />}
    {view === 'landing' && <Text style={{ fontSize: 40, textAlign: 'center', marginTop: 100 }}>CONGRATULATIONS REACHING THIS POINT!</Text>}
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  }
});