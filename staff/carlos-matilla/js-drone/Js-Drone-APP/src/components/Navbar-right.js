import React, { useState } from 'react'
import './Navbar-right.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faKeyboard, faChartLine, faCog, faChartBar } from '@fortawesome/free-solid-svg-icons'

export default function ({ mySessions, handleLogout, handleSession, showMenu }) {
  function dateParser(date) {
    const fullDate = date.split("T")[0]
    const day = fullDate.split("-")[2]
    const month = fullDate.split("-")[1]
    const year2 = fullDate.split("-")[0]
    const hour = (date.split("T")[1]).split(".")[0]

    return `${hour}  ${day}-${month}-${year2}`
  }

  function dayParser(date) {
    const fullDate = date.split("T")[0]
    const day = fullDate.split("-")[2]
    return day
  }

  function monthParser(date){
    const fullDate = date.split("T")[0]
    const month = fullDate.split("-")[1]
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return monthArray[Number(month)-1]
  }


  return <nav className={showMenu ? "navbar-right" : "navbar-right little"}>
    <li className="rnav_logo">
      <a href="#" className="rnav-logo_link">
        {/* <span className="rnav_linktext rnav_logo-text">{name}</span> */}
        <button className="rnav_button" onClick={handleLogout}>CM</button>
      </a>
    </li>
    <ul className="rnav">
      {mySessions.map((session => <>
        <li className="rnav_item" key={session}>
          <a href="" className="rnav_link" onClick={event => {
            event.preventDefault()

            handleSession(session)
          }}>
            <div className="rnav_svg">
              <spam>{dayParser(session.date)}</spam>
              <em>{monthParser(session.date)}</em>

            </div>

            <span className="rnav_linktext">{dateParser(session.date)}</span>
          </a>
        </li>
      </>))}
    </ul>
  </nav>
}

