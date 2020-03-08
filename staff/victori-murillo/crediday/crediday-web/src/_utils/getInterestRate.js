import removePoints from './removePoints'

const getInterestRate = (amount, paymentInterest) => {

  paymentInterest = paymentInterest ? removePoints(paymentInterest) : 0
  amount = amount ? removePoints(amount) : 0

  let interestAmount = 0

  if (amount && paymentInterest) {
    interestAmount = (paymentInterest / amount) * 100
  }

  if (interestAmount.toString().length > 3) {
    interestAmount = interestAmount.toFixed(2)
  }

  return interestAmount
}

export default getInterestRate