import React, { useEffect, useContext } from 'react'
import Page from './Page'
import Register from './Register'
import { registerUser, isLoggedIn } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)

  useEffect(() => {
    if (isLoggedIn()) {
      setState({ page: 'home' })

      history.push('/home')
    } else {
      setState({ page: 'register' })

      history.push('/register')
    }
  }, [])

  async function handleRegister(name, surname, username, password) {
    try {
      await registerUser(name, surname, username, password)


      console.log('welldone')
      //setState({ page: 'login' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  function handleGoToLogin() {
    history.push('/login')
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  const { page, error } = state

  return <div className="app">
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="home" /> : <Register onSubmit={handleRegister} onGoToLogin={handleGoToLogin} error={error} onMount={handleMountRegister} />} />
    </Page>
  </div>
})

// export default withRouter(function ({ history }) {
//   const [state, setState] = useContext(Context)
  
//   useEffect(() => {
//     if (isLoggedIn()) {
//       setState({ page: 'home' })
      
//       history.push('/home')
//     } else {
//       setState({ page: 'register' })
      
//       history.push('/register')
//     }
//   }, [])
  
//   async function handleRegister(name, surname, username, password) {
//     try {
//       await registerUser(name, surname, username, password)
      
//       console.log('welldone')
//     } catch ({ message }) {
//       setState({ error: message })
//     }
//   }
  
//   function handleGoToLogin() {
//     history.push('/register')
//   }
  
//   function handleMountRegister() {
//     setState({ page: 'register' })
//   }
//   const { page, error } = state
  
//   return <div className="app">
//     <Page name={page}>
//       <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
//       <Route path="/register" render={() => isLoggedIn() ? <Redirect to="home" /> : <Register onSubmit={handleRegister} onGoToLogin={handleGoToLogin} error={error} onMount={handleMountRegister} />} />
//     </Page>
//   </div>
// })
