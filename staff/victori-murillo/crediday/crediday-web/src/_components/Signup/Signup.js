import React, { useState } from 'react'
import './signup.css'
import axios from 'axios'

export default function Signup({close, state}) {
  const [companyName, setCompanyName] = useState('')
  const [username, setUsername] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleCompanyName = e => {
    setCompanyName(e.target.value)
  }

  const handleUsername = e => {
    let {value} = e.target
    value = value.split('').filter(l => l !== "," && l !== " ").join("")
    setUsername(value)
  }
  
  const handleCode = e => {
    setCode(e.target.value)
  }

  const submitCompany = () => {

    const json = {
      name: companyName,
      username,
      code
    }

    axios.post(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/companies`, json)
    .then(res => {
      console.log(res.data);
      setMessage(res.data.message)
    })
    .catch(e => console.log(e))
  }

  return (
    <div className="bg-modal-signup" >
      <div className="modal-content-signup" >

        <div className="nav-modal-signup" >Registro de Compañia</div>
        <div className="close-signup" onClick={close} >+</div>
        
        {
          message !== "Compañia Registrada Exitosamente" &&
          <div className="form-signup" >
            <input
              type="text"
              onChange={handleCompanyName}
              value={companyName}
              placeholder="Nombre de tu Compañia"
            />

            <input
              type="text"
              onChange={handleUsername}
              value={username}
              placeholder="Nombre de Usuario"
            />

            <input
              type="text"
              onChange={handleCode}
              value={code}
              placeholder="Código de Pago"
            />

            <button  className='button-save-company' onClick={submitCompany}>Registrar Compañia</button>

            {message === "Ingresa un código de Pago válido" && <h3>{message}</h3>}
            {message === "El nombre de Compañia ya existe" && <h3>{message}</h3>}
            {message === "El nombre de Usuario ya existe" && <h3>{message}</h3>}
          </div>
        }
        
        {
          message === "Compañia Registrada Exitosamente" &&
          <div>
            <h2 id="message">{message}</h2>
            <hr />
            <h2>{companyName}</h2>
            <h3>Tu usuario es: {username}</h3>
            <h3>Tu contraseña es: 123</h3>
            <br />
            <h5 style={{color: 'red'}}>Cambia tu contraseña al ingresar</h5>
          </div>
        }

      </div>
    </div>
  )
}