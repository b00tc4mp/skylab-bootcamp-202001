import React, { useState, useEffect} from 'react'
import './App.sass'
import { registerUser, authenticateUser, retrieveUser, retrieveLastEvents} from '../logic'
import {  Register, Login, Home, ResultLastEvents} from './'

function App({ name}) {
  
  const [view, setView] = useState('register')
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [lastEvents, setLastEvents] = useState()

  function handleRegister (name, surname, email, password) {
    (async() =>{
      try {
        await registerUser(name, surname, email, password)

        setView('login')
        
      } catch (error) {
       __handleError__()
      }
    })()
    
  }

    function __handleError__(error) {
      setError({ error: error.message })
      setTimeout(() => {
         setError({ error: undefined })
      }, 3000)
  }

function handleLogin (email, password) {
    (async()=>{
      try{
        const token = await authenticateUser(email, password)
  
        sessionStorage.token = token

        const user= await retrieveUser(token)

          setUser(user)
          setView("Home")
        
      }catch(error) {

       __handleError__(error)
      }
    })()
    
  }

  function handleRetrieveLastEvents() {
    (async()=>{
      try {
        const lastEvents= await retrieveLastEvents()
        setLastEvents(lastEvents)
        setView("lastEvent")

      } catch (error) {
        __handleError__(error)
      }

    })()
  }


return <div className="App">
{view === 'register' && < Register onToRegister = {handleRegister} setView={setView}/>}
{view === "login" && < Login onToLogin={handleLogin} setView={setView}/>}
{view === "Home" && <Home user={user} onToGoRetrieveEvents={handleRetrieveLastEvents} />}
{view === "lastEvent" && <ResultLastEvents lastEvents ={lastEvents}  />}

</div>
}
export default App