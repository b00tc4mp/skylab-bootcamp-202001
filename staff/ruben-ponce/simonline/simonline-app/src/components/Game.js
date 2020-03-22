import'./Game.sass'
import React, { useEffect } from 'react'

export default () => {


    return  <div class="p1 game">
    <div class="game__top-menu">
        <a class="game__top-menu__logout">Leave</a>
    </div>
    <div class="game__board">
        <div class="game__board__container">
            <div class="game__board__container__red"></div>
            <div class="game__board__container__green"></div>
            <div class="game__board__container__blue"></div>
            <div class="game__board__container__yellow"></div>
            <div class="game__board__container__gray"></div>
        </div>
    </div>
    <div class="game__footer">
        <p class="game__footer__text">Player 1 wins</p>
        <p class="game__footer__text">Turn of player</p>
        <p class="game__footer__text">Player 1 out, 20 players remain </p>
    </div>
</div>
}
