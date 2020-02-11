function Item ({item: { multiverseid, name, imageUrl, user}, onClick, view}) {

  return <li className="item">
    <div>
      {user && <h2 style={{margin: 0}}>{user}</h2>}
      <h3 onClick={() => onClick(multiverseid)} style={{display: 'inline-block', marginRight: '10px'}}>{name}</h3>
      {(view === 'profile' || view === 'forsale') && <div><span>{setPrice(multiverseid)}</span></div>}
      {view === 'forsale' && <button onClick={ () => event.path[0].innerText = user + ': ' + user + '@gmail.com'} >Contact</button> }
 
    </div>
    <img onClick={() => onClick(multiverseid)} src={imageUrl} />
  </li>
}