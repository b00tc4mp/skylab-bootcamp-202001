import React, { Component } from 'react'
import '../Payment/payment.css'
import axios from 'axios'
import {com} from '../../_utils/getRoutes'
import removePoints from '../../_utils/removePoints'
import addPoints from '../../_utils/addPoints'
import changeAmount from '../../_utils/changeAmount'

export default class Payment extends Component {
  state = {
    cashReserved: 0,
    bnReserved: 0,
    bcrReserved: 0
  }

  injectMoney = e => {
    e.preventDefault()
    let json = {}

    if (this.props.displayInject) {
      json = {
        cashReserved: removePoints(this.state.cashReserved) + removePoints(this.props.company.cashReserved),
        bnReserved: removePoints(this.state.bnReserved) + removePoints(this.props.company.bnReserved),
        bcrReserved: removePoints(this.state.bcrReserved) + removePoints(this.props.company.bcrReserved)
      }
    } else if (this.props.displayReduce) {


      json = {
        cashReserved: removePoints(this.props.company.cashReserved) - removePoints(this.state.cashReserved),
        bnReserved: removePoints(this.props.company.bnReserved) - removePoints(this.state.bnReserved),
        bcrReserved: removePoints(this.props.company.bcrReserved) - removePoints(this.state.bcrReserved)
      }
      
      // console.log(this.props.company.cashReserved)
    }
    

    axios.put(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/companies/${com}`, json)
    .then( res => {
      console.log(res.data)
      window.location.reload()
    })
    .catch( e => console.log(e))
  }

  onChangeAmount = e => this.setState({[e.target.name]: changeAmount(e.target.value)})



  render() {
    const {displayInject, displayReduce, toggleDisplayInject, toggleDisplayReduce} = this.props

    return (
      <div className="bg-modal-payment" >
        <div className="modal-content-payment" >

          <div className="nav-modal-payment" >{displayInject ? "Inyección" : "Reducción"} de Capital</div>
          {
            displayInject && 
            <div className="close-payments" onClick={toggleDisplayInject} >+</div>
          }
          {
            displayReduce && 
            <div className="close-payments" onClick={toggleDisplayReduce} >+</div>
          }
          

          <div>
            
            <br />
            <form className='form-payment' onSubmit={this.injectMoney} >
              

              <div className="input-payments" >
                
                <div className="container-label-input-payments" >
                  <span className="label-payment">Efectivo</span>
                  <input 
                    className="payment_input"
                    type="text" 
                    onChange={this.onChangeAmount} 
                    name="cashReserved"
                    value={this.state.cashReserved}
                    autoComplete="off"
                  />
                </div>

                <div className="container-label-input-payments" >
                  <span className="label-payment">BN</span>
                  <input 
                    className="payment_input" 
                    type="text" 
                    onChange={this.onChangeAmount} 
                    name="bnReserved"
                    value={this.state.bnReserved}
                    autoComplete="off"
                  />
                </div>

                <div className="container-label-input-payments" >
                  <span className="label-payment">BCR</span>    
                  <input 
                    className="payment_input" 
                    type="text"
                    onChange={this.onChangeAmount} 
                    name="bcrReserved"
                    value={this.state.bcrReserved}
                    autoComplete="off"
                  />
                </div>

              </div>

              <button
                style={{backgroundColor: displayInject ? "green" : 'red'}}
                className='button_save_payment' 
                type="submit" >
                  {displayInject ? "Inyectar" : "Reducir"}
                </button>
            </form>
            </div>
          </div>
          

          {/* <div className="div_fixed" onClick={this.props.toggleDisplayInject} ></div> */}
          {
            this.props.displayInject && 
            <div className="div_fixed" onClick={this.props.toggleDisplayInject} ></div>
          }
          {
            this.props.displayReduce && 
            <div className="div_fixed" onClick={this.props.toggleDisplayReduce} ></div>
          }

      </div>
      
      
    )
  }
}
