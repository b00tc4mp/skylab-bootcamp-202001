import React, { useState, Fragment } from 'react'
import { Landing, Login, Register } from './'
import './App.sass'


function App() {
  const [view, setView] = useState('register')


  return (
    <Fragment>

      {view === 'landing' && <Landing/>}

      {view === 'login' && <Login/>}

      {view === 'register' && <Register/>}

    </Fragment>

  )
}

export default App;
