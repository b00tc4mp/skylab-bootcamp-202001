import React, {useState} from 'react';
import "chartjs-plugin-streaming";
import socket from '../socket';
import {Line} from 'react-chartjs-2';



const DroneState = () =>{
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
        borderColor: "rgb(97,218,251)",
        backgroundColor: "rgba(97,218,251, 0.5)",
        lineTension: 0.4,
        
        
        data: []
      }
      
    ]
  };

export default function(){
    const {  vgx, vgy, vgz, templ, temph, tof, agx, agy, agz } = DroneState()

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
              },
              time: {
                unit: 'second'
            }
    
            }
          ]
        }
      };
  
      
      return<>
      <Line data={height} options={heightOpt} height={60} /> 
      {/* <Line data={temperature} options={temperatureOpt}  />
      <Line data={speed} options={speedOpt} />
      <Line data={aceleration} options={acelerationOpt}/> */}
      </>
}