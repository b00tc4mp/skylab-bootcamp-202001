import io from 'socket.io-client'

// let httpPort = Math.floor(1000 + Math.random() * 9000)
let socket = io(`http://localhost:1992`)
// function resetHttpPort(){

//     httpPort = Math.floor(1000 + Math.random() * 9000)
//     socket = io(`http://localhost:${httpPort}`)
// }



export{socket} 
