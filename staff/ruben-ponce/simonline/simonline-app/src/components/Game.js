import'./Game.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGameStatus, retrieveUserId, join, retrievePlayersName } from '../logic'
import Feedback from './Feedback'

export default ({goTo, gameId}) => {
    const [error, setError] = useState(undefined)
    const [gameStatus, setGameStatus] = useState()
    const [userId, setUserId] = useState()
    const [_gameId, setGameId] = useState(gameId)
    // const [playersId, setPlayersId] = useState()
    const [playersName, setPlayersName] = useState()
    
    useEffect(() => {
        let interval = setInterval(() => {
            if (isLoggedIn()){
                (async () => {
                    try {
                        const _userId = await retrieveUserId(sessionStorage.token)
                        setUserId(_userId)
                        const _playersName = await retrievePlayersName(gameId)//retrieve players name
                        setPlayersName(_playersName)
                        const status = await retrieveGameStatus(gameId)
                        setGameStatus(status)
                        debugger
                    } catch (error) {
                        setError(error.message)
                        setTimeout(()=> setError(undefined), 3000)
                    }
                })()
        }else{ goTo('landing')}
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
