import React, { useState } from 'react'
import './Navbar-right.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft} from '@fortawesome/free-solid-svg-icons'


export default function ({ mySessions, handleLogout, handleSession, leftMenuView, name, handleHomePadding, estadisticsView, liveChartView}) {

  const [hoverName, setHoverName] = useState(false)
  const [hoverMenu, setHoverMenu] = useState(false)

  let styleMenu
  let styleArrow

  if (hoverMenu){
    styleMenu = { width: `18rem` }
    styleArrow = {transform: `rotate(180deg)`}
  }

  if(liveChartView || estadisticsView) styleArrow = {display: `none`}

  function hourParser(date) {
    // const fullDate = date.split("T")[0]
    // const day = fullDate.split("-")[2]
    // const month = fullDate.split("-")[1]
    // const year2 = fullDate.split("-")[0]
    const hour = (date.split("T")[1]).split(".")[0]
    return `${hour}`
  }

  function dayParser(date) {
    const fullDate = date.split("T")[0]
    const day = fullDate.split("-")[2]
    return day
  }

  function monthParser(date) {
    const fullDate = date.split("T")[0]
    const month = fullDate.split("-")[1]
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return monthArray[Number(month) - 1]
  }

  function nameParser(name) {
    if (name) {
      const iName = name.name[0]
      const iSurname = name.surname[0]
      return `${iName}${iSurname}`
    }
  }
  function handleHover() {
    setHoverMenu(false)
  }

  function handleMenuHover(){
    hoverMenu ? setHoverMenu(false) : setHoverMenu(true)
    handleHomePadding()
  }

  return <nav className={leftMenuView ? "navbar-right" : "navbar-right little"} style={styleMenu}>
    <li className="rnav_logo">
      <button className="rnav_button" onMouseEnter={() => setHoverName(true)} onMouseLeave={() => setHoverName(false)} onClick={handleLogout}>{hoverName ? "Logout" : nameParser(name)}</button>
    </li>
    <li className="rnav_left"><FontAwesomeIcon icon={faChevronLeft} size="2x" onClick={handleMenuHover} style={styleArrow}/></li>
    <ul className="rnav">
      {mySessions.map((session => <>
        <li className="rnav_item" key={session}onClick={event => {
            event.preventDefault()
            handleSession(session)
            handleHover()
          }}>
          
            <div className="rnav_icon">
              <spam>{dayParser(session.date)}</spam>
              <em>{monthParser(session.date)}</em>
            </div>

            <span className="rnav_itemtext">{hourParser(session.date)}</span>
          
        </li>

      </>))}
      
    </ul>
    <li className="rnav_down"><FontAwesomeIcon  icon={faChevronDown} size="2x"/></li>
  </nav>
}

