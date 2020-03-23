import'./Game.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn } from '../logic'

import Feedback from './Feedback'

export default ({goTo}) => {
    const [error, setError] = useState(undefined)

    useEffect(() => {
        var interval = setInterval(() => {
            if (isLoggedIn())
                (async () => {
                    try {
                       
                    } catch (error) {
                        setError(error.message)
                        setTimeout(()=> setError(undefined), 3000)
                    }
                })()
                else goTo('landing')
        }, 5000)
    },[])

    return  <div className="p1 game">
    <div className="game__top-menu">
        <p className="game__top-menu__logout">Leave</p>
    </div>
    <div className="game__board">
        <div className="game__board__container">
            <div className="game__board__container__red"></div>
            <div className="game__board__container__green"></div>
            <div className="game__board__container__blue"></div>
            <div className="game__board__container__yellow"></div>
            <div className="game__board__container__gray"></div>
        </div>
    </div>
    <div className="game__footer">
        <p className="game__footer__text">Player 1 wins</p>
        <p className="game__footer__text">Turn of player</p>
        <p className="game__footer__text">Player 1 out, 20 players remain </p>
    </div>
</div>
}
