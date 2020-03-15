import React, { useContext, useEffect } from 'react';
import './App.css';
import {registerUser} from '../logic'
import { Context } from './ContextProvider'

function App() {
  const [state, setState] = useContext(Context)  
  
  useEffect(() => {
    const {token} = sessionStorage

    token ? setState({ token, page: 'home'}) : setState ({page: 'login'})
  })
  
const {page, error} = state

  return <div className="app">
    <Page name={page}>
      
    </Page>
  </div>
}

export default App;
