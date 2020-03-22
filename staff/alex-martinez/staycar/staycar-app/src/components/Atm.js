import React, {useState, useEffect} from 'react'
import QrReader from 'react-qr-reader'
import {ValidateTicket, Feedback} from '.'
import retrieveTicket from '../logic/retrieve-ticket'

import './style/Atm.sass'


export default function({onSubmit, infoTicket, error}) {
 
    const [result, setResult] = useState()

    const handleScan = data => {
      if (data) {
        setResult(data)
      }
    }
    
    const handleError = err => {
      console.error(err)
    }

    const handleAtm = (event) => {
      event.preventDefault()
      const { target: {
        plateNumber: {value: plateNumber}
      }} = event

      onSubmit(plateNumber)

    }

    debugger
    return <section className="atm">
   {!infoTicket ? <><h1 className="atm__title">ATM</h1>
      <form action="" method="" className="atm__form" onSubmit={handleAtm}>
          <input type="text" placeholder="car plate" className="atm__input" name="plateNumber" value={result}/>
          <button className="atm__submit">Entry Ticket</button>
      </form>

      {error && <Feedback message={error} level="warn"/>}
      
      <QrReader
      className="qr"
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
      </> 
      : <ValidateTicket infoTicket={infoTicket}/>
    } 
    
  </section>}
