function setPrice(id){
   let pr = id.toString().slice(0, 3)
   // let price = Math.floor((Math.random() * 200)+10)
   return `$${pr}`
}