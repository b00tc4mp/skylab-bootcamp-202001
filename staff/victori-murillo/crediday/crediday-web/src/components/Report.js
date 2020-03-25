import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, Grid, Typography } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
  },
})

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const fetchPayments = () => {
  // axios.get(url).then(({data}) => )
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Grid style={{paddingTop: 10, paddingLeft: 15}} container justify='flex-start'>
        <Typography variant="h6" >
          Reporte Mensual
        </Typography>
      </Grid>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Cobrado</TableCell>
            <TableCell align="left">Int</TableCell>
            <TableCell align="left">Mora</TableCell>
            <TableCell align="left">Amort</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align="left">
                01-Mar-2020
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}