import React, { useState } from 'react'
import './Navbar-left.sass'
import logo from './logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons'


export default function ({ toggleLiveChart, toggleEstadistics, toggleHomeView, toggleControls }) {


  const [chosen, setChosen] = useState('g');

  return <nav className="navbar-left">
    <ul className="lnav">
      <li className="lnav_logo">
        <a href="#" className="lnav-logo_link" onClick={event => {
          event.preventDefault()
          toggleHomeView()
        }}>
          <span className="lnav_linktext lnav_logo-text">No c</span>
          <img src={logo} className="react-logo" alt="logo" />
        </a>
      </li>

      <li className="lnav_item">
        <a href="#" className={chosen === 'g' ? "lnav_link active" : "lnav_link"} onClick={event => {
          event.preventDefault()
          setChosen('g')
          toggleControls()
        }}>
          <FontAwesomeIcon className="lnav_svg" icon={faGamepad} size="2x" />
          <span className="lnav_linktext">Controls</span>
        </a>
      </li>


      <li className="lnav_item">
        <a href="#" className={chosen === 'c' ? "lnav_link active" : "lnav_link"} onClick={event => {
          event.preventDefault()
          setChosen('c')
          toggleLiveChart()
        }}>
          <FontAwesomeIcon className="lnav_svg" icon={faChartLine} size="2x" />
          <span className="lnav_linktext">Charts</span>
        </a>
      </li>


      <li className="lnav_item">
        <a href="#" className={chosen === 'e' ? "lnav_link active" : "lnav_link"} onClick={event => {
          event.preventDefault()
          setChosen('e')
          toggleEstadistics()
        }}>
          <FontAwesomeIcon className="lnav_svg" icon={faChartBar} size="2x" />
          <span className="lnav_linktext">Estadistics</span>
        </a>
      </li>

    </ul>
  </nav>

}