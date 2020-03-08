import React, { Component, Fragment } from 'react'
import axios from 'axios'
import '../Profile/profile.css'
import './customer.css'
import addPoints from  '../../_utils/addPoints'
// import Payment from '../Payment/Payment'
import UpdatePass from '../Update/UpdatePass'
import Balance from '../Balance/Balance'
import {ht, app, ipa, slash, dot, script, com} from '../../_utils/getRoutes'
import getNumberWeeks from '../../_utils/getNumberWeeks'
import getNumberMonths from '../../_utils/getNumberMonths'
import getNumberOf_1_16 from '../../_utils/getNumberOf_1_16'

// import getPending from '../../utils/getPending'



export default class Profile extends Component {

  state = {
    credits: false,
    creditSelected: false,

    displayName: false,
    displayBalance: false,
    displayUpdate: false,

    interestPending: "0",
    moratoriumPending: "0",

    creditState: true,

    user: {}
  }

  // componentDidMount = () => {
  //   var _0x3c82=['get','back','credits','com','users','token','then','setState','data','user','getItem','catch','log'];(function(_0x4b830f,_0x369e93){var _0x1d2b1c=function(_0x3ac8d7){while(--_0x3ac8d7){_0x4b830f['push'](_0x4b830f['shift']());}};_0x1d2b1c(++_0x369e93);}(_0x3c82,0x12b));var _0xa087=function(_0x1494c9,_0x40fcdd){_0x1494c9=_0x1494c9-0x0;var _0x27832d=_0x3c82[_0x1494c9];return _0x27832d;};axios[_0xa087('0x0')](ht+':'+slash+slash+_0xa087('0x1')+script+_0xa087('0x2')+dot+app+dot+_0xa087('0x3')+ipa+slash+_0xa087('0x4')+slash+localStorage['getItem'](_0xa087('0x5')))[_0xa087('0x6')](_0x16d43f=>{this[_0xa087('0x7')]({'user':_0x16d43f[_0xa087('0x8')][_0xa087('0x8')]});})[_0xa087('0x6')](()=>{axios[_0xa087('0x0')](ht+':'+slash+slash+_0xa087('0x1')+script+_0xa087('0x2')+dot+app+dot+_0xa087('0x3')+ipa+slash+'credits'+slash+_0xa087('0x9')+slash+localStorage[_0xa087('0xa')](_0xa087('0x5')))[_0xa087('0x6')](_0x49baf4=>{this[_0xa087('0x7')]({'credits':_0x49baf4[_0xa087('0x8')][_0xa087('0x8')],'displayName':!![]});});})[_0xa087('0xb')](_0x513741=>console[_0xa087('0xc')](_0x513741));
  // }
  componentDidMount = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/${localStorage.getItem("token")}`)
    .then(result =>{
      this.setState({user: result.data.data})
    })
    .then(() => {
      axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/credits/user/${localStorage.getItem("token")}`)
      .then(result =>{
        this.setState({credits: result.data.data, displayName: true})
      })
    })
    .catch(e => console.log(e))
}


  openDisplay = (e, creditSelected, creditState) => {
    let creditActive = true
    if (creditState === 'cancel') creditActive = false

    this.setState({creditSelected, [e.target.name]: true, creditState: creditActive})

    if (creditSelected) this.getInterestPending(creditSelected)
  }  
  
  closeDisplay = name => this.setState({creditSelected: false, [name]: false})
  
  redirect = () => this.props.history.push(`/`)


  getInterestPending = (credit) => {

    const {paymentInterest, paymentFrecuency, dateConstituted, dateCancelled} = credit

    let interestPaid = 0
    let interestTotal = 0

    switch(paymentFrecuency) {
      case "Weekly": interestTotal = paymentInterest * getNumberWeeks(dateConstituted, dateCancelled)
      break;

      case "TwiceMonthly": interestTotal = paymentInterest * getNumberOf_1_16(dateConstituted, dateCancelled)
      break;

      case "Monthly": interestTotal = paymentInterest * getNumberMonths(dateConstituted, dateCancelled)
      break;

      default: interestTotal = paymentInterest * getNumberWeeks(dateConstituted, dateCancelled)
    }

    if (credit.payments.length > 0) {
      interestPaid = credit.payments.map(p => p.interestPayment).reduce((acc, curr) => acc + curr)
    }

      const interestPending = interestTotal - interestPaid

      if(this.state.interestPending !== interestPending) {
        this.setState({interestPending, moratoriumPending: this.computeMoratorium(interestPending, credit)})
      }

  }

  computeMoratorium = (interestPending, credit) => {
    const {paymentInterest, amount} = credit

    const moratoriumPending = amount > 50000 ? 3000 : 2500

    const result = (interestPending > paymentInterest ? moratoriumPending : 0)
    return result
  }

  removeToken = () => {
    window.location.href = '/'
    localStorage.clear();
  }


  render() {

    if (!localStorage.getItem("token")) {
      this.removeToken()
    }

    return (
      <Fragment>

        
    
        <div className="container_profile" style={{marginTop: 0}} >

        {
          this.state.displayName &&
          <Fragment>
            <div className="cus_navbar" >
              <div className="close-customer" onClick={this.removeToken} >+</div>
            </div>

            <br />

            <div>
              <button
                onClick={(e) => this.openDisplay(e)}
                name="displayUpdate"
                className="profile_name"
              >
              {this.state.user.name}
              </button>
            </div>

            <div>
              <button
                onClick={(e) => this.openDisplay(e)}
                name="displayUpdate"
                className="profile_edit fas fa-edit"
              >
              </button>
            </div>

            
            
            <br />
          </Fragment>
        }

          
          { this.state.credits.length > 0 &&

          <table>
            <tbody>
              <tr>
                <th style={{textAlign:"center"}} >Principal</th>
              </tr>

              
                {this.state.credits.filter(c => c.creditState).map((c, i) => {
                  return (
                    <tr key={i + 1} >
                      <td 
                        style={{textAlign:"center"}} 
                        className="container-button-profile" >

                        <button
                          onClick={(e) => this.openDisplay(e, c)}
                          name="displayBalance"
                          style={{borderRadius: 5}}
                          className="button_balance" >{addPoints(c.amount)}
                        </button>

                        <div>
                          <button
                            onClick={(e) => this.openDisplay(e, c)}
                            name="displayBalance"
                            className="profile_edit fas fa-file-invoice-dollar" >
                          </button>
                        </div>

                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
              }


            

        </div>

        <br />
        <br />


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
          <UpdatePass
            name={this.state.user.name}
            closeDisplay={this.closeDisplay}
            userId={this.state.user._id}
          />
        }
      
      </Fragment>
      
      
    )
  }
}
