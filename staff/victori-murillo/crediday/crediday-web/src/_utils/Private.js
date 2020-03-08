import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from './isLoggedIn'

import axios from 'axios'

export default class Private extends Component {

  state = {
    user: {}
  }

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      axios.get(`https://back-credits.herokuapp.com/api/users/${isLoggedIn()}`)
      .then(result => this.setState({user: result.data.data}))
      .catch(e => console.log(e))

    } else {
      window.location.href = '/'
      localStorage.clear();
    }
  }

  render() {
    console.log(this.state.user)
    const {path, exact, component} = this.props
    const Private = component

    return (
      <Route path={path} exact={exact} component={(props) => {
        
        if ( isLoggedIn() ) {
          return <Private {...props} user={this.state.user} />
        }

        return <Redirect to={`/`} />

      }} />

    )
  }
}