function Navbar(props) {

  const navbar = {
    backgroundColor: 'rgb(0, 0, 0)',
    width: '100wv',
    height: '60px',
    color: 'white',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const logo = {
    fontSize: '24px',
    width: '20%'
  }

  const labels = {
    display: 'flex',
    flexDirection: 'column',
  }

  const ul = {
    display: 'flex',
    justifyContent: 'space-around'
  }

  const items = {
    width: '40%'
  }

  const profile = {
    width: '20%'
  }


  return (
  <nav style={navbar} className="navbar" >
    <section style={logo} className="logo" >
      <label style={labels}>
        <span>Magic</span>
        <span style={{fontSize: '10px'}}>The Gathering</span>
        </label>
    </section>

    <section style={items}>
      <ul style={ul}>
        <li>SEARCH</li>
        <li>FAVORITES</li>
        <li>FOR SALE</li>
      </ul>
    </section>

    <section style={profile} className="profile" >
      <i className="far fa-user"></i>
      <label style={{marginLeft: '5px'}}>Profile</label>
    </section>

  </nav>
  )
}

