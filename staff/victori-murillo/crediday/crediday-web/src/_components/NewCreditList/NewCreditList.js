import React, {Fragment} from 'react'
import '../CreditList/creditList.css'
import addPoints from '../../utils/addPoints'
import getDayWeek from '../../utils/getDayWeek'
import axios from 'axios'
import {com} from '../../utils/getRoutes'
import getInterestPending from '../../utils/getInterestPending'
import getDateToday from '../../utils/getDateToday'

import getDay from '../../utils/getDay'
import Payment from '../Payment/Payment'

import {isAdmin, isCollector} from '../../utils/isLoggedIn'

import Balance from '../Balance/Balance'

import getNumberDays from '../../utils/getNumberDays'
import getNumberMonths from '../../utils/getNumberMonths'
import getNumberWeeks from '../../utils/getNumberWeeks'
import getNumberOf_1_16 from '../../utils/getNumberOf_1_16'
import getTwiceMonth from '../../utils/getTwiceMonth'
import convertWhatsapp from '../../utils/convertWhatsapp'

export default class List extends React.Component {

  state = {
    credits: this.props.credits ? this.props.credits : [],
    credit: {},
    day: "",
    creditsSelected: [],
    buttonFrecuency: "",
    buttonDay: "",

    displayPayment: false,
    displayBalance: false,
    creditSelected: false,

    loader: true,
    total: 0
  }

  componentDidMount = () => {
    this.getCredits()
  }

  getCredits = () => {
    axios.get(`http://localhost:3007/api/credits/fast/company/${com}`)
    .then(response => this.setState({credits: response.data.credits, total: response.data.total}))
    .catch(e => console.log(e))
  }

  getCredit = (e, creditId) => {
    axios.get(`http://localhost:3007/api/credits/${creditId}`)
    .then(response => {
      const credit = response.data.credit
      console.log(credit)

      this.setState({creditSelected: credit, creditState: true})
      const {interestPending, moratoriumPending} = getInterestPending(credit)
      return {interestPending, moratoriumPending}

    })
    .then(({interestPending, moratoriumPending}) => {
      this.setState({interestPending, moratoriumPending, [e]: true})
    })
    .catch(e => console.log(e))
    }

    
  filterToday = e => {
    const {credits} = this.state
    let frecuncy = "Today"
    if (e) {
      frecuncy = e.target.name
    }

    // getting credits daily
    let creditsDay = credits.filter(c => c.paymentFrecuency === "Daily")
    creditsDay = creditsDay.filter(c => c.length !== 0).sort((a, b) => (a.paymentDefault > b.paymentDefault) ? -1 : 1)

    
    // getting credits weekly
    const creditsWeek = credits.filter(c => c.paymentFrecuency === "Weekly").map(c => {
      if  (getDayWeek(c.dateConstituted).day === getDayWeek().day) {
        return c
      }
      return []

    }).filter(c => c.length !== 0).sort((a, b) => (a.paymentDefault > b.paymentDefault) ? -1 : 1)


    // getting credits monthly
    let d = new Date()
    let dayMonth = d.getDate()
    let year = d.getFullYear()

    
  

    let creditsMonth = credits.filter(c => c.paymentFrecuency === "Monthly").filter(c => c.dateConstituted.slice(8) === dayMonth)
    creditsMonth = creditsMonth.filter(c => c.length !== 0).sort((a, b) => (a.paymentDefault > b.paymentDefault) ? -1 : 1)

    
    // getting credits by Fornigths
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }

    let creditsTwiceMonth = credits.filter(c => c.paymentFrecuency === "TwiceMonthly").map(c => {

      let quantityDaysInMonth = daysInMonth(d.getMonth() + 1, year)
      // let quantityDaysInMonth = daysInMonth(2, 2019)
      // console.log(quantityDaysInMonth)

      if(quantityDaysInMonth === 28) {
        if(c.firstTwiceMonthly === 30 ||  c.secondTwiceMonthly === 30) {
          return c
        }

        if(c.firstTwiceMonthly === 29 ||  c.secondTwiceMonthly === 29) {
          return c
        }
      }

      if(quantityDaysInMonth === 29) {
        if(c.firstTwiceMonthly === 30 ||  c.secondTwiceMonthly === 30) {
          return c
        }
      }

      if(c.firstTwiceMonthly === dayMonth ||  c.secondTwiceMonthly === dayMonth) {
        return c
      }
      return {}
    } )
    creditsTwiceMonth = creditsTwiceMonth.filter(c => c.length !== 0).sort((a, b) => (a.paymentDefault > b.paymentDefault) ? -1 : 1)


