import socket from "../socket"



const buttonPressed = key => {
  if (typeof key === "object") {
    return key.pressed
  }
  return false
}


const invert = (x) => {
  return x * -1
}

const parse = (x => {
  if(x > 0.5)return 50  
  if(x < -0.5) return -50      
  return Math.round(x * 100)
})


let start



export const gameLoop = () => {
  var gamepads = navigator.getGamepads
    ? navigator.getGamepads()
    : navigator.webkitGetGamepads
      ? navigator.webkitGetGamepads
      : []
  if (!gamepads) {
    return
  }


  var gp = gamepads[0]
  const hand = gp.id.match("(R)") ? "right" : "left"



  // 0 is b
  if (buttonPressed(gp.buttons[0])) {
    console.log('b')
  }
  // 1 is a
  if (buttonPressed(gp.buttons[1])) {
    console.log('a')
  }
  // 2 is y
  if (buttonPressed(gp.buttons[2])) {
    console.log('y')
  }
  // 3 is x
  if (buttonPressed(gp.buttons[3])) {
    console.log('x')
  }
  // 4 is l
  if (buttonPressed(gp.buttons[4])) {
    console.log('l')
  }
  // 5 is r
  if (buttonPressed(gp.buttons[5])) {
    console.log('r')

  }
  // 6 is zl
  if (buttonPressed(gp.buttons[6])) {
    console.log('zl')
  }
  // 7 is zr
  if (buttonPressed(gp.buttons[7])) {
    console.log('zr')
  }

  // 8 is 'minus'
  if (buttonPressed(gp.buttons[8])) {
    console.log('-')
    
  }
  // 9 is 'plus'
  if (buttonPressed(gp.buttons[9])) {
    console.log('+')
    
  }
  // 10 is 'lstick'
  if (buttonPressed(gp.buttons[10])) {
    console.log('lstick')
  }
  // 11 is 'rstick'
  if (buttonPressed(gp.buttons[11])) {
    console.log('rstick')
  }
  // 12 is arrow-up
  if (buttonPressed(gp.buttons[12])) {
    console.log('arrow-up')
  }
  // 13 is arrow-down
  if (buttonPressed(gp.buttons[13])) {
    console.log('arrow-down')
  }
  // 14 is arrow-left
  if (buttonPressed(gp.buttons[14])) {
    console.log('arrow-left')
  }
  // 15 is arrow-right
  if (buttonPressed(gp.buttons[15])) {
    console.log('arrow-right')
  }
  // 16 is home
  if (buttonPressed(gp.buttons[16])) {
    console.log('home')
    socket.emit('gamepad', `takeoff`)
  }
  // 17 is select
  if (buttonPressed(gp.buttons[17])) {
    console.log('select')
    socket.emit('gamepad', `land`)
  }


  if (gp.axes) {
    let channelA = parse(gp.axes[0])
    let channelB = invert(parse(gp.axes[1]))
    let channelC = parse(gp.axes[3])
    let channelD = parse(gp.axes[2])

    // console.log(`rc ${parse(gp.axes[0])} ${invert(parse(gp.axes[1]))} ${parse(gp.axes[3])} ${parse(gp.axes[2])}`)

    socket.emit('gamepad', `rc ${channelA} ${channelB} ${channelC} ${channelD}`)

  }

  start = requestAnimationFrame(gameLoop)
}

export const gamepadConnect = evt => {
 
  start = requestAnimationFrame(gameLoop)
   
}

export const gamepadDisconnect = () => {
  console.log("Gamepad disconnected.")
  
  cancelAnimationFrame(start)
}
