import React, { Component, Fragment } from 'react'
import './search.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {isAdmin, isCollector} from '../../_utils/isLoggedIn'

export default class Search extends Component {

  state = {
    users: this.props.users,
    foundUsers: [],
    query: '',
    username: 'vic',
    display: 'block',

    usersDontSee: []
  }

  componentDidMount = () => {
    if (isCollector()) {
      this.getUsersDontSee()
    }

    if (isAdmin()) {
      this.getUsers()
    }
    
  }

  getUsers = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/company/${localStorage.getItem("company")}`)
      .then(result => this.setState({users: result.data.data}))
      .then(() => {
        if (isCollector()) {
          let {users, usersDontSee} = this.state
          users = users.filter(u => !usersDontSee.some(d => d === u._id) )
          this.setState({users})
        }
      })
      .catch(e => console.log(e))
  }

  getUsersDontSee = () => {
    // axios.get(`http://localhost:3007/api/users/collector/${localStorage.getItem("token")}`)
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/collector/${localStorage.getItem("token")}`)
      .then(result => this.setState({usersDontSee: result.data.data.collectorsDontSee}))
      .then(() => this.getUsers())
      .catch(e => console.log(e))
  }

  onChangeInputSearch = e => {
    const query = e.target.value.toUpperCase()

    var foundUsers = this.state.users.filter(u => u.name.toUpperCase().includes(query))
    this.setState({foundUsers, query})
  }

  goProfile = username => {
    this.setState({username, display: 'none' })
  }

  render() {


    return (
      <Fragment>
        <div style={{display: this.state.display }}>

          {
            (this.state.users.length === 0) &&
            <Fragment>
              <br />
              <br />
              <div className="ui active centered inline loader"></div>
              <br />
            </Fragment>
          }

          {
            this.state.users.length > 0 &&
            <div className="container_search" >
            <span 
              className={this.state.query.length === 0 ? "search_off" : "search_on"} 
              >{this.state.query.length === 0 ? "Buscar Clientes" : "Buscando..."}</span>

            <input
              className="search" 
              type="text"
              onChange={this.onChangeInputSearch} 
              // value={this.state.query}
            />
          </div>
          }
          

          <ol>
            { this.state.query.length > 0 &&
              this.state.foundUsers.map((u, i) => {
                const name = u.name.split(' ').join('')

                return (
                  <li key={i} className="li_ordered" style={{border: '0px solid red'}}>
                    <Link to={{
                      pathname:`/profile/${name}`,
                      state: {
                        user: u
                      }
                      }} >
                      <span className="span_name_search" onClick={() => this.goProfile(u.name)} >{u.name}</span>
                    </Link>
                  </li>
                )
              })
            }
          </ol>

        </div>

        {/* {
          this.state.display === 'none' && <Profile user={this.state.username} />
        } */}
        
      </Fragment>
      
    )
  }
}
