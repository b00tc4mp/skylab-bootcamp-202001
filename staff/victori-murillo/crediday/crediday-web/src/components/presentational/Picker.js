import React from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
// import LuxonUtils from '@date-io/luxon';

export default () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <Root /> */}
    </MuiPickersUtilsProvider>
  );
}