import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './sidebar.css'
import {com} from '../../_utils/getRoutes'

export default class Sidebar extends Component {

  reload = path => {
    if (window.location.pathname === path) {
      window.location.reload()
    } else {
      this.props.toggleSidebar()
    }
  }

  render() {
    const {displaySidebar} = this.props

    return (
      <div 
        className="bg-modal-sidebar" 
        style={displaySidebar? {visibility: "visible"} : {visibility: "hidden"}}
      >
        <div className="div_fixed" onClick={this.props.toggleSidebar}></div>
        
        <div className="modal-content-sidebar" style={displaySidebar? {right: "0"} : {right: "-100%"}}>

          <div className="nav-modal-sidebar" >
            <span style={{display: "flex", justifyContent: "space-around", width: '100%'}}>
              <span>Menú</span>
            </span>
            <div className="close-sidebar li-fa-times" onClick={this.props.toggleSidebar} >+</div>

          </div>
          
          <div className="list-menu">
            <ul className="ul-menu">

              <Link onClick={() => this.reload('/list/users')} className="item-sidebar" to='/list/users'>
                <li>
                  <i className="fas fa-users"></i>
                  {
                    com === "5d96a25d1fcade0004e10e05" && <span>Clientes</span>
                  }
                  {
                    com !== "5d96a25d1fcade0004e10e05" && <span>Usuarios</span>
                  }
                </li>
              </Link>


              <Link onClick={() => this.reload('/user')} className="item-sidebar" to='/user'>
                <li>
                  <i className="fas fa-user-plus"></i>
                  <span>Nuevo Usuario</span>
                </li>
              </Link>

              <Link onClick={() => this.reload('/contabilidad')} className="item-sidebar" to='/contabilidad'>
                <li>
                  <i className="fas fa-file-contract"></i>
                  <span>Contabilidad</span>
                </li>
              </Link>

              <hr />
              <p className="title-sidebar" >Reportes</p>
              {/* <Link onClick={this.props.toggleSidebar} className="item-sidebar" to='/collects'>
                <li>
                  <i style={{paddingLeft: "5px"}} className="fas fa-dollar-sign"></i>
                  <span>Cobros</span>
                </li>
              </Link> */}
              <Link onClick={() => this.reload('/collected')} className="item-sidebar" to='/collected'>
                <li>
                  <i style={{paddingLeft:"5px"}} className="fas fa-dollar-sign"></i>
                  
                  <span>Cobrado</span>
                </li>
              </Link>

              <Link onClick={() => this.reload('/constituted')} className="item-sidebar" to='/constituted'>
                <li>
                  <i className="far fa-handshake"></i>
                  <span>Créditos Constituidos</span>
                </li>
              </Link>

              <Link onClick={() => this.reload('/canceled')} className="item-sidebar" to='/canceled'>
                <li>
                  <i className="fas fa-user-times"></i>
                  <span>Créditos Cancelados</span>
                </li>
              </Link>
              
              <Link onClick={() => this.reload('/box')} className="item-sidebar" to='/box'>
                <li>
                  <i className="fas fa-cash-register"></i>
                  <span>Control de la Caja</span>
                </li>
              </Link>

              <hr />
              {/* <Link onClick={this.props.toggleSidebar} className="item-sidebar" to='/configs'>
                <li>
                  <i className="fas fa-cog"></i>
                  <span>Configuraciones</span>
                </li>
              </Link> */}
              <li onClick={this.props.logout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Salir</span>
              </li>
              
              
            </ul>

            
  
          </div>
        </div>
      </div>
    )
  }
}
