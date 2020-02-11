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