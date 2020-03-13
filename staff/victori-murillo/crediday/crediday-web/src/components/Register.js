import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import { makeStyles } from '@material-ui/core/styles'
import { Copyright } from '.'
import { useHistory } from "react-router-dom"

import { Alert } from '@material-ui/lab'
import { registerUser } from '../logic'


export default () => {
  const classes = useStyles()
  const history = useHistory()

  const [feedback, setFeedback] = useState()
  const [error, setError] = useState()

  useEffect(() => {

    if (feedback) setTimeout(() => history.push('login'), 2000)
    
  }, [feedback])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const json = {
        companyName: e.target.company.value,
        username: e.target.username.value,
        password: e.target.password.value,
        passwordValidation: e.target.passwordValidation.value
      }

      const message = await registerUser(json)

      setFeedback(message)

    } catch (error) {
      setError(error.message)
      setFeedback(undefined)
  }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessCenterIcon />
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
                label="Quiero recibir notificaciones de actualizaciones."
              // label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>

          {feedback && <Alert severity="success">Compañia registrada!</Alert>}
          {error && !feedback && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registro
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
    marginTop: theme.spacing(8),
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