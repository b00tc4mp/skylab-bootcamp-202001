import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Alert, ScrollView, AsyncStorage, DeviceEventEmitter } from 'react-native'
import {Notifications} from 'react-native-notifications';
import pushNotification from './pushNotifications'
import moment from 'moment'
import PushNotificationAndroid from 'react-native-push-notification'


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

  //AsyncStorage.clear()

  useEffect(()=>{
    //if(user) {
      const interval = setInterval(async () => { 
        let date = AsyncStorage.getItem('date')
        let alarms = await  AsyncStorage.getItem('alarms')
       
        date && (date = moment(date).format('MM-DD-YYYY'))
        !date && (await AsyncStorage.setItem('date', (date = moment().format('MM-DD-YYYY'))))

        //let alarms = await AsyncStorage.getItem('alarms')
        alarms && (alarms = JSON.parse(alarms))

        let now = moment(new Date).format('MM-DD-YYYY')

        if( now > date ){
          await AsyncStorage.setItem('date', now)

          for (const drug in alarms) {
            for(const time in alarms[drug]) {
              alarms[drug][time] = false
            }
          }
          await AsyncStorage.setItem('alarms', JSON.stringify(alarms))
        }

       // hoursArray = Object.keys(alarms)
        for (const drug in alarms) {
          for(const time in alarms[drug]) {
            let min = parseInt(time.slice(time.length-2, time.length))
            let hour = parseInt(time.slice(0, time.length-2))

            let now2 = new Date()

            let hour2 = now2.getHours()
            let min2 = now2.getMinutes()

            const drugInfo = await retrieveDrug(drug)

            const {drugName} = drugInfo

            if(hour === hour2 && min >= min2 && !alarms[drug][time] ) {
              alarms[drug][time] = true;
              pushNotification.localNotification(drugName)

            }
          }
        }
      }, 60000);
  
    return () => clearInterval(interval)
  }, [schedule]);

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

      // let alarms ={}

      // _medication.forEach(drug => {
      //   alarms[drug.drug._id.toString()] = {} 
      //   drug.times.forEach(hour => {
      //     alarms[drug.drug._id.toString()][hour.toString()] = false
      //   })
      // })
   

      // await AsyncStorage.setItem('alarms', JSON.stringify(alarms))

    

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

      const _medication = await retrieveMedication(token)

      let alarms = await AsyncStorage.getItem('alarms')
      alarms && (JSON.parse(alarms))
      if (!alarms) alarms = {}
        console.log('alarm1: ' + alarms)

      _medication.forEach(prescription => {
        if(prescription.drug.drugName === drug ) {
          const drugId = prescription.drug._id.toString()

          alarms[drugId] = {}
          console.log('alarm2: ' + alarms)

          prescription.times.forEach(hour => {
            const newTime = hour.toString()
            console.log(hour)
            alarms[drugId][newTime] = false
          })
          console.log('alarm3: ' + alarms)
        }
      })
      
      await AsyncStorage.setItem('alarms', JSON.stringify(alarms))
      
      // let alarms = await AsyncStorage.getItem('alarms')
      // alarms && (alarms = JSON.parse(alarms))

      // alarms[drug.drug._id.toString()] = {}
      // alarms[drug.drug._id.toString()][]

      // _medication.forEach(drug => {
      //   alarms[drug.drug._id.toString()] = {} 
      //    drug.times.forEach(hour => {
      //      alarms[drug.drug._id.toString()][hour.toString()] = false
      //    })
      // })

      // await AsyncStorage.setItem('alarms', JSON.stringify(alarms))
      
      handleToMedication()

    } catch({message}){
      __handleError__(message)
    }
  }

  async function handleToDrug ({id, times}){
    try {
      const _drugDetail = await retrieveDrug(id)

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

      const _medication = await retrieveMedication(token)

      let alarms = await AsyncStorage.getItem('alarms')
      alarms && (alarms = JSON.parse(alarms))

      delete alarms[id]

      await AsyncStorage.setItem('alarms', JSON.stringify(alarms))

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