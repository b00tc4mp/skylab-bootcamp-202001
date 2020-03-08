import getNumberWeeks from './getNumberWeeks'
import getNumberMonths from './getNumberMonths'
import getNumberOf_1_16 from './getNumberOf_1_16'

import getTwiceMonth from './getTwiceMonth'
import getNumberDays from './getNumberDays'

import getDayWeek from './getDayWeek'
import getDay from './getDay'

const getDaysFrequency = (dateConstituted, frequency) => {
  let days = getNumberDays(dateConstituted, true)
  days = days / frequency
  // console.log(days)
  return Math.ceil(days)
}


const getInterestPending = (credit, stateIntPending) => {

  const {paymentInterest, paymentFrecuency, dateConstituted, dateCancelled, 
    firstTwiceMonthly, secondTwiceMonthly, frequency, dateToCancel} = credit

  let interestPaid = 0
  let interestTotal = 0

  switch(paymentFrecuency) {
    case "Daily":  interestTotal = paymentInterest * getNumberDays(dateConstituted)
    break;

    case "Weekly":  interestTotal = paymentInterest * getNumberWeeks(dateConstituted, dateCancelled)
    break;

    case "TwiceMonthly": {
      let fornights
      if (firstTwiceMonthly && secondTwiceMonthly) {
        fornights = getTwiceMonth(firstTwiceMonthly, secondTwiceMonthly, dateConstituted)
      } else {
        fornights = getNumberOf_1_16(dateConstituted, dateCancelled)
      }
      interestTotal = paymentInterest * fornights
    } 
    break;

    case "Monthly": interestTotal = paymentInterest * getNumberMonths(dateConstituted)
    break;

    case "frequency": 
      interestTotal = paymentInterest * getDaysFrequency(dateToCancel ? dateToCancel : dateConstituted, frequency)
    break;

    default: interestTotal = paymentInterest * getNumberWeeks(dateConstituted, dateCancelled)
  }

  if (credit.payments.length > 0) {
    interestPaid = credit.payments.map(p => p.interestPayment).reduce((acc, curr) => acc + curr)
  }

    let interestPending = interestTotal - interestPaid

    // if(stateIntPending !== interestPending) {
    //   this.setState({
    //     interestPending: interestPending < 0 ? 0 : interestPending, 
    //     moratoriumPending: this.computeMoratorium(interestPending, credit)
    //   })
    // }

    return {
      interestPending: interestPending < 0 ? 0 : interestPending, 
      moratoriumPending: computeMoratorium(interestPending, credit)
    }
}


const computeMoratorium = (interestPending, credit) => {
  const {paymentInterest, paymentFrecuency, paymentMoratorium,
    firstTwiceMonthly, secondTwiceMonthly} = credit
  let moratoriumPending = 0

  if (paymentMoratorium > 0) {
    moratoriumPending = paymentMoratorium
  }

  // <I MADE THIS TO ABEL MURILLO --- MORATORIUM DONT PUT IF SUNDAY WAS 1>
  if (paymentFrecuency === "TwiceMonthlyC" || paymentFrecuency === "TwiceMonthly") {
    if (firstTwiceMonthly === 1 || secondTwiceMonthly === 1) {
      const d = new Date()

      if (getDayWeek().day === "Lunes" && d.getDate() === 2) {
        moratoriumPending = moratoriumPending - paymentMoratorium;
      }
    }
  }
  // </I MADE THIS TO ABEL MURILLO --- MORATORIUM DONT PUT IF SUNDAY WAS 1>

  let result = (interestPending > paymentInterest ? moratoriumPending : 0)

  if(paymentMoratorium > 0 && (interestPending > paymentInterest) && (interestPending / paymentInterest > 2)) {
    let division = interestPending / paymentInterest
    result = (Math.floor(division) - 1) * paymentMoratorium
  }


  if (paymentFrecuency === "frequency" || paymentFrecuency === "Daily") result = 0
  return result >= 0 ? result : 0;
}



export default getInterestPending