import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Loader from '../presentational/Loader'
import { Alert } from '@material-ui/lab'

export default ({ company, setCompany, email, setEmail, error, feedback }) => {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Confirmar datos
      </Typography>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <TextField
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
            id="firstName"
            name="firstName"
            label="Correo Electrónico"
            fullWidth
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={e => setCompany(e.target.value)}
            value={company}
            required
            id="firstName"
            name="firstName"
            label="Nombre de Compañia"
            fullWidth
            autoComplete="off"
          />
        </Grid>

        {error && !feedback && <Grid item xs={12}> <Alert severity="error">{error}</Alert> </Grid>}
        {feedback && <Grid item xs={12}> <Loader /> </Grid>}

      </Grid>
    </React.Fragment>
  )
}