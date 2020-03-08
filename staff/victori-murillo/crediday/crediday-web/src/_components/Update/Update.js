import React, { Component, Fragment } from 'react'
import './update.css'
import axios from 'axios'
import transformWords from '../../_utils/transformWords'
import makeCrId from '../../_utils/makeCrId'
import {isAdmin, isCollector} from '../../_utils/isLoggedIn'

import ModalCheckBox from '../ModalCheckBox/ModalCheckBox'


export default class Payment extends Component {
  state = {
    name: this.props.user.name,
    crId: this.props.user.crId,
    password: "",
    username: this.props.user.username,

    role: this.props.user.role,

    mobileNumber: this.props.user.mobileNumber,
    whatsapp: this.props.user.whatsapp ? this.props.user.whatsapp: "",
    homeAddress: this.props.user.homeAddress,
    workAddress: this.props.user.workAddress,

    seeBalance: false,
    seeSearch: false,

    permissions: this.props.user.permissions,
    configInitialAmount: this.props.user.configInitialAmount,

    displayModal: false,
  }

  // componentDidMount = () => {
  //   axios.get(`https://back-credits.herokuapp.com/api/users/company/${localStorage.getItem("company")}`)
  //     .then(result => this.setState({users: result.data.data}))
  //     .catch(e => console.log(e))
  // }

