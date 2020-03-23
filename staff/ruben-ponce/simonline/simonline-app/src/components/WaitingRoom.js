import'./WaitingRoom.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGameStatus, retrieveUserId, join, startGame } from '../logic'
import Feedback from './Feedback'

export default ({ gameId, goTo }) => {
    const [error, setError] = useState(undefined)
    const [gameStatus, setGameStatus] = useState()
    const [playersId, setPlayersId] = useState()
    const [playersName, setPlayersName] = useState()

    useEffect(() => {
        var interval = setInterval(() => {
            if (isLoggedIn())
                (async () => {
                    try {
                        const userId = await retrieveUserId(sessionStorage.token)
                        const _playersName = await join(userId, gameId)//retrieve players name
                        const status = await retrieveGameStatus(gameId)
                        debugger
                        setPlayersName(_playersName)
                        setGameStatus(status)
                        setPlayersId(status.players)
                        if(status.status === "started") {
                            clearInterval(interval)
                            goTo('game')
                        }
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
    <a className="waiting-room__top-menu__title" onClick={
        (async () => {
            const started = await startGame(gameId)
            debugger
            setGameStatus(started)
        })}>Start</a>
    {error && <Feedback error={error}/>}
    <a className="waiting-room__top-menu__logout" onClick={()=>goTo('logout')}>Logout</a>
    </div>
    <div className="waiting-room__players">
    {playersName && playersName.map(player => <p key={player.id}>{player.username}</p>)}
    </div>
    </div>
}
