import React, {useState} from 'react'
import {RegisterUser, Login, Home} from './'
import {registerUser, authenticateUser, lastEvents} from '../logic'


function App() {
  const [view, setView] = useState('login')

  function handleRegister (name, surname, email, password){
    try{
      registerUser(name, surname, email, password)
      .then(()=> setView('login'))

    }catch(error){
      console.log(error.message)
    }
  }


  function handleLogin (email, password){
    try{
      return authenticateUser(email, password)
      .then(()=> setView('home'))

    }catch(error){
      console.log(error.message)
    }
  }


  function handleLastEvents (){
    try{
      return lastEvents()
      .then(response => console.log(response))

    }catch(error){
      console.log(error.message)
    }
  }

  return <div className="App">
    <h1>Events App</h1>
    {view==='register' && <RegisterUser onSubmit = {handleRegister} setView={setView}/>}
    {view==='login' && <Login onSubmit = {handleLogin} setView={setView}/>}
    {view==='home' && <Home onSubmit = {handleLastEvents} />}

      
  </div>
}

export default App
