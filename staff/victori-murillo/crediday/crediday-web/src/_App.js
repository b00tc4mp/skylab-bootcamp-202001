import React, { Component } from 'react'
import axios from 'axios'
import {Switch, Route} from 'react-router-dom'
import Navbar from './_components/Navbar/Navbar'
import UserList from './_components/UserList/UserList'
import User from './_components/User/User'

import CreditList from './_components/CreditList/CreditList'
import Search from './_components/Search/Search'
import Profile from './_components/Profile/Profile'
import CollectDay from './_components/CollectDay/CollectDay'
import Login from './_components/Login/Login'

import {isLoggedIn, isAdmin, isCollector} from './_utils/isLoggedIn'

import Customer from './_components/Customer/Customer'
import getDateToday from './_utils/getDateToday'
import {com} from './_utils/getRoutes'

import Sidebar from './_components/Sidebar/Sidebar'
import CreditsConst from './_components/CreditsConst/CreditsConst'
import CreditsCanceled from './_components/CreditsCanceled/CreditsCanceled'
import History from './_components/History/History'
import Box from './_components/Box/Box'
import CollectReport from './_components/CollectReport/CollectReport'
import Accounting from './_components/Accounting/Accounting'

export default class App extends Component {

  state = {
    users: [],
    credits: [],
    displaySidebar: false,

    paymentsFromDate: [],
    expensesFromDate: [],
    creditsFromDate: [],

    paysDone: false,
    expDone: false,
    credDone: false,

    usersDontSee: []
  }

  toggleSidebar = () => this.setState({displaySidebar: !this.state.displaySidebar})

  getCredits = () => {
    // console.log('getting Credits')
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/creditsall/company/${com}`)
    .then(res => {
      this.setState({credits: res.data.credits})

      if (isCollector()) {
        let credits = res.data.credits
        let {usersDontSee} = this.state

        credits = credits.filter(c => !usersDontSee.some(d => d === c.user._id))

        this.setState({credits})
      }


      if (isAdmin()) {
        this.setState({credits: res.data.credits})
      }
    })
    // .then(() => this.getCreditsAll())
    .catch(e => console.log(e))
  }

  getUsersDontSee = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/collector/${localStorage.getItem("token")}`)
      .then(result => this.setState({usersDontSee: result.data.data.collectorsDontSee}))
      .then(() => this.getCredits())
      .catch(e => console.log(e))
  }

  // getCreditsAll = () => {
  //   console.log("getting All")
  //   axios.get(`https://back-credits.herokuapp.com/api/creditsall/company/${com}`)
  //   .then(response => this.setState({credits: response.data.credits}))
  //   .catch(e => console.log(e))
  // }

  componentDidMount = () => {
    if (com && isCollector()) {
      this.getUsersDontSee()
    }

    if (com && isAdmin()) {
      this.getCredits()
    }


    // if (com) {
    //   this.getCredits()
    // } 

    if (window.location.protocol !== 'https:' && window.location.host !== "localhost:3000") {
      window.location = 'https://www.crediday.com/'
      return
    }

  }

  logout = () => {
    window.location.href = '/'
    localStorage.clear();
  }

  componentDidUpdate = () => {

    if (localStorage.getItem("date") !== getDateToday()) {
      this.logout()
    }

    if (window.location.protocol !== 'https:' && window.location.host !== "localhost:3000") {
      window.location = 'https://www.crediday.com/'
      return
    }

  }


  reload = () => this.setState({})

  render() {
    const {protocol, host} = window.location

    return (
      <div style={(protocol === 'https:' || host === "localhost:3000" ) ? {display: "block"}: {display: "none"}} >
        
        { 
          ( isAdmin() || isCollector() ) && 
          <Navbar toggleSidebar={this.toggleSidebar} logout={this.logout} /> 
        }

        {
          // (( isAdmin() ) && this.state.displaySidebar)  && 
          isAdmin() && 
          <Sidebar 
            toggleSidebar={this.toggleSidebar}
            logout={this.logout}
            displaySidebar={this.state.displaySidebar}
          />
        }

        {
          !isLoggedIn() && <Login />
        }
        
        
        <Switch>

          {
            (isAdmin() || isCollector()) && 
            <Route exact path="/" component={CollectDay} />
          }
          
          {
            (isAdmin() || isCollector()) &&
            <Route 
            path="/CreditList"
            render={props => <CreditList {...props}
            credits={this.state.credits}
            />}
          />
          }
          
          {
            ( isAdmin() || isCollector() ) &&
            <Route 
            path="/search" 
            render={props => <Search {...props} 
            users={this.state.users}
            /> }
          />
          }
          
          {
            isAdmin() &&
            <Route 
            path="/list/users"
            render={props => <UserList {...props}
            users={this.state.users}
            getCredits={this.getCredits}
            />}
          />
          }

          {
            isAdmin() &&
            <Route path="/user"
            render={props => <User {...props}
            getUsers={this.getUsers}
            /> }
          />
          }
          
          {
            ( isAdmin() ) && <Route path="/contabilidad" component={Accounting} />
          }

          

          {
            ( isAdmin() || isCollector() ) && <Route path="/profile/:handle" component={Profile} />
          }
          
          
          {
            isAdmin() && 
            <Route 
              path="/collected"  
              render={props => <CollectReport {...props}
              payments={this.state.payments}
              />}
            />
          }
          
          {
            isAdmin() && 
            <Route 
              path="/constituted"  
              render={props => <CreditsConst {...props}
              credits={this.state.credits}
              />}
            />
          }

          {/* Canceled Component */}

          {
            isAdmin() && 
            <Route 
              path="/canceled" 
              render={props => <CreditsCanceled {...props}
              credits={this.state.credits.filter(c => !c.creditState)}
              />}
            />
          }
          
          {
            isAdmin() && 
            <Route path="/box" component={Box} />
          }  
          
          {
            isAdmin() && 
            <Route path="/historial" component={History} />
          }   
          
          
          { (!isAdmin() && isLoggedIn()) && !isCollector() && <Customer exact path="/" component={Customer} />}

        </Switch>

        

      </div>
    )
  }
}