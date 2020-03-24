import'./Game.sass'
import React, { useState, useEffect } from 'react'
import { isLoggedIn, retrieveGameStatus, retrievePlayersName } from '../logic'
import Feedback from './Feedback'

export default ({goTo, gameId}) => {
    const [error, setError] = useState(undefined)
    const [currentPlayerName, setCurrentPlayerName] = useState()
    const [lastPlayerOut, setLastPlayerOut] = useState()
    const [playersRemain, setPlayersRemain] = useState()
    const [winner, setWinner] = useState()
    const [timeout, setTimeout] = useState()
    const [color, setColor] = useState('')
    let playersName
    let status

    useEffect(() => {
        const interval = setInterval(() => {
            if (isLoggedIn()) {
                (async () => {
                    try {
                        playersName = await retrievePlayersName(gameId)
                        status = await retrieveGameStatus(gameId)
                        if (status.status === 'started') {
                            //current player
                            const currentPlayerObj = playersName.find(x => x.id === status.currentPlayer)
                            setCurrentPlayerName(currentPlayerObj.username)
                            //timeout
                            let x = (Math.floor((new Date() - new Date(status.turnStart)) / 1000))
                            setTimeout(40 - x)
                            //players remain
                            if (status.watching.length > 0) {
                                setPlayersRemain(status.players.length - status.watching.length)
                            } else setPlayersRemain(status.players.length)
                            //last player out
                            if (status.watching.length > 0) {
                                const lastPlayerOutObj = playersName.find(x => x.id === status.watching[status.watching.length -1])
                                setLastPlayerOut(lastPlayerOutObj.username)
                            }
                            //show combination

                        } else if (status.status === 'finished') {
                            //player win
                            const currentPlayerObj = playersName.find(x => x.id === status.currentPlayer)
                            setWinner(currentPlayerObj.username)
                            //break interval
                            console.log('finished')
                        }
                    } catch (error) {
                        setError(error.message)
                        setTimeout(()=> setError(undefined), 3000)
                    }
                })()
        } else goTo('landing')
        }, 1000)
    },[])

    return  <div className="p1 game">
    <div className="game__top-menu">
        <p className="game__top-menu__logout">Leave</p>
    </div>
    <div className="game__board">
        <div className="game__board__container">
            <div className={color === 'r' ? "game__board__container__red .red_active" : "game__board__container__red"}></div>
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
        {error && <Feedback error={error}/>}
    </div>
</div>
}
