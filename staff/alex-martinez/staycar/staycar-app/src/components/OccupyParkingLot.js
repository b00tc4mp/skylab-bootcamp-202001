import React, { useState, useEffect } from 'react'
import './style/EntryVehicle.sass'
import Feedback from './Feedback'
import { retrieveParking } from '../logic'

export default function() {

    const [ lots, setLots ] = useState([])

   const handleRetrieveLots = () => {

        return (async() => {

            const parking = await retrieveParking()
            let lot = []

            parking.lots.forEach((res) => {
                lot.push(res)
            })
            setLots(lot)

        })()
   }

   useEffect(() => {

    handleRetrieveLots()

   },[])

   return 
}