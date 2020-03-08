import React from 'react'
import './alert.css'

export default function Alert({message, close, state}) {
  return (
    <div className="bg-modal-alert" >
      <div className="modal-content-alert" >
        <div className="nav-modal-alert" >Alerta</div>

        <div>
          <br />
          <h3 className="h3-content">{message}</h3>
          
          <button  className='button-ok-alert' onClick={() => close(state)}>OK</button>
        </div>

      </div>
    </div>
  )
}
