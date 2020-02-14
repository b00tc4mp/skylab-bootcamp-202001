function Profile({user, cards, view, viewProfile, toggleButton, toSold}) {

  return (
      <div className="profile">
        <header className="profile__header">
          <div className="profile__name">{<h2>{firstUppercase(user.name)}</h2>}</div>
          <div className="profile__estadistics">
            <p>On Sale<br/><br/>{viewProfile ? cards.length: 0}</p>
            <p>Sold<br/><br/>{viewProfile ? 0 : cards.length}</p>
            <p>Total Amount<br/><br/>${getTotalPriceCards(cards)}</p></div>
          <div className="profile__buttons">
            <button onClick={toggleButton} className={viewProfile ? 'button--green' : 'button'}>For Sale</button>
            <button onClick={toggleButton} className={viewProfile ? 'button' : 'button--green'}>Sold</button>
          </div>
        </header>
        <main className="profile__content">
         <Results results={cards} view={view} toSold={toSold} viewProfile={viewProfile} />
        </main>
    </div>
  )
}