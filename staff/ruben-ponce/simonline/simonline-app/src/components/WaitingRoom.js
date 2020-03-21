import'./WaitingRoom.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGameStatus } from '../logic'
import Feedback from './Feedback'

export default ({players, gameId, goTo }) => {
    const [error, setError] = useState(undefined)
    const [gameStatus, setGameStatus] = useState()
    // const [players, setPlayers] = useState()

    useEffect(() => {
        setInterval(() => {
            if (isLoggedIn())
                (async () => {
                    try {
                        const status = await retrieveGameStatus(gameId)
                        setGameStatus(status)
                        debugger
                    } catch ({ message }) {
                        setError(message)
                    }
                })()
                else goTo('/landing')
        }, 5000)
    },[])

    return  <div className="p1 waiting-room">
    <div className="waiting-room__top-menu">
    <a className="waiting-room__top-menu__back" onClick={()=>goTo('multiplayer')}>Back</a>
    <a className="waiting-room__top-menu__title">Start</a>
    {error && <Feedback error={error}/>}
    <a className="waiting-room__top-menu__logout" onClick={()=>goTo('logout')}>Logout</a>
    </div>
    <div className="waiting-room__players">
    {players && players.map(player => <p key={player.id}>{player.username}</p>)}
    </div>
    </div>
}
