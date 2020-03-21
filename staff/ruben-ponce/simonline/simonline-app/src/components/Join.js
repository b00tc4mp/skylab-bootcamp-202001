import'./Join.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGames } from '../logic'
import Feedback from './Feedback'

export default ({ handleJoin, goTo }) => {
    const [games, setGames] = useState()
    const [error, setError] = useState(undefined)

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
        else goTo('/landing')
    },[])

    return  <div className="p1 join-group">
    <div className="join-group__top-menu">
        <p className="join-group__top-menu__back" onClick={()=>goTo('multiplayer')}>Back</p>
        <p className="join-group__top-menu__title">Join Group</p>
        <p className="join-group__top-menu__logout" onClick={()=>goTo('logout')}>Logout</p>
    </div>
    <div className="join-group__groups">
    
    {games && games.map(game => <p key={game._id} onClick={ event => {
        event.preventDefault()
        const gameId = event._targetInst.key
        handleJoin(gameId)
        
    }}>{game.name}</p>)}
    {error && <Feedback error={error}/>}    
    </div>
</div>
}