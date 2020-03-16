import React, { useEffect, useContext } from 'react';
import Register from './Register'
import Page from './Page'
import {registerUser} from '../logic'
import { Context } from './ContextProvider'


function App() {
  const [state, setState] = useContext(Context)  
  const {page , error} = state
  
  useEffect(() => {
    const {token} = sessionStorage

    token ? setState({ token, page: 'home' }) : setState({ page: 'register' })    
  
  }, [])

  async function handleRegister(name, surname, username, password){
    try { 
      await registerUser(name, surname, username, password)

      console.log('welldone')
    } catch ({message}) {
      setState({error: message})
    }
  }
  
  return <div className="app">
    <Page name={page}>
      {page === 'register' && <Register onSubmit={handleRegister} error={error}/>}
    </Page>
  </div>
}

export default App;
