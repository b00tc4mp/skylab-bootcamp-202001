import React, { useState, useEffect, useContext } from 'react'
import { registerUser } from '../logic'
import { Context } from './ContextProvider'
import { DenseTable, EditableTable } from './presentational'
import axios from 'axios'
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

export default () => {
  const [users, setUsers] = useState()
  const { token } = useContext(Context)

  useEffect(() => {
    axios.get(`${API_URL}/users-companies`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data.users))
      .catch(e => console.log(e))
  }, [])

  const columns = [
    { title: 'Nombre', field: 'firstName' },
    // { title: 'Apellido', field: 'lastName' },
  ]

  return (
    <>
      {
        // users && <EditableTable results={users} header={header} />
        users &&
        <EditableTable
          data={users} 
          setData={setUsers} 
          
          columns={columns} 
          registerUser={registerUser} 
        />
      }
    </>
  )
}