import React from 'react'
import { StyleSheet, View, Image, StatusBar } from 'react-native'
import Login from './src/components/login'
import Register from './src/components/register'
import Landing from './src/components/landing'
export default function App() {



  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle={'dark-content'} />
      <Image source={require('./assets/logo.png')} style={styles.logo}></Image>
      <Landing />
      <Register />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF4F9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  logo: {
    width: 250,
    height: 250
  }
})
