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
    const [currentPlayerName, setCurrentPlayerName] = useState()
    const [lastPlayerOut, setLastPlayerOut] = useState()
    const [playersRemain, setPlayersRemain] = useState()
    const [winner, setWinner] = useState()

    
    useEffect(() => {
        const interval = setInterval(() => {
            if (isLoggedIn()){
                (async () => {
                    try {
                        const _playersName = await retrievePlayersName(gameId)
                        setPlayersName(_playersName)
                        const status = await retrieveGameStatus(gameId)
                        setGameStatus(status)
                        if (status.status === 'started') {
                            //current player
                            const currentPlayerObj = _playersName.find(x => x.id === status.currentPlayer)
                            setCurrentPlayerName(currentPlayerObj.username)
                            //last player out
                            const lastPlayerOutObj = _playersName.find(x => x.id === status.watching[status.watching.length -1])
                            setLastPlayerOut(lastPlayerOutObj.username)
                            //players remain
                            setPlayersRemain(status.players.length - status.watching.length)
                        } else if (status.status === 'finished') {
                            //break interval
                            //player win
                            debugger
                            console.log('finished')
                        }
                        

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
        <p className="game__footer__text">Turn of {currentPlayerName}</p>
        {lastPlayerOut && <p className="game__footer__text">Player {lastPlayerOut} out</p>}
        {playersRemain && <p> {playersRemain} players in game </p>}
        
    </div>
</div>
}
