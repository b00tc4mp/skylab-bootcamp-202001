import'./WaitingRoom.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGameStatus, retrieveUserId, retrievePlayersBasicData, startGame } from '../logic'
import Feedback from './Feedback'

export default ({ gameId, goTo }) => {
    const [error, setError] = useState(undefined)
    const [gameStatus, setGameStatus] = useState()
    const [userId, setUserId] = useState()
    const [playersName, setPlayersName] = useState()

    useEffect(() => {
        let interval = setInterval(() => {
            if (isLoggedIn())
                (async () => {
                    try {
                        // setGameId(gameId)
                        const _userId = await retrieveUserId(sessionStorage.token)
                        setUserId(_userId)
                        const _playersName = await retrievePlayersBasicData(gameId)
                        setPlayersName(_playersName)
                        const status = await retrieveGameStatus(gameId)
                        setGameStatus(status)
                        if(status.status === "started") {
                            clearInterval(interval)
                            return goTo('game')
                        }
                    } catch (error) {
                        setError(error.message)
                        setTimeout(()=> setError(undefined), 3000)
                    }
                })()
                else goTo('landing')
        }, 1500)
    },[])

    return  <div className="p1 waiting-room">
    <div className="waiting-room__top-menu">
    <p className="waiting-room__top-menu__back" onClick={()=>goTo('multiplayer')}>Back</p>
    <p className="waiting-room__top-menu__title" onClick={
        (async () => {
            if (userId === gameStatus.owner && gameStatus.players.length > 1) {
                const started = await startGame(gameId)
                setGameStatus(started)
            }
        })}>Start</p>
    <p className="waiting-room__top-menu__logout" onClick={()=>goTo('logout')}>Logout</p>
    </div>
    <div className="waiting-room__players">
    {error && <Feedback error={error}/>}
    {playersName && playersName.map(player => <p key={player.id}>{player.username}</p>)}
    </div>
    </div>
}
