import React, { useState, useEffect, useContext } from 'react'
import { registerUser, retrieveCredits } from '../../logic'
import { Context } from './ContextProvider'
import { EditableTable } from '../presentational'

export default () => {
  const [credits, setCredits] = useState()
  const { token } = useContext(Context)

  useEffect(() => {
    retrieveCredits(token)
      .then(({ credits }) => {
        credits.forEach(credit => {
          if (credit.firstName.split(" ").length > 1) {
            let names = credit.firstName.split(" ")
            credit.firstName = names[0]
            names.shift()
            credit.firstName2 = names.join(" ")
          }
        })
        setCredits(credits)
      })
      .catch(error => console.log(error.message))
  }, [])

  const columns = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Pago', field: 'paymentDefault' },
    { title: 'Monto', field: 'amount' }
  ]

  return (
    <>
      {
        credits &&
        <EditableTable
          title='Créditos'
          actions={['add_circle']}
          data={credits}
          setData={setCredits}
          columns={columns}
          registerUser={registerUser}
        />
      }
    </>
  )
}