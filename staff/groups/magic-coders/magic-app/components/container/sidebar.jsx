function Sidebar({sidebar, toggleSidebar, logout, onTo, onToProfile}){

  return (
    <div
      className="bg-modal-sidebar" 
      style={sidebar? {visibility: "visible"} : {visibility: "hidden"}}
    >

      {/* Container behind */}
      <div className="div_fixed" onClick={toggleSidebar}></div>
      
      <div className="modal-content-sidebar" style={sidebar? {right: "0"} : {right: "-100%"}}>
        <div className="nav-modal-sidebar" >
          <span style={{display: "flex", justifyContent: "space-around", width: '100%'}}>
            <span>Menú</span>
          </span>
          <div className="close-sidebar li-fa-times" onClick={toggleSidebar} >+</div>
        </div>
        
        <div className="list-menu">
          <ul className="ul-menu">
            <li onClick={() => onTo('search')}>Search</li>
            <li onClick={() => onTo('forsale')}>For Sale</li>
            <li onClick={onToProfile}>Profile</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      </div>


    </div>
  )
}
