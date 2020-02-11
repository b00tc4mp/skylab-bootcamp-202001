function Navbar({sidebar, toggleSidebar, logout, onTo, user, onToProfile}) {

  return (
  <nav className="navbar" >
    <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} logout={logout} onTo={onTo} />
    <section className="logo" >
      <label>
        <span>Magic</span>
        <span style={{fontSize: '10px'}}>The Gathering</span>
        </label>
    </section>

    <section className="items" >
      <ul>
        <li onClick={() => onTo('search')}>SEARCH</li>
        <li onClick={() => onTo('forsale')}>FOR SALE</li>
      </ul>
    </section>

    <section className="navbar__profile" >
      <i className="far fa-user"></i>
      <label onClick={onToProfile} style={{margin: '0px 20px 0px 5px'}}>
        {user ? firstUppercase(user.name): 'Profile'}
      </label>

      <i className="fas fa-sign-out-alt"></i>
      <label onClick={logout} style={{marginLeft: '5px'}}>Logout</label>
    </section>

    <section  className="bars">
      <i onClick={toggleSidebar} className="fas fa-bars"></i>
    </section>

  </nav>
  )
}

