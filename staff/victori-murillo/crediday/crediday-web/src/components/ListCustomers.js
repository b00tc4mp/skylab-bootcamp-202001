import React, { useContext, useEffect } from 'react'
import { Context } from './ContextProvider'
import { Table } from './presentational'

export default () => {
  const { users, setUsers } = useContext(Context)

  useEffect(() => {

  }, [])

  return (
    <Table />
  )
}