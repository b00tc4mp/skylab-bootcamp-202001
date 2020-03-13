import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.sass';
import { gamepadConnect, gamepadDisconnect, check } from "../logic/gamepad";
import {keyDown, keyUp} from '../logic/keyboard'
// import JMuxer from 'jmuxer';
import Telemetry from './Telemetry';
import Charts from './charts'
import socket from '../socket';



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




function App() {

  useEffect(() => {
    window.addEventListener("gamepadconnected", gamepadConnect);
    window.addEventListener("gamepaddisconnected", gamepadDisconnect);
    
    
    if(!check){ 
      document.addEventListener('keydown', keyDown);
      document.addEventListener('keyup', keyUp);
    }

    // window.onload = function() {
    //   var socketURL = 'ws://localhost:8080';
    //   var jmuxer = new JMuxer({
    //       node: 'player',
    //       mode: 'video',
    //       flushingTime: 1,
    //       fps: 30
    //     });
  
    //     var ws = new WebSocket(socketURL);
    //     ws.binaryType = 'arraybuffer';
    //     ws.addEventListener('message',function(event) {
    //         jmuxer.feed({
    //           video: new Uint8Array(event.data)
    //         });
    //     });
  
    //     ws.addEventListener('error', function(e) {
    //       console.log('Socket Error');
    //     });
    // }
    
    
  }, []);

  const status = DroneStatus();
 

  return (
    <div className="Drone">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{status}</h3>
      </header>
      <Telemetry />
        {/* <section className="video-container">
          <video className="video" id='player'  autoPlay muted/>
        </section> */}
        
        <Charts />
        
    </div>
  );
}

export default App;
