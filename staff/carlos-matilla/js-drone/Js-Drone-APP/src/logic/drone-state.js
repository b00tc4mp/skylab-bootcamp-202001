import React, { useState, useEffect, useContext } from 'react'
import socket from '../socket';
 
export default ()=>{
    let state
    socket.on('dronestate', data => {
        state = data
        console.log(state)
    })
    socket.on('disconnect', () => {
        // setDroneState('No Data')
    })
    
}
  
  