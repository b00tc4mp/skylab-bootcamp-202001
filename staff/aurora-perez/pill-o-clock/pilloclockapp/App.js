import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'

import { Register, Login, LandingPatient, LandingPharmacist, Medication, AddMedication } from './src/components'
import { registerUser, login, retrieveUser, retrieveMedication, addMedication } from './src/logic'
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
    }, 5000)
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

  function handleToAdd () {
    setView('addMedication')
  }

  async function handleAddMedication ({drug, hour, min}) {
    
    try{
      
      if(isNaN(hour) || isNaN(min) || hour>24 || min>59) throw new Error('Please, introduce a correct hour')
      
      const time = parseInt(`${hour}${min}`)

      await addMedication(token, drug, time)
      
      handleToMedication()

    }catch({message}){
      __handleError__(message)
    }
  }


  return(<View style={styles.container}>
    { view === 'register' && <Register onSubmit = {handleRegister} onToLogin = {handleToLogin} error= {error}/> }
    { view === 'login' && <Login onSubmit = {handleLogin} toRegister = {handleToRegister} error= {error}/> }
    { view === 'landingPatient' && <LandingPatient user={user} toMedication={handleToMedication}  /> }
    { view === 'landingPharmacist' && <LandingPharmacist user={user} /> }
    { view === 'medication' && <Medication medication = {medication} toAdd={handleToAdd}/> }
    { view === 'addMedication' && <AddMedication onSubmit = {handleAddMedication} error = {error}/>}
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


