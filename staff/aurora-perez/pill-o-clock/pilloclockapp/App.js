import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'

import { Register, Login, LandingPatient, LandingPharmacist, Medication } from './src/components'
import { registerUser, login, retrieveUser, retrieveMedication } from './src/logic'
//import Header from '../Header

export default function App () {
  const [view, setView] = useState('login')
  const [error, setError] = useState(null) 
  const [user, setUser] = useState()
  const [ token, setToken ] = useState()
  const [medication, setMedication] = useState()


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
      const loggedUser = await retrieveUser(_token)

      if(loggedUser.profile === 'pharmacist') {
        setToken (_token)

        setUser(loggedUser)

        setView('landingPharmacist')

      }else if (loggedUser.profile === 'patient'){
        setToken (_token)

        setUser(loggedUser)
        setView('landingPatient')
      } else{
        //TODO
      }

    }catch({message}){
      __handleError__(message)
    }
  }

  function handleToRegister () {
    setError(null)
    setView('register')
  }

  async function handleToMedication () {
    try{
      const _medication = await retrieveMedication(token)
      setMedication(_medication)
      setView('medication')

    }catch({message}){
      __handleError__(message)
    }
  }


  return(<View style={styles.container}>
    { view === 'register' && <Register onSubmit = {handleRegister} onToLogin = {handleToLogin} error= {error}/> }
    { view === 'login' && <Login onSubmit = {handleLogin} toRegister = {handleToRegister} error= {error}/> }
    { view === 'landingPatient' && <LandingPatient user={user} toMedication={handleToMedication}  /> }
    { view === 'landingPharmacist' && <LandingPharmacist user={user} /> }
    { view === 'medication' && <Medication medication = {medication}/> }
    </View>
  //toProgress={handleToProgress} toContacts={handleToContacts} y en pharma toPatients = {handleToPatients}
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


