import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Alert, ScrollView, AsyncStorage } from 'react-native'
import {Notifications} from 'react-native-notifications';
import pushNotification from './pushNotifications'

import { Register, Login, LandingPatient, LandingPharmacist, Medication, AddMedication, DrugDetail, NavigationBarTop, Progress, Contacts, AddContacts, Patients, AddPatient, ContactDetail } from './src/components'
import logic, { registerUser, login, retrieveUser, retrieveMedication, addMedication, retrieveDrug, deleteMedication, retrieveContacts } from './src/logic'

logic.__context__.storage =AsyncStorage 

pushNotification.configure()

function App () {
  const [view, setView] = useState('login')
  const [error, setError] = useState(null) 
  const [user, setUser] = useState()
  const [ token, setToken ] = useState()
  const [ medication, setMedication] = useState()
  const [ drugDetail, setDrugDetail ] =useState()
  const [ times, setTimes ] = useState()
  const [goLanding, setGoLanding] = useState(false)
  const [ contacts, setContacts ] = useState()
  const [ contactData, setContactData ] =useState()
  const [ schedule, setSchedule] = useState()

  useEffect(()=>{
    //if(user) {
      const interval = setInterval(async () => { 
        let schedule = await getAlarms(token)
        if(schedule.length){
          //console.log(schedule)
          schedule.forEach(prescription => {
            prescription.times.forEach(alarm => {
              console.log(alarm)
              let time =alarm.time.toString()
              let min = parseInt(time.slice(time.length-2, time.length))
              let hour = parseInt(time.slice(0, time.length-2))

              let now = new Date()
              let hour2 = now.getHours()
              let min2 = now.getMinutes()
              if(hour === hour2 && min >= min2 ) {
                //alarm.sounded=true 
                pushNotification.localNotification(prescription.drugName)
              }
            })

          })

        }


      }, 60000)
  
    return () => clearInterval(interval)
  }, [schedule])

  async function getAlarms (token) {
    const _medication = await retrieveMedication(token)
    //console.log(_medication)

    if(_medication.length) {
      let _schedule = []
      for( let i=0; i<_medication.length; i++) {
        _schedule[i] = {}
        _schedule[i].drugName = _medication[i].drug.drugName
        _schedule[i].times= []
        for (let j=0; j<_medication[i].times.length; j++){
          _schedule[i].times.push({time: _medication[i].times[j], sounded: false})
        }
        
      }
      //console.log(_schedule[0].times)
      // return _schedule
      setSchedule(_schedule)
    }
  }

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
    setToken()
    setError(null)
    setGoLanding(false)
    setView('login')
  }

  async function handleLogin ({email, password}){
    try {
      const _token = await login(email, password)
      const loggedUser = await retrieveUser(_token)

      if(loggedUser.profile === 'pharmacist') {
        setToken (_token)

        setUser(loggedUser)

        setGoLanding(true)

        setView('landingPharmacist')

      }else if (loggedUser.profile === 'patient'){
        setToken (_token)

        setUser(loggedUser)
        setGoLanding(true)
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

  async function handleAddMedication (info) {
    
    try{ //TODO refactor
      const {drug} = info
      let keys = Object.keys(info)
      keys.slice(0,1)

      for (const key in info){
        if (key !=='drug') {
          if (key.includes('hour') && !isNaN(info[key]) && info[key]>24) throw new Error('Please, introduce a correct hour')
          if (key.includes('min') && !isNaN(info[key]) && info[key]>59) throw new Error('Please, introduce a correct minutes')
        }
      }

      const times = []

      for (let i = 1; i < keys.length/2; i++) {
          times.push(parseInt(`${info[`hour${i}`]}${info[`min${i}`]}`))
      }

      await addMedication(token, drug, times)
      
      handleToMedication()

    }catch({message}){
      __handleError__(message)
    }
  }

  async function handleToDrug ({drugName, times}){
    try {
      const _drugDetail = await retrieveDrug(drugName)

      setTimes(times)

      setDrugDetail(_drugDetail)

      setView('drugDetail')

    }catch({message}){
      __handleError__(message)
    }
  }

  async function handleToDeleteMedication ({id}) {
    try {
      await deleteMedication(token, id)
      handleToMedication()

    }catch({message}){
      console.log(message)
    }
  }

  function handleToProgress () {
    setView('progress')
  }

  async function handleToContacts () {
    try{
      const _contacts = await retrieveContacts(token)
      setContacts(_contacts)
      setView('contacts')

    }catch({message}){
      __handleError__(message)
    }
    
  }

  function handleToAddContacts (){
    setView('addContacts')
  }

  async function handleToPatients (){
    try{
      const _contacts = await retrieveContacts(token)
      setContacts(_contacts)
      setView('patients')

    }catch({message}){
      __handleError__(message)
    }
  }

  function handleToAddPatients (){
    setView('addPatients')
  }
  function handleToContactDetail ({name, surname, phone}){
    setContactData({name, surname, phone})
    setView('contactDetail')
  }

  return(<View style={styles.container}>

    {goLanding && <NavigationBarTop style={styles.navbar} toLogin={handleToLogin} toMedication={handleToMedication} toContacts={handleToContacts} toProgress={handleToProgress} toPatients = {handleToPatients} user={user}/>}
    
    <ScrollView style={styles.content}>
      { view === 'register' && <Register onSubmit = {handleRegister} onToLogin = {handleToLogin} error= {error}/> }
      { view === 'login' && <Login onSubmit = {handleLogin} toRegister = {handleToRegister} error= {error}/> }
      { view === 'landingPatient' && <LandingPatient user={user} toMedication={handleToMedication} toProgress={handleToProgress} toContacts={handleToContacts} /> }
      { view === 'landingPharmacist' && <LandingPharmacist user={user} toPatients = {handleToPatients}/> }
      { view === 'medication' && <Medication medication = {medication} toAdd={handleToAdd} onDrug={handleToDrug}/> }
      { view === 'addMedication' && <AddMedication onSubmit = {handleAddMedication} error = {error}/>}
      { view === 'drugDetail' && <DrugDetail drugDetail={drugDetail} times ={times} toDelete ={handleToDeleteMedication}/>}
      { view === 'contacts' && <Contacts contacts ={contacts} toAdd={handleToAddContacts} onContact={handleToContactDetail}/> }
      { view === 'progress' && <Progress/>}
      { view === 'addContacts' && <AddContacts/>}
      { view === 'patients' && <Patients contacts ={ contacts } toAdd={handleToAddPatients}/> }
      { view === 'addPatients' && <AddPatient user={user}/> }
      { view === 'contactDetail' && <ContactDetail contactData={contactData}/>}
    </ScrollView>

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
    },
    content: {
      flex: 1
    },
    navbar: {
      flex: 1
    }
})


export default App