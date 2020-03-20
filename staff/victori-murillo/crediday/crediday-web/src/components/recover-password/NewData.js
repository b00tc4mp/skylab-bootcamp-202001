import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab'
import Loader from '../presentational/Loader'

export default ({ password, setPassword, passwordAgain, setPasswordAgain, error, feedback }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Nueva Contraseña
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
            id="cardName"
            label="Nueva contraseña"
            type="password"
            fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={e => setPasswordAgain(e.target.value)}
            value={passwordAgain}
            required
            id="cardNumber"
            label="Repita la nueva contraseña"
            type="password"
            fullWidth />
        </Grid>

        {error && !feedback && <Grid item xs={12}> <Alert severity="error">{error}</Alert> </Grid>}
        {feedback && <Grid item xs={12}> <Loader /> </Grid>}

      </Grid>
    </React.Fragment>
  );
}