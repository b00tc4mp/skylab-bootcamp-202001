function Sidebar({sidebar, toggleSidebar}){
  const displaySidebar = sidebar
  return (
    <div
      className="bg-modal-sidebar" 
      style={displaySidebar? {visibility: "visible"} : {visibility: "hidden"}}
    >
      <div className="div_fixed" onClick={toggleSidebar}></div>
      
      <div className="modal-content-sidebar" style={displaySidebar? {right: "0"} : {right: "-100%"}}>

        <div className="nav-modal-sidebar" >
          <span style={{display: "flex", justifyContent: "space-around", width: '100%'}}>
            <span>Menú</span>
          </span>
          <div className="close-sidebar li-fa-times" onClick={toggleSidebar} >+</div>

        </div>
        
        <div className="list-menu">
          <ul className="ul-menu">
            <li>a</li>
            <li>b</li>
            <li>c</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
