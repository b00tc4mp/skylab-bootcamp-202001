import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles({
  table: {
    minWidth: '100%'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'right'
  }
})

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ]

export default function DenseTable({ results }) {
  const { table, title } = useStyles()

  const paintHead = headers =>
    headers.map((head, index) =>
      !index
        ? <TableCell key={index} style={{ fontWeight: 'bold' }}>{head}</TableCell>
        : <TableCell key={index} className={title}>{head}</TableCell>
    )

  const paintBody = (body, keys) =>
    body.map((user, index) =>
      <TableRow key={index}>
        {
          keys.map((key, index) =>
            !index
              ? <TableCell key={index} component="th" scope="row">{user[key]}</TableCell>
              : <TableCell key={index} align="right">{user[key]}</TableCell>
          )
        }
      </TableRow>
    )

  let keys = Object.keys(results[0])
  console.log(results)

  return (
    <TableContainer component={Paper} style={{ width: '100%' }}>
      <Table className={table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {paintHead(keys)}
          </TableRow>
        </TableHead>
        <TableBody>
          {paintBody(results, keys)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}