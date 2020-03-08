import React, { Component, Fragment } from 'react'
import './credit.css'
import axios from 'axios'
import {ht, app, ipa, slash, dot, script, com} from '../../_utils/getRoutes'
import addPoints from '../../_utils/addPoints'
import removePoints from '../../_utils/removePoints'
import getDateToday from '../../_utils/getDateToday'
import changeAmount from '../../_utils/changeAmount'
import Alert from '../Alert/Alert'
import translatePaymentFrecuency from '../../_utils/translatePaymentFrecuency'
import getInterestRate from '../../_utils/getInterestRate'

export default class Credit extends Component {
  state = {
    dateSelected: getDateToday(),
    paymentByDefault: "Cash",
    paymentFrecuency: "Daily",

    firstTwiceMonthly: "",
    secondTwiceMonthly: "",

    amount: "",
    paymentInterest: "",
    paymentAmortize: "",
    paymentMoratorium: "",

    displayAlert: false,
    frequency: "",
    dateToCancel: getDateToday(),

    liquidated: "",
    liquidatedBy: "Cash",
    displayRegister: false
  }

  onSubmitForm = e => {
    e.preventDefault()

    const {paymentMoratorium} = this.state

    const json = {
      amount: removePoints(this.state.amount),
      user: this.props.userId,

      paymentDefault: removePoints(this.state.paymentInterest) + removePoints(this.state.paymentAmortize),
      paymentInterest: removePoints(this.state.paymentInterest),
      paymentAmortize: removePoints(this.state.paymentAmortize),
      // paymentMoratorium: removePoints(this.state.paymentMoratorium),
      paymentMoratorium: paymentMoratorium ? removePoints(paymentMoratorium) : 0,

      paymentByDefault: this.state.paymentByDefault,
      dateConstituted: this.state.dateSelected,
      paymentFrecuency: this.state.paymentFrecuency,

      company: com,
      liquidated: removePoints(this.state.liquidated),
      liquidatedBy: this.state.liquidatedBy
    }

    if (json.paymentFrecuency === "TwiceMonthly") {
      const {firstTwiceMonthly, secondTwiceMonthly} = this.state
      json["firstTwiceMonthly"] = parseInt(firstTwiceMonthly)
      json["secondTwiceMonthly"] = parseInt(secondTwiceMonthly)
    }

    if (json.paymentFrecuency === "frequency") {
      let {frequency, dateToCancel} = this.state
      frequency = frequency ? frequency : 1;
      json["frequency"] = parseInt(frequency)
      json["dateToCancel"] = dateToCancel
    }

    if (json.paymentFrecuency === "TwiceMonthlyC") {
      const {firstTwiceMonthly, secondTwiceMonthly} = this.state
      json["firstTwiceMonthly"] = parseInt(firstTwiceMonthly)
      json["secondTwiceMonthly"] = parseInt(secondTwiceMonthly)
      json.paymentFrecuency = "TwiceMonthly"
    }

    // console.log(json)

    this.makeCredit(json)
  }

