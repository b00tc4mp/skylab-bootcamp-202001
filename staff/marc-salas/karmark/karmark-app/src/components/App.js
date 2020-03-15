import React, { useEffect, useContext } from 'react';
import './App.css';
import Register from './Register'
import Page from './Page'
import {registerUser} from '../logic'
import { Context } from './ContextProvider'

function App() {
  const [state, setState] = useContext(Context)  
  
  useEffect(() => {
    const {token} = sessionStorage

    token ? setState({ token, page: 'home' }) : setState({ page: 'register' })    
    debugger
  })

  async function handleRegister(name, surname, username, password){
    try { 
      await registerUser(name, surname, username, password)

      console.log('welldone')
    } catch ({message}) {
      setState({error: message})
    }
  }
  
const {page, error} = state
debugger
  return <div className="app">
    <Page name={page}>
      {page === 'register' && <Register onSubmit={handleRegister} error={error}/>}
    </Page>
  </div>
}

export default App;
