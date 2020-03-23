import React, { useEffect } from 'react'
import'./Multiplayer.sass'
import { isLoggedIn } from '../logic'

// import Feedback from './Feedback'

export default ({ goTo }) => {

    useEffect(() => {
        if (isLoggedIn()) return
        else goTo('/landing')
    })

    return <div className="p1 multiplayer">
    <div className="multiplayer__top-menu">
        <p className="multiplayer__top-menu__back" onClick={()=>goTo('home')}>Back</p>
        <p className="multiplayer__top-menu__title">Multiplayer</p>
        <p className="multiplayer__top-menu__logout" onClick={()=>goTo('logout')}>Logout</p>
    </div>
    <p className="multiplayer__create-game" onClick={()=>goTo('create')}>Create game</p>
    <p className="multiplayer__join-game" onClick={()=>goTo('join')}>Join game</p>
</div>
}