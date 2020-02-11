function Item ({item: { multiverseid, name, imageUrl}, onClick, view, user}) {

  return <li className="item">
    <div>
      {user && <h2 style={{margin: 0}}>{firstUppercase(user.name)}</h2>}
      <h3 onClick={() => onClick(multiverseid)} style={{display: 'inline-block', marginRight: '10px'}}>{name}</h3>
      {(view === 'profile' || view === 'forsale') && <div><span>{setPrice(multiverseid)}</span></div>}
 
    </div>
    <img onClick={() => onClick(multiverseid)} src={imageUrl} />
    
  </li>
}