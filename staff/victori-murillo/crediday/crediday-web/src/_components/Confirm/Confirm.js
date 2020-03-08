import React from 'react'
import './confirm.css'

export default function Confirm({close, remove, something, state, message}) {

  return (
    <div className="bg-modal-confirm" >

      <div className="modal-content-confirm" >
        <div className="nav-modal-confirm" >Eliminar {something}</div>

        <div className="close-confirm" onClick={() => close(state)} >+</div>

        <div >
          <br />
          <h3 className="message-confirm" >{message}</h3>

          <button  className='button_confirm'onClick={remove}>Si, estoy seguro</button>
        </div>

      </div>

      <div className="div_fixed_confirm" onClick={() => close(state)} ></div>
  </div>
  )
}
