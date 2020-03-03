import React, {useState} from 'react'
import {RegisterUser, Login} from './'
import {registerUser, authenticateUser} from '../logic'


function App() {
  const [view, setview] = useState('login')

  function handleRegister (name, surname, email, password){
    try{
      registerUser(name, surname, email, password)
      .then(()=> setview('login'))

    }catch(error){
      console.log(error.message)
    }
  }

  function handleLogin (email, password){
    try{
      return authenticateUser(email, password)

    }catch(error){
      console.log(error.message)
    }
  }

  return <div className="App">
    <h1>Events App</h1>
    {view==='register' && <RegisterUser onSubmit = {handleRegister}/>}
    {view==='login' && <Login onSubmit = {handleLogin}/>}

      
  </div>
}

export default App
