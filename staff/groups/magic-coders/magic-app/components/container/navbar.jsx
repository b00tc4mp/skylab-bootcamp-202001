function Navbar({sidebar, toggleSidebar, logout, onTo, user, onToProfile}) {

  return (
  <nav className="navbar" >
    <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} logout={logout} onTo={onTo} onToProfile={onToProfile} />
    <section className="logo" >
      <img className="logoimg" src="../logo.png" alt=""/>
    </section>

    <section className="items" >
      <ul>
        <li onClick={() => onTo('search')}><a> SEARCH</a></li>
        <li onClick={() => onTo('forsale')}><a>FOR SALE</a></li>
      </ul>
    </section>

    <section className="navbar__profile" >
      <div>
        <i className="far fa-user"></i>
        <label onClick={onToProfile} style={{margin: '0px 20px 0px 5px'}}>
          {user ? firstUppercase(user.name): 'Profile'}
        </label>
      </div>
      <div>
        <i className="fas fa-sign-out-alt"></i>
        <label onClick={logout} style={{marginLeft: '5px'}}>Logout</label>
      </div>
    </section>

    <section  className="bars">
      <i onClick={toggleSidebar} className="fas fa-bars"></i>
    </section>

  </nav>
  )
}

