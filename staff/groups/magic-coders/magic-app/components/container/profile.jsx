function Profile({user, cards, view, viewProfile, toggleButton}) {

  const green = {
    backgroundColor: 'green', 
    color: "white",
    fontSize: '14px',
    cursor: 'pointer'
  }

  const white = { 
    fontSize: '14px',
    cursor: 'pointer'
  }

  function getTotalPriceCards(cards) {
    const amounts = cards.map(card => Number(card.multiverseid.toString().slice(0, 3)))
    if (!amounts.length) return 0
    const total = amounts.reduce((a, c) => a + c)
    return total
  }

  return (
      <div className="profile">
        <header className="profile__header">
          <div className="profile__name">{<h2>{firstUppercase(user.name)}</h2>}</div>
          <div className="profile__estadistics"><p>On Sale: {cards.length}</p><p>Sold: 0</p><p>Total Amount: ${getTotalPriceCards(cards)}</p></div>
          <div className="profile__buttons">
            <button onClick={toggleButton} style={viewProfile ? green : white}>For Sale</button>
            <button onClick={toggleButton} style={viewProfile ? white : green}>Sold</button>
          </div>
        </header>
        <main className="profile__content">
         {/* <Results results={cards} view={view} /> */}
        </main>
    </div>
  )
}