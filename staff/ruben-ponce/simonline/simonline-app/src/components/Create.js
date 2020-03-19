import React from 'react'
import'./Create.sass'
import { createGame } from '../logic'
// import Feedback from './Feedback'

export default() => {

    return <div class="p1 create-group">
    <div class="create-group__top-menu">
        <a class="create-group__top-menu__back">Back</a>
        <p class="create-group__top-menu__title">Create Game</p>
        <a class="create-group__top-menu__logout">Logout</a>
    </div>
    <input class="create-group__label" type="text" placeholder="name of game"/>
    <button class="create-group__button">Create</button>
    </div>
}