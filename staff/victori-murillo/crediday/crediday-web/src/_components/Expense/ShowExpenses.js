import React, { Component } from 'react'
import addPoints from '../../_utils/addPoints'
import './showExpense.css'
import axios from 'axios'


import transformDate from '../../_utils/transformDate'

export default class showExpenses extends Component {

  removeExpense = (id) => {

    axios.delete(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/expenses/${id}`)
    .then(res => window.location.reload())
    .catch(e => console.log(e))
  }

  render() {

    return (
      <div className="bg-modal-expense" style={{display:'flex'}} >
        <div className="modal-content-expense">

          <div className="nav-modal-expense" >
            <span style={{display: "flex", justifyContent: "space-around", width: '100%'}}>
              <span>Gastos</span>
            </span>
          </div>

          <h3 style={{marginBottom: "0", marginTop: "10px"}}>
            { transformDate(this.props.dateCollect, 'large') }
          </h3>

          <div className="close-expense" onClick={() => this.props.closeDisplay('displayShowExpenses')} >+</div>
          <br />
          <div>
            <table style={{borderTo: "2px solid grey"}} >
              <tbody>
                <tr className="showexpense-tr">
                  <th id="counterPayments" >#</th>
                  <th id="name-4">Hora</th>
                  <th>Monto</th>
                  <th>Detalle</th>

                  <th className="mobile">Cobrador</th>
                  <th className="mobile" >Borrar</th>
                </tr>
                {
                  this.props.expenses.map((expense, i) => {
                    console.log(expense)
                    return (
                      <tr className="showexpense-tr" key={i} >
                        <td id="counterPayments">{i+1}</td>
                        <td id="name-4">{expense.hour.slice(0, 5)} </td>
                        <td style={{textAlign: "center"}}>{addPoints(expense.amount)}</td>
                        <td>{expense.detail}</td>
                        <td className="mobile">{expense.user.username}</td>
                        <td className="mobile" >
                          <i 
                            style={{marginLeft: 10}}
                            className="remove-payment fas fa-trash-alt"
                            onClick={() => this.removeExpense(expense._id)}
                          >
                          </i>
                        </td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>

            <br />

            <div className="balance-to-cancel">
              <span> 
                ₡ {addPoints(this.props.totalExpenses)}
              </span>
            </div>
  
          </div>
        </div>

        <div className="div_fixed" onClick={() => this.props.closeDisplay('displayShowExpenses')}></div>
      </div>
    )
  }
}
