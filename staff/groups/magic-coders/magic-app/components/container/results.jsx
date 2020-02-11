function Results({ results, language, onClickItem, view, users, user, toSold, viewProfile}) {

  return (
    <ul className="results">
      {
        language === undefined &&
        results.map((card, i) => {
          
          if (card.name && card.imageUrl) {
            return (
            <Item key={i} user={user} users={users} onClick={onClickItem} item={card} view={view} 
            toSold={toSold} viewProfile={viewProfile} />
            )
          }
        })
      }

      {
        language && 
        filterLanguage(results, language).map(card => 
          <Item key={card.multiverseid} users={users} onClick={onClickItem} item={card} view={view} />)
      }
      
    </ul>
  )
}
