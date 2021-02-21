import React, { useState, useContext, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { Types } from 'mongoose'

import { Copyright } from '.'
import { useHistory } from "react-router-dom"
import { Context } from './ContextProvider'

import login from '../../logic/login'
import { confirmCompany } from '../../logic'
import { Loader } from '../presentational'

export default (props) => {
  const classes = useStyles()
  const history = useHistory()

  const [feedback, setFeedback] = useState()
  const [error, setError] = useState()
  const { setToken } = useContext(Context)

  useEffect(() => {
    history.push('/login')

    let _companyId
    const { match } = props

    if (match) _companyId = match.params.companyId

    if (Types.ObjectId.isValid(_companyId)) {
      try {
        confirmCompany(_companyId)
          .then(() => {
            setFeedback('confirmation')
          })
          .catch(console.log)
      } catch (error) {
        console.log(error.mesage)
      }
    }

  }, [])


  async function handleLogin(e) {
    e.preventDefault()
    setFeedback('loader')
    setError(undefined)

    const json = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    try {
      const { token } = await login(json)
      sessionStorage.session = token
      localStorage.lastSession = new Date()

      setToken(token)

      setTimeout(() => {
        history.push('/drawer')
      }, 500)


    } catch (error) {
      setError(error.message)
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

          {feedback === 'confirmation' && <Alert severity="success">Compañia registrada exitosamente!</Alert>}

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

            {error && <Alert severity="error">{error}</Alert>}
            {feedback === 'loader' && !error && <Loader />}


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Inicia Sesión
          </Button>
            <Grid container >
              <Grid item xs={6}>
                <Link style={{ cursor: 'pointer' }} onClick={() => history.push('/password')} variant="body2">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid style={{ textAlign: 'right' }} item xs={6}>
                <Link style={{ cursor: 'pointer' }} ml={4} onClick={() => history.push('/home')} variant="body2">
                  No tienes cuenta?
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>
      <Box my={5}>
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