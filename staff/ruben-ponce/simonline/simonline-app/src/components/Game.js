import "./Game.sass"
import React, { useState, useEffect } from "react"
import {
  isLoggedIn,
  retrieveUserId,
  retrieveGameStatus,
  retrievePlayersBasicData,
  playCombination
} from "../logic"
import Feedback from "./Feedback"

export default ({ goTo, gameId }) => {
  let [error, setError] = useState(undefined)
  const [userId, setUserId] = useState()
  let [currentPlayerName, setCurrentPlayerName] = useState()
  let [currentPlayerId, setCurrentPlayerId] = useState()
  let [lastPlayerOut, setLastPlayerOut] = useState()
  let [playersRemain, setPlayersRemain] = useState()
  const [winner, setWinner] = useState()
  let [countdown, setCountdown] = useState()
  let [status, setStatus] = useState()
  let [combinationLaunched, setCombinationLaunched] = useState()
  let [color, setColor] = useState("")
  let [combinationPlayer, setCombinationPlayer] = useState([])
  let playersName
  

  useEffect(() => {
    (async () => {
      playersName = await retrievePlayersBasicData(gameId) 

      const interval = setInterval(() => {
        if (isLoggedIn() && gameId) {
          (async () => {
            try {
              setUserId(retrieveUserId(sessionStorage.token))
              let status = await retrieveGameStatus(gameId)
              setStatus(status)
              if (status.status === "started") {
                //current player
                const currentPlayerData = playersName.find(
                  x => x.id === status.currentPlayer
                )
                setCurrentPlayerName(currentPlayerData.username)
                setCurrentPlayerId(currentPlayerData.id)
                //countdown
                let x = Math.floor(
                  (new Date() - new Date(status.turnStart)) / 1000
                )
                setCountdown(status.turnTimeout - x)
                //players remain
                if (status.watching.length > 0) {
                  setPlayersRemain(
                    status.players.length - status.watching.length
                  )
                } else setPlayersRemain(status.players.length)
                //last player out
                if (status.watching.length > 0) {
                  const lastPlayerOutObj = playersName.find(
                    x => x.id === status.watching[status.watching.length - 1]
                  )
                  setLastPlayerOut(lastPlayerOutObj.username)
                }
              } else if (status.status === "finished") {
                const playerWin = playersName.find(
                  x => x.id === status.currentPlayer
                )
                setWinner(playerWin.username)
                setLastPlayerOut(undefined)
                setCountdown(undefined)
                setCurrentPlayerName(undefined)
                setPlayersRemain(undefined)
                clearInterval(interval)
                setTimeout(() => goTo('multiplayer'), 5000)
              }
            } catch (error) {
              setError(error.message)
              setTimeout(() => setError(undefined), 3000)
            }
          })()
        } else goTo("landing")
      }, 1000)
    })()
  }, [])

  function showCombination(combination) {
    return new Promise(resolve => {
      const refColor = ["r", "g", "b", "y"]

      ;(function showColor(i) {
        if (i < combination.length) {
          setColor(refColor[combination[i]])
          setTimeout(() => setColor(''), 1000)
          setTimeout(() => showColor(i + 1), 2000)
        } else {
          resolve()
        }
      })(0)
    })
  }

  useEffect(() => {
    if (status && !combinationLaunched && status.status === 'started') {
      (async() => {
        setCombinationLaunched(true)
        await showCombination(status.pushCombination)
      })()
    }
  }, [status])


  useEffect(() => {
    if (status && combinationPlayer.length) { 
      (async() => {
        const {pushCombination} = status
  
        if (pushCombination.length === combinationPlayer.length) {
          await playCombination(gameId, combinationPlayer)
          setCombinationPlayer([])
          setCombinationLaunched(false)
        }
      })()
    }
  }, [combinationPlayer])

  const send = (comb) => setCombinationPlayer([...combinationPlayer, comb])

  return (
    <div className="p1 game">
      <div className="top-menu">
      </div>
      <div className="board">
        <div className="container">
          <div
            className={
              color === "r"
                ? "container__red--active"
                : "container__red"
            }
            onClick={ e  => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  send(0)
                }
            }}
          ></div>
          <div
            className={
              color === "g"
                ? "container__green--active"
                : "container__green"
            }
            onClick={ e => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  send(1)
                }
            }}
          ></div>
          <div
            className={
              color === "b"
                ? "container__blue--active"
                : "container__blue"
            }
            onClick={ e => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  send(2)
                }            
              }}
          ></div>
          <div
            className={
              color === "y"
                ? "container__yellow--active"
                : "container__yellow"
            }
            onClick={ e => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  send(3)
                }
            }}
          ></div>
          <div className="container__gray"></div>
        </div>
      </div>
      <div className="footer">
        {winner && <p className="footer__text">Player {winner} wins!</p>}
        {currentPlayerName && (
          <p className="footer__text">Turn of: {currentPlayerName}</p>
        )}
        {countdown && (
          <p className="footer__text">Remaining time: {countdown}sec.</p>
        )}
        {lastPlayerOut && (
          <p className="footer__text">Player {lastPlayerOut} out</p>
        )}
        {playersRemain && (
          <p className="footer__text">
            Remaining players: {playersRemain}
          </p>
        )}
        {error && <Feedback error={error} />}
      </div>
    </div>
  )
}
