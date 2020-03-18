import React from 'react'
import'./Multiplayer.sass'
// import Feedback from './Feedback'

function Multiplayer() {

    return <div class="p1 multiplayer">
    <div class="multiplayer__top-menu">
        <a class="multiplayer__top-menu__back">Back</a>
        <p class="multiplayer__top-menu__title">Multiplayer</p>
        <a class="multiplayer__top-menu__logout">Logout</a>
    </div>
    <a class="multiplayer__create-group">Create group</a>
    <a class="multiplayer__join-group">Join group</a>
</div>
}

export default Multiplayer