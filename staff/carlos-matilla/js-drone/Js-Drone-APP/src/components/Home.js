import React, { useState, useEffect, useContext } from 'react'
import logo from './logo.svg';
import './Home.sass';
import { gamepadConnect, gamepadDisconnect } from "../logic/gamepad";
import {keyDown, keyUp} from '../logic/keyboard'
import JMuxer from 'jmuxer';
import {logout, isLoggedIn, retrieveUser} from './../logic'
import {Telemetry, Charts} from './';
import socket from '../socket';
import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'


function DroneStatus() {
    const [status, setStatus] = useState('DISCONNECTED');
    socket.on('status', () => {
      setStatus('CONNECTED')
    })
    socket.on('disconnect', () => {
      setStatus('DISCONNECTED')
    })
    return status;
}
  

export default withRouter(function ({ history }) {

    const [, setState] = useContext(Context)
    const [name, setName] = useState()

    useEffect(() => {
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
        window.addEventListener("gamepadconnected", gamepadConnect);
        window.addEventListener("gamepaddisconnected", gamepadDisconnect);
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
    
        window.onload = function() {
          var socketURL = 'ws://localhost:8080';
          var jmuxer = new JMuxer({
              node: 'player',
              mode: 'video',
              flushingTime: 1,
              fps: 30
            });
      
            var ws = new WebSocket(socketURL);
            ws.binaryType = 'arraybuffer';
            ws.addEventListener('message',function(event) {
                jmuxer.feed({
                  video: new Uint8Array(event.data)
                });
            });
      
            ws.addEventListener('error', function(e) {
              console.log('Socket Error');
            });
        }
        
        
      }, []);
    
      const status = DroneStatus();
     
      function handleLogout() {
        logout()

        setState({ page: 'login' })

        history.push('/login')
    }

      return (
        <div className="Drone">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h3>{status}</h3>
                <h1>Hello, {name}!</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <Telemetry />
            <section className="video-container">
                <video className="video" id='player'  autoPlay muted/>
            </section>
            {/* <Charts /> */}
            
        </div>
      )
})