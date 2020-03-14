import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Register } from './src/components'
import { registerUser } from './src/logic'

export default function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [ready, setReady] = useState(false)
  const [view, setView] = useState('register')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setLatitude(pos.coords.latitude)
      setLongitude(pos.coords.longitude)
    })
  })

  async function handleRegister(name, surname, email, age, gender, password) {

    const user = await registerUser(name, surname, email, age, gender, password)
    Alert.alert(user)
  }

  return (<View style={styles.container}>
    {view === 'register' && <Register onSubmit={handleRegister} />}
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  }
});