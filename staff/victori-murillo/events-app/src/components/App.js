import React, { useState } from 'react'
import { Register, FontSize, Login } from '.'
import { registerUser } from '../logic'
import '../sass/app.sass'
import Count from './Count'

function App() {

  const [view, setView] = useState('login')

  async function handleRegister(event) {

    try {
      const { name, surname, email, password } = event.target

      await registerUser(name.value, surname.value, email.value, password.value)
      setView('login')

    } catch (error) {
      console.log(error)
      // handle errors
    }

  }

  async function handleLogin(event) {
    try {
      event.preventDefault()
      const { name, surname, email, password } = event.target

      await registerUser(name.value, surname.value, email.value, password.value)
      console.log('nice');
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