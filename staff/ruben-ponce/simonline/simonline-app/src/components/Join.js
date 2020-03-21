import'./Join.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGames } from '../logic'
import { useHistory } from 'react-router-dom'
import Feedback from './Feedback'

export default ({ handleJoin, handleLogout, goMultiplayer }) => {
    const [games, setGames] = useState()
    const [error, setError] = useState(undefined)
    const history = useHistory()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const games = await retrieveGames()
                    setGames(games)
                } catch ({ message }) {
                    setError(message)
                }
            })()
        else history.push('/landing')
    },[])

    return  <div className="p1 join-group">
    <div className="join-group__top-menu">
        <p className="join-group__top-menu__back" onClick={goMultiplayer}>Back</p>
        <p className="join-group__top-menu__title">Join Group</p>
        <p className="join-group__top-menu__logout" onClick={handleLogout}>Logout</p>
    </div>
    <div className="join-group__groups">
    
    {games && games.map(game => <p key={game._id} onClick={ event => {
        event.preventDefault()
        debugger
        const gameId = event._targetInst.key
        handleJoin(gameId)
        
    }}>{game.name}</p>)}
    {error && <Feedback error={error}/>}    
    </div>
</div>
}