import socket from "../socket"


let semaforo2 = true

export let channelA 
export let channelB 
export let channelC 
export let channelD 
export let takeOffG
export let landG

export let start
let fps = 30

landG = false
takeOffG = false


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
  if(x > 1)return 70  
  if(x < -1) return -70     
  return Math.round(x * 100)
})

//// CONTADOR FPS
// let counter = 0
// setInterval(() => {
//   console.log(counter)
//   counter = 0
// }, 1000);



export const gameLoop = () => {

  if(semaforo2){

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

    // // 0 is b
    // if (buttonPressed(gp.buttons[0])) {
    //   console.log('b')
    // }
    // // 1 is a
    // if (buttonPressed(gp.buttons[1])) {
    //   console.log('a')
    // }
    // // 2 is y
    // if (buttonPressed(gp.buttons[2])) {
    //   console.log('y')
    // }
    // // 3 is x
    // if (buttonPressed(gp.buttons[3])) {
    //   console.log('x')
    // }
    // // 4 is l
    // if (buttonPressed(gp.buttons[4])) {
    //   console.log('l')
    // }
    // // 5 is r
    // if (buttonPressed(gp.buttons[5])) {
    //   console.log('r')
    // }
    // // 6 is zl
    // if (buttonPressed(gp.buttons[6])) {
    //   console.log('zl')
    // }
    // // 7 is zr
    // if (buttonPressed(gp.buttons[7])) {
    //   console.log('zr')
    // }

    // // 8 is 'minus'
    // if (buttonPressed(gp.buttons[8])) {
    //   console.log('-')
      
    // }
    // // 9 is 'plus'
    // if (buttonPressed(gp.buttons[9])) {
    //   console.log('+')
      
    // }
    // // 10 is 'lstick'
    // if (buttonPressed(gp.buttons[10])) {
    //   console.log('lstick')
    // }
    // // 11 is 'rstick'
    // if (buttonPressed(gp.buttons[11])) {
    //   console.log('rstick')
    // }
    // // 12 is arrow-up
    // if (buttonPressed(gp.buttons[12])) {
    //   console.log('arrow-up')
    // }
    // // 13 is arrow-down
    if (buttonPressed(gp.buttons[13])) {
      console.log('arrow-down')
      socket.emit('gamepad', `land`)
      takeOffG = false
      landG = true
    }
    // // 14 is arrow-left
    // if (buttonPressed(gp.buttons[14])) {
    //   console.log('arrow-left')
    // }
    // // 15 is arrow-right
    // if (buttonPressed(gp.buttons[15])) {
    //   console.log('arrow-right')
    // }
    // 16 is home
    if (buttonPressed(gp.buttons[16])) {
      console.log('home')
      socket.emit('gamepad', `takeoff`)
    
      landG = false
      takeOffG = true
    }
    // 17 is select
    if (buttonPressed(gp.buttons[17])) {
      console.log('select')
    
    }

    if (gp.axes) {
      channelA = parse(gp.axes[0])
      channelB = invert(parse(gp.axes[1]))
      channelC = parse(gp.axes[3])
      channelD = parse(gp.axes[2])

      // console.log(`rc ${parse(gp.axes[0])} ${invert(parse(gp.axes[1]))} ${parse(gp.axes[3])} ${parse(gp.axes[2])}`)

      socket.emit('gamepad', `rc ${channelA} ${channelB} ${channelC} ${channelD}`)

    }
      
    setTimeout(function() {
      start = requestAnimationFrame(gameLoop)
        // Drawing code goes here
    }, 1000 / fps);
  }    
}

export const gamepadConnect = evt => {
  
  semaforo2 = true
  start = requestAnimationFrame(gameLoop)
}

export const gamepadDisconnect = () => {
  console.log("Gamepad disconnected.")
  cancelAnimationFrame(start)
  semaforo2 = false
}
