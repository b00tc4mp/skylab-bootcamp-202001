function Navbar(props) {

  return (
  <nav className="navbar" >
    <section className="logo" >
      <label>
        <span>Magic</span>
        <span style={{fontSize: '10px'}}>The Gathering</span>
        </label>
    </section>

    <section className="items" >
      <ul>
        <li>SEARCH</li>
        <li>FAVORITES</li>
        <li>FOR SALE</li>
      </ul>
    </section>

    <section className="profile" >
      <i className="far fa-user"></i>
      <label style={{margin: '0px 20px 0px 5px'}}>Profile</label>

      <i className="fas fa-sign-out-alt"></i>
      <label style={{marginLeft: '5px'}}>Logout</label>
    </section>

    <section className="bars">
      <i className="fas fa-bars"></i>
    </section>

  </nav>
  )
}

