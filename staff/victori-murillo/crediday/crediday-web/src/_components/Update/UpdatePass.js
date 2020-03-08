import React, { Component } from 'react'
import './updatePass.css'
import axios from 'axios'



export default class UpadtePass extends Component {
  state = {
    password1: "",
    password2: ""
  }
  
  updateUser = e => {
    e.preventDefault()

    if (this.state.password1.length === 0 && this.state.password2.length === 0) {
      this.props.closeDisplay("displayUpdate")
      alert('Las contraseñas están en blanco')


    } else if (this.state.password1.length === 0 || this.state.password2.length === 0) {
      this.props.closeDisplay("displayUpdate")
      alert('Hay una contraseña en blanco')


    } else if (this.state.password1 === this.state.password2) {
      
      const json = {
        password: this.state.password1
      }

      console.log(json)
      console.log('workkks')
  
      axios.put(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/${this.props.userId}`, json)
      .then( () => {

        // this.props.closeDisplay("displayUpdate")
        alert('Su contraseña fue actulizada correctamente')
        localStorage.removeItem("token")
        
      })
      .then(() => window.location.reload())
      .catch( e => console.log(e))

    } else {
      console.log('wrong')
      this.props.closeDisplay("displayUpdate")
      alert('Las contraseñas no coinciden, vuelva a intentarlo')
    }
    

    
  }

  onChangeInput = e => this.setState({[e.target.name]: e.target.value})

  render() {
    console.log(this.props.userId)
    

    return (
    <div className="bg-modal-updatePass" style={{display: 'flex'}} >
      <div className="modal-content-updatePass" >
        <div className="nav-modal-update" >Actualizar</div>
        <div className="close-update" onClick={() => this.props.closeDisplay("displayUpdate")} >+</div>

        <div>
          
          <br />
          <form className='form_payment_container' onSubmit={this.updateUser} >


            <div className="container-payments-input" >
              
              <span className='payment_span' style={{width: "80%"}} >
                <span className="p_amount">Nueva Contraseña: </span>

                <input 
                  className="name_input"
                  type="password" 
                  onChange={this.onChangeInput} 
                  name="password1"
                  value={this.state.password1}
                />

              </span>

              <span className='payment_span' style={{width: "80%"}} >
                <span className="p_amount">Confirma la nueva contraseña:</span>

                <input
                  className="name_input"
                  type="password" 
                  onChange={this.onChangeInput} 
                  name="password2"
                  value={this.state.password2}
                />

              </span> 

                

            </div>

            <button className='button_save_payment' type="submit" >Guardar</button>
          </form>
          </div>
        </div>
        

        <div className="div_fixed" onClick={() => this.props.closeDisplay("displayUpdate")} ></div>

    </div>
      
      
    )
  }
}
