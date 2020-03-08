import React, { Component, Fragment } from 'react'
import addPoints from '../../_utils/addPoints'
import getMonth from '../../_utils/getMonth'
import getDayWeek from '../../_utils/getDayWeek'
import getDateToday from '../../_utils/getDateToday'
import getWeeks from '../../_utils/getWeeks'
import {com} from '../../_utils/getRoutes'
import axios from 'axios'
import getYearsFromPays from '../../_utils/getYearsFromPays'
import getMonthsFromPays from '../../_utils/getMonthsFromPays'

export default class CollectReport extends Component {

  state = {
    payments: [],
    paymentsSelected: [],
    buttonMonth: '',
    buttonFrecuency: '',
    year: '',

    collectedPerDay: [],
    collectedPerYear: [],
    weekSelected: [],
    show: false,

    collectedPerMonth: []
  }

  componentDidMount = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/payments/company/${com}`)
    .then(response => this.setState({payments: response.data.data}))
    .then(() => {

      // Put in state the last year from the payments in database
      this.setState({year: getYearsFromPays(this.state.payments)[0]})
    })
    .then(() => this.setState({show: true}))
    .catch(e => console.log(e))
  }

  filterFrecuency = e => this.setState({buttonFrecuency: e.target.name, buttonMonth: '', collectedPerDay: [], weekSelected: []})

  filterMonth = e => {
    const { payments, year } = this.state
    const month = e.target.name

    let paymentsSelected = payments.filter(c => (getMonth(c.datePayment, true) === month) && (getDateToday(c.datePayment).slice(0,4) === year))
    let dates = paymentsSelected.map(p => p.datePayment)
    dates = [...new Set(dates)].sort((a, b) => (a > b) ? 1 : -1)

    const collectedPerDay = []

    dates.forEach(d => {
      const paysPerDate = paymentsSelected.filter(p => p.datePayment === d)
      collectedPerDay.push({[d]: {
        ["amountPayment"]: paysPerDate.map(p => p.amountPayment).reduce((a, c) => a+c),
        ["interest"]: paysPerDate.map(p => p.interestPayment).reduce((a, c) => a+c),
        ["moratorium"]: paysPerDate.map(p => p.moratoriumPayment).reduce((a, c) => a+c),
        ["amortize"]: paysPerDate.map(p => p.amortizePayment).reduce((a, c) => a+c)
      }})
    })

    console.log(collectedPerDay)

    this.setState({buttonMonth: month, paymentsSelected, collectedPerDay})
  } 


  getTotalSelected = () => {

    let { creditsSelected } = this.state

    if (creditsSelected.length ) {
      const total = creditsSelected.map(c => c.amount).reduce((a, c) => a+c)
      return total
    }
    return 0
  }


  // Get Payments From This Year ONLY
  filterPaysFromYear = pays => {

    let payments = []
    console.log(pays);
    
    pays.forEach(payment => {

      // Putting Year first (inside the String)
      let dateConverted =  getDateToday(payment.datePayment)
      
      let extractYear = dateConverted.slice(0, 4)

      // If is equal to year SELECTED by the User
      if(extractYear === this.state.year) {
        return payments.push(payment)
      }
    })

    return payments
  }



  // Sort Dates From Payments and Filtering the Year Selected
  sortDate = pays => {

    let ordered = []

    let payments = pays.filter(c => {

      return getDateToday(c.datePayment).slice(0, 4) === this.state.year
    })
    
    ordered = payments.sort((a, b) => (a.datePayment > b.datePayment) ? 1 : -1)
    return ordered
    
  }

  onChangeSelect = e => {
      this.setState({year: e.target.value, buttonMonth: '', weekSelected: [], collectedPerDay: []}) 
  } 
  

  filterYearMonth = () => {
    const { credits } = this.state
    let creds = credits.filter(c => getDateToday(c.dateConstituted).slice(0, 4) === this.state.year)

    if (creds.length > 0) {
      return true
    } 
    return false
  }


  onChangeSelectWeek = e => {
    const {payments, year} = this.state
    const {value} = e.target

    const weekSelected = getWeeks(this.sortDate(payments)[0].datePayment)[year][value]
    console.log(weekSelected)

    let weeksString = weekSelected.map(w => getDateToday(w))
    const paymentsSelected = []


    for (var j = 0; j < weeksString.length; j++) {

      payments.forEach(p => {
        if (p.datePayment === weeksString[j]) {
          paymentsSelected.push(p)
        }
      })
    }


    let dates = paymentsSelected.map(p => p.datePayment)
    dates = [...new Set(dates)].sort((a, b) => (a > b) ? 1 : -1)
    console.log(dates)

    const collectedPerDay = []

    dates.forEach(d => {
      const paysPerDate = paymentsSelected.filter(p => p.datePayment === d)
      collectedPerDay.push({[d]: {
        ["amountPayment"]: paysPerDate.map(p => p.amountPayment).reduce((a, c) => a+c),
        ["interest"]: paysPerDate.map(p => p.interestPayment).reduce((a, c) => a+c),
        ["moratorium"]: paysPerDate.map(p => p.moratoriumPayment).reduce((a, c) => a+c),
        ["amortize"]: paysPerDate.map(p => p.amortizePayment).reduce((a, c) => a+c)
      }})
    })
    
    // console.log(weekSelected)

    this.setState({
      weekSelected,
      paymentsSelected,
      collectedPerDay
    })

  }


  filterYearly = e => {
    const {name} = e.target
    const {payments, year} = this.state
    let collectedPerYear = []
    let collectedPerMonth = []


    if (name === 'years') {
      const years = getYearsFromPays(payments)

      collectedPerYear = []

      years.forEach(y => {
        const paysPerDate = payments.filter(p => p.datePayment.slice(0,4) === y)

        collectedPerYear.push({[y]: {
          ["amountPayment"]: paysPerDate.map(p => p.amountPayment).reduce((a, c) => a+c),
          ["interest"]: paysPerDate.map(p => p.interestPayment).reduce((a, c) => a+c),
          ["moratorium"]: paysPerDate.map(p => p.moratoriumPayment).reduce((a, c) => a+c),
          ["amortize"]: paysPerDate.map(p => p.amortizePayment).reduce((a, c) => a+c)
        }})
      })
      this.setState({
        buttonMonth: name,
        collectedPerDay: collectedPerYear
      })

    }

    if (name === 'months') {
      const paysYearSelected = payments.filter(p => p.datePayment.slice(0,4) === year)

      const months = getMonthsFromPays(paysYearSelected)
      console.log(months)

      collectedPerMonth = []

      months.forEach(m => {
        const monthss = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        
        const paysPerDate = paysYearSelected.filter(p => p.datePayment.slice(5,7) === m)

        collectedPerMonth.push({[monthss[m-1]]: {
          ["amountPayment"]: paysPerDate.map(p => p.amountPayment).reduce((a, c) => a+c),
          ["interest"]: paysPerDate.map(p => p.interestPayment).reduce((a, c) => a+c),
          ["moratorium"]: paysPerDate.map(p => p.moratoriumPayment).reduce((a, c) => a+c),
          ["amortize"]: paysPerDate.map(p => p.amortizePayment).reduce((a, c) => a+c)
        }})
      })

      this.setState({
        buttonMonth: name,
        collectedPerDay: collectedPerMonth
      })

    }

    if (name=== "weeks") {

      // I have the weeks in the YEAR
      const weekSelected = getWeeks(this.sortDate(payments)[0].datePayment)[year]
      console.log(weekSelected)

      // Transform the dates to dates more legible
      let weeksString = weekSelected.map(w => w.map(we => getDateToday(we)))
      console.log(weeksString)
      

      const collectedPerWeek = []


      weeksString.forEach((d, i) => {

        let paysPerDate = payments.filter(p => d.some(dat => dat === p.datePayment))

        console.log(paysPerDate)

        if (paysPerDate.length > 0) {
          collectedPerWeek.push({[i+1]: {
            ["amountPayment"]: paysPerDate.map(p => p.amountPayment).reduce((a, c) => a+c),
            ["interest"]: paysPerDate.map(p => p.interestPayment).reduce((a, c) => a+c),
            ["moratorium"]: paysPerDate.map(p => p.moratoriumPayment).reduce((a, c) => a+c),
            ["amortize"]: paysPerDate.map(p => p.amortizePayment).reduce((a, c) => a+c)
          }})
        }
        

        console.log(collectedPerWeek)
      })
      

      this.setState({
        collectedPerDay: collectedPerWeek.reverse(),
        buttonMonth: name
      })
    }

  }

  showWeeks = () => {
    let {payments, year} = this.state

    let paysFromYear = this.filterPaysFromYear(payments)
    console.log(paysFromYear);

    // Ordering Payments from old dates to recent dates
    let paysOrdered = paysFromYear.sort((a, b) => (a.datePayment > b.datePayment) ? 1 : -1)

    let firstPay = paysOrdered[0]

    let paymentDate = firstPay.datePayment

    let weeksResult = getWeeks(paymentDate) // Get Weeks from the first date of Payment of the Year Selected
    let weeksDates = weeksResult[year] // Extracting the Weeks from the Year

    const weeks = weeksDates.map((d, i) => {
      
      let weeksString = d.map(w => getDateToday(w))
      const paymentsSelected = []

      for (var j = 0; j < weeksString.length; j++) {

        payments.forEach(c => {
          if (c.datePayment === weeksString[j]) {
            paymentsSelected.push(c)
          }
        })
      }

      if (paymentsSelected.length > 0) {
        return (<option key={i+1} value={i}>{i+1}</option>)
      }
      
    })

    return weeks.reverse().filter(w => w)
  }


  getTot = () => {
    let {collectedPerDay} = this.state
    
    let intTotal = collectedPerDay.map(coll => coll[Object.keys(coll)].interest).reduce((a,c) => a+c)
    let moraTotal = collectedPerDay.map(coll => coll[Object.keys(coll)].moratorium).reduce((a,c) => a+c)
    let amortTotal = collectedPerDay.map(coll => coll[Object.keys(coll)].amortize).reduce((a,c) => a+c)
    let amountTotal = collectedPerDay.map(coll => coll[Object.keys(coll)].amountPayment).reduce((a,c) => a+c)

    return {
      intTotal,
      moraTotal,
      amortTotal,
      amountTotal
    }
  }


  render() {
    let {buttonMonth, payments, year, buttonFrecuency, weekSelected, collectedPerDay} = this.state

    const years = getYearsFromPays(payments)
    console.log(years);
    


    return (
      <Fragment>
        {
          payments.length === 0 &&
          <div>
            <br />
            <br />
            <div className="ui active centered inline loader"></div>
            <br />
          </div>
        }
        
        
        

      <div className="container_list" style={{display: this.state.show?"block": "none"}} >

        <Fragment>
          <div className="titles-list" >
            <span>Cobrado:
            {
              collectedPerDay.length > 0 &&
              <span> ₡{addPoints(collectedPerDay.map(c => c[Object.keys(c)].amountPayment).reduce((a,c) => a+c))}</span>
            }
            </span>
          </div>
          <hr />
        </Fragment>

        <div id="btns-frecuncy" className="days-buttons" >

          {
            <button 
            name="Yearly"
            onClick={this.filterFrecuency} 
            style={{background: buttonFrecuency === "Yearly" ? "green": "#273742"}} >Anual</button>
          }

          {
            <button 
            name="Monthly" 
            onClick={this.filterFrecuency} 
            style={{background: buttonFrecuency === "Monthly" ? "green": "#273742"}} >Mensual</button>
          }
          
          {
            <button 
            name="Weekly"
            onClick={this.filterFrecuency} 
            style={{background: buttonFrecuency === "Weekly" ? "green": "#273742"}} >Semanal</button>
          }
          
          {
            // (((buttonMonth !== "years") && (buttonFrecuency !== "Yearly")) || (buttonMonth === "months") || (buttonMonth === "weeks"))  &&
            <select 
              style={{fontSize: "20px", border: "1px solid grey"}}
              onChange={this.onChangeSelect}
            >
              {
                years.map((y, i) => {
                  return <option key={i+1} value={y} >{y}</option>
                })
              }
            </select>
          }
          
          

        </div>

        <hr />



        {
          buttonFrecuency === "Monthly" &&

          <Fragment>

              <div className="days-buttons" >
                {
                  (payments.some(p => (getMonth(p.datePayment) === 0) && (getDateToday(p.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Enero" 
                  onClick={this.filterMonth} 
                  style={{background: buttonMonth === "Enero" ? "green": "#273742"}} >Enero</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 1) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Febrero" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Febrero" ? "green": "#273742"}} >Febrero</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 2) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Marzo" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Marzo" ? "green": "#273742"}} >Marzo</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 3) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Abril" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Abril" ? "green": "#273742"}} >Abril</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 4) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Mayo" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Mayo" ? "green": "#273742"}} >Mayo</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 5) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Junio" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Junio" ? "green": "#273742"}} >Junio</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 6) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Julio" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Julio" ? "green": "#273742"}} >Julio</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 7) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Agosto" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Agosto" ? "green": "#273742"}} >Agosto</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 8) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Septiembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Septiembre" ? "green": "#273742"}} >Septiembre</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 9) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Octubre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Octubre" ? "green": "#273742"}} >Octubre</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 10) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Noviembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Noviembre" ? "green": "#273742"}} >Noviembre</button>
                }
                {
                  (payments.some(c => (getMonth(c.datePayment) === 11) && (getDateToday(c.datePayment).slice(0,4) === year))) &&
                  <button 
                  name="Diciembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Diciembre" ? "green": "#273742"}} >Diciembre</button>
                }
              </div>
              
          </Fragment>

        }
        
        {
          buttonFrecuency === "Weekly" &&

          <div className="container-weeks-buttons" >
              

              <div className="weeks-buttons" >
                
                {
                  <table >
                    <tbody>
                      <tr>
                        <th style={{fontSize: '20px'}} colSpan="2">Semana
                          <select className="admin_update" onChange={this.onChangeSelectWeek} >
                          <option key={0} value={0}></option>
                            { 
                              payments.length > 0 &&
                              this.showWeeks()
                            }
                        </select>
                        </th>
                      </tr>
                      <tr>
                        <th>Comienza</th>
                        <th>Finaliza</th>
                      </tr>
                      { 
                        (weekSelected.length > 0) &&
                        <tr>
                          <td style={{textAlign: 'center'}}>
                            {getDayWeek(weekSelected[0]).day} <span> </span>
                            {getDateToday(weekSelected[0]).split("-")[2]} {getMonth(getDateToday(weekSelected[0]), true)},
                            <span> </span>
                            {getDateToday(weekSelected[0]).split("-")[0]}
                          </td>
                          <td style={{textAlign: 'center'}}>
                            {getDayWeek(weekSelected[weekSelected.length -1]).day} <span> </span>
                            {getDateToday(weekSelected[weekSelected.length -1]).split("-")[2]} {getMonth(getDateToday(weekSelected[weekSelected.length -1]), true)}, {getDateToday(weekSelected[weekSelected.length -1]).split("-")[0]}
                          </td>
                        </tr>
                      }
                      
                    </tbody>
                  </table>
                }
              </div>

          </div>

        }
        
        
        
        {
          buttonFrecuency === "Yearly" &&

          <Fragment>

            <div className="days-buttons" >
              <button 
                name="years"
                onClick={this.filterYearly}
                style={{background: buttonMonth === "years" ? "green": "#273742"}} >Años
              </button>

              <button 
                name="months" 
                onClick={this.filterYearly}
                style={{background: buttonMonth === "months" ? "green": "#273742"}} >Meses
              </button>
              
              <button 
                name="weeks"
                onClick={this.filterYearly} 
                style={{background: buttonMonth === "weeks" ? "green": "#273742"}} >Semanas
              </button>
              
            </div>
              
          </Fragment>
        }



        {
          (collectedPerDay.length > 0) &&
          <table>
            <tbody>
              <tr>
                <th style={{textAlign: 'center'}}>{ buttonMonth === "weeks" ? "Semana" : "Fecha"}</th>
                <th>Cobrado</th>
                <th>Int</th>
                <th className="mobile">% Int</th>
                <th>Mora</th>
                <th className="mobile">% Mora</th>
                <th>Amort</th>
                <th className="mobile">% Amort</th>
              </tr>
              
              {
                collectedPerDay.map((coll, i) => {

                  const amount = coll[Object.keys(coll)].amountPayment
                  const int = coll[Object.keys(coll)].interest
                  const mora = coll[Object.keys(coll)].moratorium
                  const amort = coll[Object.keys(coll)].amortize

                  const percentInt = (int/amount * 100).toFixed()
                  const percentMora = (mora/amount * 100).toFixed()
                  const percentAmort = (amort/amount * 100).toFixed()

                  return (
                    <tr key={i+1} >
                      <td style={{textAlign: 'center'}}>{Object.keys(coll)}</td>
                      <td>{addPoints(amount)} </td>
                      <td>{addPoints(int)}</td>
                      <td className="mobile">{isNaN(percentInt) ? 0 : percentInt}%</td>
                      <td>{addPoints(mora)} </td>
                      <td className="mobile">{isNaN(percentMora) ? 0 : percentMora}%</td>
                      <td>{addPoints(amort)} </td>
                      <td className="mobile">{isNaN(percentAmort) ? 0 : percentAmort}%</td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        }

        
        <br />

        {/* the new one - TOTAL OF INTEREST */}
        {
          (collectedPerDay.length > 0) &&
          <table>
            <tbody>
              <tr >
                <th style={{textAlign: 'center', fontSize: "20px"}} colSpan="6">Totales</th>
              </tr>
              <tr>
                <th style={{textAlign: 'center'}}>Intereses</th>
                <th className="mobile">% Int</th>
                <th style={{textAlign: 'center'}}>Mora</th>
                <th className="mobile">% Mora</th>
                <th style={{textAlign: 'center'}}>Amort</th>
                <th className="mobile">% Amort</th>
              </tr>
              
              
              <tr key={1} >
                <td style={{textAlign: 'center'}}>
                  {addPoints(this.getTot().intTotal)}
                </td>
                <td className="mobile">
                  {(this.getTot().intTotal / this.getTot().amountTotal * 100).toFixed()}%
                </td>
                <td style={{textAlign: 'center'}}>
                  {addPoints(this.getTot().moraTotal)}
                </td>
                <td className="mobile">
                  {(this.getTot().moraTotal / this.getTot().amountTotal * 100).toFixed()}%
                </td>
                <td style={{textAlign: 'center'}}>
                  {addPoints(this.getTot().amortTotal)}
                </td>
                <td className="mobile">
                  {(this.getTot().amortTotal / this.getTot().amountTotal * 100).toFixed()}%
                </td>
              </tr>
                  
            </tbody>
          </table>
        }
        <br />
      </div>
      <br />
      </Fragment>
    )
  }
}