import React, { Component } from 'react'
import './collect.css'
import './accordion.css'
import axios from 'axios'
import addPoints from '../../_utils/addPoints'
import getHour from '../../_utils/getHour'
import getDateToday from '../../_utils/getDateToday'
import removePoints from '../../_utils/removePoints'
import getDayWeek from '../../_utils/getDayWeek'
import Expense from '../Expense/Expense'
import ShowExpenses from '../Expense/ShowExpenses'
import {com} from '../../_utils/getRoutes'
import Confirm from '../Confirm/Confirm'
import Edit from '../Edit/Edit'
import {isAdmin, isCollector} from '../../_utils/isLoggedIn'
import Alert from '../Alert/Alert'


export default class CollectDay extends Component {
  state = {
    date: getDateToday(),
    payments: [],
    expenses: [],
    newDate: '',
    expenseBy: 'Cash',

    displayExpense: false,
    displayShowExpenses: false,
    displayConfirm: false,
    displayEdit: false,

    paymentId: "",
    paymentToEdit: {},

    collecters: [],
    usersDontSee: [],

    paymentToDelete: {},

    collectorsIdFromExpenses: [],

    message: ""
  }

  componentDidMount = () => {
    if (isAdmin()) {
      this.getPaymentsByDate(getDateToday())
    }

    if (isCollector()) {
      this.getUsersDontSee()
    }
    
  }

  componentDidUpdate = () => {
    const {date, newDate} = this.state

    if ( (date !== newDate) && newDate) {
      this.getPaymentsByDate(this.state.newDate)
    }
  }

