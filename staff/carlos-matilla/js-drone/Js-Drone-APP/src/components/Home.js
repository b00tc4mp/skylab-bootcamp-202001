import React, { useState, useEffect, useContext, useRef } from 'react'
import './Home.sass';
import { gamepadConnect, gamepadDisconnect, channelA, channelB, channelC, channelD, takeOffG, landG, start } from "../logic/gamepad";
import { keyDown, keyUp, takeOffK, landK, v, negV } from '../logic/keyboard'

import { logout, isLoggedIn, retrieveUser, saveData, parseData } from './../logic'
import { Telemetry, OnLiveCharts, NavbarLeft, NavbarRight, Charts, Video, Joystick } from './';
import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'
import socket from '../socket';



export default withRouter(function ({ history }) {

  const [, setState] = useContext(Context)
  const [mySessions, setMySessions] = useState([])
  const [name, setName] = useState()
  const [mySession, setMySession] = useState()
  const [gpad, setGpad] = useState(true)
  const [keyboard, setKeyboard] = useState(false)
  const [joy, setJoy] = useState([])

  // Views
  const [chartsView, setChartsView]=useState()
  const [estadisticsView, setEstadisticsView] = useState()
  const [liveChartView, setLiveChartView] = useState()
  const [leftMenuView, setLeftMenuView] = useState()
  const [controlsView, setControlsView] = useState(false)
  const [videoView, setVideoView] = useState()
  const [homePadding, setHomePadding] =useState()


  useEffect(() => {

    window.addEventListener("gamepadconnected", gamepadConnect);
    window.addEventListener("gamepaddisconnected", gamepadDisconnect);
    setControlsView(true)
    setVideoView(true)
    setGpad(true)
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



  function handleLogout() {
    logout()
    setState({ page: 'login' })
    history.push('/login')
  }

  function handleSession(session) {
    setHomePadding(false)
    setMySession(session)
    setKeyboard(false)
    setGpad(false)
    setChartsView(true)
    setLiveChartView(false)
    setEstadisticsView(false)
    setLeftMenuView(false)
    setVideoView(false)
    setControlsView(false)
  }

  // function toggleKeyboard() {
  //   gamepadDisconnect()
  //   setGpad(false)
  //   document.addEventListener('keydown', keyDown);
  //   document.addEventListener('keyup', keyUp);
  //   setKeyboard(true)
   
  // }

  // function toggleGamepad() {
  //   setKeyboard(false)
  //   setGpad(true)
  //   document.removeEventListener('keydown', keyDown);
  //   document.removeEventListener('keyup', keyUp);
  //   gamepadConnect()
    
  // }

  function toggleLiveChart(){
    setHomePadding(true)
    setChartsView(false)
    setControlsView(false)
    setVideoView(true)
    setEstadisticsView(false)
    setLeftMenuView(true)
    setLiveChartView(true)

  }
  
  function toggleEstadistics(){
    setChartsView(false)
    setHomePadding(true)
    setControlsView(false)
    setVideoView(true)
    setLiveChartView(false)
    setLeftMenuView(true)
    setEstadisticsView(true)

  }

  function toggleControls(){
    setHomePadding(false)
    setChartsView(false)
    setEstadisticsView(false)
    setLiveChartView(false)
    setLeftMenuView(false)
    setVideoView(true)
    setControlsView(true)
  }
  
  function toggleHomeView(){
    setHomePadding(false)
    setChartsView(false)
    setEstadisticsView(false)
    setLiveChartView(false)
    setLeftMenuView(false)
    setVideoView(true)
    setControlsView(true)
  }



  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }


 


 useInterval(() => {
  const a = (channelA * 0.25)+ 20
  const b = ((channelB * -0.25) +20)
  const c = ((channelC * 0.25) +20)
  const d = ((channelD * 0.25) +20)
  setJoy([{left: a, top: b}, {left: d, top: c}])
}, 50);



 
  return <>
    <NavbarLeft toggleLiveChart={toggleLiveChart} toggleEstadistics={toggleEstadistics} toggleControls={toggleControls} toggleHomeView={toggleHomeView}/>
    {/* toggleGamepad={toggleGamepad} toggleKeyboard={toggleKeyboard}    */}
    <div className={homePadding ? "home right-padding" : "home"}>
    
        {videoView && <Video />}

        {mySession && chartsView && <Charts mySession={mySession} />}


        {controlsView && 
        <div className="joycons-wrapper">
           <Joystick joy={joy} />
        </div>}

        {!controlsView && 
        <div className="on-live">
          {estadisticsView && <Telemetry />}
          {liveChartView && <OnLiveCharts />}
        </div>}

       
      
        
    </div>
    
    <NavbarRight handleLogout={handleLogout} handleSession={handleSession} mySessions={mySessions} leftMenuView={leftMenuView}/>
  </>
})