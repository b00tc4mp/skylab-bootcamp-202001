import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from '../socket';
import { gamepadConnect, gamepadDisconnect, check } from "../logic/gamepad";
import {keyDown, keyUp} from '../logic/keyboard'
import "chartjs-plugin-streaming";


import {Line, Bar} from 'react-chartjs-2';









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
    
  }, []);

  const status = DroneStatus();
  const state = DroneState()

  const { pitch, roll, yaw, vgx, vgy, vgz, templ, temph, tof, h, bat, baro, time, agx, agy, agz } = state



  const heightGra = Number(tof)

  
  
 
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
        {/* {<img src={logo} className="App-logo" alt="logo" />}

        {<h3>{status}</h3>} */}
        <section className="telemetria">
          <div><p>Pitch</p><p>{pitch}</p></div>
          <div><p>Roll</p><p>{roll}</p></div>
          <div><p>Yaw</p><p>{yaw}</p></div>
          <div><p>V en X</p><p>{vgx}</p></div>
          <div><p>V en Y</p><p>{vgy}</p></div>
          <div><p>V en Z</p><p>{vgz}</p></div>
          <div><p>Temp min</p><p>{templ}</p></div>
          <div><p>Temp max</p><p>{temph}</p></div>
          <div><p>Tof</p><p>{tof}</p></div>
          <div><p>Altura</p><p>{h}</p></div>
          <div><p>Bateria</p><p>{bat}</p></div>
          <div><p>Barometro</p><p>{baro}</p></div>
          <div><p>Tiempo de vuelo</p><p>{time}</p></div>
          <div><p>AC en X</p><p>{agx}</p></div>
          <div><p>AC en Y</p><p>{agy}</p></div>
          <div><p>AC en Z</p><p>{agz}</p></div>
        </section>
        <section className="charts">
          <div>
            <Line data={height} options={heightOpt} />
          </div>
          <div>
            <Line data={temperature} options={temperatureOpt}  />
          </div>
          <div>
            <Line data={speed} options={speedOpt} />
          </div>
          <div>
            <Line data={aceleration} options={acelerationOpt}/>
          </div>
        {/* <Bar data={temperature} options={temperatureOpt}/> */}
        </section>
        

      </header>

    </div>
  );
}

export default App;
