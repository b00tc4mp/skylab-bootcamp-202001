import React from 'react';
import {withRouter} from 'react-router-dom'
import './crypto.sass';


function Crypto(props){
    
    const {cryptoInfo: {priceUsd, name, changePercent24Hr, symbol, id}, full, showButtonInfo} = props

    console.log(props)
    
    let divClassName = ''
    // modificador 
    if(full){
        divClassName = 'crypto--full'
    }

    return(            // block y modificador si existe la prop full
        <div className={`crypto ${divClassName}`}>

            <img src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}  />
            <h1 className="crypto__title">{name}</h1>
            <p className="crypto__state">Estado: {parseFloat(changePercent24Hr).toFixed(2) }</p>
            <p className="crypto__price">Precio: {parseFloat(priceUsd).toFixed(2)} $ </p>

            <div className="crypto__buttons">
                { showButtonInfo && <button  className="crypto__buttons__button1" onClick={()=> props.history.push(`/crypto/${id.toLowerCase()}`)}><span>More</span></button>}
                <button className="crypto__buttons__button2" onClick={()=> props.history.push(`/chart/${id.toLowerCase()}`)}><span>Comprar</span></button>
            </div>

            <div className="news">

            </div>
        </div>
    )
}

// cuando le doy click a more me lleva a una nueva ruta que es crypto/nameMoneda y
// el nombre de la monida es dinameco puede ser tron o bitcoi... y me carga otra ruta 
// en el componente me busco el nombre de la moneda props.match.{crypto: btn} y cargo el 
// componente crypto info que cuando se monta en el componentedidmount me busca la crypto que tengo en la url 
//y me setea el estado , en caso exeto me muesta y si no impremo error y rederecciono al /home

export default withRouter(Crypto);