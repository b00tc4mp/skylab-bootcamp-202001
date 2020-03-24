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
    const [timeout, setTimeout] = useState()
    
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
                            //timeout
                            setTimeout(40 - (Math.floor((new Date(status.date) - new Date(status.turnStart)) / (1000*60*60*24))))
                        } else if (status.status === 'finished') {
                            //player win
                            const currentPlayerObj = _playersName.find(x => x.id === status.currentPlayer)
                            setWinner(currentPlayerObj.username)
                            //break interval
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
        {winner && <p className="game__footer__text">Player {winner} wins!</p>}
        {timeout && <p className="game__footer__text">timeout: {timeout}sec.</p>}
        {currentPlayerName && <p className="game__footer__text">Turn of {currentPlayerName}</p>}
        {lastPlayerOut && <p className="game__footer__text">Player {lastPlayerOut} out</p>}
        {playersRemain && <p className="game__footer__text"> {playersRemain} players in game </p>}
        
    </div>
</div>
}
