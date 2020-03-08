import React, { Component } from 'react'
import '../CollectDay/collect.css'
import '../CollectDay/accordion.css'
import './historial.css'
import axios from 'axios'
import addPoints from '../../_utils/addPoints'
import getDateToday from '../../_utils/getDateToday'
import getDayWeek from '../../_utils/getDayWeek'
import {com} from '../../_utils/getRoutes'



export default class CollectDay extends Component {

  state = {
    date: getDateToday(),
    history: [],
    newDate: '',
  }

  componentDidMount = () => {
    this.getHistoryByDate(getDateToday())
  }

  componentDidUpdate = () => {
    const {date, newDate} = this.state

    if ( (date !== newDate) && newDate) {
      this.getHistoryByDate(this.state.newDate)
    }
  }
  

  getHistoryByDate = (date) => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/history/date/${date}/${com}`)
      .then(res => {
        let history = res.data.data
        this.setState({history, date: date})
      })
      .catch(e => console.log(e))
    }
  
    

  changeDate = e => this.setState({newDate: e.target.value})

  firstLetterUppercase = (nameInput = "a") => {
    let firstLetter = nameInput.split('')[0]
    let letterUppercase = firstLetter.toUpperCase()

    return letterUppercase + nameInput.slice(1).toLowerCase()
  }

  getMessageDeletePayment = (history) => {
    let request = ''
    let model = ''
    let customer = history.customerName
    let username = this.firstLetterUppercase(history.username)
    let payment = addPoints(history.paymentAmount)

    if (history.request === "delete") {
      request = "eliminó"
    }

    if (history.model === "payment") {
      model = 'pago'
    }

    const message = `${username} ${request} un ${model} de ${customer} por ₡${payment}`

    return message
  }

  getMessageDeleteCredit = (history) => {
    let request = ''
    let model = ''
    let customer = history.customerName
    let username = this.firstLetterUppercase(history.username)

    if (history.request === "delete") {
      request = "eliminó"
    }

    if (history.model === "credit") {
      model = 'crédito'
    }

    const message = `${username} ${request} un ${model} de ${customer} por ₡${history.creditAmount}`

    return message
  }

  
  render() {

    return (
      <div style={style}>
        <p id="title_historial">Historial</p>
        <table>
          <tbody>
            <tr>
              <th className="container-input-date" >

                {
                  this.state.newDate ? 
                  <p style={{fontSize: 18, margin: 12}}>
                    {getDayWeek(this.state.newDate).day}
                    <span id="show" > / {getDayWeek(this.state.date).month}</span>
                  </p> :

                  <p style={{fontSize: 18, margin: 12}}>
                    {getDayWeek(this.state.date).day} 
                    <span id="show" > / {getDayWeek(this.state.date).month}</span>
                  </p>
                }
                

                <input 
                  className="input-date" 
                  type="date"
                  value={this.state.date}
                  onChange={this.changeDate}
                />
                
                
                
              </th>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <th className="mobile" >#</th>
              <th className="mobile">Hora</th>
              <th>Qué sucedió?</th>
            </tr>
            {
              this.state.history.map((history, i) => {
                let message = "";

                if (history.request === "delete" && history.model === "payment") {
                  message = this.getMessageDeletePayment(history)
                }

                if (history.request === "delete" && history.model === "credit") {
                  message = this.getMessageDeleteCredit(history)
                }

                return (
                <tr key={i}>
                  <td className="mobile" >{i + 1}</td>
                  <td className="mobile" >{history.hour.slice(0,5)}</td>
                  <td>{message}</td>
                  

                  
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}


const style = {
  // display: "flex",
  // justifyContent: "center"
  textAlign: "center"
}