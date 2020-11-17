import React, { useState } from 'react';
import "chartjs-plugin-streaming";
import { socket } from '../socket';
import { Line } from 'react-chartjs-2';


const DroneState = () => {
  const [droneState, setDroneState] = useState('No Data');
  socket.on('dronestate', data => {
    setDroneState(data)
  })
  socket.on('disconnect', () => {
    setDroneState('No Data')
  })
  return droneState;
}

const height = {
  datasets: [
    {
      label: "Altura",
      borderColor: "rgba(226, 123, 70, 0.8)",
      backgroundColor: "rgba(226, 123, 70, 0.6)",
      lineTension: 0.4,
      data: []
    }
  ]
}

export default function () {

  const { tof } = DroneState()

  const heightOpt = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: function () {
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
  }

  return <>
    <div className="on-live">
      <Line data={height} options={heightOpt} />
    </div>
  </>
}