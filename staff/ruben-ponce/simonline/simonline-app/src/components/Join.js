import'./Join.sass'
import React, { useState, useEffect } from 'react'
import { logout, isLoggedIn, retrieveGames } from '../logic'
import { useHistory } from 'react-router-dom'

// import Feedback from './Feedback'

export default ({ handleJoin }) => {
    const [games, setGames] = useState()
    const history = useHistory()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const games = await retrieveGames()
                    setGames(games)
                    // setUsername(username)
                    
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

    function handleGoBack() {
        history.push('/multiplayer')
    }

    return  <div class="p1 join-group">
    <div class="join-group__top-menu">
        <a class="join-group__top-menu__back" onClick={handleGoBack}>Back</a>
        <p class="join-group__top-menu__title">Join Group</p>
        <a class="join-group__top-menu__logout" onClick={handleLogout}>Logout</a>
    </div>
    <div class="join-group__groups">

    {games && games.map(game => <a>{game.name}</a>)}
        
    </div>
</div>
}