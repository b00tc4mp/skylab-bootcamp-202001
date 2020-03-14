import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'

import { Register, Login } from './src/components'
import { registerUser, login } from './src/logic'

export default function App () {
  const [view, setView] = useState('register')
  const [error, setError] = useState(null)

  function __handleError__(message) {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  async function handleRegister ({name, surname, gender, age, phone, profile, email, password}) {
    try {
      await registerUser(name, surname, gender, age, phone, profile, email, password)
      setView('login')

    }catch({message}){
      __handleError__(message)
    }
  }

  function handleToLogin (){
    setView('login')
  }

  async function handleLogin ({email, password}){
    try {
      const response = await login(email, password)
      Alert.alert('pupuuu')

    }catch({message}){
      __handleError__(message)
    }
  }

  function handleToRegister () {
    setView('register')
  }


  return(<View style={styles.container}>
    { view === 'register' && <Register onSubmit = {handleRegister} onToLogin = {handleToLogin} error= {error}/> }
    { view === 'login' && <Login onSubmit = {handleLogin} toRegister = {handleToRegister} error= {error}/> }

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


