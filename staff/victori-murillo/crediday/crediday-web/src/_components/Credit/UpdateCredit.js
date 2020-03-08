import React, { Component, Fragment } from 'react'
import axios from 'axios'

import removePoints from '../../_utils/removePoints'
import addPoints from '../../_utils/addPoints'
import changeAmount from '../../_utils/changeAmount'
import Alert from '../Alert/Alert'
import translatePaymentFrecuency from '../../_utils/translatePaymentFrecuency'
import getInterestRate from '../../_utils/getInterestRate'


export default class UpdateCredit extends Component {

  state = {
    dateSelected: this.props.credit.dateConstituted,
    paymentByDefault: this.props.credit.paymentByDefault,
    paymentFrecuency: this.props.credit.paymentFrecuency,

    firstTwiceMonthly: this.props.credit.firstTwiceMonthly,
    secondTwiceMonthly: this.props.credit.secondTwiceMonthly,

    amount: addPoints(this.props.credit.amount),
    paymentInterest: addPoints(this.props.credit.paymentInterest),
    paymentAmortize: addPoints(this.props.credit.paymentAmortize),
    paymentMoratorium: this.props.credit.paymentMoratorium,

    displayAlert: false,
    frequency: this.props.credit.frequency,
    dateToCancel: this.props.credit.dateToCancel,

    liquidated: this.props.credit.liquidated,
    liquidatedBy: this.props.credit.liquidatedBy,
  }

  onSubmitForm = e => {
    e.preventDefault()

    let {frequency, dateToCancel, paymentMoratorium} = this.state
    if (frequency) frequency = parseInt(frequency)
    

    const json = {
      dateConstituted: this.state.dateSelected,
      paymentByDefault: this.state.paymentByDefault,
      paymentFrecuency: this.state.paymentFrecuency,

      amount: this.state.amount ? removePoints(this.state.amount) : 0,
      paymentInterest: this.state.paymentInterest ? removePoints(this.state.paymentInterest) : 0,
      paymentAmortize: this.state.paymentAmortize ? removePoints(this.state.paymentAmortize): 0,
      paymentMoratorium: paymentMoratorium ? removePoints(paymentMoratorium): 0,
    }

    if (json.paymentFrecuency === "TwiceMonthly") {
      const {firstTwiceMonthly, secondTwiceMonthly} = this.state
      json["firstTwiceMonthly"] = parseInt(firstTwiceMonthly)
      json["secondTwiceMonthly"] = parseInt(secondTwiceMonthly)
    }

    if (json.paymentFrecuency === "frequency" && frequency) {
      json["frequency"] = parseInt(frequency)
      json["dateToCancel"] = dateToCancel
    }

    this.updateCredit(json)

  }

