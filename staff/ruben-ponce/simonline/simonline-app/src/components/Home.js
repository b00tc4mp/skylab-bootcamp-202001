import React, { useState, useEffect } from 'react'
import'./Home.sass'
import { isLoggedIn, retrieveUser } from '../logic'
import { useHistory } from 'react-router-dom'

// import Feedback from './Feedback'

export default ({handleLogout, goMultiplayer}) => {
    const [username, setUsername] = useState()
    const history = useHistory()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const { username } = await retrieveUser()
                    setUsername(username)
                    
                    // setState({ page: 'home' })
                } catch ({ message }) {
                    // setState({ error: message, page: 'login' })
                }
            })()
        else history.push('/landing')
    }, [])

    return <div className="p1 home">
        <p className="home__user">Welcome, {username}</p>
        <p className="home__logout" onClick={handleLogout}>Logout</p>
        <p className="home__multi-player" onClick={goMultiplayer}>Multiplayer</p>
        <p className="home__options">Options</p>
    </div> 
}