import React, { Component } from 'react'
import './payment.css'
import axios from 'axios'
import getDateToday from '../../_utils/getDateToday'
import getHour from '../../_utils/getHour'
import removePoints from '../../_utils/removePoints'
import changeAmount from '../../_utils/changeAmount'
import addPoints from '../../_utils/addPoints'
import {isLoggedIn, isAdmin, isCollector} from '../../_utils/isLoggedIn'
import {com} from '../../_utils/getRoutes'


export default class Payment extends Component {
  state = {
    moratoriumPayment: this.props.moratoriumPending,
    interestPayment: this.props.paymentInterest,
    amortizePayment: this.props.paymentAmortize,

    paymentDate: getDateToday(),
    paymentByDefault: this.props.credit.paymentByDefault
  }

  componentDidMount = () => {
    if(!this.props.creditState) {
      this.cancelingCredit()
    }
    
  }
  cancelingCredit = () => {

    const {amount, payments} = this.props.credit
    let amortizeTotal = 0

    if (payments.length > 0) {
      amortizeTotal = payments.map(p => p.amortizePayment).reduce((a, c) => a + c)
    }
    // Getting Balance
    const balance = amount - amortizeTotal

    this.setState({amortizePayment: addPoints(balance < 0 ? 0: balance), interestPayment: this.props.interestPending })
  }

  makePayment = e => {
    e.preventDefault()

    let moratoriumPayment = removePoints(this.state.moratoriumPayment)
    let interestPayment = removePoints(this.state.interestPayment)
    let amortizePayment = removePoints(this.state.amortizePayment)

    if (!moratoriumPayment) moratoriumPayment = 0
    if (!interestPayment) interestPayment = 0
    if (!amortizePayment) amortizePayment = 0

    let amountPayment = moratoriumPayment + interestPayment + amortizePayment

    const json = {
      paymentBy: this.state.paymentByDefault,
      hour: getHour(),
      datePayment: this.state.paymentDate,

      amountPayment,
      moratoriumPayment,
      interestPayment,
      amortizePayment,
      
      credit: this.props.credit._id,
      user: this.props.credit.user._id,

      creditState: this.props.creditState,
      collectedBy: localStorage.getItem("username"),
      collectedBy_ID: localStorage.getItem("token"),
      company: com
    }

    if (amountPayment >= 0 && this.props.credit.user._id && this.props.credit._id) {
      axios.post(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/payments`, json)
      .then( () => {
        window.location.reload()
      })
      .catch( e => console.log(e))
    }

  }

  onChangeAmount = e => this.setState({[e.target.name]: changeAmount(e.target.value)})

  onChangeAmountTotal = e => {
    const {moratoriumPayment, interestPayment, amortizePayment} = this.state
    const total = removePoints(moratoriumPayment) + removePoints(interestPayment) + removePoints(amortizePayment)
    this.setState({[e.target.name]: removePoints(total)})
  }

  onChangeSelect = e => this.setState({paymentByDefault: e.target.value})
  
  onChangeDate = e => this.setState({paymentDate: e.target.value})

  render() {
    let {moratoriumPayment, interestPayment, amortizePayment} = this.state

    moratoriumPayment = moratoriumPayment ? removePoints(this.state.moratoriumPayment) : 0
    interestPayment = interestPayment ? removePoints(this.state.interestPayment) : 0
    amortizePayment = amortizePayment ? removePoints(this.state.amortizePayment) : 0

    let openTotal = true
    if (moratoriumPayment === 0 && interestPayment === 0) openTotal = false
    if (moratoriumPayment === 0 && amortizePayment === 0) openTotal = false
    if (interestPayment === 0 && amortizePayment === 0) openTotal = false

    const total = moratoriumPayment + interestPayment + amortizePayment

    return (
    <div className="bg-modal-payment" >
      <div className="modal-content-payment" >
        <div className="nav-modal-payment" >{this.props.creditState ? "Pago": "Cancelación"}</div>
        <div className="close-payments" onClick={() => this.props.closeDisplay("displayPayment")} >+</div>

        <div>
          
          <br />
          <form className='form-payment' onSubmit={this.makePayment} >
            
            <span className="username-payment">{this.props.credit.user.name}</span>
            <span className='payment_span' >
              <span className="p_amount">Fecha:</span>
              {
                isAdmin() &&
                  <input
                  onChange={this.onChangeDate}
                  className='payment_date' 
                  value={this.state.paymentDate} 
                  type="date" 
                />
              }
              {
                !isAdmin() &&
                <span className="payment_date">{this.state.paymentDate} </span>
              }
              
            </span>

            <div className="input-payments" >
              
              <div className="container-label-input-payments" >
                <span className="label-payment">Moratoria</span>
                <input 
                  className="payment_input"
                  type="text" 
                  onChange={this.onChangeAmount} 
                  name="moratoriumPayment"
                  value={this.state.moratoriumPayment}
                  autoComplete="off"
                />
              </div>

              <div className="container-label-input-payments" >
                <span className="label-payment">Interés</span>
                <input 
                  className="payment_input" 
                  type="text" 
                  onChange={this.onChangeAmount} 
                  name="interestPayment"
                  value={this.state.interestPayment}
                  autoComplete="off"
                />
              </div>

              <div className="container-label-input-payments" >
                <span className="label-payment">Amortiza</span>    
                <input 
                  className="payment_input" 
                  type="text"
                  onChange={this.onChangeAmount} 
                  name="amortizePayment"
                  value={this.state.amortizePayment}
                  autoComplete="off"
                />
              </div>

              {
                openTotal &&
                <div className="container-label-input-payments" 
                style={{borderTop: "2px solid black"}} >
                  <span className="label-payment" style={{fontSize: 22, fontWeight: 600, padding: "-10px 0px"}}>Total</span>    
                  <input 
                    className="payment_input" 
                    type="text"
                    // onChange={this.onChangeAmountTotal}
                    readOnly
                    name="amortizePayment"
                    value={addPoints(total)}
                    autoComplete="off"
                    style={{fontSize: 22, border: "0px solid red", fontWeight: 600, padding: "-10px 0px", width: 135}}
                  />
                </div>
              }
              

            </div>

            <br />

            <div className="container-select" >
              <p className="p_amount">Pago por:</p>
              {
                this.state.paymentByDefault === "Cash"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="Cash" >Efectivo</option>
                  <option value="BN" >BN</option>
                  <option value="BCR" >BCR</option>
                  <option value="BAC" >BAC</option>
                </select>
              }
              {
                this.state.paymentByDefault === "BN"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="BN" >BN</option>
                  <option value="Cash" >Efectivo</option>
                  <option value="BCR" >BCR</option>
                  <option value="BAC" >BAC</option>
                </select>
              }
              {
                this.state.paymentByDefault === "BCR"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="BCR" >BCR</option>
                  <option value="Cash" >Efectivo</option>
                  <option value="BN" >BN</option>
                  <option value="BAC" >BAC</option>
                </select>
              }
              {
                this.state.paymentByDefault === "BAC"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="BAC" >BAC</option>
                  <option value="Cash" >Efectivo</option>
                  <option value="BCR" >BCR</option>
                  <option value="BN" >BN</option>
                </select>
              }
              
              
            </div>
            

            <button
              style={{backgroundColor: this.props.creditState ? "green": "red"}}
              className='button_save_payment' 
              type="submit" >
                {
                  this.props.creditState ? "Guardar Pago": "Último Pago"
                } 
              </button>
          </form>
          </div>
        </div>
        

        <div className="div_fixed" onClick={() => this.props.closeDisplay("displayPayment")} ></div>

    </div>
      
      
    )
  }
}
