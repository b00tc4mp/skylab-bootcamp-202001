import React from 'react'
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

import { Copyright } from '.'
import { useHistory } from "react-router-dom"
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

async function login() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  }
  const token = await axios.post('http://localhost:8000/users/auth', {name: 'vam', password: '12345'}, config)
  console.log(token)
}

export default () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => {
          e.preventDefault()

          login()
          sessionStorage.token = 'aaa'
          console.log(e.target.username.value)
          console.log(e.target.password.value)

        }} >
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
      <Box mt={8}>
        <Copyright path='/home'  />
      </Box>
    </Container>
  )
}