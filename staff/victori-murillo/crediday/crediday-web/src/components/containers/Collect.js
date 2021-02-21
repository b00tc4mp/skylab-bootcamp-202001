import React, { useState, useEffect, useContext } from 'react'
import MaterialTable from 'material-table'
import { retrievePayments } from '../../logic'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Context } from './ContextProvider'

export default () => {
  const classes = useStyles()
  const { token } = useContext(Context)
  const [state, setState] = useState({
    columns: [
      {
        title: 'Hora', field: 'hour', cellStyle: {
          width: 10,
          maxWidth: 10
        },
        headerStyle: {
          width: 10,
          maxWidth: 10
        }
      },
      {
        title: 'Nombre', field: 'name', cellStyle: {
          width: 10,
          maxWidth: 10
        },
        headerStyle: {
          width: 10,
          maxWidth: 10
        }
      },
      {
        title: 'Pago', field: 'amount', cellStyle: {
          width: 10,
          maxWidth: 10
        },
        headerStyle: {
          width: 10,
          maxWidth: 10
        }
      }
    ],
    data: [],
  })

  useEffect(() => {
    retrievePayments(token)
      .then(({ payments }) => {

        let pays = payments.map(pay => {
          const { firstName } = pay.credit.user
          const name = window.innerWidth < 700 ? firstName.split(' ')[0] : firstName

          return {
            ...pay,
            amount: pay.amount,
            name,
            hour: moment(pay.date).format('HH:MM')
          }
        })
        setState({ columns: state.columns, data: pays })
      })
      .catch(e => console.log(e))
  }, [])


  return (
    <MaterialTable
      title="Cobro"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data]
                  data[data.indexOf(oldData)] = newData
                  return { ...prevState, data }
                })
              }
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              setState(prevState => {
                const data = [...prevState.data]
                data.splice(data.indexOf(oldData), 1)
                return { ...prevState, data }
              })
            }, 600)
          }),
      }}
      options={{
        emptyRowsWhenPaging: false,
        pageSize: 10,
        pageSizeOptions: [10, 20, 30],
        actionsColumnIndex: -1
      }}
      detailPanel={rowData => {
        const row = rowData
        return (
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography fontWeight={500}>
                      Información de Pago Completa
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={row.date}>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">{moment(row.date).format('LLLL')}</TableCell>
                </TableRow>
                <TableRow key={row.credit.user.firstName}>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">{row.credit.user.firstName}</TableCell>
                </TableRow>
                <TableRow key={row.amount}>
                  <TableCell align="center">Monto del Crédito</TableCell>
                  <TableCell align="center">{row.credit.amount}</TableCell>
                </TableRow>
                <TableRow key={row.interest}>
                  <TableCell align="center">Interés</TableCell>
                  <TableCell align="center">{row.interest}</TableCell>
                </TableRow>
                <TableRow key={row.amortize}>
                  <TableCell align="center">Amortización</TableCell>
                  <TableCell align="center">{row.amortize}</TableCell>
                </TableRow>
                <TableRow key={row.moratorium}>
                  <TableCell align="center">Moratoria</TableCell>
                  <TableCell align="center">{row.moratorium}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )
      }}
    />
  )
}

const useStyles = makeStyles({
  table: {
    width: '100%',
    backgroundColor: '#eee'
  },
});