import React from 'react'
import logo from './logo.svg';
import'./Join.sass'
// import Feedback from './Feedback'

function Join() {

    return  <div class="p1 join-group">
    <div class="join-group__top-menu">
        <a class="join-group__top-menu__back">Back</a>
        <p class="join-group__top-menu__title">Join Group</p>
        <a class="join-group__top-menu__logout">Logout</a>
    </div>
    <div class="join-group__groups">
        <a>Group 1</a>
        <a>Group 2</a>
        <a>Group 3</a>
        <a>Group 4</a>
    </div>
</div>
}

export default Join