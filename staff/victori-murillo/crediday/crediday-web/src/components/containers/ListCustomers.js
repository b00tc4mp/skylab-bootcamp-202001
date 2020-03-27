import React, { useState, useEffect, useContext } from 'react'
import { registerUser, retrieveUsers } from '../../logic'
import { Context } from './ContextProvider'
import { EditableTable } from '../presentational'

export default () => {
  const [users, setUsers] = useState()
  const [update, setUpdate] = useState(false)
  const { token } = useContext(Context)

  useEffect(() => {
    retrieveUsers(token)
      .then(({ users }) => setUsers(users))
      .catch(error => console.log(error.message))
  }, [token, update])

  const columns = [
    { title: 'Nombre', field: 'firstName' }
  ]

  return (
    <>
      {
        users &&
        <EditableTable
          onRowAdd={true}
          title='Clientes'
          actions={['add_circle', 'editable']}
          data={users}
          setData={setUsers}
          setUpdate={setUpdate}
          columns={columns}
          registerUser={registerUser}
        />
      }
    </>
  )
}