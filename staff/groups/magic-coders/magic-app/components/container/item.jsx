function Item ({item: { multiverseid, name, imageUrl, user}, onClick, view, users, toSold, viewProfile}) {
  let card = { multiverseid, name, imageUrl, user}
  let email = undefined
  let phone = undefined

  if (users && view === 'forsale') {
    for (var i = 0; i < users.length; i++) {  
      if (users[i].name === user.toLowerCase()) {
        email = users[i].email
        phone = users[i].phone
      }
    }
  }

  return <li className="item">
    <div>
      {user && <h2 style={{margin: 0}}>{user}</h2>}
      <h3 onClick={() => onClick(multiverseid)} style={{display: 'inline-block', marginRight: '10px'}}>{name}</h3>
      {(view === 'profile' || view === 'forsale') && <div><span>{setPrice(multiverseid)}</span></div>}
      {(view === 'forsale') && <button onClick={ () => event.path[0].innerText = user + ': ' + email + ' ' +  phone} >Contact</button> }
      
    </div>
    <img onClick={() => onClick(card)} src={imageUrl} />
    {(view === 'profile' && viewProfile) && <Button onClick={() => toSold(multiverseid)} className="button--green">Sold</Button>}
  </li>
}