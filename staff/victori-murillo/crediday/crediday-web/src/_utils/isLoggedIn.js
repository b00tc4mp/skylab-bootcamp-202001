

const isLoggedIn = () => localStorage.getItem("token")


const isAdmin = () => {
  if (localStorage.getItem("role") === "Admin") {
    return true

  } else {
    return false
  }
  
}

const isCollector = () => localStorage.getItem("role") === "Collector" ? true : false




module.exports = {isAdmin, isLoggedIn, isCollector}