import React from 'react'
import './style/MapItem.sass'
import { ReactComponent as Car } from './icons/car.svg'

export default ({lot}) => {

    /* let occupied;
    if(lot.status){
        occupied = false
    } */

    return <div className={`plates__plate--${lot.status}`}>
        <Car clasName="plates__car"/>
        <p className="plates__text">Plate Numer: <span className="plates__number">{lot.number}</span></p>
    </div>
}