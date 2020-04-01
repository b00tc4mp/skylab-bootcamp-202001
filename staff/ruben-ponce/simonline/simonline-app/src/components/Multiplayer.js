import React, { useEffect } from 'react'
import'./Multiplayer.sass'
import { isLoggedIn } from '../logic'
import Feedback from './Feedback'

export default ({ goTo, error }) => {

    useEffect(() => {
        if (isLoggedIn()) return
        else goTo('/landing')
    })

    return <div className="p1 multiplayer">
    <div className="top-menu">
        <p className="top-menu__back" onClick={()=>goTo('home')}>Back</p>
        <p className="top-menu__title">Multiplayer</p>
        <p className="top-menu__logout" onClick={()=>goTo('logout')}>Logout</p>
    </div>
    <p className="create-game" onClick={()=>goTo('create')}>Create game</p>
    <p className="join-game" onClick={()=>goTo('join')}>Join game</p>
    {error && <Feedback error={error}/>}
</div>
}