  updateUser = e => {
    e.preventDefault()

    const json = {
      name: this.state.name,
      crId: this.state.crId,
      username: this.state.username ? this.state.username.toLowerCase() : this.props.user._id,
      role: this.state.role ? this.state.role : "Customer",

      mobileNumber: this.state.mobileNumber,
      whatsapp: this.state.whatsapp,
      homeAddress: this.state.homeAddress,
      workAddress: this.state.workAddress,

      permissions: this.state.permissions,
      configInitialAmount: this.state.configInitialAmount
    }


    if (this.state.password) {
      json.password = this.state.password
    }

    axios.put(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/${this.props.user._id}`, json)
    .then( res => {
      const {message} = res.data
      localStorage.setItem("configInitialAmount", this.state.configInitialAmount)

      if (message === "El Nombre de Usuario ya existe, ingresar uno diferente.") {
        alert(message)
      }
      console.log(message)
      window.location.reload()
    })
    .catch( e => console.log(e))
  }

  onChangeInput = e => this.setState({[e.target.name]: e.target.value})
  onChangeInputName = e => this.setState({[e.target.name]: transformWords(e.target.value)})

  onChangeUsername = e => {
    let {name, value} = e.target

    value = value.split('').filter(l => l !== "," && l !== " ").join("")

    this.setState({[name]: value})
  } 


  onChangeSelect = e => {
    if (e.target.value === "false") {
      this.setState({admin: false}) 

    } else if (e.target.value === "true") {
      this.setState({admin: true}) 
  } 
}

onChangeSelectRole = e => this.setState({ role: e.target.value})

onChangePermissions = e => {
  let {value} = e.target
  
  if(value === "true") value = true
  if(value === "false") value = false

  this.setState({permissions: value})
} 

onChangeConfigInitialAmount = e => {
  let {value} = e.target
  
  if(value === "true") value = true
  if(value === "false") value = false

  this.setState({configInitialAmount: value})
} 

onChangeCrId = e => {
  const crId = makeCrId(e.target.value)
  if (crId.length <= 11) this.setState({crId})
}

onChangeWhatsapp = e => {
  let number = e.target.value

  const numberWhatsapp = number.split("").map((letter, i, array) => {

    if ( letter >= 0 || (letter === " " && (i === 4 || i === 9) )     ) {

      if ( i === 4 && array.length === 5 && letter !== " ") {
        return " " + letter 

    } else if ( i === 9 && array.length === 10 && letter !== " " ) {
      return " " + letter
    }
    return letter
  }

  return ""
    
  }).join('')

  console.log(numberWhatsapp)

  if (numberWhatsapp.length <= 13) this.setState({whatsapp: numberWhatsapp})
  

}

toggleModal = () => {
  this.setState({displayModal: !this.state.displayModal})
}

closeModal = () => this.setState({displayModal: false})

  render() {
    console.log(this.state.configInitialAmount)

    return (
    <div className="bg-modal-update" >
      <div className="modal-content-update" >
        <div className="nav-modal-update" >Editar</div>
        <div className="close-update" onClick={() => this.props.closeDisplay("displayUpdate")} >+</div>

        <div>

          <h2>Datos Personales</h2>
          
          <form className='form_payment_container' onSubmit={this.updateUser} >


            <div className="container-payments-input" >


              <span className='payment_span' style={{width: "80%"}} >
                <span className="p_amount">Nombre Completo: </span>

                <input 
                  style={{width: "100%"}}
                  className="name_input"
                  type="text" 
                  onChange={this.onChangeInputName} 
                  name="name"
                  value={this.state.name}
                />
              </span>

              <span className='payment_span' style={{width: "50%"}} >
                <span className="p_amount"><i className="fas fa-id-card"></i> Cédula: </span>

                <input 
                  className="name_input"
                  type="text" 
                  onChange={this.onChangeCrId} 
                  name="crId"
                  value={this.state.crId}
                />
              </span>

              <span className='payment_span' style={{width: "50%"}} >
                <span className="p_amount"> <i className="fab fa-whatsapp"></i> Whatsapp: </span>
                <h5 style={{margin: "2px auto"}}>(+506 código de Costa Rica)</h5>
                <h5 style={{margin: "2px auto"}}>Ejemplo: +506 8315 0519</h5>
                <input 
                  className="name_input"
                  type="text" 
                  onChange={this.onChangeWhatsapp} 
                  name="whatsapp"
                  value={`+${this.state.whatsapp}`}
                  autoComplete="off"
                />
              </span>

              <span className='payment_span' style={{width: "50%"}} >
                <span className="p_amount"> <i className="fas fa-phone"></i> Celular: </span>

                <input 
                  className="name_input"
                  type="text" 
                  onChange={this.onChangeInput} 
                  name="mobileNumber"
                  value={this.state.mobileNumber}
                />
              </span>


              <span className='payment_span' style={{width: "92%"}} >
                <span className="p_amount"><i className="fas fa-home"></i> Dirección de Casa: </span>

                <input 
                  className="name_input"
                  type="text" 
                  onChange={this.onChangeInput} 
                  name="homeAddress"
                  value={this.state.homeAddress}
                />
              </span>


              <span className='payment_span' style={{width: "92%"}} >
                <span className="p_amount"><i className="fas fa-building"></i> Dirección de Trabajo: </span>

                <input 
                  className="name_input"
                  type="text" 
                  onChange={this.onChangeInput} 
                  name="workAddress"
                  value={this.state.workAddress}
                />
              </span>

              <br />
              {/* <br /> */}

              {/* <span className='payment_span' style={{width: "92%"}} >
                <span className="p_amount">Waze de <i class="fas fa-home"></i>: </span>
                <input 
                  className="name_input"
                  type="text" 
                  // onChange={this.onChangeInput} 
                  name="homeAddress"
                  // value={this.state.homeAddress}
                />
              </span> */}

              {/* <span className='payment_span' style={{width: "92%"}} >
                <span className="p_amount"><i class="fas fa-home"></i>GPS Waze de Trabajo: </span>
                <input 
                  className="name_input"
                  type="text" 
                  // onChange={this.onChangeInput} 
                  name="homeAddress"
                  // value={this.state.homeAddress}
                />
              </span> */}

              {
                isAdmin() &&
                <Fragment>
                  <hr />
                  <h2>Datos para Acceder al Sistema</h2>
                  

                  <span className='payment_span' >
                    <span className="p_amount">Rol:</span>

                    {
                      this.state.role === "Admin" &&
                        <select className="admin_update" onChange={this.onChangeSelectRole} >
                          <option value="Admin" >Administrador</option>
                          <option value="Collector" >Cobrador</option>
                          <option value="Customer" >Cliente</option>
                      </select>
                      }

                    
                      {
                        this.state.role === "Collector" &&
                        <select className="admin_update" onChange={this.onChangeSelectRole} >
                          <option value="Collector" >Cobrador</option>
                          <option value="Customer" >Cliente</option>
                          <option value="Admin" >Administrador</option>
                      </select>
                      }
                      
                      {
                        this.state.role === "Customer" &&
                        <select className="admin_update" onChange={this.onChangeSelectRole} >
                          <option value="Customer" >Cliente</option>
                          <option value="Collector" >Cobrador</option>
                          <option value="Admin" >Administrador</option>
                      </select>
                      }

                      
                      {
                        !this.state.role &&
                        <select className="admin_update" onChange={this.onChangeSelectRole} >
                          <option value="Customer" >Cliente</option>
                          <option value="Collector" >Cobrador</option>
                          <option value="Admin" >Administrador</option>
                        </select>
                      }

                  </span>

                  {
                    (this.state.role === "Collector" && this.state.permissions) &&
                    <span className='payment_span' >
                      <span className="p_amount">Puede editar y eliminar pagos:</span>
                        <select className="admin_update" onChange={this.onChangePermissions} >
                          <option value={true} >Si</option>
                          <option value={false} >No</option>
                      </select>
                    </span>
                  }
                  
                  {
                    (this.state.role === "Collector" && !this.state.permissions) &&
                    <span className='payment_span' >
                      <span className="p_amount">Puede editar y eliminar pagos:</span>
                        <select className="admin_update" onChange={this.onChangePermissions} >
                        <option value={false} >No</option>
                        <option value={true} >Si</option>
                      </select>
                    </span>
                  }

                  {
                    (this.state.role === "Collector") &&
                    <span className='payment_span' >
                      <button style={{borderRadius: 10, backgroundColor: "#1F618D", padding: 8}} 
                      type="button" onClick={this.toggleModal} >
                        <span style={{fontSize:16, color: "white"}} >Clientes que puede ver</span>
                      </button>
                    </span>
                  }
                  
                  {
                    (this.state.role === "Admin" && this.state.configInitialAmount) &&
                    <span className='payment_span' >
                      <span className="p_amount">En créditos ver:</span>
                        <select className="admin_update" onChange={this.onChangeConfigInitialAmount} >
                        <option value={true} >Monto Inicial</option>
                        <option value={false} >Saldo</option>
                      </select>
                    </span>
                  }
                  
                  {
                    (this.state.role === "Admin" && !this.state.configInitialAmount) &&
                    <span className='payment_span' >
                      <span className="p_amount">En créditos ver:</span>
                        <select className="admin_update" onChange={this.onChangeConfigInitialAmount} >
                        <option value={false} >Saldo</option>
                        <option value={true} >Monto Inicial</option>
                      </select>
                    </span>
                  }
                  

                  <span className='payment_span' style={{width: "50%"}} >
                    <span className="p_amount">Nombre de Usuario: </span>
                    <h5 style={{margin: "2px auto"}}>(Se utiliza para Ingresar al Sistema)</h5>

                    <input 
                      style={{width: "100%"}}
                      className="name_input"
                      type="text" 
                      onChange={this.onChangeUsername}
                      name="username"
                      value={this.state.username}
                      autoComplete="off"
                    />
                  </span>


                  <span className='payment_span' style={{width: "50%"}} >
                    <span className="p_amount">Cambiar Contraseña: </span>
                    <h5 style={{margin: "2px auto"}}>(Se utiliza para Ingresar al Sistema)</h5>

                    <input 
                      className="name_input"
                      type="password" 
                      onChange={this.onChangeInput} 
                      name="password"
                      value={this.state.password}
                    />
                  </span>

                </Fragment>
              }


              

                
            </div>



            <button className='button_save_update' type="submit" >Guardar Cambios</button>
            {
              isAdmin() && <span className='button_remove_user' name="remove_client" onClick={this.props.openConfirm} >Eliminar Cliente</span>
            }

          </form>
        </div>
      </div>


      <div className="div_fixed" onClick={() => this.props.closeDisplay("displayUpdate")} ></div>


      {
        this.state.displayModal &&
        <ModalCheckBox
          close={this.closeModal}
          // remove={this.removeCredit}
          something="Usuarios"
          state="displayConfirmCredit"
          id={this.props.user._id}
          // users={this.state.users}
        />
      }

    </div>
      
      
    )
  }
}
