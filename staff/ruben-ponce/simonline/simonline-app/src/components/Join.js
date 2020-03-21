import'./Join.sass'
import React, { useState, useEffect } from 'react'
import { logout, isLoggedIn, join, retrieveGames, retrieveUserId } from '../logic'
import { useHistory } from 'react-router-dom'
import Feedback from './Feedback'

export default ({ handleJoin }) => {
    const [games, setGames] = useState()
    const [userId, setUserId] = useState()
    const [error, setError] = useState(undefined)
    const history = useHistory()
    let owner

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const games = await retrieveGames()
                    setGames(games)

                    const user = await retrieveUserId(sessionStorage.token)
                    setUserId(user)

                } catch ({ message }) {
                    setError(message)
                }
            })()
        else history.push('/landing')
    },[])

    async function handleJoin(event) {
        try {
            debugger
            const gameId = event._targetInst.key
          await join(userId, gameId)
            // history.push('/multiplayer')
        } catch ({ message }) {
            setError(message)
        }
    }

    function handleLogout() {
        logout()
        history.push('/landing')
    }

    function handleGoBack() {
        history.push('/multiplayer')
    }

    return  <div className="p1 join-group">
    <div className="join-group__top-menu">
        <p className="join-group__top-menu__back" onClick={handleGoBack}>Back</p>
        <p className="join-group__top-menu__title">Join Group</p>
        <p className="join-group__top-menu__logout" onClick={handleLogout}>Logout</p>
    </div>
    <div className="join-group__groups">
    
    {games && games.map((game, index) => <p key={game._id} onClick={handleJoin}>{game.name}</p>)}
    {error && <Feedback error={error}/>}    
    </div>
</div>
}