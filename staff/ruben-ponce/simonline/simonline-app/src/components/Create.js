import'./Create.sass'
import React, { useEffect, useState } from 'react'
import { isLoggedIn, retrieveUserId } from '../logic'
import Feedback from './Feedback'

export default ({ handleCreateGame, goTo }) => {
    const [error, setError] = useState(undefined)
    let owner

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    owner = await retrieveUserId(sessionStorage.token)
                } catch (error) {
                    setError(error.message)
                    setTimeout(()=> setError(undefined), 3000)                
                }
            })()
        else goTo('/landing')
    },[])

    return <div className="p1 create-group">
    <div className="top-menu">
        <p className="top-menu__back" onClick={()=>goTo('multiplayer')}>Back</p>
        <p className="top-menu__title">Create Game</p>
        <p className="top-menu__logout" onClick={()=>goTo('logout')}>Logout</p>
    </div>
    <form className="form" onSubmit={event => {
        event.preventDefault()

        const name = event.target.name.value
        
        handleCreateGame(name, owner)
    }}>
        {error && <Feedback error={error}/>}
        <input className="label" name="name" type="text" placeholder="name of game"/>
        <button className="button">Create</button>
    </form>
    </div>
}