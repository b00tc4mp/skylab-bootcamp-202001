
import React, { useState } from 'react';
import { socket } from '../socket';
import './Telemetry.sass';


export default function () {

  const DroneState = () => {
    const [droneState, setDroneState] = useState('No Data');
    socket.on('dronestate', data => {
      console.log(data)
      setDroneState(data)
    })
    socket.on('disconnect', () => {
      setDroneState('No Data')
    })
    return droneState;
  }

  const { pitch, roll, yaw, vgx, vgy, vgz, templ, temph, time, agx, agy, agz } = DroneState()

  return <>
    <div className="on-live-telemetry">
      <section className="telemetria">
        <div><p>Pitch</p><p>{pitch}</p></div>
        <div><p>Roll</p><p>{roll}</p></div>
        <div><p>Yaw</p><p>{yaw}</p></div>
        <div><p>Vx</p><p>{vgx}</p></div>
        <div><p>Vy</p><p>{vgy}</p></div>
        <div><p>Vz</p><p>{vgz}</p></div>
        <div><p>Tmin</p><p>{templ}</p></div>
        <div><p>Tmax</p><p>{temph}</p></div>
        <div><p>Time</p><p>{time}</p></div>
        <div><p>ACx</p><p>{agx}</p></div>
        <div><p>ACy</p><p>{agy}</p></div>
        <div><p>ACz</p><p>{agz}</p></div>
      </section>
    </div>
  </>
}
