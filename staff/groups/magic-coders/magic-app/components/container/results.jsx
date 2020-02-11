function filterLanguage(array, language) {
  let newResults = array.map(card => {

    const {foreignNames} = card


    if(foreignNames && foreignNames.some(foreign => foreign.language.split(' ')[0] === language)) {
      let card;

      foreignNames.forEach(foreign => {
        if( foreign.language === language || foreign.language.split(' ')[0] === language){
          card = foreign
        }
      })
      return card
    }

  })

  return newResults.filter(card => card !== undefined && card.imageUrl)
}

function filterTypes(array, types) {
  let newResults = array.map(card => {

    const {types} = card


    if(types) {
      let card;

      types.forEach(type => {
          card = type

      })
      return card
    }

  })

  return newResults
}




function Results({ results, language, onClickItem, view, user }) {

  return (
    <ul className="results">
      {
        language === undefined && 
        results.map(card => {

          if (card.name && card.imageUrl) {
            return (
            <Item key={card.multiverseid} onClick={onClickItem} item={card} view={view} user={user} />
            )
          }
        })
      }
      {language && filterLanguage(results, language).map(card => {

        return <Item key={card.multiverseid} onClick={onClickItem} item={card} view={view} user={user} />}
      )}
      
    </ul>
  )
}
