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
  NewComment,
  UpdateUser,
  Readme
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
  retrieveTopToilets,
  updateComment,
  deleteComment,
  updateUser,
  deleteToilet,
  isLoggedIn
} from 'poopinion-logic'

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = 'http://192.168.1.253:8085/api'
console.disableYellowBox = true;

export default function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: 0.001922,
    longitudeDelta: 0.000821
  })
  const [view, setView] = useState('login')
  const [error, setError] = useState(null)
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

  useEffect(() => {
    (async () => {
      if (await isLoggedIn()) {
        const user = await retrieveUser()
        await setUser(user)
        await __handleTopToilets__()
        await setQuery()
        await setGoLanding(true)
        await setError(null)
        await setView('landing')
      }
    })()
  }, [])

  function __handleError__(message) {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  async function __handleUser__() {
    try {
      if (await isLoggedIn()) {
        const user = await retrieveUser()

        setUser(user)
      } else {
        await logic.__context__.storage.clear()
      }
    } catch ({ message }) {
      if (message === 'jwt expired')
        await logic.__context__.storage.clear()

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
      await setTopToilets(top)
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
      await authenticateUser(email, password)

      const retrievedUser = await retrieveUser()
      __handleTopToilets__()
      __handleToiletScore__()
      setUser(retrievedUser)
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

  async function handlePublishToilet(place, image, disabledToilet, rating) {
    try {
      const toiletId = await publishToilet(place, image, disabledToilet, coordinates)
      console.log(toiletId)
      await publishComment(toiletId, rating)

      Alert.alert('Toilet posted! Thank you! 🚽❤️')
      __handleUser__() // 
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

  async function handleToggleFav(toiletId) {
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      try {
        await toggleFavToilet(toiletId)
        if (favToilets) {
          const _favToilets = await retrieveFavToilets()
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
        await toggleThumbUp(commentId)
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
        await toggleThumbDown(commentId)
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
    try {
      (async () => {
        await publishComment(detailedToilet.id.toString(), data)
        __handleToiletScore__()
        __handleTopToilets__()
        Alert.alert('Thank you for your rating! 🚽❤️')
        setView('landing')
      })()
    } catch ({ message }) {
      __handleError__(message)
    }
  }

  function handleUpdateComment(data, { commentId }) {
    try {
      (async () => {
        await updateComment(commentId, data)
        __handleToiletScore__()
        __handleTopToilets__()
        Alert.alert('Comment updated, thank you! 🚽❤️')
        setView('landing')
      })()
    } catch ({ message }) {
      __handleError__()
    }
  }

  function handleDeleteComment(toiletId, commentId) {
    try {
      (async () => {
        await deleteComment(toiletId, commentId)
        Alert.alert('Comment successfully deleted! 💩')
        // __handleTopToilets__() //AFFECTS PERFORMANCE!!! CONSIDER REMOVING
        setView('landing')
      })()
    } catch ({ message }) {
      __handleError__(message)
    }
  }

  async function handleUpdateUser(data) {
    try {
      await updateUser(data)

      Alert.alert('Personal info updated!')
      __handleUser__()
      setView('landing')

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  async function handleDeleteToilet(toiletId) {
    try {
      await deleteToilet(toiletId)

      Alert.alert('Toilet successfully deleted! 🚽')
      setView('landing')

    } catch ({ message }) {
      __handleError__(message)
    }
  }

  // ROUTE FUNCTIONS
  function handleGoToLogin() {
    (async () => {
      await logic.__context__.storage.clear()
      setView('login')
      setGoLanding(false)
      setError(null)
      setUser(undefined)
    })()
  }

  function handleGoToUpdateUser() {
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      __handleUser__()
      setView('update')
    }
  }

  function handleGoToRegister() {
    setGoLanding(false)
    setError(null)
    setUser()
    setView('register')
  }

  async function handleGoToLanding() {
    setQuery()
    setGoLanding(true)
    setError(null)
    await __handleUser__()
    await __handleTopToilets__()
    await __handleToiletScore__()
    await setView('landing')
  }

  function handleGoToFavorites() {
    if (!user) {
      Alert.alert('You are not logged in yet!')
      handleGoToLogin();
    } else {
      try {
        (async () => {
          const _favToilets = await retrieveFavToilets()
          setFavToilets(_favToilets)
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

  function handleGoToFAQs() {
    setView('readme')
  }

  // THE RENDER ITSELF
  return (<View style={styles.container}>
    <ImageBackground style={styles.image} source={require('./assets/background.png')}>

      {goLanding && <NavigationBarTop style={styles.navbar} goToLogin={handleGoToLogin} onSubmit={handleQuerySearch} />}

      <ScrollView style={styles.content}>
        {view === 'login' && <Login onSubmit={handleLogin} error={error} goToFAQs={handleGoToFAQs} goToRegister={handleGoToRegister} goToLanding={handleGoToLanding} />}
        {view === 'readme' && <Readme goBack={handleGoToLogin}/>}
        {view === 'register' && <Register onSubmit={handleRegister} error={error} goToLogin={handleGoToLogin} goToLanding={handleGoToLanding} />}
        {view === 'landing' && <Landing user={user} coordinates={coordinates} topToilets={topToilets} onDetails={handleRetrieveToilet} onFav={handleToggleFav} />}
        {view === 'queryResults' && <QueryResults query={query} toilets={toilets} user={user} onFav={handleToggleFav} onDetails={handleRetrieveToilet} />}
        {view === 'profilePage' && <Profile user={user} onDetails={handleRetrieveToilet} onToUpdateUser={handleGoToUpdateUser} />}
        {view === 'favToilets' && <Favorites user={user} favToilets={favToilets} onFav={handleToggleFav} onDetails={handleRetrieveToilet} />}
        {view === 'newToilet' && <NewToilet coordinates={coordinates} onSubmit={handlePublishToilet} />}
        {view === 'details' && detailedToilet && <ToiletDetails user={user} onDeleteToilet={handleDeleteToilet} onDelete={handleDeleteComment} globalRating={globalRating} toilet={detailedToilet} onComment={handleGoToPublishComment} onFav={handleToggleFav} onThumbUp={handleToggleThumbUp} onThumbDown={handleToggleThumbDown} />}
        {view === 'newComment' && <NewComment toilet={detailedToilet} onUpdate={handleUpdateComment} onSubmit={handlePublishComment} user={user} />}
        {view === 'update' && <UpdateUser user={user} error={error} goToLanding={handleGoToLanding} onSubmit={handleUpdateUser} />}
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