  updateCredit = json => {
    axios.put(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/credits/${this.props.credit._id}`, json)
    .then( () => {
      window.location.reload()
    })
    .catch( e => console.log(e))
  }

  onChangeDate = e => this.setState({dateSelected: e.target.value})
  onChangeDateToCancel = e => this.setState({dateToCancel: e.target.value})

  onChangeSelect = e => this.setState({paymentByDefault: e.target.value}) 

  onChangeSelectFrecuency = e => this.setState({paymentFrecuency: e.target.value})

  onChangeTwiceMonthly = e => this.setState({[e.target.name]: e.target.value})

  onChangeAmount = e => this.setState({[e.target.name]: changeAmount(e.target.value)})

  toggleAlert = () => this.setState({displayAlert: !this.state.displayAlert})

  onChangefrequencyDays = e => this.setState({[e.target.name]: e.target.value})


  getInterest = () => {
    let {amount, paymentInterest} = this.state
    paymentInterest = paymentInterest ? removePoints(paymentInterest) : 0
    amount = amount ? removePoints(amount) : 0

    let interestAmount = 0

    if (amount && paymentInterest) {
      interestAmount = (paymentInterest / amount) * 100
    }

    if (interestAmount.toString().length > 3) {
      interestAmount = interestAmount.toFixed(2)
    }

    return interestAmount
  }


  render() {
    const daysInMonth = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

    let {paymentFrecuency, dateSelected, firstTwiceMonthly, secondTwiceMonthly, frequency, 
      paymentMoratorium, amount, paymentInterest} = this.state


    if (typeof paymentMoratorium === "undefined") {
      paymentMoratorium = 0
    } else {
      paymentMoratorium = addPoints(paymentMoratorium)
    }

    if ( [0,1,2,3,4,5,6,7,8,9].some(d => d === firstTwiceMonthly) ) {
      firstTwiceMonthly = `0${firstTwiceMonthly}`
    }

    if ( [0,1,2,3,4,5,6,7,8,9].some(d => d === secondTwiceMonthly) ) {
      secondTwiceMonthly = `0${secondTwiceMonthly}`
    }

    const daySelect = dateSelected.slice(8)

    let isEqual = false;
    if (  (daySelect === firstTwiceMonthly) || (daySelect === secondTwiceMonthly) ) {
      isEqual = true
    }

    const numbers = []

    for (let i = 0; i <= 30; i++)  {
      numbers.push(<option key={i} value={i} >{i}</option>)
    }

    return (
      <div className="bg-modal-credit" >
        <div className="modal-content-credit" >
          <div className="nav-modal-credit" >Editar Crédito</div>
          <div className="close-credit" onClick={this.props.close} >+</div>

          <div>
            <form className="form-credit" onSubmit={this.onSubmitForm} >

              <div className="container-input-date" >
                <p className="p-constitution">Fecha:</p>
                <input className="input-constitution" onChange={this.onChangeDate} value={this.state.dateSelected} type='date' />
              </div>


              <div className="container-select" >
                <p className="p_amount">Pagos en:</p>
                {
                  (this.state.paymentByDefault === "Cash" || this.state.paymentByDefault === "Efectivo") &&
                  <select onChange={this.onChangeSelect} >
                    <option value="Cash" >Efectivo</option>
                    <option value="BN" >BN</option>
                    <option value="BCR" >BCR</option>
                  </select>
                }
                {
                  this.state.paymentByDefault === "BN" &&
                  <select onChange={this.onChangeSelect} >
                    <option value="BN" >BN</option>
                    <option value="Cash" >Efectivo</option>
                    <option value="BCR" >BCR</option>
                  </select>
                }
                {
                  this.state.paymentByDefault === "BCR" &&
                  <select onChange={this.onChangeSelect} >
                    <option value="BCR" >BCR</option>
                    <option value="Cash" >Efectivo</option>
                    <option value="BN" >BN</option>
                  </select>
                }
              </div>

              <div className="container-select" >
                <p className="p_amount">Frecuencia:</p>
                {
                  this.state.paymentFrecuency === "Daily" &&
                  <select onChange={this.onChangeSelectFrecuency} >
                    <option value="Daily" >Diario</option>
                    <option value="Weekly" >Semanal</option>
                    <option value="TwiceMonthly" >Quincenal</option>
                    <option value="Monthly" >Mensual</option>
                    <option value="frequency" >Frecuencia</option>
                  </select>
                }
                {
                  this.state.paymentFrecuency === "Weekly" &&
                  <select onChange={this.onChangeSelectFrecuency} >
                    <option value="Weekly" >Semanal</option>
                    <option value="Daily" >Diario</option>
                    <option value="TwiceMonthly" >Quincenal</option>
                    <option value="Monthly" >Mensual</option>
                    <option value="frequency" >Frecuencia</option>
                  </select>
                }
                {
                  this.state.paymentFrecuency === "TwiceMonthly" &&
                  <select onChange={this.onChangeSelectFrecuency} >
                    <option value="TwiceMonthly" >Quincenal</option>
                    <option value="Daily" >Diario</option>
                    <option value="Weekly" >Semanal</option>
                    <option value="Monthly" >Mensual</option>
                    <option value="frequency" >Frecuencia</option>
                  </select>
                }
                {
                  this.state.paymentFrecuency === "Monthly" &&
                  <select onChange={this.onChangeSelectFrecuency} >
                    <option value="Monthly" >Mensual</option>
                    <option value="Weekly" >Semanal</option>
                    <option value="Daily" >Diario</option>
                    <option value="TwiceMonthly" >Quincenal</option>
                    <option value="frequency" >Frecuencia</option>
                  </select>
                }
                {
                  this.state.paymentFrecuency === "frequency" &&
                  <select onChange={this.onChangeSelectFrecuency} >
                    <option value="frequency" >Frecuencia</option>
                    <option value="Monthly" >Mensual</option>
                    <option value="Weekly" >Semanal</option>
                    <option value="Daily" >Diario</option>
                    <option value="TwiceMonthly" >Quincenal</option>
                  </select>
                }
              </div>

              {
                paymentFrecuency === "frequency" &&
                <div style={{border: '1px solid black', padding: "2px 5px", marginBottom: 10}}>
                  <p className="p_amount" >Cada {frequency} {frequency == 1 ? "dia":"dias"}</p>
                </div>
                
              }


              {
                paymentFrecuency === "frequency" &&
                <Fragment>
                  <p>Intereses incian despues de la fecha de Cancelación</p>
                  <div className="container-input-date" >
                    <p className="p-constitution">Cancelación:</p>
                    <input 
                      className="input-constitution" 
                      onChange={this.onChangeDateToCancel}
                      value={this.state.dateToCancel} 
                      type='date' />
                  </div>
                  <div className="container-select" >
                    <p className="p_amount" >Cada cuantos dias:</p>
                    <select name="frequency" onChange={this.onChangefrequencyDays} >
                      {numbers}
                    </select>
                  </div>
                </Fragment>
              }


              {
                paymentFrecuency === "TwiceMonthly" &&
                <Fragment>
                  <div className="container-select" >
                    <p className="p_amount" >Primera Quincena:</p>
                    <select name="firstTwiceMonthly" onChange={this.onChangeTwiceMonthly} >
                      {daysInMonth.map((d, i) => <option key={i} value={d} >{d}</option>)}
                    </select>
                  </div>


                  <div className="container-select" >
                    <p className="p_amount" >Segunda Quincena:</p>
                    <select name="secondTwiceMonthly" onChange={this.onChangeTwiceMonthly} >
                      {daysInMonth.map((d, i) => <option key={i} value={d} >{d}</option>)}
                    </select>
                  </div>

                </Fragment>
              }

              {
                ( firstTwiceMonthly > 0 && secondTwiceMonthly > 0 && !isEqual && paymentFrecuency === "TwiceMonthly") &&
                <div className="container-alert-fornight" >
                  <p>Fecha debe ser
                    dia: <span className="border">{firstTwiceMonthly}</span> o <span className="border">{secondTwiceMonthly}</span> </p>
                </div>
              }

              <div>
                <p className="p_amount">Monto del Crédito</p>
                <input
                  onChange={this.onChangeAmount}
                  className="input_amount" 
                  type="text"
                  value={this.state.amount} 
                  name='amount'
                  autoComplete="off"
                />
              </div>


              <div>
                <p className="p_amount">Pago de Interés</p>
                <input
                  onChange={this.onChangeAmount}
                  className="input_amount" 
                  type="text"
                  value={this.state.paymentInterest}
                  name='paymentInterest'
                  autoComplete="off"
                />
              </div>

              {
                (getInterestRate(amount, paymentInterest) > 0) &&
                <div>
                  <p className="p_amount" style={{fontWeight: 'bold'}} >
                    Interés {translatePaymentFrecuency(this.state.paymentFrecuency)}: {getInterestRate(amount, paymentInterest)}%
                  </p>
                </div>
              }


              <div>
                <p className="p_amount">Pago de Amortización</p>
                <input
                  onChange={this.onChangeAmount}
                  className="input_amount" 
                  type="text"
                  value={this.state.paymentAmortize}
                  name='paymentAmortize'
                  autoComplete="off"
                />
              </div>

              {
                (paymentFrecuency !== "frequency" && paymentFrecuency !== "Daily") &&
                <div>
                  <p className="p_amount">Pago de Moratoria</p>
                  <input
                    onChange={this.onChangeAmount}
                    className="input_amount" 
                    type="text"
                    value={paymentMoratorium}
                    name='paymentMoratorium'
                    autoComplete="off"
                  />
                </div>
              }


              <button 
                style={{backgroundColor: '#273742', margin: "10px 0px 30px 0px"}} 
                className="button-save-credit" type="submit" >Guardar Cambios</button>

            </form>

          </div>
          

        </div>
          
        <div className="div_fixed" onClick={this.props.close} ></div>

        {
          this.state.displayAlert &&
          <Alert
            close={this.toggleAlert}
            message="El Monto del Crédito debe ser mayor a 0 !"
          />
        }

    </div>
      
      
    )
  }
}
