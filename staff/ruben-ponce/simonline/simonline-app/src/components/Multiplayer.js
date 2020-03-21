import React, { useEffect } from 'react'
import'./Multiplayer.sass'
import { logout, isLoggedIn } from '../logic'
import { withRouter } from 'react-router-dom'

// import Feedback from './Feedback'

export default withRouter(function ({ history }) {

    useEffect(() => {
        if (isLoggedIn()) return
        else history.push('/landing')
    },[])

    function handleLogout() {
        logout()
        history.push('/landing')
    }

    function handleGoBack() {
        history.push('/home')
    }

    function handleGoJoin() {
        history.push('/join')
    }
    function handleGoCreate() {
        history.push('/create')
    }

    return <div className="p1 multiplayer">
    <div className="multiplayer__top-menu">
        <p className="multiplayer__top-menu__back" onClick={handleGoBack}>Back</p>
        <p className="multiplayer__top-menu__title">Multiplayer</p>
        <p className="multiplayer__top-menu__logout" onClick={handleLogout}>Logout</p>
    </div>
    <p className="multiplayer__create-group" onClick={handleGoCreate}>Create group</p>
    <p className="multiplayer__join-group" onClick={handleGoJoin}>Join group</p>
</div>
})