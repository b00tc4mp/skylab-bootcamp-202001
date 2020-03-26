import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import DatePicker from './DatePicker'
import SimpleSelect from './SimpleSelect'

import { Context } from '../ContextProvider'
import { registerCredit } from '../../logic'

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
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog({ open, handleClose, user }) {
  const classes = useStyles()
  const { token } = useContext(Context)

  const [selectedDate, setSelectedDate] = useState(new Date())

  const [paymentFrecuency, setPaymentFrecuency] = useState('')
  const [paymentByDefault, setPaymentByDefault] = useState('')

  const [amount, setAmount] = useState('')
  const [paymentInterest, setPaymentInterest] = useState('')
  const [paymentAmortize, setPaymentAmortize] = useState('')
  const [paymentMoratorium, setPaymentMoratorium] = useState('')

  const onSubmit = () => {
    handleClose()
    try {
      const body = {
        dateConstituted: selectedDate,
        amount, paymentFrecuency, paymentByDefault, paymentInterest, paymentAmortize, paymentMoratorium
      }

      registerCredit({ body, userId: user.id, token })
    } catch (error) {
      console.log(error)
    }
  }

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
              Nuevo Crédito
            </Typography>
            <Button autoFocus color="inherit" variant="outlined" onClick={onSubmit}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker
                text='Fecha de Constitución'
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </Grid>
            <Grid item xs={12}>
              <SimpleSelect
                paymentFrecuency={paymentFrecuency}
                setPaymentFrecuency={setPaymentFrecuency}

                paymentByDefault={paymentByDefault}
                setPaymentByDefault={setPaymentByDefault}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setAmount(e.target.value)}
                value={amount}
                variant="outlined"
                required
                fullWidth
                label="Monto del Crédito"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setPaymentInterest(e.target.value)}
                value={paymentInterest}
                variant="outlined"
                required
                fullWidth
                label="Pago de Interés"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setPaymentAmortize(e.target.value)}
                value={paymentAmortize}
                variant="outlined"
                required
                fullWidth
                label="Pago de Amortización"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setPaymentMoratorium(e.target.value)}
                value={paymentMoratorium}
                variant="outlined"
                required
                fullWidth
                label="Pago de Moratoria"
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  )
}