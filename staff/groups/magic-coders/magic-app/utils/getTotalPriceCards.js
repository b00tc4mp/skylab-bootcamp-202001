function getTotalPriceCards(cards) {
  const amounts = cards.map(card => Number(card.multiverseid.toString().slice(0, 3)))
  if (!amounts.length) return 0
  const total = amounts.reduce((a, c) => a + c)
  return total
}