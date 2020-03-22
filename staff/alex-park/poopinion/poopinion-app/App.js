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
  NewToilet,
  ToiletDetails,
  NewComment
} from './src/components'

import logic, {
  registerUser,
  authenticateUser,
  retrieveUser,
  publishToilet,
  searchToilets,
  toggleFavToilet,
  retrieveFavToilets,
  retrieveToilet,
  toggleThumbUp,
  toggleThumbDown,
  publishComment,
  retrieveTopToilets
} from './src/logic'

logic.__context__.storage = AsyncStorage

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
  const [detailedToilet, setDetailedToilet] = useState()
  const [globalRating, setGlobalRating] = useState({ cleannessMean: 0, looksMean: 0, paymentMean: 0, multipleMean: 0, scoreMean: 0, paperMean: 0 })
  const [topToilets, setTopToilets] = useState()

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
    __handleToiletScore__()
    __handleTopToilets__()
  }, [detailedToilet])

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

  function __handleToiletScore__() {
    if (detailedToilet) {
      try {
        let meanRating = { cleannessMean: 0, looksMean: 0, paymentMean: 0, multipleMean: 0, scoreMean: 0, paperMean: 0 }
        if (detailedToilet.comments.length) {
          detailedToilet.comments.forEach(comment => {
            meanRating.cleannessMean += comment.rating.cleanness
            meanRating.looksMean += comment.rating.looks
            meanRating.paymentMean += comment.rating.paymentRequired
            meanRating.multipleMean += comment.rating.multipleToilets
            meanRating.paperMean += comment.rating.paperDeployment
            meanRating.scoreMean += comment.rating.overallRating
          })

          for (const key in meanRating) {
            meanRating[key] = parseFloat((meanRating[key] / detailedToilet.comments.length).toFixed(2))
          }
        }
        setGlobalRating(meanRating)

      } catch ({ message }) {
        __handleError__(message)
      }
    }
  }

  function __handleTopToilets__() {
    (async () => {
      const top = await retrieveTopToilets()
      setTopToilets(top)
    })()
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
      __handleTopToilets__()
      __handleToiletScore__()
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

  async function handlePublishToilet(place, image) {
    try {
      await publishToilet(token, place, image, coordinates)
      Alert.alert('Toilet posted! Thank you! 🚽❤️')
      setView('landing')

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  function handleRetrieveToilet(toiletId) {
    try {
      (async () => {
        const toilet = await retrieveToilet(toiletId)

        setDetailedToilet(toilet)
        __handleToiletScore__()

        setView('details')
      })()

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  async function handleToggleFav(toiletId) { //WILL NEED TO UPLOAD WHEN DETAILS ARE DISPLAYED
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

        if (query) {
          const toilets = await searchToilets(query)
          await setToilets(toilets)
        }

        if (detailedToilet) {
          const toilet = await retrieveToilet(detailedToilet.id.toString())
          setDetailedToilet(toilet)
        }
        __handleTopToilets__()
      } catch ({ message }) {
        __handleError__(message)
      }
    }
  }

  function handleToggleThumbUp(commentId) {
    try {
      (async () => {
        await toggleThumbUp(token, commentId)
        __handleUser__()
        if (detailedToilet) {
          const toilet = await retrieveToilet(detailedToilet.id.toString())
          setDetailedToilet(toilet)
          __handleToiletScore__()
        }
      })()
    } catch ({ message }) {
      __handleError__(message)
    }
  }

  function handleToggleThumbDown(commentId) {
    try {
      (async () => {
        await toggleThumbDown(token, commentId)
        __handleUser__()
        if (detailedToilet) {
          const toilet = await retrieveToilet(detailedToilet.id.toString())
          setDetailedToilet(toilet)
          __handleToiletScore__()
        }
      })()
    } catch ({ message }) {
      __handleError__(message)
    }
  }

  function handlePublishComment(data) {
    console.log(data)
    try {
      (async () => {
        await publishComment(token, detailedToilet.id.toString(), data)
        __handleUser__()
        __handleToiletScore__()
        __handleTopToilets__()
        Alert.alert('Thank you for your rating! 🚽❤️')
        setView('landing')
      })()
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
    __handleTopToilets__()
    __handleToiletScore__()
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
          __handleTopToilets__()
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

  function handleGoToPublishComment() {
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      setView('newComment')
    }
  }

  // THE RENDER ITSELF
  return (<View style={styles.container}>
    <ImageBackground style={styles.image} source={require('./assets/background.png')}>

      {goLanding && <NavigationBarTop style={styles.navbar} goToLogin={handleGoToLogin} onSubmit={handleQuerySearch} />}

      <ScrollView style={styles.content}>
        {view === 'login' && !token && <Login onSubmit={handleLogin} error={error} goToRegister={handleGoToRegister} goToLanding={handleGoToLanding} />}
        {view === 'register' && !token && <Register onSubmit={handleRegister} error={error} goToLogin={handleGoToLogin} goToLanding={handleGoToLanding} />}
        {view === 'landing' && <Landing user={user} coordinates={coordinates} topToilets={topToilets} onDetails={handleRetrieveToilet} onFav={handleToggleFav} />}
        {view === 'queryResults' && <QueryResults query={query} toilets={toilets} user={user} onFav={handleToggleFav} onDetails={handleRetrieveToilet} />}
        {view === 'profilePage' && <Profile user={user} onDetails={handleRetrieveToilet} />}
        {view === 'favToilets' && <Favorites user={user} favToilets={favToilets} onFav={handleToggleFav} onDetails={handleRetrieveToilet} />}
        {view === 'newToilet' && <NewToilet coordinates={coordinates} onSubmit={handlePublishToilet} />}
        {view === 'details' && detailedToilet && <ToiletDetails user={user} globalRating={globalRating} toilet={detailedToilet} onComment={handleGoToPublishComment} onFav={handleToggleFav} onThumbUp={handleToggleThumbUp} onThumbDown={handleToggleThumbDown} />}
        {view === 'newComment' && <NewComment toilet={detailedToilet} onSubmit={handlePublishComment} />}
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