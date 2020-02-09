function Detail({card: { name, type, text, cmc, imageUrl}}) {

  const style = {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'

  }
  return <div>
    <div style={style}>
      <h1 style={{marginRight: '10px'}}>{name}</h1>
    </div>
    
    <h3>{type}</h3>
    <p>{text}</p>
    <h4>{cmc}</h4>
    <img src={imageUrl} />
  </div>
}