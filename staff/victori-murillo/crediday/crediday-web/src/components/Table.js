import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { Context } from './ContextProvider'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'right'
  }
})

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function DenseTable() {
  const { table, title } = useStyles()

  const { users } = useContext(Context)


  return (
    <TableContainer component={Paper}>
      <Table className={table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell className={title}>ID</TableCell>
            <TableCell className={title}>Fat&nbsp(g)</TableCell>
            <TableCell className={title}>Carbs&nbsp(g)</TableCell>
            <TableCell className={title}>Protein&nbsp(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map(user => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.firstName}
              </TableCell>
              <TableCell align="right">{user.id}</TableCell>
              {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}