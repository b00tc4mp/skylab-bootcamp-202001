import getNumberWeeks from './getNumberWeeks'
import getNumberMonths from './getNumberMonths'

const getPending = (credit) => {

  const {paymentInterest, paymentFrecuency, dateConstituted} = credit

  let interestPaid = 0
  let interestTotal = 0

  switch(paymentFrecuency) {
    case "Weekly": interestTotal = paymentInterest * getNumberWeeks(dateConstituted)
    break;

    case "Monthly": interestTotal = paymentInterest * getNumberMonths(dateConstituted)
    break;

    default: interestTotal = paymentInterest * getNumberWeeks(dateConstituted)
  }

  if (credit.payments.length > 0) {
    interestPaid = credit.payments.map(p => p.interestPayment).reduce((acc, curr) => acc + curr)
  }

    const interestPending = interestTotal - interestPaid

    
    const {amount} = credit

    let moratoriumPending = amount > 50000 ? 3000 : 2500
    
    moratoriumPending = (interestPending > paymentInterest ? moratoriumPending : 0)

    return {
      interestPending,
      moratoriumPending
    }

}

export default getPending