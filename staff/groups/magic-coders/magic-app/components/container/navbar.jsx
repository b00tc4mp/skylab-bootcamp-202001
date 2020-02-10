function Navbar({sidebar, toggleSidebar, logout, onTo}) {

  return (
  <nav className="navbar" >
    <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} logout={logout} />
    <section className="logo" >
      <label>
        <span>Magic</span>
        <span style={{fontSize: '10px'}}>The Gathering</span>
        </label>
    </section>

    <section className="items" >
      <ul>
        <li onClick={() => onTo('search')}>SEARCH</li>
        <li>FAVORITES</li>
        <li>FOR SALE</li>
      </ul>
    </section>

    <section className="navbar__profile" >
      <i className="far fa-user"></i>
      <label onClick={() => onTo('profile')} style={{margin: '0px 20px 0px 5px'}}>Profile</label>

      <i className="fas fa-sign-out-alt"></i>
      <label onClick={() => onTo('login')} style={{marginLeft: '5px'}}>Logout</label>
    </section>

    <section  className="bars">
      <i onClick={toggleSidebar} className="fas fa-bars"></i>
    </section>

  </nav>
  )
}