    // Spread Arrays
    let creditsSelected = [...creditsDay, ...creditsWeek, ...creditsTwiceMonth, ...creditsMonth].filter(c => c.creditState)


    // This is MAGIC
    creditsSelected = creditsSelected.map(c => {

      const hasPaymentToday = c.payments.some(p => p.datePayment === getDateToday())
      


      if (c.dateConstituted === getDateToday()) { // Today was the constituted --> no thank you
        return []

      } else if (c.paymentInterest > 0 && getInterestPending(c).interestPending <= 0) {
        return []

      } else if (!hasPaymentToday) {
        return c

      } else { // If someone has to pay interest --> lets filter
        // console.log(getInterestPending(c))
        
        // 
        return []
      }
      
    })


    this.setState({creditsSelected, buttonFrecuency: frecuncy, buttonDay: ""})

  }

  filterFrecuency = (e) => {
    const {credits} = this.state
    const frecuncy = e.target.name

    let creditsSelected = credits.filter(c => c.paymentFrecuency === frecuncy)

    if (frecuncy === "Monthly" ) {
      creditsSelected = creditsSelected.sort((a, b) => (a.dateConstituted.slice(8) > b.dateConstituted.slice(8)) ? 1 : -1)
      // list.sort((a, b) => (a.color > b.color) ? 1 : -1)

    } else if (frecuncy === "Weekly" ) {
      // console.log(creditsSelected)
      creditsSelected = creditsSelected.sort((a, b) => (a.paymentDefault > b.paymentDefault) ? -1 : 1)
    }

    this.setState({creditsSelected, buttonFrecuency: e.target.name, buttonDay: ""})
  }


  filterDay = e => {
    const {credits, buttonFrecuency} = this.state
    const day = e.target.name

    let creditsSelected = credits.filter(c => c.paymentFrecuency === buttonFrecuency).filter(c => getDayWeek(c.dateConstituted).day === day)

    creditsSelected = creditsSelected.sort((a, b) => (a.paymentDefault > b.paymentDefault) ? -1 : 1)

    this.setState({creditsSelected, buttonDay: day})
  }


  // Open Modal Payment
  openDisplay = (e, creditSelected) => {
    console.log(e.target.name)
    this.getCredit(e.target.name, creditSelected)
    // this.setState({creditSelected, [e.target.name]: true, creditState: true})

    // if (creditSelected) {
    //   const {interestPending, moratoriumPending} = getInterestPending(creditSelected)
    //   this.setState({interestPending, moratoriumPending})
    // } 
  } 

  closeDisplay = name => this.setState({creditSelected: false, [name]: false})



  // TRICKY FUNCTION -- ONLY WEEKLY and BIWEEKLY BY NOW

  getOverdue = credits => {

    //By now only works overdue without payments
    let delayedZeroPays = credits.filter(c => c.payments.length === 0).map((c, i) => {

        let daysDelayed = 0

        if( c.paymentFrecuency === "Weekly") {

          daysDelayed = getNumberDays(c.dateConstituted, true) - 7

            // let weeks = this.getNumberWeeks(c.dateConstituted) - 1

            // if (quantityPays < weeks) {

            //   daysDelayed = getNumberDays(c.dateConstituted, true) - 7
            // }
          
        }

        if( c.paymentFrecuency === "TwiceMonthly") {
          daysDelayed = getNumberDays(c.dateConstituted, true) - 15
        }

        if( c.paymentFrecuency === "Monthly") {
          daysDelayed = getNumberMonths(c.dateConstituted) - 1
        }
        

        if (daysDelayed > 0) {
          c["delayed"] = daysDelayed
          return c
        }

        return []

    })

    // let delayedPays = credits.filter(c => c.payments.length > 0).map(c => {

    //   const daysFromStart = getNumberDays(c.dateConstituted, true)
    //   const lastPayment = c.payments[c.payments.length - 1]
    //   console.log(lastPayment)
    // })

    delayedZeroPays = delayedZeroPays.filter(c => c.amount).sort((a, b) => (a.delayed > b.delayed) ? 1 : -1)

    return delayedZeroPays
  }



  // Function to get Delayed with Payments

  getOverdueWithPays = credits => {
    let delayedWithPays = credits.filter(c => c.payments.length > 0).map((c, i) => {

      let {paymentFrecuency, firstTwiceMonthly, secondTwiceMonthly, dateConstituted, dateCancelled, paymentInterest} = c
      let delayed = 0
      let quantityPays = c.payments.length

      const {interestPending} = getInterestPending(c)

      if (paymentInterest && (interestPending <= paymentInterest) ) {
        return []
      }

      if (paymentInterest && (interestPending > paymentInterest) ) {
        delayed = Math.ceil(interestPending / paymentInterest) - 1
      } 

      if (delayed) {
        paymentFrecuency = ""
      }

      
      

      if(paymentFrecuency === "Weekly") {

        let weeks = getNumberWeeks(dateConstituted) - 1
        delayed = weeks - quantityPays
      }


      if(paymentFrecuency === "TwiceMonthly") {
        let fornights = 0
        

        if (firstTwiceMonthly && secondTwiceMonthly) {
          fornights = getTwiceMonth(firstTwiceMonthly, secondTwiceMonthly, dateConstituted) - 1
          delayed = fornights - quantityPays

        } else {
          fornights = getNumberOf_1_16(dateConstituted, dateCancelled)
          delayed = fornights - quantityPays
        }

      }

      if(paymentFrecuency === "Monthly") {
        let months = getNumberMonths(dateConstituted) - 1
        delayed = months - quantityPays
      }
      

      if (delayed > 0) {
        c["delayed"] = delayed
        return c
      }

      return []

  })

  delayedWithPays = delayedWithPays.filter(c => c.amount)

  const weeklys = delayedWithPays.filter(c => c.paymentFrecuency === "Weekly")
  const TwiceMonthlys = delayedWithPays.filter(c => c.paymentFrecuency === "TwiceMonthly")
  const monthlys = delayedWithPays.filter(c => c.paymentFrecuency === "Monthly")


  return [...monthlys, ...TwiceMonthlys, ...weeklys ].sort((a, b) => (a.delayed > b.delayed) ? 1 : -1)
  }


  ///// RENDER

  render() {
    let {credits, creditsSelected, buttonDay, buttonFrecuency} = this.state

    if (buttonFrecuency) {
      credits = creditsSelected
    }

    let creditsByWeek = this.state.credits.filter(c => c.paymentFrecuency === "Weekly")
  

    if( isCollector() && this.state.credits.length > 0 ) {

      if( buttonFrecuency === "" ) {
        this.filterToday()
      }
      
    }


    return (
      <div className="container_list" >

        {
          (this.state.credits.length === 0 && this.state.loader) &&
          <Fragment>
            <br />
            <br />
            <div className="ui active centered inline loader"></div>
            <br />
        </Fragment>
        }

        

        {
          isAdmin() && 
          <Fragment>
            <div className="titles-list" >
              <span>Cantidad de Inversiones: {credits.length}</span>
              <span>Capital Invertido: ₡{addPoints(this.state.total)}</span>
            </div>
            <hr />
          </Fragment>
        }
        
        
        {
          isAdmin() && 
          <div id="btns-frecuncy" className="days-buttons" >

            {
              this.state.credits.some(c => c.paymentFrecuency === "Daily") &&
              <button 
              name="Daily"
              onClick={this.filterFrecuency} 
              style={{background: buttonFrecuency === "Daily" ? "green": "#273742"}} >Diario</button>
            }

            {
              this.state.credits.some(c => c.paymentFrecuency === "Weekly") &&
              <button 
              name="Weekly"
              onClick={this.filterFrecuency} 
              style={{background: buttonFrecuency === "Weekly" ? "green": "#273742"}} >Semanal</button>
            }

            {
              this.state.credits.some(c => c.paymentFrecuency === "TwiceMonthly") &&
              <button 
              name="TwiceMonthly" 
              onClick={this.filterFrecuency} 
              style={{background: buttonFrecuency === "TwiceMonthly" ? "green": "#273742"}} >Quincenal</button>
            }

            {
              this.state.credits.some(c => c.paymentFrecuency === "Monthly") &&
              <button 
              name="Monthly" 
              onClick={this.filterFrecuency} 
              style={{background: buttonFrecuency === "Monthly" ? "green": "#273742"}} >Mensual</button>
            }

            {/* {
              this.state.credits.length > 0 &&
              <button 
              name="Today" 
              onClick={this.filterToday}
              style={{background: buttonFrecuency === "Today" ? "green": "#273742"}} >Hoy</button>
            } */}
            
          </div>
        }
        

        

        

        {
          buttonFrecuency === "Weekly" &&

          <Fragment>
            <hr />

              <div className="days-buttons" >
                {
                  creditsByWeek.some(c => getDay(c.dateConstituted) === 1 ) &&
                  <button 
                  name="Lunes" 
                  onClick={this.filterDay} 
                  style={{background: buttonDay === "Lunes" ? "green": "#273742"}} >Lunes</button>
                }
                {
                  creditsByWeek.some(c => getDay(c.dateConstituted) === 2 ) &&
                  <button
                  name="Martes" 
                  onClick={this.filterDay}
                  style={{background: buttonDay === "Martes" ? "green": "#273742"}} >Martes</button>
                }
                {
                  creditsByWeek.some(c => getDay(c.dateConstituted) === 3 ) &&
                  <button 
                  name="Miércoles" 
                  onClick={this.filterDay}
                  style={{background: buttonDay === "Miércoles" ? "green": "#273742"}} >Miércoles</button>
                }
                {
                  creditsByWeek.some(c => getDay(c.dateConstituted) === 4 ) &&
                  <button 
                  name="Jueves" 
                  onClick={this.filterDay}
                  style={{background: buttonDay === "Jueves" ? "green": "#273742"}} >Jueves</button>
                }
                {
                  creditsByWeek.some(c => getDay(c.dateConstituted) === 5 ) &&
                  <button 
                  name="Viernes" 
                  onClick={this.filterDay}
                  style={{background: buttonDay === "Viernes" ? "green": "#273742"}} >Viernes</button>
                }
                {
                  creditsByWeek.some(c => getDay(c.dateConstituted) === 6 ) &&
                  <button 
                  name="Sábado" 
                  onClick={this.filterDay}
                  style={{background: buttonDay === "Sábado" ? "green": "#273742"}} >Sábado</button>
                }
                {
                  creditsByWeek.some(c => getDay(c.dateConstituted) === 0 ) &&
                  <button 
                  name="Domingo" 
                  onClick={this.filterDay}
                  style={{background: buttonDay === "Domingo" ? "green": "#273742"}} >Domingo</button>
                }
              </div>

          </Fragment>

        }


        <table>
          <tbody>
            <tr>
              <th style={{textAlign: 'center'}} className="mobile">#</th>
              <th>Nombre </th>
              <th>Pago</th>
              {buttonFrecuency === "Today" && <th>Frecuencia</th>}
              {(buttonFrecuency === "Monthly" ) && <th>Dia</th>}

              {buttonFrecuency === "TwiceMonthly" && <th>Dias</th>}
              
              {
                localStorage.getItem("configInitialAmount") === "true" &&
                <th style={{textAlign:"center"}}>Monto Inicial</th>
              }
              {
                localStorage.getItem("configInitialAmount") === "false" &&
                <th style={{textAlign:"center"}}>Saldo</th>
              }
              
            </tr>
            {
              credits.filter(c => c.user).map((c, i) => {
                
                let frecuencia = c.paymentFrecuency === "Weekly" && "Semanal"
                frecuencia = c.paymentFrecuency === "TwiceMonthly" ? "Quincenal" : frecuencia
                frecuencia = c.paymentFrecuency === "Monthly" ? "Mensual" : frecuencia
                frecuencia = c.paymentFrecuency === "Daily" ? "Diario" : frecuencia

                return (
                  <tr key={i} >
                    <td style={{textAlign: 'center'}} className="mobile">{i + 1}</td>
                    
                    <td id="name-3" >
                      {c.user.name !== null && c.user.name.split(" ").slice(0, 3).join(" ")}
                      {
                        convertWhatsapp(c.user.whatsapp) &&
                        <a
                          className="link-call" 
                          href={`https://wa.me/${convertWhatsapp(c.user.whatsapp)}`} 
                          target="_blank"
                        >

                          <i style={{color: "green"}} className="fab fa-whatsapp"></i>
                        </a>
                      }
                    </td>
                    

                    <td id="name-4" >
                      {c.user !== null && c.user.name} 
                      {
                        convertWhatsapp(c.user.whatsapp) &&
                        <a
                          className="link-call" 
                          href={`https://wa.me/${convertWhatsapp(c.user.whatsapp)}`} 
                          target="_blank"
                        >

                          <i style={{color: "green"}} className="fab fa-whatsapp"></i>
                        </a>
                      }
                      
                    </td>

                    <td>
                      <button
                        onClick={(e) => this.openDisplay(e, c)}
                        name="displayPayment"
                        className="payment-today" >{addPoints(c.paymentDefault)}
                      </button>
                    </td>


                    {buttonFrecuency === "Monthly" && <td>{c.dateConstituted.slice(8)}</td>}

                    {
                      buttonFrecuency === "TwiceMonthly" && <td>{c.firstTwiceMonthly} y {c.secondTwiceMonthly}</td>
                    }

                    {
                      buttonFrecuency === "Today" && 
                      <td style={{fontWeight: frecuencia === "Mensual" ? 600 : 400}}>{frecuencia}</td>
                    }
                    
                    
                    {
                      localStorage.getItem("configInitialAmount") === "true" &&
                      <td className="column_amount" >
                        <button
                          onClick={(e) => this.openDisplay(e, c._id)}
                          name="displayBalance"
                          className="button_balance" id="balance-list" >{addPoints(c.amount)}</button>
                      </td>
                    }
                    {
                      localStorage.getItem("configInitialAmount") === "false" &&
                      <td className="column_amount" >
                        <button
                          onClick={(e) => this.openDisplay(e, c._id)}
                          name="displayBalance"
                          className="button_balance" id="balance-list" >{addPoints(c.amount)}</button>
                      </td>
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>


        <br />

        {
          buttonFrecuency === "Today" &&
          <div className="titles-list" >
            {/* <span>Por Cobrar: ₡{addPoints(porCobrar)}</span> */}
          </div>
        }
        
        <br />
        <hr />
        <br />
        <br />

        {
          buttonFrecuency === "Today" &&
            <Fragment>
               <h3 className="h2-overdue" >Atrasados que nunca han pagado</h3>
                <table style={{marginBottom: 20}}>
                  <tbody>
                    <tr>
                      <th className="mobile" style={{textAlign: 'center'}} className="mobile">#</th>
                      <th>Nombre</th>
                      <th>Atraso</th>
                      <th>Pago</th>
                      <th className="mobile" >Dia</th>
                      <th className="mobile" >Frecuencia</th>
                      <th style={{textAlign:"center"}}>Monto Inicial</th>
                    </tr>


                  {
                    this.getOverdue(this.state.credits.filter(c => c.creditState)).map((c, i) => {
                      let frecuencia = c.paymentFrecuency === "Weekly" && "Semanal"
                      frecuencia = c.paymentFrecuency === "TwiceMonthly" ? "Quincenal" : frecuencia
                      frecuencia = c.paymentFrecuency === "Monthly" ? "Mensual" : frecuencia

                      return (
                        <tr key={i} >
                          <td style={{textAlign: 'center'}} className="mobile">{i + 1}</td>
                          <td id="name-3" >{c.user !== null && c.user.name.split(" ").slice(0, 3).join(" ")}</td>
                          <td id="name-4" >{c.user !== null && c.user.name}</td>

                          {
                            frecuencia !== "Mensual" && 
                            <td className="daysDelayed" >{c.delayed} {c.delayed === 1 ? "dia": "dias"}</td>
                          }
                          
                          {
                            frecuencia === "Mensual" && 
                            <td className="daysDelayed" >{c.delayed} {c.delayed === 1 ? "mes": "meses"}</td>
                          }
                          

                          <td>
                            <button
                              onClick={(e) => this.openDisplay(e, c)}
                              name="displayPayment"
                              className="payment-today" >{addPoints(c.paymentDefault)}
                            </button>
                          </td>
                          
                          <td className="mobile">{getDayWeek(c.dateConstituted).day}</td>
                          <td className="mobile" >{frecuencia}</td>
                          <td className="column_amount" >
                            <button
                              onClick={(e) => this.openDisplay(e, c)}
                              name="displayBalance"
                              className="button_balance" id="balance-list" >{addPoints(c.amount)}</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <br />
            </Fragment>
           
        }

        <br />
        
        {
          buttonFrecuency === "Today" &&
            <Fragment>
               <h3 className="h2-overdue" style={{backgroundColor: "orange"}} >Atrasados pero pagan</h3>
                <table style={{marginBottom: 20}}>
                  <tbody>
                    <tr>
                      <th className="mobile" style={{textAlign: 'center'}} className="mobile">#</th>
                      <th>Nombre</th>
                      <th>Atraso</th>
                      <th>Pago</th>
                      <th className="mobile" >Dia</th>
                      <th className="mobile" >Frecuencia</th>
                      <th style={{textAlign:"center"}}>Monto Inicial</th>

                    </tr>


                  {
                    this.getOverdueWithPays(
                      this.state.credits.filter(c => c.creditState)
                      ).map((c, i) => {
                      let frecuencia = c.paymentFrecuency === "Weekly" && "Semanal"
                      frecuencia = c.paymentFrecuency === "TwiceMonthly" ? "Quincenal" : frecuencia
                      frecuencia = c.paymentFrecuency === "Monthly" ? "Mensual" : frecuencia

                      return (
                        <tr key={i} >
                          <td style={{textAlign: 'center'}} className="mobile">{i + 1}</td>
                          <td id="name-3" >{c.user !== null && c.user.name.split(" ").slice(0, 3).join(" ")}</td>
                          <td id="name-4" >{c.user !== null && c.user.name}</td>

                          {
                            frecuencia === "Semanal" && 
                            <td className="daysDelayed" >{c.delayed} sem</td>
                          }

                          {
                            frecuencia === "Quincenal" && 
                            <td className="daysDelayed" >{c.delayed} quin</td>
                          }
                          
                          {
                            frecuencia === "Mensual" && 
                            <td className="daysDelayed" >{c.delayed} {c.delayed === 1 ? "mes": "meses"}</td>
                          }
                          

                          <td>
                            <button
                              onClick={(e) => this.openDisplay(e, c)}
                              name="displayPayment"
                              className="payment-today" >{addPoints(c.paymentDefault)}
                            </button>
                          </td>
                          
                          <td className="mobile">{getDayWeek(c.dateConstituted).day}</td>
                          <td className="mobile" >{frecuencia}</td>
                          <td className="column_amount" >
                            <button
                              onClick={(e) => this.openDisplay(e, c)}
                              name="displayBalance"
                              className="button_balance" id="balance-list" >{addPoints(c.amount)}</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <br />
              <br />

              <h4 style={{margin: 10}}>Atrasados que nunca han pagado:</h4>
              <p style={{margin: 15}}>Son créditos que estan atrasados y que no han hecho ni un solo pago.</p>
              <br />
              <h4 style={{margin: 10}}>Atrasados pero pagan:</h4>
              <p style={{margin: 15}}>Son créditos que estan atrasados pero han estado pagando. Ya tienen como mínimo 1 pago.</p>
              <br />
            </Fragment>
           
        }

        
        {
          this.state.displayPayment &&
          <Payment
            credit={this.state.creditSelected}

            closeDisplay={this.closeDisplay}
            userId={this.state.userId}

            redirect={this.redirect}

            paymentInterest={addPoints(this.state.creditSelected.paymentInterest)}
            paymentAmortize={addPoints(this.state.creditSelected.paymentAmortize)}

            moratoriumPending={addPoints(this.state.moratoriumPending)}

            creditState={this.state.creditState}
          />
        }
        
        {
          this.state.displayBalance &&
          <Balance
            credit={this.state.creditSelected}
            interestPending={this.state.interestPending}
            moratoriumPending={this.state.moratoriumPending}

            closeDisplay={this.closeDisplay}
            redirect={this.redirect}
          />
        }

      </div>
    )

  }

}