  makeCredit = json => {
    axios.post(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/credits`, json)
    .then(() => window.location.reload())
    .catch(e => {
      console.log(e)
      this.setState({displayAlert: true})
    })

}

  onChangeDate = e => this.setState({dateSelected: e.target.value})
  onChangeDateToCancel = e => this.setState({dateToCancel: e.target.value})

  onChangeDateQuinc = e => {
    const {name, value} = e.target
    this.setState({[name]: value.split("-")[2]})
  }

  onChangeSelect = e => this.setState({paymentByDefault: e.target.value}) 

  //New
  onChangeSelectLiquidated = e => this.setState({liquidatedBy: e.target.value}) 


  onChangeSelectFrecuency = e => this.setState({paymentFrecuency: e.target.value})

  onChangeAmount = e => this.setState({[e.target.name]: changeAmount(e.target.value)})

  onChangeInterest = e => {
    let morat = removePoints(e.target.value) * 0.3
    morat = morat.toFixed()
    this.setState({[e.target.name]: changeAmount(e.target.value), paymentMoratorium: addPoints(morat)})
  }

  onChangeTwiceMonthly = e => this.setState({[e.target.name]: e.target.value})

  onChangefrequencyDays = e => this.setState({[e.target.name]: e.target.value})
  
  toggleAlert = () => this.setState({displayAlert: !this.state.displayAlert})

  toggleDisplayRegister = () => this.setState({displayRegister: !this.state.displayRegister})


  render() {
    const daysInMonth = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

    let {paymentFrecuency, firstTwiceMonthly, secondTwiceMonthly, dateSelected, displayRegister,
      amount, paymentInterest} = this.state

    
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

    for (let i = 1; i <= 30; i++)  {
      numbers.push(<option key={i} value={i} >{i}</option>)
    }


    return (
    <div className="bg-modal-credit" >
      <div className="modal-content-credit" >
        <div className="nav-modal-credit" >Nuevo Crédito</div>
        <div className="close-credit" onClick={this.props.close} >+</div>

        <div>

          <form className="form-credit" onSubmit={this.onSubmitForm} >

            <div className="container-payments-input" >

              <div className="container-input-date" >
                <p className="p-constitution">Fecha:</p>
                <input className="input-constitution" onChange={this.onChangeDate} value={this.state.dateSelected} type='date' />
              </div>

              <div className="container-select" >
                <p className="p_amount">Pagos en:</p>
                <select onChange={this.onChangeSelect} >
                  <option value="Efectivo" >Efectivo</option>
                  <option value="BN" >BN</option>
                  <option value="BCR" >BCR</option>
                </select>
              </div>


              <div className="container-select" >
                <p className="p_amount">Frecuencia:</p>
                <select onChange={this.onChangeSelectFrecuency} >
                  <option value="Daily" >Diario</option>
                  <option value="Weekly" >Semanal</option>
                  <option value="TwiceMonthly" >Quincenal</option>
                  <option value="Monthly" >Mensual</option>
                  <option value="frequency" >Frecuencia</option>
                  <option value="TwiceMonthlyC" >Quincenal #2</option>
                </select>
              </div>


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
                paymentFrecuency === "TwiceMonthlyC" &&
                <Fragment>
                
                <div style={{border: "1px solid grey", padding: 15}}>
                  <h3 style={{marginTop: 3, textDecoration: 'underline'}}>Pagos Quincenales</h3>
                  <p className="p_amount">Seleccione Primer Pago:</p>
                  <div className="container-input-date" >
                    <input 
                      className="input-constitution" 
                      name="firstTwiceMonthly"
                      onChange={this.onChangeDateQuinc}
                      // value="" 
                      type='date' />
                  </div>
                  <br />
                  <p className="p_amount">Seleccione Segundo Pago:</p>
                  <div className="container-input-date" >
                    <input 
                      className="input-constitution" 
                      name="secondTwiceMonthly"
                      onChange={this.onChangeDateQuinc}
                      // value={this.state.dateToCancel} 
                      type='date' />
                  </div>
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
            </div>

            <div className="credit-amounts">
              <p className="p_amount">Monto del Crédito</p>
              <input
                onChange={this.onChangeAmount}
                className="input_amount" 
                type="text"
                value={this.state.amount} 
                name='amount'
                autoComplete="off"
              />
              <button 
                type="button" 
                className="liquidated-cash" 
                onClick={this.toggleDisplayRegister}
                style={displayRegister ? green : blue}
              >
                <i className="fas fa-cash-register"></i>
              </button>
            </div>


            {
              displayRegister && 
              <div>
                <p style={{color: "green"}} className="p_amount">Liquidar del Disponible</p>
                <input
                  onChange={this.onChangeAmount}
                  className="input_amount" 
                  type="text"
                  value={this.state.liquidated}
                  name='liquidated'
                  autoComplete="off"
                />
              </div>
            }

            {
              displayRegister && 
              <div className="container-select" >
                <p style={{color: "green"}} className="p_amount">Liquidar en:</p>
                <select onChange={this.onChangeSelectLiquidated} >
                  <option value="Cash" >Efectivo</option>
                  <option value="BN" >BN</option>
                  <option value="BCR" >BCR</option>
                  <option value="BAC" >BAC</option>
                </select>
              </div>
            }

            <div>
              <p className="p_amount">Pago de Interés</p>
              <input
                onChange={this.onChangeInterest}
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
                  Interés {translatePaymentFrecuency(paymentFrecuency)}: {getInterestRate(amount, paymentInterest)}%
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
                  value={this.state.paymentMoratorium}
                  name='paymentMoratorium'
                  autoComplete="off"
                />
              </div>
            }
            

            <div>
              <button className="button-save-credit" type="submit" >Crear Crédito</button>
            </div>
          </form>

        </div>

        
      </div>
        

      <div className="div_fixed" onClick={this.props.close} ></div>

      {
        this.state.displayAlert &&
        <Alert
          close={this.toggleAlert}
          message="Es requisito llenar todos los espacios!"
        />
      }

    </div>
      
      
    )
  }
}


const blue = {
  backgroundColor: "#273742",
}

const green = {
  backgroundColor: "green",
}