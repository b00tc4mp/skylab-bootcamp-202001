import React, { Component, Fragment } from 'react'
import './creditsConst.css'
import addPoints from '../../_utils/addPoints'
import getMonth from '../../_utils/getMonth'
import getDayWeek from '../../_utils/getDayWeek'
import getDateToday from '../../_utils/getDateToday'
import getWeeks from '../../_utils/getWeeks'
import {ht, app, ipa, slash, dot, script, com} from '../../_utils/getRoutes'
import axios from 'axios'

export default class CreditsConst extends Component {

  state = {
    credits: this.props.credits,
    creditsSelected: [],
    buttonFrecuency: "",
    buttonMonth: '',
    buttonWeek: '',
    year: '',

    weekSelected: [],
    show: false
  }


  componentDidMount = () => {

    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/creditsall/company/${com}`)
    .then(response => this.setState({credits: response.data.credits}))
    .then(() => {
      this.setState({year: this.getYears(this.state.credits)[0] })
    }).then(() => this.setState({show: true}))
    .catch(e => console.log(e))
  }

  filterFrecuency = e => this.setState({buttonFrecuency: e.target.name, buttonMonth: '', creditsSelected: []})
  filterWeek = e => this.setState({buttonWeek: e.target.name})


  filterMonth = e => {
    const { credits, year } = this.state
    const month = e.target.name

    let creditsSelected = credits.filter(c => (getMonth(c.dateConstituted, true) === month) && (getDateToday(c.dateConstituted).slice(0,4) === year))

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
  
  sortDate = (creds) => {
    let ordered = []
    const {buttonFrecuency} = this.state
    let credits = creds


    if (buttonFrecuency === "Monthly") {
      credits = creds.filter(c => getDateToday(c.dateConstituted).slice(0, 4) === this.state.year)

    } else if (buttonFrecuency === "Weekly") {
      credits = creds.map(c => c)
    }

    console.log(credits)
    

    if (credits.length) {
      ordered = creds.sort((a, b) => (a.dateConstituted > b.dateConstituted) ? 1 : -1)
      return ordered
    }
    
    return []
  }

  onChangeSelect = e => {
    this.setState({year: e.target.value, buttonMonth: '', creditsSelected: [], weekSelected: []}) 
  } 
  

  filterYearMonth = () => {
    const { credits } = this.state
    let creds = credits.filter(c => getDateToday(c.dateConstituted).slice(0, 4) === this.state.year)

    if (creds.length > 0) {
      return true
    } 
    return false
  }

  getYears = (credits) => {

    let years = credits.map(c => getDateToday(c.dateConstituted).slice(0, 4)).filter((c, i, a) => a.indexOf(c) === i)
    years = years.sort((a, b) => (a > b) ? -1 : 1)
    years = years.filter((c, i, a) => a.indexOf(c) === i)
    return years
  }
  
  onChangeSelectWeek = e => {
    const {credits, year} = this.state
    const {value} = e.target

    const weekSelected = getWeeks(this.sortDate(credits)[0].dateConstituted)[year][value]
    console.log(weekSelected)

    let weeksString = weekSelected.map(w => getDateToday(w))
    const creditsSelected = []


    for (var j = 0; j < weeksString.length; j++) {

      credits.forEach(c => {
        if (c.dateConstituted === weeksString[j]) {
          creditsSelected.push(c)
        }
      })
    }
    

    this.setState({
      weekSelected,
      creditsSelected
    })

  }


  render() {
    let { buttonFrecuency, buttonMonth, credits, creditsSelected, year, weekSelected } = this.state
    console.log(this.state.credits)


    const years = this.getYears(credits)


    // last mofied
    if (credits.length > 0 && this.state.show ) {
      console.log(credits)
      console.log(this.sortDate(credits)[0].dateConstituted)
    }
    



    return (
      <div className="container_list" >

        <Fragment>
          <div className="titles-list" >
            <span>Créditos Constituidos: { creditsSelected.length }</span>
            <span>Capital Invertido: { addPoints(this.getTotalSelected()) }</span>
          </div>
          <hr />
        </Fragment>

        <div id="btns-frecuncy" className="days-buttons" >

          { credits.length > 0 && this.state.show &&
            <button 
            name="Monthly" 
            onClick={this.filterFrecuency} 
            style={{background: buttonFrecuency === "Monthly" ? "green": "#273742"}} >Por Mes</button>
          }
          

          { credits.length > 0 && this.state.show &&
            <button 
            name="Weekly"
            onClick={this.filterFrecuency} 
            style={{background: buttonFrecuency === "Weekly" ? "green": "#273742"}} >Por Semana</button>
          }

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
                  (credits.some(c => (getMonth(c.dateConstituted) === 0) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Enero" 
                  onClick={this.filterMonth} 
                  style={{background: buttonMonth === "Enero" ? "green": "#273742"}} >Enero</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 1) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Febrero" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Febrero" ? "green": "#273742"}} >Febrero</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 2) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Marzo" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Marzo" ? "green": "#273742"}} >Marzo</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 3) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Abril" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Abril" ? "green": "#273742"}} >Abril</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 4) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Mayo" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Mayo" ? "green": "#273742"}} >Mayo</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 5) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Junio" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Junio" ? "green": "#273742"}} >Junio</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 6) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Julio" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Julio" ? "green": "#273742"}} >Julio</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 7) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Agosto" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Agosto" ? "green": "#273742"}} >Agosto</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 8) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Septiembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Septiembre" ? "green": "#273742"}} >Septiembre</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 9) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Octubre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Octubre" ? "green": "#273742"}} >Octubre</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 10) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Noviembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Noviembre" ? "green": "#273742"}} >Noviembre</button>
                }
                {
                  (credits.some(c => (getMonth(c.dateConstituted) === 11) && (getDateToday(c.dateConstituted).slice(0,4) === year))) &&
                  <button 
                  name="Diciembre" 
                  onClick={this.filterMonth}
                  style={{background: buttonMonth === "Diciembre" ? "green": "#273742"}} >Diciembre</button>
                }
              </div>
              
          </Fragment>

        }
        
        {
          (buttonFrecuency === "Weekly" && credits.length > 0) &&

          <div className="container-weeks-buttons" >
              
              <div className="weeks-buttons" >
                {
                  <table >
                    <tbody>
                      <tr>
                        <th style={{fontSize: '20px'}} colSpan="2">Semana
                          <select className="admin_update" onChange={this.onChangeSelectWeek} >
                          <option key={0} value=""></option>
                            { 
                              credits.length > 0 &&
                              getWeeks(this.sortDate(credits)[0].dateConstituted)[year].map((d, i) => {

                                let weeksString = d.map(w => getDateToday(w))
                                const creditsSelect = []

                                for (var j = 0; j < weeksString.length; j++) {

                                  credits.forEach(c => {
                                    if (c.dateConstituted === weeksString[j]) {
                                      creditsSelect.push(c)
                                    }
                                  })
                                }

                                if (creditsSelect.length > 0) {
                                  return (<option key={i+1} value={i}>{i+1}</option>)
                                }
                                
                              }).reverse()
                            }
                        </select>
                        </th>
                      </tr>
                      {
                        weekSelected.length > 0 &&
                        <tr>
                          <th>Comienza</th>
                          <th>Finaliza</th>
                        </tr>
                      }
                      
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
                {/* <button><i className="fas fa-arrow-alt-circle-right"></i></button> */}
              </div>

              {/* <hr /> */}

          </div>

          

        }
        {
          (creditsSelected.length > 0) &&
          <table>
            <tbody>
              <tr>
                <th style={{textAlign: 'center'}} className="mobile">#</th>
                <th>Nombre </th>
                <th>Monto</th>
                <th>Fecha de Constitución</th>
              </tr>
              
              {
                this.sortDate(creditsSelected).map((c, i) => {
                  return (
                    <tr key={i} >
                      <td style={{textAlign: 'center'}} className="mobile">{i + 1}</td>

                      <td id="name-3" >{c.user.name.split(" ").slice(0, 3).join(" ")}</td>
                      <td id="name-4" >{c.user.name}</td>

                      <td>{addPoints(c.amount)} </td>
                      <td id="name-3">{getDayWeek(c.dateConstituted).day}, {getDateToday(c.dateConstituted).slice(8, 10)} {getMonth(c.dateConstituted, true).slice(0,3)}</td>
                      <td id="name-4">{getDayWeek(c.dateConstituted).day}, {getDateToday(c.dateConstituted).slice(8, 10)} {getMonth(c.dateConstituted, true)}</td>
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
