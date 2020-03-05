import React, { useState, useEffect } from 'react'
import Register from './register'
// import './App.css'
import './App.sass'
import {onRegister, goToLogin, onLogin, goToRegister} from '../logic'

function App() {
  const [view, setView] = useState('register')
  
  const changeView = view => setView(view)



return   <Register  onSubmit={handleGoToLogin}/>

}



export default App
