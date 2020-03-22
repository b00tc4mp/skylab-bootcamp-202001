import React, {useState} from 'react'
import './style/ExitVehicle.sass'
import QrReader from 'react-qr-reader'
import { Feedback } from '.'


export default function({error}) {

    const [result, setResult] = useState()

    const handleScan = data => {
      if (data) {
        setResult(data)
      }
    }
    
    const handleError = err => {
      console.error(err)
    }

    return <section className="exit-plate">
    <h1 className="exit-plate__title">Exit: </h1>
    <form action="" method="" className="exit-plate__form">
        <input type="text" placeholder="exit car plate number" className="exit-plate__input" />
        <button className="exit-plate__submit">Add</button>
    </form>

    {error && <Feedback message={error} level="warn"/>}

    <QrReader
      className="qr"
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
</section>
}