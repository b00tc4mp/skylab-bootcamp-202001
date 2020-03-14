import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet } from 'react-native'

import {Register} from './src/components'
import {registerUser} from './src/logic'


export default function App () {
  const [view, setView] = useState('register')

  function handleRegister ({name, surname, gender, age, phone, profile, email, password}) {

  }

  return(<View style={styles.container}>
    { view === 'register' && <Register onSubmit = {handleRegister}/> }

    </View>

  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    title : {
        fontSize : 40,
    }
})


