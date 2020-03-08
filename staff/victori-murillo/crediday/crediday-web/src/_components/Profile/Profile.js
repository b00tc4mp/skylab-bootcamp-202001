import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './profile.css'
import addPoints from  '../../_utils/addPoints'
import Payment from '../Payment/Payment'
import Update from '../Update/Update'
import Balance from '../Balance/Balance'

import Confirm from '../Confirm/Confirm'
import Alert from '../Alert/Alert'
import Credit from '../Credit/Credit'

import getInterestPending from '../../_utils/getInterestPending'

import {isAdmin, isCollector} from '../../_utils/isLoggedIn'
import UpdateCredit from '../Credit/UpdateCredit'


import getDayWeek from '../../_utils/getDayWeek'
import transformDate from '../../_utils/transformDate'

export default class Profile extends Component {

  state = {
    credits: [],
    creditSelected: false,

    displayName: false,
    displayPayment: false,
    displayBalance: false,
    displayUpdate: false,
    displayAlert: false,
    displayUpdateCredit: false,

    displayUploadPays: false,

    displayConfirmUser: false,
    displayConfirmCredit: false,

    displayCredit: false,

    interestPending: "0",
    moratoriumPending: "0",

    creditState: true,

    user: "",


  }

  componentDidMount = () => {

    if (this.props.location.state == null) {
      window.location.href = '/'
      localStorage.clear();

    } else {
      axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/${this.props.location.state.user._id}`)
      .then(result => {
        this.setState({user: result.data.data})
        return result.data.data._id
      })
      .then((id) => {
        axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/credits/user/${id}`)
        .then(result => {
          this.setState({credits: result.data.data, displayName: true})
        } )
      })
      .catch(e => console.log(e))

    }
  }
  


  openDisplay = (e, creditSelected, creditState) => {
    let creditActive = true
    if (creditState === 'cancel') creditActive = false

    this.setState({creditSelected, [e.target.name]: true, creditState: creditActive})

    if (creditSelected) {
      // const {interestPending, moratoriumPending} = getInterestPending(creditSelected, this.state.interestPending)
      const {interestPending, moratoriumPending} = getInterestPending(creditSelected)

      this.setState({interestPending, moratoriumPending})
      // getInterestPending(creditSelected, this.state.interestPending)
    } 
  }  
  
  closeDisplay = name => this.setState({creditSelected: false, [name]: false})
  
  redirect = () => this.props.history.push(`/`)

  openConfirmUser = () => {
    
    if (this.state.credits.length === 0) {
      this.setState({displayConfirmUser: true})

    } else {
      this.setState({displayAlert: true})
    }
    
  }
  
  openConfirmCredit = (creditId) => {
    this.setState({displayConfirmCredit: true, creditSelected: creditId})
  }

  closeConfirm = state => this.setState({[state]: false})

  removeUser = () => {
    axios.delete(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/${this.state.user._id}`)
    .then(() => {
      window.location.href = '/search'
    } )
    .catch(e => console.log(e))
  }

  removeCredit = () => {
    axios.delete(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/credits/${this.state.creditSelected}`)
    .then(() => window.location.reload() )
    .catch(e => console.log(e))
  }

  openUpdate = (e) => {
    this.setState({[e.target.name]: true})
  }

  toggleCredit = () => {
    this.setState({displayCredit: !this.state.displayCredit})
  }

  toggleUpdateCredit = (creditSelected) => {
    this.setState({displayUpdateCredit: !this.state.displayUpdateCredit, creditSelected})
  }

  toggleUploadPays = () => {
    this.setState({displayUploadPays: !this.state.displayUploadPays})
  }


  render() {

    return (
      <Fragment>
    
        <div className="container_profile" >

          {
            this.state.displayName &&
            <div className="container_edit_add">
              <button 
                className="update-client"
                name="displayUpdate"
                onClick={this.openDisplay}
              >
                {this.state.user.name} 
                
              </button>
              <button 
                onClick={this.toggleCredit}
                className="add-credit">
                <i className="fas fa-plus"></i>
              </button>

            </div>
          }

          
          
          
          {
            this.state.credits.filter(c => c.creditState).length > 0 &&
            <table style={{marginTop: 20, marginBottom: 10}}>
              <tbody>
                <tr>
                  <th>Créditos Activos</th>
                  <th>Pagar</th>
                  <th className="mobile-iphone5">Cancelación</th>
                </tr>

                { 
                  this.state.credits.filter(c => c.creditState).map((c, i) => {
                    console.log(c);
                    return (
                      <tr id="row_profile" style={{border: "2px solid #bbb"}} key={i + 1} >
                        {
                          isAdmin() &&
                          <td className="container-button-profile" >
                            <div style={{display: "flex"}}>
                              <button
                                onClick={(e) => this.openDisplay(e, c)}
                                name="displayBalance"
                                className="button_balance" >{addPoints(c.amount)}
                              </button>

                              <button className="button_edit_balance" onClick={() => this.toggleUpdateCredit(c)} >
                                <i className="fas fa-edit" ></i>
                              </button>
                            </div>
                            <hr />
                            <div style={{display: "flex"}}>
                              <button className="button_balance" id="profile_frecuency_button" >
                                {
                                  c.paymentFrecuency === "Daily" &&
                                  <p className="profile_frecuency" >Diario</p>
                                }
                                {
                                  c.paymentFrecuency === "Weekly" &&
                                  <p className="profile_frecuency" >Semanal: <span>{getDayWeek(c.dateConstituted).day}</span></p>
                                }
                                {
                                  c.paymentFrecuency === "TwiceMonthly" &&
                                  <p className="profile_frecuency" >Quincenal: <span>{c.firstTwiceMonthly} y {c.secondTwiceMonthly}</span></p>
                                }
                                {
                                  c.paymentFrecuency === "Monthly" &&
                                  <p className="profile_frecuency" >Mensual: <span>{c.dateConstituted.slice(8)}</span></p>
                                }
                              </button>

                              

                              {/* <button className="button_edit_balance" onClick={() => this.toggleUpdateCredit(c)} >
                                <i className="fas fa-edit" ></i>
                              </button> */}
                            </div>
                            
                          </td>
                        }
                        
                        {
                          isCollector() &&
                          <td className="container-button-profile" >
                            <div style={{display: "flex"}}>
                              <button
                                onClick={(e) => this.openDisplay(e, c)}
                                name="displayBalance"
                                className="button_balance" 
                                style={{borderRadius: "5px"}}
                                >{addPoints(c.amount)}
                              </button>
                            </div>

                            <hr />

                            <div style={{display: "flex"}}>
                              <button className="button_balance" id="profile_frecuency_button" >
                                {
                                  c.paymentFrecuency === "Daily" &&
                                  <p className="profile_frecuency" >Diario</p>
                                }
                                {
                                  c.paymentFrecuency === "Weekly" &&
                                  <p className="profile_frecuency" >Semanal: <span>{getDayWeek(c.dateConstituted).day}</span></p>
                                }
                                {
                                  c.paymentFrecuency === "TwiceMonthly" &&
                                  <p className="profile_frecuency" >Quincenal: <span>{c.firstTwiceMonthly} y {c.secondTwiceMonthly}</span></p>
                                }
                                {
                                  c.paymentFrecuency === "Monthly" &&
                                  <p className="profile_frecuency" >Mensual: <span>{c.dateConstituted.slice(8)}</span></p>
                                }
                              </button>

                            </div>
                            
                          </td>
                        }
                        
                        
                        <td className="container-button-profile" >
                          <button
                            onClick={(e) => this.openDisplay(e, c)}
                            name="displayPayment"
                            className="button_payment" >{addPoints(c.paymentInterest + c.paymentAmortize)}
                          </button>

                          {/* {
                            ( isAdmin() && (com === "5dd70ae8aedbd7000439013e" || com === "5d66113425d973732dcd2d73")  ) &&
                            <Hooks 
                              toggle={this.toggleUploadPays} 
                              userId={c.user._id}
                              creditId={c._id} 
                              companyId={c.company}
                            />
                          } */}

                          

                          {/* <form action="/action_page.php">
                            <input type="file" name="pic" accept="image/*" />
                            <input type="submit" value="Ingresar Pagos" />
                          </form> */}

                        </td>

                        <td className="container-button-profile mobile-iphone5" >
                          <button
                            onClick={(e) => this.openDisplay(e, c, 'cancel')}
                            name="displayPayment"
                            className="button_cancel" >
                              Cancelar
                            {/* {
                              addPoints(
                                c.amount + 
                                getPending(c).interestPending + 
                                getPending(c).moratoriumPending)
                            } */}
                            </button>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          }
        </div>
        

        {
          this.state.credits.filter(c => !c.creditState).length > 0 &&
          <table style={{marginTop: 20}} >
            <tbody>
              <tr>
                <th>Créditos Cancelados</th>
                <th>Fecha Constituido</th>
                <th>Fecha Cancelado</th>
                {
                  isAdmin() && <th className="mobile">Ojo!</th>
                }
                
              </tr>

              {
                this.state.credits.filter(c => !c.creditState).map((c, i) => {

                  return (
                    <tr key={i + 1}>
                      <td>
                        <button
                          onClick={(e) => this.openDisplay(e, c)}
                          name="displayBalance"
                          style={{borderRadius: 5}}
                          className="button_balance" >{addPoints(c.amount)}
                        </button>
                      </td>
                      <td id="name-3">{transformDate(c.dateConstituted, 'small')}</td>
                      <td id="name-4">{transformDate(c.dateConstituted, 'medium')}</td>

                      <td id="name-3">{transformDate(c.dateCancelled, 'small')}</td>
                      <td id="name-4">{transformDate(c.dateCancelled, 'medium')}</td>

                      {
                        isAdmin() &&
                        <td className="mobile">
                          <i 
                            style={{marginLeft: 10}}
                            className="remove-payment fas fa-trash-alt"
                            onClick={() => this.openConfirmCredit(c._id)}
                          >
                          </i>
                        </td>

                      }
                      
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        }
         

        {
          this.state.displayPayment &&
          <Payment
            credit={this.state.creditSelected}

            closeDisplay={this.closeDisplay}
            userId={this.state.user._id}

            redirect={this.redirect}

            paymentInterest={addPoints(this.state.creditSelected.paymentInterest)}
            paymentAmortize={addPoints(this.state.creditSelected.paymentAmortize)}
            moratoriumPending={addPoints(this.state.moratoriumPending)}
          
            // These last props are to Cancel Credit
            creditState={this.state.creditState}
            interestPending={addPoints(this.state.interestPending)}
            moratoriumPending={addPoints(this.state.moratoriumPending)}
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
        
        {
          this.state.displayUpdate &&
          <Update
            user={this.state.user}

            updateUserInfo={this.updateUserInfo}
            closeDisplay={this.closeDisplay}

            openConfirm={this.openConfirmUser} 
          />
        }
        
        {
          this.state.displayConfirmUser &&
          <Confirm
            close={this.closeConfirm}
            remove={this.removeUser}
            something="Cliente"
            message={`¿Estás seguro de eliminar a ${this.state.user.name}?`}
            state="displayConfirmUser"
          />
        }
        
        {
          this.state.displayConfirmCredit &&
          <Confirm
            close={this.closeConfirm}
            remove={this.removeCredit}
            something="Credito"
            message="Al eliminar este crédito también borrarás sus respectivos pagos y no podrás volver a tener acceso, estás seguro?"
            state="displayConfirmCredit"
          />
        }

        {
          this.state.displayAlert &&
          <Alert
            message="La única forma de eliminar a un cliente es primero eliminando sus créditos."
            close={this.closeConfirm}
            state="displayAlert"
           />
        }

        {
          this.state.displayCredit && 
          <Credit
            close={this.toggleCredit}
            userId={this.state.user._id}
          />
        }
        
        
        
        {
          this.state.displayUpdateCredit &&
          <UpdateCredit
            credit={this.state.creditSelected}

            close={this.toggleUpdateCredit}
          />
        }
        
        {
          this.state.displayUploadPays &&
          <Alert
            message="Pagos ingresados exitosamente!"
            close={this.toggleUploadPays}
            state="displayAlert"
           />
        }
      
      </Fragment>
      
      
    )
  }
}
