import'./WaitingRoom.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGameStatus, retrieveUserId, join } from '../logic'
import Feedback from './Feedback'

export default ({_players, gameId, goTo }) => { //_players from join
    const [error, setError] = useState(undefined)
    const [gameStatus, setGameStatus] = useState()
    const [playersId, setPlayersId] = useState()
    const [playersName, setPlayersName] = useState()

    useEffect(() => {
        setInterval(() => {
            if (isLoggedIn())
                (async () => {
                    try {
                        const userId = await retrieveUserId(sessionStorage.token)
                        const _playersName = await join(userId, gameId)
                        const status = await retrieveGameStatus(gameId)
                        setPlayersName(_playersName)
                        setGameStatus(status)
                        setPlayersId(status.players)
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
    {playersName && playersName.map(player => <p key={player.id}>{player.username}</p>)}
    </div>
    </div>
}
