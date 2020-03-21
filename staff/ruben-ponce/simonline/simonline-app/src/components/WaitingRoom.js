import'./WaitingRoom.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn } from '../logic'
import { useHistory } from 'react-router-dom'
import Feedback from './Feedback'

export default ({ players, goMultiplayer, handleLogout }) => {
    const [error, setError] = useState(undefined)
    const history = useHistory()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    debugger

                } catch ({ message }) {
                    setError(message)
                }
            })()
        else history.push('/landing')
    },[])

    return  <div className="p1 waiting-room">
    <div className="waiting-room__top-menu">
    <a className="waiting-room__top-menu__back" onClick={goMultiplayer}>Back</a>
    <a className="waiting-room__top-menu__title">Start</a>
    {error && <Feedback error={error}/>}
    <a className="waiting-room__top-menu__logout" onClick={handleLogout}>Logout</a>
    </div>
    <div className="waiting-room__players">
    {players && players.map(player => <p key={player.id}>{player.username}</p>)}
    </div>
    </div>
}
