function Profile({user, cards}) {

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

  return (
      <div className="profile">
        <header className="profile__header">
          <div className="profile__name">{<h2>{firstUppercase(user.name)}</h2>}</div>
          <div className="profile__estadistics"><p>On Sale: {cards.length}</p><p>Sold: 0</p><p>Total Amount: 345$</p></div>
          <div className="profile__buttons">
            <button style={green}>En venta</button>
            <button style={white}>Vendidas</button>
          </div>
        </header>
        <main className="profile__content">
         <Results results={cards} />
        </main>
    </div>
  )
}