import React from 'react'
import'./Multiplayer.sass'
import { logout, isLoggedIn, retrieveUser } from '../logic'
import { withRouter } from 'react-router-dom'

// import Feedback from './Feedback'

export default withRouter(function ({ history }) {

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
        <a className="multiplayer__top-menu__back" onClick={handleGoBack}>Back</a>
        <p className="multiplayer__top-menu__title">Multiplayer</p>
        <a className="multiplayer__top-menu__logout" onClick={handleLogout}>Logout</a>
    </div>
    <a className="multiplayer__create-group" onClick={handleGoCreate}>Create group</a>
    <a className="multiplayer__join-group" onClick={handleGoJoin}>Join group</a>
</div>
})