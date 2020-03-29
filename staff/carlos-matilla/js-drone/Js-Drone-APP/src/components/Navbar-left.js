import React, { useState } from 'react'
import './Navbar-left.sass'
import drone from './drone.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons'


export default function ({ toggleLiveChart, toggleEstadistics, toggleHomeView, toggleControls }) {


  const [chosen, setChosen] = useState('g');

  return <nav className="navbar-left">
    {/* <li className="lnav_border"></li> */}
    <ul className="lnav">
      <li className="lnav_logo">
          <img src={drone} className="lnav-logo_link" alt="logo" onClick={event => {
            event.preventDefault()
            toggleHomeView()
          }}/>
          
        
      </li>
      <div className="lnav_icons">
      <li className={chosen === 'g' ? "lnav_item active" : "lnav_item"} onClick={event => {
          event.preventDefault()
          setChosen('g')
          toggleControls()
        }}>
        
          <FontAwesomeIcon  icon={faGamepad} size="2x"/>
          
        
      </li>


      <li className={chosen === 'c' ? "lnav_item active" : "lnav_item"} onClick={event => {
          event.preventDefault()
          setChosen('c')
          toggleLiveChart()
        }}>
        
        <FontAwesomeIcon icon={faChartLine} size="2x"/>
        
      
    </li>


    <li className={chosen === 'e' ? "lnav_item active" : "lnav_item"} onClick={event => {
          event.preventDefault()
          setChosen('e')
          toggleEstadistics()
        }} >
        
        <FontAwesomeIcon icon={faChartBar} size="2x"/>
        
      
    </li>
    </div>
    </ul>
  </nav>

}