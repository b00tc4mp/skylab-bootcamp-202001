import React, { Component } from 'react'
import './balance.css'
import addPoints from '../../_utils/addPoints'
import getNumberWeeks from '../../_utils/getNumberWeeks'
import getNumberMonths from '../../_utils/getNumberMonths'
import getNumberOf_1_16 from '../../_utils/getNumberOf_1_16'

import getTwiceMonth from '../../_utils/getTwiceMonth'
import getNumberDays from '../../_utils/getNumberDays'

import transformDate from '../../_utils/transformDate'

export default class Balance extends Component {

  getBalance = () => {
    const {payments, amount} = this.props.credit
    let totalAmort = 0
    if (payments.length) {
      totalAmort = payments.map(p => p.amortizePayment).reduce((a, c) => a+c)
    }

    return amount - totalAmort
  }

  render() {

    const {interestPending, moratoriumPending} = this.props

    console.log(interestPending)

    const {user, dateConstituted, dateCancelled, amount, paymentFrecuency, payments, 
      firstTwiceMonthly, secondTwiceMonthly, dateToCancel} = this.props.credit
    let amortizeTotal = 0

    if (payments.length > 0) {
      amortizeTotal = payments.map(p => p.amortizePayment).reduce((a, c) => a + c)
    }

    const balance = amount - amortizeTotal

    const months = getNumberMonths(dateConstituted, dateCancelled)

    let fornights

    if (firstTwiceMonthly && secondTwiceMonthly) {
      fornights = getTwiceMonth(firstTwiceMonthly, secondTwiceMonthly, dateConstituted)
    } else {
      fornights = getNumberOf_1_16(dateConstituted, dateCancelled)
    }
    
    const weeks = getNumberWeeks(dateConstituted, dateCancelled)

    let days = 0

    if (paymentFrecuency === "Daily") {
      days = getNumberDays(dateConstituted)

    } else if (paymentFrecuency === "frequency") {
      days = getNumberDays(dateToCancel ? dateToCancel : dateConstituted, true)
    }


    return (
      <div className="bg-modal-balance" >
        <div className="div_fixed" onClick={() => this.props.closeDisplay('displayBalance')}></div>
        
        <div className="modal-content-balance">
          <div className="nav-modal-balance" >
            <span style={{display: "flex", justifyContent: "space-around", width: '100%'}}>
              <span>Estado de Cuenta</span>
              {/* <span>{getDateToday()}</span> */}
              
            </span>
            
            <div className="close-balance" onClick={() => this.props.closeDisplay('displayBalance')} >+</div>
          </div>
          <br />
          <br />
          
          <div className="container-data" >
            <h3 style={{marginBottom: "0", marginTop: "10px"}}>{user.name}</h3>

            <hr />
            <div className="flex-data-credit">
              {/* <div> */}
              <span id="name-3"> {transformDate(dateConstituted, 'small')}</span>
              <span id="name-4"> {transformDate(dateConstituted, 'large')}</span>
              {/* <p id="balance_frencuency" >{paymentFrecuency === "Weekly" && "Semanal"}: {getDayWeek(dateConstituted).day}</p>  */}
              {/* </div> */}
              
              <span> ₡{addPoints(amount)}</span>

              {
                (paymentFrecuency === "Daily" || paymentFrecuency === "frequency") &&
                <span> {days} {days === 1 ? "Dia" : "Dias"} </span>
              }

              {
                paymentFrecuency === "Monthly" &&
                <span> {months} {months === 1 ? "Mes" : "Meses"} </span>
              }
              
              {
                paymentFrecuency === "TwiceMonthly" &&
                <span> {fornights} {fornights === 1 ? "Quincena" : "Quincenas"} </span>
              }
              
              {
                paymentFrecuency === "Weekly" &&
                <span> {weeks} {weeks === 1 ? "Semana" : "Semanas"} </span>
              }

            </div>

          </div>
          <div>
            <table style={{borderTo: "2px solid grey"}} >
              <tbody>
                <tr>
                  <th id="counterPayments" >#</th>
                  <th >Fecha</th>
                  <th>Monto</th>
                  <th id="name-3">Mora</th>
                  <th id="name-4">Moratoria</th>
                  <th>Interés</th>
                  <th id="name-3">Amort</th>
                  <th id="name-4">Amortización</th>
                  <th id="paymentBy" >Pago en</th>
                  <th className="desktop" >Cobrador</th>
                </tr>
                {
                  payments.map((p, i) => {
                    return (
                      <tr key={i} >
                        <td id="counterPayments" >{i+1}</td>
                        <td>{transformDate(p.datePayment, "small")}</td>
                        <td>{addPoints(p.amountPayment)}</td>
                        <td>{addPoints(p.moratoriumPayment)}</td>
                        <td>{addPoints(p.interestPayment)}</td>
                        <td>{addPoints(p.amortizePayment)}</td>
                        <td id="paymentBy" >{p.paymentBy === "Cash"? "Efectivo": p.paymentBy}</td>
                        <td className="desktop" >{p.collectedBy ? p.collectedBy.slice(0, 8) : ""}</td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>

            <br />

            <div className="container-data" >
              <div className="flex-data-credit">
                <span id="name-3">
                  Mora: {balance > 0 ?
                    addPoints(moratoriumPending) : 0}
                </span>
                <span id="name-4">
                  Moratoria: {balance > 0 ?
                    addPoints(moratoriumPending) : 0}
                </span>
                
                <span>
                  Interes: {interestPending < 0 ? 0: addPoints(interestPending) }
                </span>

                <span> Principal: {addPoints(amount - amortizeTotal < 0 ? 0 : amount - amortizeTotal)} </span>
              </div>
            </div>

            <div className="balance-to-cancel">
              <span>
                ₡{balance + interestPending + parseInt(moratoriumPending) < 0
                  ? 0 : addPoints(this.getBalance() + interestPending + parseInt(moratoriumPending))} 
              </span>
            </div>
  
          </div>
        </div>
      </div>
    )
  }
}
