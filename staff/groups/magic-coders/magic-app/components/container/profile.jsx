function Profile() {
  return (

      <div className="profile">
        <header className="profile__header">
          <div className="profile__pic">Foto perfil</div>
          <div className="profile__name">Carlos</div>
          <div className="profile__buttons">
            <button>En venta</button>
            <button>Vendidas</button>
          </div>
        </header>
        <main className="profile__content">
         <img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=379007&type=card" alt=""/>
         <img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=378007&type=card" alt=""/>
         <img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=374007&type=card" alt=""/>
         <img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=379307&type=card" alt=""/>
         <img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=3009&type=card" alt=""/>
        </main>
    
    </div>
  )
}