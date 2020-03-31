import "./Game.sass";
import React, { useState, useEffect } from "react";
import {
  isLoggedIn,
  retrieveUserId,
  retrieveGameStatus,
  retrievePlayersBasicData,
  playCombination
} from "../logic";
import Feedback from "./Feedback";

export default ({ goTo, gameId }) => {
  let [error, setError] = useState(undefined);
  const [userId, setUserId] = useState();
  let [currentPlayerName, setCurrentPlayerName] = useState();
  let [currentPlayerId, setCurrentPlayerId] = useState();
  let [lastPlayerOut, setLastPlayerOut] = useState();
  let [playersRemain, setPlayersRemain] = useState();
  const [winner, setWinner] = useState();
  let [countdown, setCountdown] = useState();
  let [status, setStatus] = useState();
  //const [combinationLaunched, setCombinationLaunched] = useState();
  let [color, setColor] = useState("");
  let [combinationPlayer, setCombinationPlayer] = useState([])
  let _combinationPlayer = []
  let playersName;
  let combinationLaunched = false;
  let t;

  useEffect(() => {
    (async () => {
      playersName = await retrievePlayersBasicData(gameId); 

      const interval = setInterval(() => {
        if (isLoggedIn() || !gameId) {
          (async () => {
            try {
              setUserId(retrieveUserId(sessionStorage.token));
              let status = await retrieveGameStatus(gameId);
              setStatus(status)
              if (status.status === "started") {
                //current player
                const currentPlayerData = playersName.find(
                  x => x.id === status.currentPlayer
                );
                
                setCurrentPlayerName(currentPlayerData.username);
                setCurrentPlayerId(currentPlayerData.id)
                //countdown
                let x = Math.floor(
                  (new Date() - new Date(status.turnStart)) / 1000
                );
                setCountdown(status.turnTimeout - x);
                //players remain
                if (status.watching.length > 0) {
                  setPlayersRemain(
                    status.players.length - status.watching.length
                  );
                } else setPlayersRemain(status.players.length);
                //last player out
                if (status.watching.length > 0) {
                  const lastPlayerOutObj = playersName.find(
                    x => x.id === status.watching[status.watching.length - 1]
                  );
                  setLastPlayerOut(lastPlayerOutObj.username);
                }
                // await setCombinationViewed(gameId)
                
                if (!combinationLaunched) { 
                    combinationLaunched = true
                    //setCombinationLaunched(true); // state

                    await showCombination(status.pushCombination);

                    // TODO enable clicks

                    // TODO after playing (sending a sequence) setCombinationLaunched(false)
                }
              } else if (status.status === "finished") {
                const playerWin = playersName.find(
                  x => x.id === status.currentPlayer
                );
                setWinner(playerWin.username);
                setLastPlayerOut(undefined)
                setCountdown(undefined);
                setCurrentPlayerName(undefined);
                setPlayersRemain(undefined);
                clearInterval(interval);
                setTimeout(() => goTo('multiplayer'), 5000)
              }
            } catch (error) {
              setError(error.message);
              setTimeout(() => setError(undefined), 3000);
            }
          })();
        } else goTo("landing");
      }, 1000);
    })();
  }, []);

  function showCombination(combination) {
    return new Promise(resolve => {
      const refColor = ["r", "g", "b", "y"];

      (function showColor(i) {
        if (i < combination.length) {
          setColor(refColor[combination[i]]);
          setTimeout(() => setColor(''), 1000);
          setTimeout(() => showColor(i + 1), 2000);
        } else resolve() //in this else activeClicks = true
      })(0);
    });
  }

  async function delay(ms) {
    return await new Promise(resolve => {
      t = setTimeout(resolve, ms)
    });
  }

  async function send(comb) {
      let newStatus = await playCombination(gameId, comb);
      setStatus(newStatus)
      console.log(newStatus)
      combinationLaunched = false
      _combinationPlayer = []
  };

  async function startCount(t){
    if(t) await delay(3000)

    try {
      (async () => {
        console.log('here')
        await delay(3000)
        console.log('there')
        console.log(`combination sended => ${_combinationPlayer}`)
        return await send(_combinationPlayer)
      })()
    }catch(error){
      console.log(error)
    }
  }
  
  function stop() {
    console.log('STOP')
    clearTimeout(t)
  }

  return (
    <div className="p1 game">
      {/* {console.log(status)}
      {console.log(combinationLaunched)}
      {console.log(combinationPlayer)}
      {status && console.log(status.pushCombination)} */}
      {/* {status.pushCombination && console.log(status.pushCombination)} */}

      {/* Block__Element--Modifier */}

      <div className="game__top-menu">
        <p className="game__top-menu__logout">Leave</p>
      </div>
      <div className="game__board">
        <div className="game__board__container">
          <div
            className={
              color === "r"
                ? "game__board__container__red red_active"
                : "game__board__container__red"
            }
            onClick={ e  => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  _combinationPlayer.push(0)
                  // setCombinationPlayer(combinationPlayer => [...combinationPlayer, 0])
                  
                  // if(_combinationPlayer.length === status.pushCombination.length) {
                  //   send(_combinationPlayer)
                  // }
                  
                  return startCount(t)
                }
            }}
          ></div>
          <div
            className={
              color === "g"
                ? "game__board__container__green green_active"
                : "game__board__container__green"
            }
            onClick={ e => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  _combinationPlayer.push(1)
                  // setCombinationPlayer(combinationPlayer => [...combinationPlayer, 1])

                  // if(_combinationPlayer.length === status.pushCombination.length) {
                  //   send(_combinationPlayer)
                  // }

                  return startCount(t)
                }
            }}
          ></div>
          <div
            className={
              color === "b"
                ? "game__board__container__blue blue_active"
                : "game__board__container__blue"
            }
            onClick={ e => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  _combinationPlayer.push(2)
                  // setCombinationPlayer(combinationPlayer => [...combinationPlayer, 2])

                  // if(_combinationPlayer.length === status.pushCombination.length) {
                  //   send(_combinationPlayer)
                  // }

                  return startCount(t)
                }            
              }}
          ></div>
          <div
            className={
              color === "y"
                ? "game__board__container__yellow yellow_active"
                : "game__board__container__yellow"
            }
            onClick={ e => {
                e.preventDefault()
                if (userId === currentPlayerId) {
                  _combinationPlayer.push(3)
                  // setCombinationPlayer(combinationPlayer => [...combinationPlayer, 3])

                  // if(_combinationPlayer.length === status.pushCombination.length) {
                  //   send(_combinationPlayer)
                  // }

                  return startCount(t)
                }
            }}
          ></div>
          <div className="game__board__container__gray"></div>
        </div>
      </div>
      <div className="game__footer">
        {winner && <p className="game__footer__text">Player {winner} wins!</p>}
        {currentPlayerName && (
          <p className="game__footer__text">Turn of: {currentPlayerName}</p>
        )}
        {countdown && (
          <p className="game__footer__text">Remaining time: {countdown}sec.</p>
        )}
        {lastPlayerOut && (
          <p className="game__footer__text">Player {lastPlayerOut} out</p>
        )}
        {playersRemain && (
          <p className="game__footer__text">
            Remaining players: {playersRemain}
          </p>
        )}
        {error && <Feedback error={error} />}
      </div>
    </div>
  );
};
