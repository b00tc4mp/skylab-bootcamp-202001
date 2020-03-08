const translatePaymentFrecuency = frequency => {
  let spanish = ''

  switch (frequency) {
    case 'Daily':
      spanish = 'Diario'
      break;

    case 'Weekly':
      spanish = 'Semanal'
      break;
    
    case 'TwiceMonthly':
      spanish = 'Quincenal'
      break;

    case 'Monthly':
      spanish = 'Mensual'
      break;
        
    default:
      break;
  }

  return spanish
}

export default translatePaymentFrecuency