  getUsersDontSee = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/collector/${localStorage.getItem("token")}`)
      .then(result => this.setState({usersDontSee: result.data.data.collectorsDontSee}))
      .then(() => this.getPaymentsByDate(getDateToday()))
      .catch(e => console.log(e))
  }

  getPaymentsByDate = date => {

    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/payments/date/${date}/${com}`)
      .then(res => {
        let payments = res.data.data

        if(isCollector()) {
          
          const {usersDontSee} = this.state
          payments = payments.filter(p => !usersDontSee.some(id => id === p.user._id ) )

          this.setState({payments, date: date})
        }

        if(isAdmin() ) {
          this.setState({payments, date: date})
        }
        
      })
      .then(() => this.getExpensesByDate(date) )
      .catch(e => console.log(e))
    }
  

    getExpensesByDate = date => {
      axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/expenses/date/${date}/${localStorage.getItem("company")}`)
        .then(res => this.setState({expenses: res.data.data, date: date}))
        .catch(error => error)
    }

  changeDate = e => this.setState({newDate: e.target.value})


  

  getTotalPayments = () => {
    let total = 0, cash = 0, bn = 0, bcr = 0;

    const {payments} = this.state

    if (payments.length > 0) {
      
      total = payments.map(p => p.amountPayment).reduce((accum, current) => accum + current)

      if ( payments.some(p => p.paymentBy === "Cash") ) {
        cash = payments.filter(p => p.paymentBy === "Cash").map(p => p.amountPayment).reduce((a, c) => a + c)
      }

      if ( payments.some(p => p.paymentBy === "BN") ) {
        bn = payments.filter(p => p.paymentBy === "BN").map(p => p.amountPayment).reduce((a, c) => a + c)
      }

      if (payments.some(p => p.paymentBy === "BCR")) {
        bcr = payments.filter(p => p.paymentBy === "BCR").map(p => p.amountPayment).reduce((a, c) => a + c)
      }
      
    }

    return {
      total,
      cash: addPoints(cash),
      bn: addPoints(bn),
      bcr: addPoints(bcr)
    }
  }

  getTotalExpenses = () => {
    let total = 0
    // let cash = 0, bn = 0, bcr = 0;

    const {expenses} = this.state

    if (expenses.length > 0) {
      
      total = expenses.map(exp => exp.amount).reduce((accum, current) => accum + current)

      // if ( payments.some(p => p.paymentBy === "Cash") ) {
      //   cash = payments.filter(p => p.paymentBy === "Cash").map(p => p.amountPayment).reduce((a, c) => a + c)
      // }

      // if ( payments.some(p => p.paymentBy === "BN") ) {
      //   bn = payments.filter(p => p.paymentBy === "BN").map(p => p.amountPayment).reduce((a, c) => a + c)
      // }

      // if (payments.some(p => p.paymentBy === "BCR")) {
      //   bcr = payments.filter(p => p.paymentBy === "BCR").map(p => p.amountPayment).reduce((a, c) => a + c)
      // }
      
    }

    return {
      total: total,
      // cash: addPoints(cash),
      // bn: addPoints(bn),
      // bcr: addPoints(bcr)
    }
  }

  getExpensesByCollector = (collectorIdQuery) => {

    const { expenses } = this.state
    let collectors = {}

    if (expenses.length > 0) {
      const collectorsId = this.getCollectorsIdFromExpenses()

      for(var i = 0; i < collectorsId.length; i++) {
        let expensesByCollector = []
        
        expenses.forEach(expense => {

          if (expense.user._id === collectorsId[i]) {
            expensesByCollector.push(expense.amount)
          }
        })


        let totalExpensesByCollector = expensesByCollector.reduce((accum, current) => accum + current)

        collectors[collectorsId[i]] = totalExpensesByCollector
      }

      return ( collectors[`${collectorIdQuery}`] )
    }


  }

  getCollectorsIdFromExpenses = () => {
    const { expenses } = this.state
    const collectorsId = []

    expenses.forEach(expense => {

      const {_id} = expense.user

      if ( collectorsId.some(id => id === _id) ) {

      } else {
        collectorsId.push(_id)
      }
    })

    return collectorsId
  }


  openDisplay = e => this.setState({[e.target.name]: true})

  openConfirm = payment => {

    this.setState({
      displayConfirm: true, 
      paymentId: payment._id,
      paymentToDelete: payment
    })


  }

  openEdit = payment => this.setState({displayEdit: true, paymentToEdit: payment})
  
  closeDisplay = state => this.setState({[state]: false})

  removePayment = () => {
    const json = {
      hour: getHour(),
      date: getDateToday()
    }

    axios.delete(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/payments/${this.state.paymentId}/${com}`)
      .then(response => {
        const {message} = response.data

        if (message === "Solamente 1 pago se puede eliminar por dia") {
          this.setState({message})
        } else {
          window.location.reload()
        }
        
      })
      .catch(e => {
        console.log(e, 'error')
        console.log(e.message);
      })

  }

  getAmountByCollecters = () => {
    const {payments} = this.state

    let collectors = payments.map(p => p.collectedBy).filter((c, i, a) => a.indexOf(c) === i)

    collectors = collectors.map(c => {
      let total = payments.filter(p => c === p.collectedBy).map(p => p.amountPayment).reduce((a, c) => a + c)
      return {collector: c, amount: total}
    })

    return collectors
  }
  

  getCashByCollecters = () => {
    let {payments} = this.state
    payments = payments.filter(p => p.paymentBy === "Cash")

    let collectors = payments.map(p => p.collectedBy).filter((c, i, a) => a.indexOf(c) === i)


    collectors = collectors.map(c => {
      let id;

      let paymentsFiltered = []
      
      payments.forEach(p => {

        if(c === p.collectedBy) {

          id = p.collectedBy_ID
          paymentsFiltered.push(p)
        }
      })
      
      let paymentsAmount = paymentsFiltered.map(p => p.amountPayment)
      

      let totalAmountByCollector = paymentsAmount.reduce((a, c) => a + c)

      return {collector: c, amount: totalAmountByCollector, id }
    })



    return collectors
  }
  
  render() {

    const cash = removePoints(this.getTotalPayments().cash)

    const expensesCollect = this.getTotalExpenses().total

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th className="container-input-date" >

                {
                  this.state.newDate ? 
                  <p style={{fontSize: 18, margin: 12}}>
                    {getDayWeek(this.state.newDate).day}
                    {isCollector() && <span> / {getDateToday(this.state.date).slice(8)} </span>}
                    <span id="show" > / {getDayWeek(this.state.date).month}</span>
                  </p> :

                  <p style={{fontSize: 18, margin: 12}}>
                    {getDayWeek(this.state.date).day} 
                    {isCollector() && <span> / {getDateToday(this.state.date).slice(8)} </span>}
                    <span id="show" > / {getDayWeek(this.state.date).month}</span>
                  </p>
                }
                
                {
                  isAdmin() &&
                  <input 
                    className="input-date" 
                    type="date"
                    value={this.state.date}
                    onChange={this.changeDate}
                  /> 
                }
                
                
                
              </th>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              {/* # Create total in the top, Recibido por --> */}
              <th className="mobile" >#</th>
              <th className="mobile">Hora</th>{/* onClick -> change time */}
              <th>Cliente</th>{/* onClick -> see balance */}
              <th>Pago</th>{/* onClick -> change to deposit and delete payment */}
              <th>En</th>
              {
                this.state.payments.every(p => p.collectedBy) && <th id="name-3">Cob</th>
              }
              {
                this.state.payments.every(p => p.collectedBy) && <th id="name-4">Cobrador</th>
              }
              
              {
                (isAdmin() || localStorage.getItem('permissions') === 'true' ) && <th className="mobile" >Click</th>
              }
            </tr>
            {
              this.state.payments.map((p, i) => {

                return (
                <tr key={i}>
                  <td className="mobile" >{i + 1}</td>
                  <td className="mobile">{p.hour.slice(0,5)}</td>

                  <td id="name-3" >{p.user.name.split(" ").slice(0, 3).join(" ")}</td>
                  <td id="name-4" >{p.user.name}</td>

                  <td>{addPoints(p.amountPayment)}</td>
                  <td id="name-3">{p.paymentBy === "Cash"? "Efec" : p.paymentBy}</td>
                  <td id="name-4">{p.paymentBy === "Cash"? "Efectivo" : p.paymentBy}</td>

                  {
                    this.state.payments.every(p => p.collectedBy) &&
                    <td id="name-3"> 
                    {p.collectedBy.slice(0,4).split("").map((c, i) => i === 0 ? c.toUpperCase(): c).join("")} 
                    </td>
                  }
                  { 
                    this.state.payments.every(p => p.collectedBy) &&
                    <td id="name-4"> 
                    {p.collectedBy.split("").map((c, i) => i === 0 ? c.toUpperCase(): c).join("")} 
                    </td>
                  }
                  
                  
                  {
                    (isAdmin() || localStorage.getItem('permissions') === 'true' ) && 
                    <td className="mobile">
                      <i 
                        className="edit-payment fas fa-edit"
                        onClick={() => this.openEdit(p)}>
                      </i>

                      <i 
                        style={{marginLeft: 10}}
                        className="remove-payment fas fa-trash-alt"
                        onClick={() => this.openConfirm(p)}>
                      </i>
                    </td>
                  }

                  
                </tr>
                )
              })
            }
          </tbody>
        </table>

        

        <div className="container-totals" >
          {
            isAdmin() && <h2>Total Cobrado: {addPoints(this.getTotalPayments().total)}</h2>
          }
          

          {
            this.getAmountByCollecters().length > 1 && isAdmin() &&
            <ul className="accordion-container" >
              {
                this.getAmountByCollecters().map((c, i) => {
                  return (
                  <li key={i+1} >
                    <span>{c.collector? c.collector.split("").map((c, i) => i === 0 ? c.toUpperCase(): c).join("") : null}:</span>
                    <span style={{paddingLeft: 10}}>{addPoints(c.amount)}</span>
                  </li>
                  )
                })
              }
            </ul>
          }

          { (isAdmin() && cash > 0) && <p>Efectivo: {addPoints(cash - expensesCollect)}  </p> }
          {
            this.getCashByCollecters().length > 0 && isAdmin() &&
            <ul className="accordion-container" >
              {
                this.getCashByCollecters().map((c, i) => {
                  const id = c.id

                  return (
                  <li key={i+1} >
                    <span>{c.collector? c.collector.split("").map((c, i) => i === 0 ? c.toUpperCase(): c).join("") : null}:</span>

                    


                      {
                        this.getExpensesByCollector(id) &&
                        <span style={{paddingLeft: 10}}>
                          <span style={{fontSize: "15px"}}>{addPoints(c.amount)} - {addPoints(this.getExpensesByCollector(id))} = </span>
                           {addPoints(c.amount - this.getExpensesByCollector(id))}
                        </span>
                      }
                      {
                        !(this.getExpensesByCollector(id)) &&
                        <span style={{paddingLeft: 10}}>
                          {addPoints(c.amount)}
                        </span>
                      }
                    
                  </li>
                  )
                })
              }
            </ul>
          }
          

          {
            (isAdmin() && this.getTotalPayments().bn > 0) && <p>BN: {this.getTotalPayments().bn} </p>
          }

          {
            (isAdmin() && this.getTotalPayments().bcr > 0) && <p>BCR: {this.getTotalPayments().bcr} </p>
          }
 

          <br />
          <div className="container-totals">
            {
              expensesCollect > 0 && <p>Total Gastado: {addPoints(expensesCollect)}</p>
            }

            <button className="add_expense" name="displayExpense" onClick={this.openDisplay}>Agregar Gasto</button>
            <br />

            <button 
              className="add_expense"
              style={{backgroundColor: "#1F618D"}}
              name="displayShowExpenses"
              onClick={this.openDisplay}
            >Ver Gastos de Hoy</button>
          </div>
          
        </div>

        {
          this.state.displayExpense &&

          <Expense
            dateCollect={this.state.newDate ? this.state.newDate : this.state.date }
            expenseBy={this.state.expenseBy}
            closeDisplay={this.closeDisplay}
          />
        }
        
        {
          this.state.displayShowExpenses &&

          <ShowExpenses
            dateCollect={this.state.newDate ? this.state.newDate : this.state.date }
            expenseBy={this.state.expenseBy}
            closeDisplay={this.closeDisplay}
            expenses={this.state.expenses}
            totalExpenses={this.getTotalExpenses().total}
          />
        }

        
        {
          this.state.displayEdit &&
          <Edit
            closeDisplay={this.closeDisplay}
            p={this.state.paymentToEdit}
          />
        }
        
        {
          this.state.displayConfirm &&
          <Confirm
            close={this.closeDisplay}
            remove={this.removePayment}
            something="Pago"
            message={`¿Eliminar pago por ${addPoints(this.state.paymentToDelete.amountPayment)} de ${this.state.paymentToDelete.user.name}?`}
            state="displayConfirm"
          />
        }

        {
          (this.state.displayConfirm && this.state.message === "Solamente 1 pago se puede eliminar por dia") &&
          <Alert 
            message={"Solamente 1 pago se puede eliminar por dia"}
            close={this.closeDisplay}
            state="displayConfirm"
          />
        }

        <br />
        <br />
        
      </div>
    )
  }
}
