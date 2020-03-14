import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Register } from './src/components'
import { registerUser } from './src/logic'

export default function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [ready, setReady] = useState(false)
  const [view, setView] = useState('register')
  const [error, setError] = useState(null)

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
      
    } catch ({ message }) {
      __handleError__(message)
    }
  }

  return (<View style={styles.container}>
    {view === 'login' && <Login onSubmit={handleLogin} error={error} />}
    {view === 'register' && <Register onSubmit={handleRegister} error={error} />}
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  }
});