import React from 'react'
import axios from 'axios'
import addPoints from '../../utils/addPoints'
import {getLastDays, getCollects} from '../../utils/getCollect'

export default class Daily extends React.Component {
  state = {
    payments: [],
    collects: []
  }

  componentDidMount = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/payments/company/${localStorage.getItem("company")}`)
      .then(res => this.setState({ payments: res.data.data }) )
      .then(() => this.createCollects())
      .catch(err => console.log(err))
  }

  createCollects = () => {
    const {payments} = this.state
    // console.log(getLastDays(payments))
    const collects = getCollects(payments)

    const arrayCollects = getLastDays(payments).map(date => {
      return {
        date: date,
        collected: collects[date]
      }
    })
    // console.log(arrayCollects)
    this.setState({collects: arrayCollects})
  }


  render () {
    return (
      <div className="container_list" >
        <table>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Date</th>
              <th style={{textAlign:'center' }}>Cobro</th>
            </tr>
          </thead>

          <tbody>
          {
            this.state.collects.map((c, i) => {
              return (
                <tr key={i} >
                  {/* <td>{i+1}</td> */}
                  <td>{c.date}</td>
                  <td className="column_amount" >{addPoints(c.collected)}</td>
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