import React, { Component } from 'react'
import axios from 'axios'
import removePoints from '../../_utils/removePoints'
import addPoints from '../../_utils/addPoints'
import changeAmount from '../../_utils/changeAmount'


export default class Payment extends Component {
  state = {
    moratoriumPayment: addPoints(this.props.p.moratoriumPayment),
    interestPayment: addPoints(this.props.p.interestPayment),
    amortizePayment: addPoints(this.props.p.amortizePayment),

    paymentBy: this.props.p.paymentBy
  }

  makeEdit = e => {
    e.preventDefault()

    let moratoriumPayment = removePoints(this.state.moratoriumPayment)
    let interestPayment = removePoints(this.state.interestPayment)
    let amortizePayment = removePoints(this.state.amortizePayment)

    if (!moratoriumPayment) moratoriumPayment = 0
    if (!interestPayment) interestPayment = 0
    if (!amortizePayment) amortizePayment = 0

    let amountPayment = moratoriumPayment + interestPayment + amortizePayment

    const json = {
      moratoriumPayment,
      interestPayment,
      amortizePayment,

      amountPayment,
      paymentBy: this.state.paymentBy

    }
    

    if (typeof amountPayment === 'number') {
      axios.put(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/payments/${this.props.p._id}`, json)
      .then( () => window.location.reload() )
      .catch( e => console.log(e))
    }

  }

  onChangeAmount = e => this.setState({[e.target.name]: changeAmount(e.target.value)})

  onChangeSelect = e => this.setState({paymentBy: e.target.value})

  getTotalPayment = () => {
    let {moratoriumPayment, interestPayment, amortizePayment} = this.state

    moratoriumPayment = moratoriumPayment ? removePoints(this.state.moratoriumPayment) : 0
    interestPayment = interestPayment ? removePoints(this.state.interestPayment) : 0
    amortizePayment = amortizePayment ? removePoints(this.state.amortizePayment) : 0

    const total = moratoriumPayment + interestPayment + amortizePayment

    return total
  }

  openSumTotal = () => {
    let {moratoriumPayment, interestPayment, amortizePayment} = this.state

    moratoriumPayment = moratoriumPayment ? removePoints(this.state.moratoriumPayment) : 0
    interestPayment = interestPayment ? removePoints(this.state.interestPayment) : 0
    amortizePayment = amortizePayment ? removePoints(this.state.amortizePayment) : 0

    let isOpenTotal = true
    if (moratoriumPayment === 0 && interestPayment === 0) isOpenTotal = false
    if (moratoriumPayment === 0 && amortizePayment === 0) isOpenTotal = false
    if (interestPayment === 0 && amortizePayment === 0) isOpenTotal = false

    return isOpenTotal
  }

  /*
  MAKE FUNCTION OF THIS:

  something called like ----> convertAmountToInteger <----

  moratoriumPayment = moratoriumPayment ? removePoints(this.state.moratoriumPayment) : 0
  interestPayment = interestPayment ? removePoints(this.state.interestPayment) : 0
  amortizePayment = amortizePayment ? removePoints(this.state.amortizePayment) : 0

  
  */

  render() {
    

    return (
    <div className="bg-modal-expense" style={{display: 'flex'}} >
      <div className="modal-content-payment" >
        <div className="nav-modal-payment" >Editar Pago</div>
        <div className="close-payments" onClick={() => this.props.closeDisplay("displayEdit")} >+</div>

        <div>
          <form className='form-payment' onSubmit={this.makeEdit} >
            <br />
            <span className="username-payment">{this.props.p.user.name}</span>
            <div className="input-payments" >
              
              <div className="container-label-input-payments" >
                <span className="label-payment">Moratoria</span>
                <input 
                  className="payment_input"
                  type="text" 
                  onChange={this.onChangeAmount} 
                  name="moratoriumPayment"
                  value={this.state.moratoriumPayment}
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
                />
              </div>

              {
                this.openSumTotal() && 

                <div className="container-label-input-payments" 
                  style={{borderTop: "2px solid black"}} >
                    <span className="label-payment" style={{fontSize: 22, fontWeight: 600, padding: "-10px 0px"}}>Total</span>    
                    <input 
                      className="payment_input" 
                      type="text"
                      // onChange={this.onChangeAmountTotal}
                      readOnly
                      name="amortizePayment"
                      value={addPoints(this.getTotalPayment())}
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
                this.state.paymentBy === "Cash"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="Cash" >Efectivo</option>
                  <option value="BN" >BN</option>
                  <option value="BCR" >BCR</option>
                  <option value="BAC" >BAC</option>
                </select>
              }
              {
                this.state.paymentBy === "BN"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="BN" >BN</option>
                  <option value="Cash" >Efectivo</option>
                  <option value="BCR" >BCR</option>
                  <option value="BAC" >BAC</option>
                </select>
              }
              {
                this.state.paymentBy === "BCR"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="BCR" >BCR</option>
                  <option value="Cash" >Efectivo</option>
                  <option value="BN" >BN</option>
                  <option value="BAC" >BAC</option>
                </select>
              }
              {
                this.state.paymentBy === "BAC"  &&
                <select onChange={this.onChangeSelect} >
                  <option value="BAC" >BAC</option>
                  <option value="Cash" >Efectivo</option>
                  <option value="BCR" >BCR</option>
                  <option value="BN" >BN</option>
                </select>
              }
              
              
            </div>
            

            <button className='button_save_payment' type="submit" >Guardar</button>
          </form>
          </div>
        </div>
        

        <div className="div_fixed" onClick={() => this.props.closeDisplay("displayEdit")} ></div>

    </div>
      
      
    )
  }
}
