function Item ({item: { multiverseid, name, imageUrl}, onClick}) {

  return <li className="item">
    <div>
      <h3 onClick={() => onClick(multiverseid)} style={{display: 'inline-block', marginRight: '10px'}}>{name}</h3>
 
    </div>
    <img onClick={() => onClick(multiverseid)} src={imageUrl} />
  </li>
}