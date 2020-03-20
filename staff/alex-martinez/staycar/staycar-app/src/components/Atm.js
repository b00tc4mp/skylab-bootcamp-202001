import React, {useState} from 'react'
import QrReader from 'react-qr-reader'
import {ValidateTicket, Feedback} from '.'

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

    return <section className="atm">
   {!infoTicket ? <><h1 className="atm__title">ATM</h1>
      <form action="" method="" className="atm__form" onSubmit={handleAtm}>
          <input type="text" placeholder="car plate" className="atm__input" name="plateNumber" value={result}/>
          <button className="atm__submit">Entry Ticket</button>
      </form>
      <QrReader
      className="qr"
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '35%' }}
      />
      </> 
      : <ValidateTicket infoTicket={infoTicket}/>
    } 
    
    {error && <Feedback message={error} level="warn"/>}

    {/* {infoTicket && <ValidateTicket infoTicket={infoTicket}/> } */}

  </section>}
