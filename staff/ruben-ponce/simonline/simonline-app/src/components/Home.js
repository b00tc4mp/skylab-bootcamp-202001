import React, { useState, useEffect } from 'react'
import'./Home.sass'
import { logout, isLoggedIn, retrieveUser } from '../logic'
import { withRouter } from 'react-router-dom'

// import Feedback from './Feedback'

export default withRouter(function ({ history }) {
    const [username, setUsername] = useState()

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

    function handleLogout() {
        logout()
        history.push('/landing')
    }

    function handleGoToMultiplayer() {
        history.push('/multiplayer')
    }

    return <div className="p1 home">
        <p className="home__user">Welcome, {username}</p>
        <p className="home__logout" onClick={handleLogout}>Logout</p>
        <p className="home__multi-player" onClick={handleGoToMultiplayer}>Multiplayer</p>
        <p className="home__options">Options</p>
    </div> 
})