import React, { Component } from 'react';
import getCryptos from '../../logic/get-cryptos'
import SearchCrypto from '../SearchCrypto'
import Crypto from '../Crypto'
import searchCrypto from '../../logic/search-crypto'
import './cryptos.sass'

class Cryptos extends Component {

    state = {cryptos: [], error: null }

    componentDidMount(){
      getCryptos()
      .then(function(cryptos){
        //this me da undefined por eso hago el bind // usar arrow function
        // console.log(this)
        this.setState({cryptos})
      }.bind(this))
    }

    handleSearch = (query) => {
      searchCrypto(query)
      .then(function(crypto){
        if(crypto){
          this.setState({cryptos: [crypto]})
          console.log(crypto)
        }else{
          this.setState({error:'crypto not found'})
        }
      }.bind(this))
    }

  render() {
    //3ndi history
    const {
      state: {cryptos, error},
      handleSearch
    } = this
    
    console.log(this.cryptos, 555555)
    return (
      <div className="cryptos_container">
          <header className="crypto_container__header">
            <SearchCrypto handleSearch={handleSearch}/>
          </header>
          {error && <p>{error}</p>}
          {!cryptos.length && <p>no hay datos</p>}
          <div className="cryptos_container__cryptos">
            {cryptos.length && cryptos.map(crypto => <Crypto showButtonInfo cryptoInfo={crypto} />)}
          </div>

        </div>
    );
  }
}

export default Cryptos;
