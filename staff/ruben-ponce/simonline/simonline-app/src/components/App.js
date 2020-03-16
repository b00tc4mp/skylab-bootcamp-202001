import React, { useState, Fragment } from 'react'
import { Landing } from './'
import './App.css';


function App() {
  const [view, setView] = useState('landing')


  return (
    <Fragment>

      {view === 'landing' && <Landing/>}

    </Fragment>

  )
}

export default App;
