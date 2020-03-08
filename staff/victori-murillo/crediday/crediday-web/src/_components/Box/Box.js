import React, { Component, Fragment } from 'react'
import './box.css'
import Inject from '../Inject/Inject'
import axios from 'axios'
import getDateToday from '../../_utils/getDateToday'
import {com} from '../../_utils/getRoutes'
import addPoints from '../../_utils/addPoints'
import getDayWeek from '../../_utils/getDayWeek'
import getMonth from '../../_utils/getMonth'
import Alert from '../Alert/Alert'
import getInterestPending from '../../_utils/getInterestPending'

export default class Box extends Component {

  state = {
    date: '',
    newDate: '',
    payments: [],
    expenses: [],
    credits: [],
    creditsFromDate: [],

    displaySelectDate: false,
    displayAlert: false,
    displayInject: false,
    displayReduce: false,

    company: {},
    paysDone: false,
    expDone: false,
    credDone: false,

    cashReserved: ''
  }

  findCreditsByCompany = async () => {
    let res = await axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/creditsall/company/${com}`);

    this.setState({credits: res.data.credits})
  }
  
  componentDidMount = () => {
    this.getCompany(this.state.date)
  }

  componentDidUpdate = () => {
    const { date, newDate } = this.state

    if ( (date !== newDate) && newDate) {
      this.getCompany()
    }
  }

  getCompany = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/companies/${com}`)
    .then(res => {

      this.setState({
        company: res.data.data, 
        date: res.data.data.boxFromDate,
        displaySelectDate: res.data.data.boxFromDate ? false: true
    })
      this.getPaymentsFromDate(res.data.data.boxFromDate)
      this.getExpensesFromDate(res.data.data.boxFromDate)
      this.findCreditsByCompany()
      this.getCreditsFromDate(res.data.data.boxFromDate)
    })
    .catch(e => console.log(e))
  }

  updateCompany = () => {

  }


  changeDate = e => this.saveDate(e.target.value)

  
  saveDate = dateToSave => {

    const json = {
      boxFromDate: dateToSave
    }

    axios.put(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/companies/${com}`, json)
    .then(res => {

      this.setState({
        boxFromDate: res.data.data.boxFromDate, 
        displaySelectDate: false,
        newDate: res.data.data.boxFromDate,
        cashReserved: res.data.data.cashReserved
      })
    })
    .catch(e => console.log(e))
  }


  getPaymentsFromDate = date => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/payments/fromdate/${date}/${com}`)
    .then(res => this.setState({payments: res.data.data, date: date, paysDone: true}))
    .catch(e => console.log(e))
  }

  getExpensesFromDate = date => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/expenses/fromdate/${date}/${com}`)
    .then(res => this.setState({expenses: res.data.data, expDone: true}))
    .catch(e => console.log(e))
  }

  getCreditsFromDate = async (date) => {
    console.log(date);
    let res = await axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/credits/fromdate/${date}/${com}`)

    this.setState({creditsFromDate: res.data.data})

  }

  onChangeInput = e => this.setState({[e.target.name]: e.target.value})


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
      cash,
      bn,
      bcr
    }
  }

  getliquidatedCredits = () => {
    let total = 0, cash = 0;

    let bn = 0, bcr = 0;

    const credits = this.state.creditsFromDate
    console.log(credits);

    if (credits.length > 0) {
      
      total = credits.map(c => {
        // if(c.liquidated) {
        //   console.log(c.liquidated);
        //   console.log(c._id);
        // }

        return c.liquidated
      }).reduce((accum, current) => accum + current)

      if ( credits.some(c => c.liquidatedBy === "Cash") ) {
        cash = credits.filter(c => c.liquidatedBy === "Cash").map(c => c.liquidated).reduce((a, c) => a + c)
      }

      if ( credits.some(c => c.liquidatedBy === "BN") ) {
        bn = credits.filter(c => c.liquidatedBy === "BN").map(c => c.liquidated).reduce((a, c) => a + c)
      }

      if ( credits.some(c => c.liquidatedBy === "BCR") ) {
        bcr = credits.filter(c => c.liquidatedBy === "BCR").map(c => c.liquidated).reduce((a, c) => a + c)
      }
      
    }

    return {
      total,
      cash,
      bn,
      bcr
    }
  }

  getTotalExpenses = () => {
    let total = 0
    const {expenses} = this.state

    if (expenses.length > 0) {
      total = expenses.map(exp => exp.amount).reduce((accum, current) => accum + current)
    }

    return total
  }

  toggleDisplayDate = () => this.setState({displaySelectDate: !this.state.displaySelectDate})

  toggleDisplayInject = () => this.setState({displayInject: !this.state.displayInject})
  toggleDisplayReduce = () => this.setState({displayReduce: !this.state.displayReduce})

  closeConfirm = state => this.setState({[state]: false})

  openAlert = () => {
    this.setState({displayAlert: true})
  }


  render() {

    const {date, displaySelectDate, paysDone, credDone, expDone, credits} = this.state


    const {cashReserved, bnReserved, bcrReserved} = this.state.company
    const totalReserved = cashReserved + bnReserved + bcrReserved


    let datePretty = 'Falta Eliger Fecha'

    if (date) {
      datePretty = `${getDayWeek(date).day}, ${getDateToday(date).slice(8, 10)} ${getMonth(date, true)}, ${date.slice(0, 4)}`
    }


    let totalInvestments = 0;
    let porCobrar = 0;

    if ( credits.length > 0) {

      totalInvestments = credits.length > 0 ? credits.map(c => {

        let amortizeTotal = 0

        if (c.payments.length > 0) {
          amortizeTotal = c.payments.map(p => p.amortizePayment).reduce((a, c) => a + c)
        }
    
        const {interestPending, moratoriumPending} = getInterestPending(c)

        const balance = c.amount - amortizeTotal
        
        return (balance + interestPending + moratoriumPending)
      }).reduce((a,c) => a+c): 0
      
      porCobrar = credits.map(c => c.paymentDefault).filter(p => typeof p == "number").reduce((a, c) => a + c)


    }

    // console.log(totalReserved, 'totalReserved');
    // console.log(this.getTotalPayments().total, 'total payments');


    console.log(addPoints(cashReserved + this.getTotalPayments().cash - this.getTotalExpenses() - this.getliquidatedCredits().cash ))
    console.log(cashReserved, "cashReserved");
    console.log(this.getTotalPayments().cash);
    console.log(this.getTotalExpenses());
    console.log(this.getliquidatedCredits().cash, "cashLiquidated");


    console.log(totalReserved, "totalReserved");
    console.log(this.getliquidatedCredits().total, "totalLiquidated");
    // console.log(object);
    console.log(addPoints( (totalReserved + this.getTotalPayments().total) - this.getTotalExpenses() - this.getliquidatedCredits().total))


    return (
      <div>

        <div className="container-box" >
          <h2>Control de la Caja <span>{date? "desde el": ""}</span></h2>

          {
            (displaySelectDate && this.state.company) &&
            <Fragment>
              <button style={{width: "290px", color: "white", fontSize: "22px", backgroundColor: 'red', borderRadius: 5, border: "0px"}}>
                ¿Desde qué fecha vas a llevar el Control?
              </button>

              <br />
              <i style={{color: "green", fontSize: "22px"}} className="fas fa-arrow-down"></i>
              <br />

              <input 
                className="input-date" 
                type="date"
                style={{fontSize: "20px"}}
                value={this.state.date}
                onChange={this.changeDate}
              />
              
              <br />
              <br />
            </Fragment>
          }
          
          {
            (date || this.state.company) &&
            <div style={{marginBottom: 10}}>
              <button name="displayBalance" className="button_balance" style={{cursor: 'initial'}} 
                onClick={this.openAlert}
              >
                {datePretty}
                {/* {getDayWeek(date).day}, {getDateToday(date).slice(8, 10)} {getMonth(date, true)}, {date.slice(0, 4)} */}
                {/* {getDayWeek(c.dateConstituted).day}, {getDateToday(c.dateConstituted).slice(8, 10)} {buttonMonth.slice(0,3)} */}
              </button>

              <button className="button_edit_balance" onClick={this.toggleDisplayDate} >
                <i className="fas fa-edit" ></i>
              </button>
            </div>
          }
          
          {
            ((!this.state.company)) &&
            <Fragment>
              <br />
              <br />
              <div className="ui active centered inline loader"></div>
              <br />
            </Fragment>
          }

          {
            ((this.state.company) || (paysDone && credDone && expDone)) &&
            <table className="table-money-available" >
              <tbody>
                <tr>
                  <th colSpan="2" className="title" >
                    <span>Dinero Disponible en ...</span>
                  </th>
                </tr>

                <tr>
                  <td>Efectivo</td>
                  <td>{addPoints(cashReserved + this.getTotalPayments().cash - this.getTotalExpenses() - this.getliquidatedCredits().cash )} </td>
                </tr>

                <tr>
                  <td>Banco Nacional</td>
                  <td>{addPoints(this.getTotalPayments().bn + bnReserved - this.getliquidatedCredits().bn) }</td>
                </tr>

                <tr>
                  <td>Banco de Costa Rica</td>
                  <td>{addPoints(this.getTotalPayments().bcr + bcrReserved - this.getliquidatedCredits().bcr)}</td>
                </tr>

                <tr>
                  <td style={{fontSize: "18px", fontWeight: 600, textAlign: 'center'}}>Total</td>
                  <td style={{fontSize: "18px", fontWeight: 600}}>{addPoints(totalReserved + this.getTotalPayments().total - this.getTotalExpenses() - this.getliquidatedCredits().total)}</td>
                </tr>
                
              </tbody>

            </table>

          }

          <br />
          <br />
          
          {
            <table className="table-money-available">
              <tbody>
                <tr>
                  <th colSpan="2" className="title" >
                    <span>Capital Invertido</span>
                  </th>
                </tr>

                <tr>
                  <td style={{fontSize: "18px", fontWeight: 600, textAlign: 'center'}}>Total</td>
                  <td style={{fontSize: "18px", fontWeight: 600}}>{addPoints(totalInvestments)}</td>
                </tr>

                
              </tbody>

            </table>

          }

          <br />
          <br />

          {
            <table className="table-money-available" style={{minWidth: '310px'}}>
              <tbody>
                <tr>
                  <th colSpan="2" style={{textAlign: 'center'}}>
                    <span>Dinero Disponible + Capital Invertido</span>
                  </th>
                </tr>
                <tr>
                  <td style={{fontSize: "18px", fontWeight: 600, textAlign: 'center'}}>Global</td>
                  <td style={{fontSize: "18px", fontWeight: 600}}>{addPoints(totalReserved + this.getTotalPayments().total - this.getTotalExpenses() + totalInvestments - this.getliquidatedCredits().total)}</td>
                </tr>
                
              </tbody>

            </table>

          }

          

          <br />
          <br />

          <button className="add_expense" name="displayExpense" onClick={this.toggleDisplayInject}>Inyección de Dinero</button>
          <hr />
          <button style={{backgroundColor: 'red', marginBottom: '20px'}} className="add_expense" name="displayExpense" onClick={this.toggleDisplayReduce}>Reducción de Dinero</button>

        </div>

        { 
          this.state.displayInject &&
          <Inject 
            company={this.state.company}
            toggleDisplayInject={this.toggleDisplayInject}
            displayInject={this.state.displayInject}
          />
        }
        
        { 
          this.state.displayReduce &&
          <Inject
            company={this.state.company}
            toggleDisplayReduce={this.toggleDisplayReduce}
            displayReduce={this.state.displayReduce}
          />
        }

        {
          this.state.displayAlert &&
          <Alert
            message={`Tu Control de la Caja se calcula desde el ${datePretty}. Para cambiar fecha haga click en ✍🏻`}
            close={this.closeConfirm}
            state="displayAlert"
           />
        }

      </div>
    )
  }
}
