import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'

import { Register, Login } from './src/components'
import { registerUser, login, retrieveUser } from './src/logic'

export default function App () {
  const [view, setView] = useState('register')
  const [error, setError] = useState(null)
  const [token, setToken] = useState()
  const [user, setUser] = useState()

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
    setError(null)
    setView('login')
  }

  async function handleLogin ({email, password}){
    try {
      const _token = await login(email, password)
      setToken(_token)

      const loggedUser = await retrieveUser(_token)
      setUser(loggedUser)

    }catch({message}){
      __handleError__(message)
    }
  }

  function handleToRegister () {
    setError(null)
    setView('register')
  }


  return(<View style={styles.container}>
    { view === 'register' && <Register onSubmit = {handleRegister} onToLogin = {handleToLogin} error= {error}/> }
    { view === 'login' && <Login onSubmit = {handleLogin} toRegister = {handleToRegister} error= {error}/> }
    {/* { view === 'landing ' && usere.type === 'patient' && <Patient> } */}
    </View>

  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#beebe9'
    },

    title : {
        fontSize : 40,
    }
})


