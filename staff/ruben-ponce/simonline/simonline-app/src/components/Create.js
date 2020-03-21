import'./Create.sass'
import React, { useEffect } from 'react'
import { isLoggedIn, retrieveUserId } from '../logic'

// import Feedback from './Feedback'

export default ({ handleCreateGame, goTo }) => {
    let owner

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    owner = await retrieveUserId(sessionStorage.token)
                    // setState({ page: 'home' })
                } catch ({ message }) {
                    // setState({ error: message, page: 'login' })
                }
            })()
        else goTo('/landing')
    },[])

    return <div className="p1 create-group">
    <div className="create-group__top-menu">
        <p className="create-group__top-menu__back" onClick={()=>goTo('multiplayer')}>Back</p>
        <p className="create-group__top-menu__title">Create Game</p>
        <p className="create-group__top-menu__logout" onClick={()=>goTo('logout')}>Logout</p>
    </div>
    <form className="create-group__form" onSubmit={event => {
        event.preventDefault()

        const name = event.target.name.value
        
        handleCreateGame(name, owner)
    }}>
        <input className="create-group__label" name="name" type="text" placeholder="name of game"/>
        <button className="create-group__button">Create</button>
    </form>
    </div>
}