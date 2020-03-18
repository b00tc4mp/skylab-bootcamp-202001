import React from 'react'
import './Navbar-right.sass';

export default function ({ mySessions, handleLogout, handleSession }) {
  return <nav className="navbar-right">
    <li className="rnav_logo">
      <a href="#" className="rnav-logo_link">
        {/* <span className="rnav_linktext rnav_logo-text">{name}</span> */}
        <button className="rnav_button" onClick={handleLogout}>Logout</button>
      </a>
    </li>
    <ul className="rnav">
      {mySessions.map((session => <>
        <li className="rnav_item" key={session}>
          <a href="" className="rnav_link" onClick={event => {
           
            event.preventDefault()
            
            handleSession(session)
          }}>
            <span className="rnav_linktext">{session.date}</span>
          </a>
        </li>
      </>))}
    </ul>
  </nav>
}

