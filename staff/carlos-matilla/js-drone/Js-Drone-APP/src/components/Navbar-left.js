import React, { useState } from 'react'
import './Navbar-left.sass';
import logo from './logo.svg';
import socket from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faKeyboard, faChartLine, faCog, faChartBar } from '@fortawesome/free-solid-svg-icons'
 

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
  

export default function({toggleKeyboard, toggleGamepad, toggleLiveChart, toggleEstadistics, toggleHomeView, toggleControls}){

    const status = DroneStatus();
    const [chosen1, setChosen1] = useState('g');
    const [chosen2, setChosen2] = useState('g');

    return <nav className="navbar-left">
    <ul className="lnav">
      <li className="lnav_logo">
        <a href="#" className="lnav-logo_link" onClick={event => {
      event.preventDefault()
      toggleHomeView()
      
    }}>
          <span className="lnav_linktext lnav_logo-text">{status}</span>
          <img src={logo} className="react-logo" alt="logo" />
        </a>
      </li>

      <li className="lnav_item">
        <a href="#" className={chosen1 === 'g' ? "lnav_link active" : "lnav_link"}  onClick={event => {
           
           event.preventDefault()
           setChosen1('g')
          //  toggleGamepad()
         }}>
        <FontAwesomeIcon className="lnav_svg" icon={faGamepad} size="2x"/>
          <span className="lnav_linktext">Gamepad</span>
        </a>
      </li>

      <li className="lnav_item">
        <a href="#" className={chosen1 === 'k' ? "lnav_link active" : "lnav_link"} onClick={event => {
           
           event.preventDefault()
           setChosen1('k')
          //  toggleKeyboard()
         }}>
        <FontAwesomeIcon className="lnav_svg" icon={faKeyboard} size="2x"/>
          <span className="lnav_linktext">Keyboard</span>
        </a>
      </li>

      <hr style={{width:65}} />

      <li className="lnav_item">
        <a href="#" className={chosen2 === 'c' ? "lnav_link active" : "lnav_link"} onClick={event => {
           
           event.preventDefault()
           setChosen2('c')
           toggleLiveChart()
         }}>
        <FontAwesomeIcon className="lnav_svg" icon={faChartLine} size="2x"/>
          <span className="lnav_linktext">Charts</span>
        </a>
      </li>

     

      <li className="lnav_item">
        <a href="#" className={chosen2 === 'e' ? "lnav_link active" : "lnav_link"} onClick={event => {
           
           event.preventDefault()
           setChosen2('e')
           toggleEstadistics()
         }}>
        <FontAwesomeIcon className="lnav_svg" icon={faChartBar} size="2x"/>
          <span className="lnav_linktext">Estadistics</span>
        </a>
      </li>


      <li className="lnav_item">
        <a href="#" className={chosen2 === 'g' ? "lnav_link active" : "lnav_link"} onClick={event => {
           
          event.preventDefault()
          setChosen2('g')
          toggleControls()
         }}>
        <FontAwesomeIcon className="lnav_svg" icon={faGamepad} size="2x"/>
          <span className="lnav_linktext">Estadistics</span>
        </a>
      </li>
    </ul>
  </nav>

}