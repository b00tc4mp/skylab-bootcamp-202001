import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground, ScrollView } from 'react-native';
import {
  Register,
  Login,
  Landing,
  NavigationBarTop,
  NavigationBarBottom,
  QueryResults
} from './src/components'

import {
  registerUser,
  authenticateUser,
  retrieveUser
} from './src/logic'

export default function App() {
  const [latitude, setLatitude] = useState()
  const [latDelta, setLatDelta] = useState(0.001922)
  const [longitude, setLongitude] = useState()
  const [lngDelta, setLngDelta] = useState(0.000821)
  const [view, setView] = useState('login')
  const [error, setError] = useState(null)
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const [goLanding, setGoLanding] = useState(false)
  const [query, setQuery] = useState()

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

      const retrievedUser = await retrieveUser(response)
      setUser(retrievedUser)
      setToken(response)
      setGoLanding(true)
      setView('landing')


    } catch ({ message }) {
      __handleError__(message)
    }
  }

  async function handleQuerySearch(_query) {
    try {
      if (!_query || typeof _query === 'undefined') {
        await Alert.alert('You have not added any text 🚽...')
        
      } else {
        await setQuery(_query)
        await setView('queryResults')
      }

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  // ROUTE FUNCTIONS
  function handleGoToLogin() {
    setGoLanding(false)
    setError(null)
    setToken()
    setUser()
    setView('login')
  }

  function handleGoToRegister() {
    setGoLanding(false)
    setError(null)
    setToken()
    setUser()
    setView('register')
  }

  function handleGoToLanding() {
    setQuery()
    setGoLanding(true)
    setError(null)
    setView('landing')
  }

  function handleGoToFavorites() {
    Alert.alert('This button will lead to Favorites! 💖🚽💖')
  }

  function handleGoToProfile() {
    if (!user) {
      Alert.alert('You are not logged in yet!')
    } else {
      Alert.alert(`This button will lead to ${user.name}'s profile`)
    }
  }

  function handlePublishToilet() {
    if (!user) {
      Alert.alert('You are not logged in yet!')
    } else {
      Alert.alert(`new toilet post at: \nLatitude: ${latitude}\nLongitude: ${longitude}`)
    }
  }

  // THE RENDER ITSELF
  return (<View style={styles.container}>
    <ImageBackground style={styles.image} source={require('./assets/background.png')}>

      {goLanding && <NavigationBarTop style={styles.navbar} goToLogin={handleGoToLogin} onSubmit={handleQuerySearch} />}

      <ScrollView style={styles.content}>
        {view === 'login' && !token && <Login onSubmit={handleLogin} error={error} goToRegister={handleGoToRegister} goToLanding={handleGoToLanding} />}
        {view === 'register' && !token && <Register onSubmit={handleRegister} error={error} goToLogin={handleGoToLogin} goToLanding={handleGoToLanding} />}
        {view === 'landing' && <Landing user={user} lat={latitude} latDelta={latDelta} lng={longitude} lngDelta={lngDelta}/>}
        {view === 'queryResults' && <QueryResults query={query}/>}
      </ScrollView>

      {goLanding && <NavigationBarBottom style={styles.navbar} goToNewToilet={handlePublishToilet} goToLanding={handleGoToLanding} goToFavorites={handleGoToFavorites} goToProfile={handleGoToProfile} />}

    </ImageBackground>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  content: {
    flex: 1
  },
  navbar: {
    flex: 1
  }
});