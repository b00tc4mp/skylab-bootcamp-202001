import React from 'react'
import { Typography, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Loader from '../presentational/Loader'
import { Alert } from '@material-ui/lab'

export default ({ email, code, setCode, error, feedback }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Código enviado a {email}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={code}
            onChange={e => setCode(e.target.value)}
            required
            id="código"
            label="Código de Verificación"
            fullWidth
          />
        </Grid>

        {error && !feedback && <Grid item xs={12}> <Alert severity="error">{error}</Alert> </Grid>}
        {feedback && <Grid item xs={12}> <Loader /> </Grid>}

      </Grid>
    </React.Fragment>
  )
}