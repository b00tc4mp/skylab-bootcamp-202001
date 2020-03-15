import React from 'react'
import './Navbar-right.sass';



export default function( {handleLogout}){

    
    

    return <nav className="navbar-right">
    <ul className="rnav">
      <li className="rnav_logo">
        <a href="#" className="rnav-logo_link">
          {/* <span className="rnav_linktext rnav_logo-text">{name}</span> */}
          <button className="rnav_button" onClick={handleLogout}>Logout</button>
        </a>
      </li>

      <li className="rnav_item">
        <a href="#" className="rnav_link">
         
          <span className="rnav_linktext">Gamepad</span>
        </a>
      </li>

      <li className="rnav_item">
        <a href="#" className="rnav_link">
          
          <span className="rnav_linktext">Keyboard</span>
        </a>
      </li>

      <li className="rnav_item">
        <a href="#" className="rnav_link">
          
          <span className="rnav_linktext">Charts</span>
        </a>
      </li>

      <li className="rnav_item">
        <a href="#" className="rnav_link">
          
          <span className="rnav_linktext">Shuttle</span>
        </a>
      </li>

      <li className="rnav_item">
        <a href="#" className="rnav_link">
          
          <span className="rnav_linktext">Themify</span>
        </a>
      </li>
    </ul>
  </nav>

}