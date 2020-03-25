// import 'date-fns'
import React from 'react'
import Grid from '@material-ui/core/Grid'
// import DateFnsUtils from '@date-io/date-fns'
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'


export default function MaterialUIPickers({text, selectedDate, setSelectedDate}) {

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