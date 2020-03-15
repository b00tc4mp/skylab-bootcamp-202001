import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import { makeStyles } from '@material-ui/core/styles'
import { Copyright } from '.'
import { useHistory } from "react-router-dom"

import { Alert } from '@material-ui/lab'
import { registerCompany } from '../logic'
import { Loader } from './presentational'

export default () => {
  const classes = useStyles()
  const history = useHistory()

  const [error, setError] = useState()
  const [view, setView] = useState()
  const [email, setEmail] = useState()

  // useEffect(() => {

  //   if (feedback) setTimeout(() => history.push('login'), 3000)

  // }, [feedback])

  const handleSubmit = async (e) => {
    try {
      
      e.preventDefault()
      setView('loader')
      setError(undefined)

      const json = {
        companyName: e.target.company.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordValidation: e.target.passwordValidation.value
      }

      const email = await registerCompany(json)
      setEmail(email)

    } catch (error) {
      setError(error.message)
      setEmail(undefined)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmojiTransportationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar Compañia
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Nombre de Compañia"
                name="company"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordValidation"
                label="Confirmar contraseña"
                type="password"
                id="passwordValidation"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Quiero recibir actualizaciones a mi correo."
              // label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>

          { view === "loader" && !email && !error && <Loader /> }

          {
            email &&
            <Alert severity="success">
              <Link href="https://www.gmail.com" target="_blank" variant="body2" onClick={() => history.push('login')}>
              Confirmar correo: {email.toLowerCase()}
              </Link>
            </Alert>
          }

          { error && <Alert severity='error'>{error}</Alert>}
          

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Crear mi cuenta
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => history.push('/login')} variant="body2" style={{ cursor: 'pointer' }} >
                Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright path="/home" />
      </Box>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
  },
}))