import'./Create.sass'
import React, { useEffect } from 'react'
import { isLoggedIn, retrieveUserId, logout } from '../logic'
import { useHistory } from 'react-router-dom'

// import Feedback from './Feedback'

export default ({ handleCreateGame }) => {
    const history = useHistory()
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
        else history.push('/landing')
    }, [])

    function handleLogout() {
        logout()
        history.push('/landing')
    }

    function handleGoBack() {
        history.push('/multiplayer')
    }

    return <div className="p1 create-group">
    <div className="create-group__top-menu">
        <a className="create-group__top-menu__back" onClick={handleGoBack}>Back</a>
        <p className="create-group__top-menu__title">Create Game</p>
        <a className="create-group__top-menu__logout" onClick={handleLogout}>Logout</a>
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