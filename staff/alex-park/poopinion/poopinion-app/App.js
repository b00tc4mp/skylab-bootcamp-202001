import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, ImageBackground, ScrollView, AsyncStorage } from 'react-native';
import {
  Register,
  Login,
  Landing,
  NavigationBarTop,
  NavigationBarBottom,
  QueryResults,
  Profile,
  Favorites,
  NewToilet
} from './src/components'

import {
  registerUser,
  authenticateUser,
  retrieveUser,
  publishToilet,
  searchToilets,
  toggleFavToilet,
  retrieveFavToilets
} from './src/logic'

export default function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: 0.001922,
    longitudeDelta: 0.000821
  })
  const [view, setView] = useState('login')
  const [error, setError] = useState(null)
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const [goLanding, setGoLanding] = useState(false)
  const [query, setQuery] = useState()
  const [toilets, setToilets] = useState()
  const [favToilets, setFavToilets] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setCoordinates({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        latitudeDelta: 0.001922,
        longitudeDelta: 0.000821
      })
    })

    __handleUser__()
  }, [])

  function __handleError__(message) {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  function __handleUser__() {
    if (token) {
      (async () => {
        const _user = await retrieveUser(token)
        setUser(_user)
      })()
    }
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
        const toilets = await searchToilets(_query)
        await setToilets(toilets)
        await setView('queryResults')
      }

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  async function handlePublishToilet(place) {
    try {
      await publishToilet(token, place, coordinates)
      Alert.alert('Toilet posted! Thank you! 🚽❤️')
      setView('landing')

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  async function handleToggleFav(toiletId) {
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      try {
        await toggleFavToilet(token, toiletId)
        __handleUser__()
        if (favToilets) {
          const _favToilets = await retrieveFavToilets(token)
          setFavToilets(_favToilets)
        }
      } catch ({ message }) {
        __handleError__(message)
      }
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
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      try {
        (async () => {
          const _favToilets = await retrieveFavToilets(token)
          setFavToilets(_favToilets)
          __handleUser__()
          setView('favToilets')
        })()

      } catch ({ message }) {
        __handleError__(message)
      }
    }
  }

  function handleGoToProfile() {
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      __handleUser__()
      setView('profilePage')
    }
  }

  function handleGoToPublishToilet() {
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      setView('newToilet')
    }
  }

  // THE RENDER ITSELF
  return (<View style={styles.container}>
    <ImageBackground style={styles.image} source={require('./assets/background.png')}>

      {goLanding && <NavigationBarTop style={styles.navbar} goToLogin={handleGoToLogin} onSubmit={handleQuerySearch} />}

      <ScrollView style={styles.content}>
        {view === 'login' && !token && <Login onSubmit={handleLogin} error={error} goToRegister={handleGoToRegister} goToLanding={handleGoToLanding} />}
        {view === 'register' && !token && <Register onSubmit={handleRegister} error={error} goToLogin={handleGoToLogin} goToLanding={handleGoToLanding} />}
        {view === 'landing' && <Landing user={user} coordinates={coordinates} />}
        {view === 'queryResults' && <QueryResults query={query} toilets={toilets} user={user} onFav={handleToggleFav} />}
        {view === 'profilePage' && <Profile user={user} />}
        {view === 'favToilets' && <Favorites user={user} favToilets={favToilets} onFav={handleToggleFav} />}
        {view === 'newToilet' && <NewToilet coordinates={coordinates} onSubmit={handlePublishToilet} />}
      </ScrollView>

      {goLanding && <NavigationBarBottom style={styles.navbar} goToNewToilet={handleGoToPublishToilet} goToLanding={handleGoToLanding} goToFavorites={handleGoToFavorites} goToProfile={handleGoToProfile} />}

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