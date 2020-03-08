import React, { Component } from 'react'
import './home.css'
import './credit.css'
import axios from 'axios'
import Alert from '../Alert/Alert'
import {com} from '../../_utils/getRoutes'
import '../Profile/profile.css'


export default class Home extends Component {

  state = {
    users: this.props.users,
    usersSelected: [],
    buttonWhatsapp: ""
  }

  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/usersall/company/${com}`)
    .then(res => this.setState({users: res.data.data}) )
    .catch(e => console.log(e))  }


  filterWhatsapp = e => {
    const buttonWhatsapp = e.target.name
    let filtered = []

    if (buttonWhatsapp === "withWhatsapp") {
      filtered = this.state.users.filter(u => u.whatsapp)

    } else if (buttonWhatsapp === "withoutWhatsapp") {
      filtered = this.state.users.filter(u => !u.whatsapp)
    }


    this.setState({buttonWhatsapp, usersSelected: filtered})
  } 

  showAddCustomer = () => {
    console.log('adding');
  }

  render() {
    let {buttonWhatsapp, usersSelected, users} = this.state
    
    if (buttonWhatsapp) {
      users = usersSelected
    }

    return (

      <div className="container_home" >
        {/* <Fragment>
          <div className="titles-list" >
            <span>Clientes: {this.state.users.filter(u => u.role==="Customer").length}</span>
            <span>Cobradores: {this.state.users.filter(u => u.role==="Collector").length}</span>
            <span>Administradores: {this.state.users.filter(u => u.role==="Admin").length}</span>
          </div>
          <hr />
        </Fragment> */}

        {/* <div id="btns-frecuncy" className="days-buttons" >
          <span>hhhh</span>
        </div> */}

        <div style={{marginTop: "10px"}} id="btns-frecuncy" className="days-buttons" >
          <button name="Daily" style={{background: "#273742"}} onClick={this.showAddCustomer} >
            Agregar Cliente
          </button>

          <button name="Weekly" style={{background:"#273742"}} >
            <i style={{width: "22px"}} className="fas fa-search" ></i>
          </button>

        </div>



        <table>
          <tbody>
            <tr>
              <th className="mobile" >#</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th id="name-3"><i className="fas fa-map-marker-alt"></i></th>
              <th id="name-4">Ubicación</th>
            </tr>
            {
              users.map((u, i) => {
                
                return (
                <tr key={i}>
                  <td className="mobile" >{i + 1}</td>

                  <td id="name-3" >
                    <span className="span_name" style={{color: u.role === "Admin" ? "green" : "black" } }>
                    {u.name.split(" ").slice(0, 3).join(" ")}
                    </span>
                  </td>
                  <td id="name-4" >
                    <span className="span_name" style={{color: u.role === "Admin" ? "green" : "black" } }>{u.name}</span>
                  </td>

                  <td>
                    {/* <i 
                      className="call-icon fas fa-phone"
                      // onClick={() => this.openEdit(u)}
                      >
                        
                    </i> */}

                    {/* {
                      u.whatsapp &&
                      <a 
                        className="call-icon" style={{marginLeft: 5, textDecoration: "none"}}
                        href={`https://wa.me/${convertWhatsapp(u.whatsapp)}?text=Hola ${u.name}, recuerde su pago para hoy`}
                        // href={`tel:${this.convertWhatsapp(u.whatsapp)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        
                        {`+${u.whatsapp ? u.whatsapp: ""}`}
                      </a>
                    } */}
                    <i className="fab fa-whatsapp"></i>
                    <span>{" "}</span>
                    <i className="fas fa-phone"></i>
                    

                    
                  </td>


                  <td>
                    <i 
                      className="fas fa-home"
                      // onClick={() => this.openEdit(u)}
                      >
                    </i>

                    <i 
                      style={{marginLeft: 10}}
                      className="fas fa-building"
                      // onClick={() => this.openConfirm(u._id)}
                      >
                    </i>
                  </td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
        {/* <ol>
          {
            this.props.users.map((u, i) => {
              return (
                <li key={i} className="li_ordered" >
                  <span>
                    <span 
                      className="span_name" 
                      style={{color: u.admin ? "green" : "black" } }

                    >{u.name}</span>
                    {
                      <span className="span_add" onClick={this.toggleAlert} >+</span>
                    }
                  </span>
                </li>
              )
            })
          }
          
        </ol> */}


        {
          this.state.displayAlert &&
          <Alert
            close={this.toggleAlert}
            message={`Utilice la 🔍, luego busque al cliente y agregue el credito con el ➕`}
          />
        }



        
          
      </div>
    )
  }
}
