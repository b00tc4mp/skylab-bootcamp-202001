import React, { useState, useEffect } from 'react'
import'./Home.sass'
import { isLoggedIn, retrieveUser } from '../logic'
import Feedback from './Feedback'

export default ({ goTo }) => {
    const [error, setError] = useState(undefined);
    const [username, setUsername] = useState()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const { username } = await retrieveUser()
                    setUsername(username)
                } catch (error) {
                    setError(error.message);
                    setTimeout(() => setError(undefined), 3000);
                }
            })()
        else goTo('landing')
    })

    return <div className="p1 home">
        <p className="home__logout" onClick={()=>goTo('logout')}>Logout</p>
        <p className="home__user">Welcome, {username}</p>
        <p className="home__multi-player" onClick={()=>goTo('multiplayer')}>Multiplayer</p>
        {/* <p className="home__options">Options</p> */}
        {error && <Feedback error={error}/>}
    </div> 
}