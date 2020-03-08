import React, { Component } from 'react'
import './expense.css'
import axios from 'axios'
import removePoints from '../../_utils/removePoints'
import changeAmount from '../../_utils/changeAmount'
import getDateToday from '../../_utils/getDateToday'
import getHour from '../../_utils/getHour'


export default class Payment extends Component {
  state = {
    amount: "",
    detail: "",
  }
  
  saveExpense = e => {
    e.preventDefault()

    const json = {
      amount: removePoints(this.state.amount),
      detail: this.state.detail,

      dateCollect: this.props.dateCollect,
      date: getDateToday(),
      hour: getHour(),
      expenseBy: this.props.expenseBy,
      user: localStorage.getItem("token")
    }

    console.log(json)

    axios.post(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/expenses`, json)
    .then( () => {
      console.log('excellent!')
      window.location.reload()

    })
    .catch( e => console.log(e))
  }

  onChangeInput = e => this.setState({[e.target.name]: e.target.value})

  onChangeAmount = e => this.setState({[e.target.name]: changeAmount(e.target.value)})

  1
  render() {

    return (

    <div className="bg-modal-expense" >
      <div className="modal-content-expense" >
        <div className="nav-modal-expense" >Nuevo Gasto</div>
        <div className="close-expense" onClick={() => this.props.closeDisplay("displayExpense")} >+</div>

        <div>
          <br />
          <form className='form_payment_container' onSubmit={this.saveExpense} >

         
            <div className="input-payments" >
              
                <input 
                  className="payment_input"
                  type="text" 
                  onChange={this.onChangeAmount} 
                  name="amount"
                  value={this.state.amount}
                  placeholder="Monto"
                  autoComplete="off"
                />
              <br />

                <input 
                  className="payment_input"
                  style={{width: "70%"}}
                  type="text" 
                  onChange={this.onChangeInput} 
                  name="detail"
                  value={this.state.detail}
                  placeholder="Detalle"
                  autoComplete="off"
                />

            </div>

            <button className='button_save_payment' type="submit" >Guardar</button>
          </form>
          </div>
        </div>
        

        <div className="div_fixed" onClick={() => this.props.closeDisplay("displayExpense")}  ></div>

    </div>
      
      
    )
  }
}
