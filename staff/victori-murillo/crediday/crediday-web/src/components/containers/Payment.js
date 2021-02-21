import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button, TextField, Grid, Dialog, MenuItem, InputLabel, AppBar, Toolbar,
  IconButton, Typography, Slide, Select, FormControl
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import DatePicker from '../presentational/DatePicker'
import { registerPayment } from '../../logic'
import { Context } from './ContextProvider'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(0),
    flex: 1,
  },
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid red'
  },
  input: {
    fontSize: '30px'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    textTransform: "capitalize",
    fontSize: 18,
    cursor: 'not-allowed'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default ({ open, handleClose, credit }) => {
  const classes = useStyles()
  const { token } = useContext(Context)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [paymentBy, setPaymentBy] = useState('')
  const [interest, setInterest] = useState('')
  const [amortize, setAmortize] = useState('')
  const [moratorium, setMoratorium] = useState('0')

  const onSubmit = () => {
    handleClose()
    try {
      const body = {
        date: selectedDate,
        paymentBy,
        interest,
        amortize,
        moratorium
      }
      registerPayment({ body, creditId: credit.id, token })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setInterest(credit.paymentInterest)
    setAmortize(credit.paymentAmortize)
    setPaymentBy(credit.paymentByDefault)
  }, [credit])

  return (
    <div>
      <Dialog
        fullScreen={window.innerWidth < 768 ? true : false}
        fullWidth={true}
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Pago
            </Typography>
            <Button autoFocus color="inherit" variant="outlined" onClick={onSubmit}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify='center'>
                <Button className={classes.button} variant="contained" color="primary">
                  {credit.firstName + " " + credit.firstName2}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                text='Fecha de Pago'
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setInterest(e.target.value)}
                value={interest}
                variant="outlined"
                required
                fullWidth
                label="Interés"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setAmortize(e.target.value)}
                value={amortize}
                variant="outlined"
                required
                fullWidth
                label="Amortización"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setMoratorium(e.target.value)}
                value={moratorium}
                variant="outlined"
                required
                fullWidth
                label="Moratoria"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Pago en</InputLabel>
                <Select
                  value={paymentBy}
                  onChange={e => setPaymentBy(e.target.value)}
                  labelId="demo-simple-select-outlined-label"
                  id="payment"
                  label="Pago en"
                >
                  <MenuItem value='cash'>Efectivo</MenuItem>
                  <MenuItem value='bn'>Banco Nacional</MenuItem>
                  <MenuItem value='bcr'>Banco de Costa Rica</MenuItem>
                  <MenuItem value='bac'>BAC San José</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  )
}