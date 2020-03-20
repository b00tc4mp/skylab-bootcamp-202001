import React, { Component } from 'react';
import searchCrypto from '../../logic/search-crypto'
import Crypto from '../Crypto'
import CryptoChart from '../Chart/'
import './CryptoInfo.sass'


class CryptoInfo extends Component{

    state = { crypto: null, error: null }
    // const {  }
    // console.log(props.match.params.crypto , 888888)

    componentDidMount() {
        searchCrypto(this.props.match.params.crypto)
        .then(function(crypto){
          if(crypto){
            this.setState({crypto})
            console.log(crypto)
          }else{
              this.setState({error:'crypto not found'})

              setTimeout( () => {
                  this.props.history.push('/home') 
              }, 3000)
            }
        }.bind(this))
    }

    render() {
        const {
            state: {crypto, error},
            props: {match: {params: {crypto: cryptoQuery}}}
          } = this
        // console.log(cryptoQuery, 4847576575676576)

        return(
            <div className="crypto_info">
                {/* <p className="crypto__titleInfo">hola soy cryptoInfo</p> */}
                {crypto && <Crypto className="crypto_info__coin" cryptoInfo={crypto} full />}
                {error && <p>{error}</p>}

                <div>
                    <CryptoChart  cryptoQuery={cryptoQuery} />
                </div>
            </div>
        )
    }
}

export default CryptoInfo;