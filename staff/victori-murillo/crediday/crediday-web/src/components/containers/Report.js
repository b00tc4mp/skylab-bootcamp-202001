import React, { useState, useEffect, useContext } from 'react'
import { retrieveUsers, retrieveCredits, retrievePayments } from '../../logic'
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Context } from './ContextProvider'

export default () => {
  const classes = useStyles()
  const { token } = useContext(Context)
  const [state, setState] = useState({})

  useEffect(() => {
    try {
      (async () => {
        const { users } = await retrieveUsers(token)
        setState(state => ({ ...state, users }))

        const { credits } = await retrieveCredits(token)
        setState(state => ({ ...state, credits }))

        const { payments } = await retrievePayments(token)
        setState(state => ({ ...state, payments }))
      })()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  const { users, credits, payments } = state

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">

        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              <Typography fontWeight={500}>
                Reporte General
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Suma</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow key='clientes'>
            <TableCell>Clientes</TableCell>
            <TableCell align="right">{users && users.length - 1}</TableCell>
            <TableCell align="right">-</TableCell>
          </TableRow>

          <TableRow key='créditos'>
            <TableCell>Créditos</TableCell>
            <TableCell align="right">{credits && credits.length}</TableCell>
            <TableCell align="right">
              {credits && credits.length && credits.map(credit => credit.amount).reduce((a, c) => a + c)}
            </TableCell>
          </TableRow>

          <TableRow key='pagos'>
            <TableCell>Pagos</TableCell>
            <TableCell align="right">{payments && payments.length}</TableCell>
            <TableCell align="right">
              {payments && payments.length && payments.map(pay => pay.amount).reduce((a, c) => a + c)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={1}>Capital Invertido</TableCell>
            <TableCell align="right">
              {credits && credits.length && credits.map(credit => credit.amount).reduce((a, c) => a + c)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ganancia de Intereses</TableCell>
            <TableCell align="right">
              {payments && payments.length && payments.map(pay => pay.interest).reduce((a, c) => a + c)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Retorno sobre Inversión</TableCell>
            <TableCell align="right">
              {payments && payments.length &&
                (() => {
                  const profit = payments.map(pay => pay.interest).reduce((a, c) => a + c)
                  const capital = credits.map(credit => credit.amount).reduce((a, c) => a + c)
                  return `${((profit / capital) * 100)}%`
                })()
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
})