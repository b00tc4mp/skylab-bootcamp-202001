import React, { useState } from 'react'
import './Navbar-left.sass';
import logo from './logo.svg';
import socket from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faKeyboard, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons'
 




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
  

export default function({toggleKeyboard, toggleGamepad}){

    const status = DroneStatus();

    return <nav className="navbar-left">
    <ul className="lnav">
      <li className="lnav_logo">
        <a href="#" className="lnav-logo_link">
          <span className="lnav_linktext lnav_logo-text">{status}</span>
          <img src={logo} className="react-logo" alt="logo" />
        </a>
      </li>

      <li className="lnav_item">
        <a href="#" className="lnav_link" onClick={toggleGamepad}>
        <FontAwesomeIcon className="lnav_svg" icon={faGamepad} size="3x"/>
          <span className="lnav_linktext">Gamepad</span>
        </a>
      </li>

      <li className="lnav_item">
        <a href="#" className="lnav_link" onClick={toggleKeyboard}>
        <FontAwesomeIcon className="lnav_svg" icon={faKeyboard} size="3x"/>
          <span className="lnav_linktext">Keyboard</span>
        </a>
      </li>

      <li className="lnav_item">
        <a href="#" className="lnav_link">
        <FontAwesomeIcon className="lnav_svg" icon={faChartLine} size="3x"/>
          <span className="lnav_linktext">Charts</span>
        </a>
      </li>

     

      <li className="lnav_item">
        <a href="#" className="lnav_link">
        <FontAwesomeIcon className="lnav_svg" icon={faCog} size="3x"/>
          <span className="lnav_linktext">Settings</span>
        </a>
      </li>
    </ul>
  </nav>

}