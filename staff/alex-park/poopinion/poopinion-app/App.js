import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setLatitude(pos.coords.latitude)
      setLongitude(pos.coords.longitude)
    })
  })

  function handleSeeGeo() {
    setReady(!ready)
  }

  return (
    <View style={styles.container}>
      <View>
        {ready && <Text>
          Latitude: {latitude}

          Latitude: {longitude}
         </Text>}
        <Button title='See location' onPress={handleSeeGeo}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20
  }
});