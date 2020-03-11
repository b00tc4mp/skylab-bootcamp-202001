import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.sass';
import socket from '../socket';
import { gamepadConnect, gamepadDisconnect, check } from "../logic/gamepad";
import {keyDown, keyUp} from '../logic/keyboard'
import "chartjs-plugin-streaming";
import JMuxer from 'jmuxer';
import {Line} from 'react-chartjs-2';









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

function DroneState() {
  const [droneState, setDroneState] = useState('No Data');
  socket.on('dronestate', data => {
    setDroneState(data)
  })
  socket.on('disconnect', () => {
    setDroneState('No Data')
  })
  return droneState;
}

const temperature = {
  datasets: [
    {
      label: "Hight Temp",
      borderColor: "rgb(245,85,54)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
      
      data: []
    },
    {
      label: "Low Temp",
      borderColor: "rgb(2,143,204)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
     
      data: []
    }
  ]
};


const speed = {
  datasets: [
    {
      label: "Vx",
      borderColor: "rgb(2,143,204)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
      // borderDash: [8, 8],
      data: []
    },
    {
      label: "Vy",
      borderColor: "rgb(255,255,255)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
      // borderDash: [8, 4],
      data: []
    },
    {
      label: "Vz",
      borderColor: "rgb(245,85,54)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
      // borderDash: [8, 4],
      data: []
    }
  ]
};


const aceleration = {
  datasets: [
    {
      label: "Ax",
      borderColor: "rgb(245,85,54)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
     
      data: []
    },
    {
      label: "Ay",
      borderColor: "rgb(255,255,255)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
      
      data: []
    },
    {
      label: "Az",
      borderColor: "rgb(2,143,204)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      lineTension: 0.4,
      
      data: []
    }
  ]
};

const height = {
  datasets: [
    {
      label: "Altura",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      lineTension: 0.4,
      
      
      data: []
    }
    
  ]
};

function App() {

  useEffect(() => {
    window.addEventListener("gamepadconnected", gamepadConnect);
    window.addEventListener("gamepaddisconnected", gamepadDisconnect);
    
    
    if(!check){ 
      document.addEventListener('keydown', keyDown);
      document.addEventListener('keyup', keyUp);
    }

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
  const state = DroneState()

  const { pitch, roll, yaw, vgx, vgy, vgz, templ, temph, tof, h, bat, baro, time, agx, agy, agz } = state


 
  const temperatureOpt = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: function() {
              temperature.datasets[0].data.push({
                x: Date.now(),
                y: Number(temph)
              });
              temperature.datasets[1].data.push({
                x: Date.now(),
                y: Number(templ)
              });
            },
            
            
            refresh: 300
          }
        }
      ]
    }
  };


  const speedOpt = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: function() {
              speed.datasets[0].data.push({
                x: Date.now(),
                y: Number(vgx)
              });
              speed.datasets[1].data.push({
                x: Date.now(),
                y: Number(vgy)
              });
              speed.datasets[2].data.push({
                x: Date.now(),
                y: Number(vgz)
              });
            },
            
            
            refresh: 300
          }
        }
      ]
    }
  };


  const acelerationOpt = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: function() {
              aceleration.datasets[0].data.push({
                x: Date.now(),
                y: Number(agx)
              });
              aceleration.datasets[1].data.push({
                x: Date.now(),
                y: Number(agy)
              });
              aceleration.datasets[2].data.push({
                x: Date.now(),
                y: Number(agz)
              });
            },
            
            
            refresh: 300
          }
        }
      ]
    }
  };

  const heightOpt = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: function() {
              height.datasets[0].data.push({
                x: Date.now(),
                y: Number(tof)
              });
            },
            
            
            refresh: 300
          }
        }
      ]
    }
  };
  
  


  return (
    <div className="Drone">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{status}</h3>
      </header>
 
        <section className="charts">
          {/* <div> */}
            {/* <Line className="height" height={50} data={height} options={heightOpt} /> */}
          {/* </div> */}
          {/* <div>
            <Line data={temperature} options={temperatureOpt}  />
          </div>
          <div>
            <Line data={speed} options={speedOpt} />
          </div>
          <div>
            <Line data={aceleration} options={acelerationOpt}/>
          </div> */}
        <video className="video" id='player'  autoPlay muted/>
        </section>
        
        
        
      
      

    </div>
  );
}

export default App;
