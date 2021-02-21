import React from 'react'
import Grid from '@material-ui/core/Grid'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

export default ({ text, selectedDate, setSelectedDate }) => {
  const handleDateChange = date => setSelectedDate(date._d)

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="center">

        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={text}
          format="DD / MMM / YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>
  )
}