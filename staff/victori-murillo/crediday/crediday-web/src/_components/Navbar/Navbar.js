import React from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
// import axios from 'axios'
import { isAdmin, isCollector} from '../../_utils/isLoggedIn'


export default class Navbar extends React.Component {

  reload = path => {
    if (window.location.pathname === path) {
      window.location.reload()
    }
  }

  render() {
    const compName = localStorage.getItem("companyName")
    
    return (
      <div className="nav">

        <ul className="nav_ul">
          <Link onClick={() => this.reload("/")} className="navbar_item" to='/' >
            <li>{compName ? compName.toUpperCase() : "Cobro"}</li>
          </Link>

          <Link onClick={() => this.reload("/CreditList")} className="navbar_item" to="/CreditList" >
            <li>
              <i style={{width: "22px"}} className="fas fa-coins"></i>
              <span style={{fontSize: "14px"}} >Créditos</span>
            </li>
            
          </Link>


          <Link onClick={() => this.reload("/search")} className="navbar_item" to='/search' >
            <li>
              <i style={{width: "22px"}} className="fas fa-search" ></i>
              <span className="tablet-span" style={{fontSize: "14px"}} >Buscar</span>
            </li>
          </Link>

          {
            isAdmin() &&
            <li className="navbar_item" onClick={ this.props.toggleSidebar }>
              <i className="fas fa-bars"></i>
            </li>
          }

          {
            isCollector() &&
            <Link className="navbar_item" to='/' >
              <li className="li-fa-times" onClick={ this.props.logout }>
                <i className="fas fa-times"></i>
              </li>
            </Link>
          }

        </ul>
      </div>
    )
  }
}