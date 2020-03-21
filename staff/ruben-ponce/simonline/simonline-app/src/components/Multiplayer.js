import React, { useEffect } from 'react'
import'./Multiplayer.sass'
import { logout, isLoggedIn } from '../logic'
import { useHistory } from 'react-router-dom'

// import Feedback from './Feedback'

export default ({ handleLogout, goHome, goJoin, goCreate }) => {
    const history = useHistory()

    useEffect(() => {
        if (isLoggedIn()) return
        else history.push('/landing')
    },[])

    return <div className="p1 multiplayer">
    <div className="multiplayer__top-menu">
        <p className="multiplayer__top-menu__back" onClick={goHome}>Back</p>
        <p className="multiplayer__top-menu__title">Multiplayer</p>
        <p className="multiplayer__top-menu__logout" onClick={handleLogout}>Logout</p>
    </div>
    <p className="multiplayer__create-game" onClick={goCreate}>Create game</p>
    <p className="multiplayer__join-game" onClick={goJoin}>Join game</p>
</div>
}