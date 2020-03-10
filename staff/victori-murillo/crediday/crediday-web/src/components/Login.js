import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import Alert from '@material-ui/core/Alert'
import { Alert } from '@material-ui/lab'
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Copyright } from '.'
import { useHistory } from "react-router-dom"
import axios from 'axios'

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

let logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'
// logo = 'https://cdn2.vectorstock.com/i/1000x1000/16/31/money-bag-logo-vector-22831631.jpg'
// let logo = 'https://thumbs.dreamstime.com/z/money-cash-logo-vector-green-91037524.jpg'

export default () => {
  const classes = useStyles()
  const history = useHistory()

  const [feedback, setFeedBack] = useState()


  async function handleLogin(e) {
    e.preventDefault()
    const json = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    // console.log(e.target.password.value)

    try {
      // const { data: { token } } = await axios.post('http://192.168.0.60:8000/users/auth', json)
      const { data: { token } } = await axios.post('http://localhost:8000/users/auth', json)
      console.log(token)


      if (token) {
        sessionStorage.session = token
        localStorage.lastSession = new Date()

        history.push('/drawer')
        // setToken(token)

      }

    } catch (error) {
      setFeedBack(true)
      console.log(error)
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