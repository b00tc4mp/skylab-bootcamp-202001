function Detail({card: {multiverseid, name, number, type, rarity, setName, text, cmc, imageUrl}, addToSale, onTo, user}) {

  const _card = {
    multiverseid, 
    name, 
    imageUrl,
    user: firstUppercase(user.name)
  }

  return <div className="detail">
    <div className="detail__button-content">
      <button className="detail__button-content__button__back" onClick={() => onTo('search')}>Go back</button>
      <button className="detail__button-content__button__add" onClick={() => {
        event.target.innerHTML = 'In sale'
        addToSale(_card)
        }}>Add to sale</button>
    </div>
    <div className="detail__title">
      <h1>{name}</h1>
      <div><span>{setPrice(multiverseid)}</span></div>
    </div>
    <img className="detail__img" src={imageUrl} />
    <div className="detail__extra">
      <h4 className="detail__extra__text">Card: #{number}</h4>
      <h4 className="detail__extra__text">Type: {type}</h4>
      <h4 className="detail__extra__text">Set name: {setName}</h4>
      <h4 className="detail__extra__text">Mana cost: {cmc}</h4>
      <h4 className="detail__extra__text">Rarity: {rarity}</h4>
    </div>
    <p className="detail__text">{text}</p>
  </div>
}