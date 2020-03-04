import React, { useState } from 'react'
import { Register, FontSize, Login } from '.'
import { registerUser } from '../logic'
import {} from '../sass/app.sass'
import Count from './Count'

function App() {
  //state = {
    //login: 'login'
 // }
  //     login
  const [view, setView] = useState('login')

  function handleRegister(event) {
    try {
      event.preventDefault()
      const { name, surname, email, password } = event.target

      registerUser(name.value, surname.value, email.value, password.value)
        .then(data => console.log(data.message))
        .catch(error => console.log(error))

    } catch (error) {
      console.log(error)
    }

  }

  function handleLogin(event) {
    try {
      event.preventDefault()
      const { name, surname, email, password } = event.target

      registerUser(name.value, surname.value, email.value, password.value)
        .then(data => console.log(data.message))
        .catch(error => console.log(error))

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="App">
      
      <FontSize />
      {view === "register" && <Register handleRegister={handleRegister} setView={setView} />}
      {view === "login" && <Login handleLogin={handleLogin} setView={setView} />}
      <Count />
    </div>
  );
}

export default App;