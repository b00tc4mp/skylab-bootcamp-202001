import React, { useState, useEffect, useContext } from 'react'
import { registerUser } from '../logic'
import { Context } from './ContextProvider'
import { DenseTable, EditableTable } from './presentational'
import axios from 'axios'
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

export default () => {
  const [credits, setCredits] = useState()
  const { token } = useContext(Context)

  useEffect(() => {
    axios.get(`${API_URL}/credits/company`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCredits(res.data.credits))
      .catch(e => console.log(e))
  }, [])

  const columns = [
    { title: 'Monto', field: 'amount' },
    // { title: 'Apellido', field: 'lastName' },
  ]

  return (
    <>
      {
        // users && <EditableTable results={users} header={header} />
        credits &&
        <EditableTable
          data={credits} 
          setData={setCredits} 
          
          columns={columns} 
          registerUser={registerUser} 
        />
      }
    </>
  )
}