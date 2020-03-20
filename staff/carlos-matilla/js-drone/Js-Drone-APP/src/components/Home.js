import React, { useState, useEffect, useContext } from 'react'
import './Home.sass';
import { gamepadConnect, gamepadDisconnect, channelA, channelB, channelC, channelD, takeOffG, landG, start } from "../logic/gamepad";
import { keyDown, keyUp, takeOffK, landK, v, negV } from '../logic/keyboard'

import { logout, isLoggedIn, retrieveUser, saveData, parseData } from './../logic'
import { Telemetry, OnLiveCharts, NavbarLeft, NavbarRight, Charts, Video } from './';
import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'
import socket from '../socket';



export default withRouter(function ({ history }) {

  const [, setState] = useContext(Context)
  const [name, setName] = useState()
  const [mySessions, setMySessions] = useState([])
  const [mySession, setMySession] = useState()
  const [gpad, setGpad] = useState(true)
  const [keyboard, setKeyboard] = useState(false)
  const [charts, setCharts]=useState(false)
  const [estadistics, setEstadistics] = useState(false)
  const [liveChart, setLiveChart] = useState(true)
  const [menu, setMenu] = useState(true)

  let semaforo2 = false

  useEffect(() => {

    window.addEventListener("gamepadconnected", gamepadConnect);
    window.addEventListener("gamepaddisconnected", gamepadDisconnect);
    
    let droneState
    let semaforo = false
    
    socket.on('dronestate', data => {
      return droneState = data
    })

    const interval = setInterval(() => {
      if (droneState && takeOffG || takeOffK) {
      
        let { templ, temph, tof, bat, baro } = droneState
        if(takeOffG) saveData(channelA, channelB, channelC, channelD, null, null, temph, templ, bat, baro, tof)
        if(takeOffK) saveData(null, null, null, null, v, negV, temph, templ, bat, baro, tof)
        semaforo = true

      }

      if (droneState && semaforo  && landG || landK) {
        (async () => {
          semaforo = false
          await parseData()
          const { sessions } = await retrieveUser()
          setMySessions(sessions)
        
          saveData()

        })()
      }
    }, 1000)

    if (isLoggedIn())
      (async () => {
        try {
          const { name } = await retrieveUser()
          setName(name)
          setState({ page: 'home' })
        } catch ({ message }) {
          setState({ error: message, page: 'login' })
        }
      })()
    else setState({ page: 'login' })


    ; (async () => {
      try {
        const { sessions } = await retrieveUser()

        setMySessions(sessions)
      } catch (error) {
        // TODO do something with this error (feedback?)
      }
    })()


    return () => clearInterval(interval)
  }, []);


  function handleLogout(e) {
    console.log('ssss')
    logout()
    setState({ page: 'login' })
    history.push('/login')
  }

  function handleSession(session) {
    setMySession(session)
    setKeyboard(false)
    setGpad(false)
    setCharts(true)
    setMenu(false)
  }

  function toggleKeyboard() {
    gamepadDisconnect()
    setGpad(false)
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    setKeyboard(true)
    setMenu(true)
  }

  function toggleGamepad() {
    setKeyboard(false)
    setGpad(true)
    document.removeEventListener('keydown', keyDown);
    document.removeEventListener('keyup', keyUp);
    gamepadConnect()
  }

  function toggleCharts(){
    setEstadistics(false)
    setLiveChart(true)


  }
  
  function toggleEstadistics(){
   
    setLiveChart(false)
    setEstadistics(true)

  }
  
  function toggleHomeView(){
    setCharts(false)
    setGpad(true)
  }

  return <>
    <NavbarLeft toggleGamepad={toggleGamepad} toggleKeyboard={toggleKeyboard} toggleCharts={toggleCharts} toggleEstadistics={toggleEstadistics} toggleHomeView={toggleHomeView}/>

    <div className={gpad ? "home rightpadding" : "home"}>
    
      {!charts && <Video />}

      {mySession && charts && <Charts mySession={mySession} />}

      <div className="on-live">
      {(gpad || keyboard) && estadistics && <Telemetry />}
      {liveChart && <OnLiveCharts />}
        
      </div>

      </div>
    
    <NavbarRight handleLogout={handleLogout} handleSession={handleSession} mySessions={mySessions} showMenu={menu}/>
  </>
})