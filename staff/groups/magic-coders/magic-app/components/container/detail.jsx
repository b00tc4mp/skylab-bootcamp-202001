function Detail({card: { name, number, type, rarity, setName, text, cmc, imageUrl}}) {

  return <div className="detail">
    <div className="detail__title">
    <h1 style={{marginRight: '10px'}}>#{number} - {name} -</h1>
    </div>
    <img className="detail__img" src={imageUrl} />
    <div className="detail__extra">
      <h4 className="detail__extra__text">Type: {type}</h4>
      <h4 className="detail__extra__text">Set name: {setName}</h4>
      <h4 className="detail__extra__text">Mana cost: {cmc}</h4>
      <h4 className="detail__extra__text">Rarity: {rarity}</h4>
    </div>
    <p className="detail__text">{text}</p>
  </div>
}