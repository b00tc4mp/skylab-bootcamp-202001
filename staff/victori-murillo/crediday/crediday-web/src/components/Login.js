import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core'
import {LockOutlined as LockOutlinedIcon} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

import { Copyright } from '.'
import { useHistory } from "react-router-dom"
import { Context } from './ContextProvider'

import login from '../logic/login'

export default () => {
  const classes = useStyles()
  const history = useHistory()

  const [feedback, setFeedBack] = useState()
  const { setToken } = useContext(Context)


  async function handleLogin(e) {
    e.preventDefault()

    const json = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    try {
      const token = await login(json)
      sessionStorage.session = token
      localStorage.lastSession = new Date()

      setToken(token)
      history.push('/drawer')
      

    } catch (error) {
      console.log(error.message)
      setFeedBack(true)
    }

  }

  const divStyle = {
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }

  return (
    <div style={divStyle}>
      <Container component="main" maxWidth="xs">

        <CssBaseline />

        <div className={classes.paper} >

          <Avatar className={classes.avatar} onClick={() => history.push('/home')}  >
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Iniciar Sesión
        </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // id="username"
              label="Nombre de usuario"
              name="username"
              autoFocus
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              // id="password"
              autoComplete="off"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />

            {feedback === false && <Alert severity="error">Credenciales incorrectas!</Alert>}
            {feedback === true && <Alert severity="success">Inicio de sesión exitoso!</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Inicia Sesión
          </Button>
            <Grid container>
              <Grid item xs>
                <Link style={{ cursor: 'pointer' }} onClick={() => history.push('/')} variant="body2">
                  Olvidaste tu contraseña?
              </Link>
              </Grid>
              <Grid item xs>
                <Link style={{ cursor: 'pointer' }} onClick={() => history.push('/home')} variant="body2">
                  No tienes cuenta? Registrate
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>
      <Box mb={5}>
        <Copyright path='/home' color="#3f51b5" />
      </Box>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
    color: 'white'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5)
  },
}))