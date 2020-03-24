import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export default function SimpleSelect({paymentFrecuency, setPaymentFrecuency, paymentByDefault, setPaymentByDefault}) {
  const classes = useStyles()

  const handleFrecuency = ({target: {value}}) => setPaymentFrecuency(value)
  const handlePaymentBy = ({target: {value}}) => setPaymentByDefault(value)

  return (
    <div>
      <Grid container justify='space-between'>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Pagos en</InputLabel>
          <Select
            value={paymentByDefault}
            onChange={handlePaymentBy}
            labelId="demo-simple-select-outlined-label"
            id="payment"
            label="Pagos en"
          >
            <MenuItem value='cash'>Efectivo</MenuItem>
            <MenuItem value='bn'>BN</MenuItem>
            <MenuItem value='bcr'>BCR</MenuItem>
            <MenuItem value='bac'>BAC</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Frecuencia</InputLabel>
          <Select
            value={paymentFrecuency}
            onChange={handleFrecuency}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Pagos en"
          >
            <MenuItem value='daily'>Diario</MenuItem>
            <MenuItem value='weekly'>Semanal</MenuItem>
            <MenuItem value='biweekly'>Quincenal</MenuItem>
            <MenuItem value='monthly'>Mensual</MenuItem>
          </Select>
        </FormControl>

      </Grid>
    </div>
  );
}