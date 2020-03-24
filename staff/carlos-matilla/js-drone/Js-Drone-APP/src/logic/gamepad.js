import socket from "../socket"
import { NotAllowedError } from 'drone-errors'

let semaforo2 = true,
channelA,
channelB,
channelC,
channelD,
start,
fps = 30,
landG = false,
takeOffG = false

export { channelA, channelB, channelC, channelD, takeOffG, landG }

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
  // if (x > 1) return 70
  // if (x < -1) return -70
  return Math.round(x * 100)
})

//// CONTADOR FPS
// let counter = 0
// setInterval(() => {
//   console.log(counter)
//   counter = 0
// }, 1000);


export const gameLoop = () => {

  if (semaforo2) {

    var gamepads = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads
        ? navigator.webkitGetGamepads
        : []

    try {
      var gp = gamepads[0]
      if (gp === null) throw new NotAllowedError('No gamepad connected')
      const hand = gp.id.match("(R)") ? "right" : "left"
      // 0 is b
      if (buttonPressed(gp.buttons[0])) {
        console.log('b')
        socket.emit('gamepad', `flip b`)
      }
      // 1 is a
      if (buttonPressed(gp.buttons[1])) {
        console.log('a')
        socket.emit('gamepad', `flip r`)
      }
      // 2 is y
      if (buttonPressed(gp.buttons[2])) {
        console.log('y')
        socket.emit('gamepad', `flip l`)
      }
      // 3 is x
      if (buttonPressed(gp.buttons[3])) {
        console.log('x')
        socket.emit('gamepad', `flip f`)
      }
      // // 13 is arrow-down
      if (buttonPressed(gp.buttons[13])) {
        console.log('arrow-down')
        socket.emit('gamepad', `land`)
        takeOffG = false
        landG = true
      }
      // 16 is home
      if (buttonPressed(gp.buttons[16])) {
        console.log('home')
        socket.emit('gamepad', `takeoff`)
        landG = false
        takeOffG = true
      }

      if (gp.axes) {
        channelA = parse(gp.axes[0])
        channelB = invert(parse(gp.axes[1]))
        channelC = parse(gp.axes[3])
        channelD = parse(gp.axes[2])

        // console.log(`rc ${parse(gp.axes[0])} ${invert(parse(gp.axes[1]))} ${parse(gp.axes[3])} ${parse(gp.axes[2])}`)
        socket.emit('gamepad', `rc ${channelA} ${channelB} ${channelC} ${channelD}`)
      }

      setTimeout(function () {
        start = requestAnimationFrame(gameLoop)
      }, 1000 / fps)
    } catch (error) {
      return
    }

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
