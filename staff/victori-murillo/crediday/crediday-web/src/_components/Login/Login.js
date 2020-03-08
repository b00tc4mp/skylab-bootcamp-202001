import React, {Component} from 'react'
import axios from 'axios'
import './login.css'
import './nav-index.css'
import './homepage.css'

import Signup from '../Signup/Signup'

export default class Login extends Component {
  state = {
    password: "",
    username: "",


    displayAlert: false
  }

  toggleAlert = () => this.setState({displayAlert: !this.state.displayAlert})

  onChangeInput = e => {

    this.setState({ [e.target.name]: e.target.value })
  } 

  onClickLogin = (e) => {
    e.preventDefault()

    const json = {
      username: this.state.username.toLowerCase(),
      password: this.state.password
    }
  

    // axios.post(`http://localhost:3000/api/auth/login`, json)
    axios.post(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/auth/login`, json)
      .then(res => {
        
        window.location.href = '/'

        if (typeof token === "undefined") {
          localStorage.setItem("token", res.data.user._id)
          localStorage.setItem("company", res.data.user.company._id)
          localStorage.setItem("companyName", res.data.user.company.name)
          localStorage.setItem("date", res.data.user.token)
          localStorage.setItem("username", res.data.user.username)
          localStorage.setItem("role", res.data.user.role)
          localStorage.setItem("permissions", res.data.user.permissions)

          localStorage.setItem("configInitialAmount", res.data.user.configInitialAmount)
        }
        
      })
      .catch(e => {
        
        if (typeof e.response === "undefined") {
          alert(`No tienes internet`)
          
        } else {
          alert(`${e.response.data.message}`)
          console.log(e.response)
        }
        
      } )
  }

  onChangeUsername = e => {
    let {name, value} = e.target

    value = value.split('').filter(l => l !== "," && l !== " ").join("")

    this.setState({[name]: value})
  } 


  render() {

    return (
      <div className="container-homepage" >
          <div className="homepage_navbar"  >
            <span>CredidayApp</span>
            
            <button onClick={this.toggleAlert} className='button-login' id="signup" >
              Registrarse
            </button>
          </div>

        <form 
          onSubmit={this.onClickLogin}
          className='form-login'
          id="homepage_login"
        >

          <h2>Inicia sesión</h2>
          
          <input 
            type="text"
            name="username"
            onChange={this.onChangeUsername}
            className='input-login'
            placeholder='Nombre de usuario'
            value={this.state.username}
            autoComplete="off"
          />
          
          <input 
            type="password"
            name="password"
            onChange={this.onChangeInput}
            className='input-login'
            placeholder='Contraseña'
            value={this.state.password}
          />

          <button type="submit" className='button-login' >
            Iniciar sesión
          </button>

        </form>

        {/* <footer id="homepage_contact" >
          Contacto: (+506) 8315-0519 
        </footer> */}


        {
          this.state.displayAlert &&
          <Signup
            message="Estamos Constuyendo esta sección"
            close={this.toggleAlert}
            state="displayAlert"
           />
        }

        
      </div>

    )
  }
}
