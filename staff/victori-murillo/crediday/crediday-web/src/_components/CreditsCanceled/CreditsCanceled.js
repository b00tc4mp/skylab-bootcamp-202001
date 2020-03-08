import React, { Component, Fragment } from 'react'
import addPoints from '../../_utils/addPoints'
import getMonth from '../../_utils/getMonth'
import getDayWeek from '../../_utils/getDayWeek'
import getDateToday from '../../_utils/getDateToday'

import axios from 'axios'

export default class CreditsConst extends Component {

  state = {
    credits: this.props.credits,
    creditsSelected: [],
    buttonFrecuency: '',
    buttonMonth: '',
    buttonWeek: '',
    year: ""
  }

  componentDidMount = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/credits/canceled/company/${localStorage.getItem("company")}`)
    .then(response => this.setState({credits: response.data.credits}))
    .then(() => {
      this.setState({year: this.getYears(this.state.credits)[0] })
    })
    .catch(e => console.log(e))
  }

  filterFrecuency = e => this.setState({buttonFrecuency: e.target.name, buttonMonth: '', creditsSelected: []})
  filterWeek = e => this.setState({buttonWeek: e.target.name})



  filterMonth = e => {
    const { credits, year } = this.state
    const month = e.target.name

    let creditsSelected = credits.filter(c => (getMonth(c.dateCancelled, true) === month) && (getDateToday(c.dateCancelled).slice(0,4) === year))
    this.setState({buttonMonth: month, creditsSelected})
  } 


  getTotalSelected = () => {

    let { creditsSelected } = this.state

    if (creditsSelected.length ) {
      const total = creditsSelected.map(c => c.amount).reduce((a, c) => a+c)
      return total
    }
    return 0
  }
  
  // sortDate = (creds) => {
  //   let ordered = []
  //   let credits = creds.filter(c => getDateToday(c.dateCancelled).slice(0, 4) === this.state.year)

  //   if (credits.length) {
  //     ordered = creds.sort((a, b) => (a.dateCancelled > b.dateCancelled) ? 1 : -1)
  //     return ordered
  //   }
    
  //   return []
  // }

  onChangeSelect = e => {
    this.setState({year: e.target.value, buttonMonth: '', creditsSelected: []}) 
  } 
  

  filterYearMonth = () => {
    const { credits } = this.state
    let creds = credits.filter(c => getDateToday(c.dateCancelled).slice(0, 4) === this.state.year)

    if (creds.length > 0) {
      return true
    }
    return false
  }

  getYears = (credits) => {

    let years = credits.map(c => getDateToday(c.dateCancelled).slice(0, 4)).filter((c, i, a) => a.indexOf(c) === i)
    years = years.sort((a, b) => (a > b) ? -1 : 1)
    years = years.filter((c, i, a) => a.indexOf(c) === i)
    return years
  }



  render() {
    let { buttonFrecuency, buttonMonth, credits, creditsSelected, year } = this.state


    const years = this.getYears(credits)


    return (
      <div className="container_list" >

        <Fragment>
          <div className="titles-list" >
            <span>Créditos Cancelados: { creditsSelected.length }</span>
            <span>Capital Cancelado: { addPoints(this.getTotalSelected()) }</span>
          </div>
          <hr />
        </Fragment>

        <div id="btns-frecuncy" className="days-buttons" >

          {
            <button 
            name="Monthly" 
            onClick={this.filterFrecuency} 
            style={{background: buttonFrecuency === "Monthly" ? "green": "#273742"}} >Por Mes</button>
          }

          {/* {
            <button 
            name="Weekly"
            onClick={this.filterFrecuency} 
            style={{background: buttonFrecuency === "Weekly" ? "green": "#273742"}} >Semanal</button>
          } */}

          {
            this.state.buttonFrecuency &&
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
                  (credits.some(c => (getMonth(c.dateCancelled) === 0) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Enero" 
                  onClick={this.filterMonth} 
                  style={{background: buttonMonth === "Enero" ? "green": "#273742"}} >Enero</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 1) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Febrero" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Febrero" ? "green": "#273742"}} >Febrero</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 2) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Marzo" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Marzo" ? "green": "#273742"}} >Marzo</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 3) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Abril" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Abril" ? "green": "#273742"}} >Abril</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 4) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Mayo" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Mayo" ? "green": "#273742"}} >Mayo</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 5) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Junio" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Junio" ? "green": "#273742"}} >Junio</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 6) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Julio" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Julio" ? "green": "#273742"}} >Julio</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 7) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Agosto" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Agosto" ? "green": "#273742"}} >Agosto</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 8) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Septiembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Septiembre" ? "green": "#273742"}} >Septiembre</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 9) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Octubre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Octubre" ? "green": "#273742"}} >Octubre</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 10) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
                  <button 
                  name="Noviembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Noviembre" ? "green": "#273742"}} >Noviembre</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateCancelled) === 11) && (getDateToday(c.dateCancelled).slice(0,4) === year))) &&
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
                
                <button><i className="fas fa-arrow-alt-circle-left"></i></button>
                {
                  <table >
                    <tbody>
                      <tr>
                        <th style={{fontSize: '20px'}} colspan="2">Semana 40</th>
                      </tr>
                      <tr>
                        <th>Comienza</th>
                        <th>Finaliza</th>
                      </tr>
                      <tr>
                        <td style={{textAlign: 'center'}}>30 septiembre</td>
                        <td style={{textAlign: 'center'}}>6 octubre</td>
                      </tr>
                    </tbody>
                  </table>
                }
                <button><i className="fas fa-arrow-alt-circle-right"></i></button>
              </div>

              {/* <hr /> */}

          </div>

          

        }
        {
          (buttonFrecuency && buttonMonth) &&
          <table>
            <tbody>
              <tr>
                <th style={{textAlign: 'center'}} className="mobile">#</th>
                <th>Nombre </th>
                <th>Monto</th>
                <th>Fecha de Constitución</th>
                <th>Fecha de Cancelación</th>
              </tr>
              
              {
                // this.sortDate(creditsSelected).map((c, i) => {
                creditsSelected.map((c, i) => {
                  return (
                    <tr key={i} >
                      <td style={{textAlign: 'center'}} className="mobile">{i + 1}</td>

                      <td id="name-3" >{c.user.name.split(" ").slice(0, 3).join(" ")}</td>
                      <td id="name-4" >{c.user.name}</td>

                      <td> {addPoints(c.amount)} </td>
                      <td>{getDayWeek(c.dateConstituted).day}, {getDateToday(c.dateConstituted).slice(8, 10)} {getMonth(c.dateConstituted, true)}</td>
                      <td>{getDayWeek(c.dateCancelled).day}, {getDateToday(c.dateCancelled).slice(8, 10)} {getMonth(c.dateCancelled, true)}</td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        }

        
        <br />
        <br />
      </div>
    )
  }
}
