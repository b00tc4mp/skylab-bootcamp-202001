import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import './app.sass';
import Cryptos from '../Cryptos'
import Login from "../Login";
import Register from "../Register";
import CryptoInfo from "../CryptoInfo"
import CryptoHistory from "../Chart"

import TopBar from '../topBar'

class App extends Component {


  render(){

    return( 
      <HashRouter>
          {/* no hace falta utilizar  withRouter pk el componente router mete los props de routa histopy.... en componentes. */}
          <Route exact path='/' component={Login}  />
          <Route path='/register' component={Register} />
          <Route path='/home' component={Cryptos} />
          <Route path='/crypto/:crypto' component={CryptoInfo} />
          {/* <Route path='/chart/:crypto' component={CryptoHistory} /> */}

          <Route path='/topbar' component={TopBar} />


      </HashRouter>

    
    );
  }

}

export default App;


