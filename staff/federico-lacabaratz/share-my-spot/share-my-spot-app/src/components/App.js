import React, { useState, useEffect, useContext } from 'react'
import { Register, Login, Search, Header, Results, Detail, UserUpdate, AddSpot } from '../components'
import { registerUser, login, isLoggedIn, retrieveUser, search, retrieveSpot, userUpdate, addSpot } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)
  const [user, setUser] = useState([])
  const [results, setResults] = useState([])
  const [detail, setDetail] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      (async () => {
        try {

          history.push('/search')
        
        } catch (error) {
          setState({ ...state, error: error.message })
          history.push('/login')
        }
      })()

    } else {
      history.push('/login')
    }
  }, [])

  const handleRegister = (name, surname, email, phone, password) => {
    (async () => {
      try {
        await registerUser(name, surname, email, phone, password)

        history.push('/login')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleLogin = (email, password) => {
    (async () => {
      try {
        await login(email, password)

        history.push('/search')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleUserUpdate = (body) => {
    (async () => {
      try {

        await userUpdate(body)

        const newUser = await retrieveUser()
        setUser(newUser)

        setTimeout(() => {
          history.push('/search')          
        }, 3000)

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleSearch = (query) => {

    (async () => {
      try {
        const res = await search(query)


        if (!res.length) {
          setState({ ...state, error: 'No results were found matching your query' })

          setTimeout(() => {
            setState({ ...state, error: undefined })
          }, 3000)
        } else {
          setResults(res)
          history.push('/results')

        }

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ ...state, error: undefined })
        }, 3000)
      }
    })()
  }

  const handleDetail = (spotId) => {

    (async () => {
      try {

        const spotDetail = await retrieveSpot(spotId)
        setDetail(spotDetail)

        history.push(`/detail/${spotId}`)

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const { error } = state

  return <div className="App">
    <Route exact path='/' exact render={() => isLoggedIn() ? <Redirect to='/search' /> : <Redirect to='/login' />} />
    <Route path='/register' render={() => isLoggedIn() ? <Redirect to='/search' /> : <Register onRegister={handleRegister} error={error} />} />
    <Route path='/login' render={() => isLoggedIn() ? <Redirect to='/search' /> : <Login onLogin={handleLogin} error={error} />} />
    <Route path='/account' render={() => isLoggedIn() ? <><Header /><UserUpdate onUserUpdate={handleUserUpdate} error={error} /></> : <Redirect to='/search' />} />
    <Route path='/search' render={() => isLoggedIn() ? <><Header /><Search onSearch={handleSearch} error={error} /></> : <Redirect to='/login' />} />
    <Route path='/results' render={() => isLoggedIn() ? <> <Header /> <Results results={results} onItemClick={handleDetail} /> </> : <Redirect to='/login' />} />
    <Route path='/detail/:spotId' render={() => isLoggedIn() ? <><Header /><Detail spotDetail={detail} /></> : <Redirect to='/login' />} />
    <Route path='/add-a-spot' render={() => isLoggedIn() ? <><Header /><Detail spotDetail={detail} /></> : <Redirect to='/login' />} />
  </div>
})
