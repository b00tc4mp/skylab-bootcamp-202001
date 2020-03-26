import React, { useState, useEffect, useContext } from 'react'
import { registerUser, retrieveUsers } from '../logic'
import { Context } from './ContextProvider'
import { EditableTable } from './presentational'

export default () => {
  const [users, setUsers] = useState()
  const { token } = useContext(Context)

  useEffect(() => {
    retrieveUsers(token)
      .then(({ users }) => setUsers(users))
      .catch(error => console.log(error.message))
    console.log('be c')
  }, [token])

  const columns = [
    { title: 'Nombre', field: 'firstName' }
  ]

  return (
    <>
      {
        users &&
        <EditableTable
          onRowAdd={true}
          father='customers'
          actions={['add_circle', 'editable']}
          data={users}
          setData={setUsers}

          columns={columns}
          registerUser={registerUser}
        />
      }
    </>
  )
}