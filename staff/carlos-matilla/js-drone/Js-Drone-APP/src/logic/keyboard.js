import { socket } from "../socket"

let takeOffK = false, landK = false
const v = 70, negV = -70

export { takeOffK, landK, v, negV }

export function keyUp(e) {

    if (e.code === "KeyW") {
        console.log('Forward')
        socket.emit('control', `rc 0 0 0 0`)
    }

    if (e.code === "KeyA") {
        console.log('Left')
        socket.emit('control', `rc 0 0 0 0`)
    }
    if (e.code === "KeyD") {
        console.log('Right')
        socket.emit('control', `rc 0 0 0 0`)
    }
    if (e.code === "KeyS") {
        console.log('Backward')
        socket.emit('control', `rc 0 0 0 0`)
    }
    if (e.code === "ArrowUp") {
        console.log('Up')
        socket.emit('control', `rc 0 0 0 0`)
    }
    if (e.code === "ArrowLeft") {
        console.log('Turn Left')
        socket.emit('control', `rc 0 0 0 0`)
    }
    if (e.code === "ArrowDown") {
        console.log('Down')
        socket.emit('control', `rc 0 0 0 0`)
    }
    if (e.code === "ArrowRight") {
        console.log('Turn Right')
        socket.emit('control', `rc 0 0 0 0`)
    }
}

export function keyDown(e) {

    if (e.code === "Enter") {
        console.log('Take Off')
        socket.emit('control', `takeoff`)
        landK = false
        takeOffK = true
    }

    if (e.code === "Escape") {
        console.log('Land')
        socket.emit('control', `land`)
        takeOffK = false
        landK = true
    }
    if (e.code === "KeyW") {
        console.log('Forward')
        socket.emit('control', `rc 0 ${v} 0 0`)
    }

    if (e.code === "KeyA") {
        console.log('Left')
        socket.emit('control', `rc ${negV} 0 0 0`)
    }
    if (e.code === "KeyD") {
        console.log('Right')
        socket.emit('control', `rc ${v} 0 0 0`)
    }
    if (e.code === "KeyS") {
        console.log('Backward')
        socket.emit('control', `rc 0 ${negV} 0 0`)
    }
    if (e.code === "ArrowUp") {
        console.log('Up')
        socket.emit('control', `rc 0 0 ${v} 0`)
    }
    if (e.code === "ArrowLeft") {
        console.log('Turn Left')
        socket.emit('control', `rc 0 0 0 ${negV}`)
    }
    if (e.code === "ArrowDown") {
        console.log('Down')
        socket.emit('control', `rc 0 0 ${negV} 0`)
    }
    if (e.code === "ArrowRight") {
        console.log('Turn Right')
        socket.emit('control', `rc 0 0 0 ${v}`)
    }
    if (e.code === "KeyO") {
        console.log('flip f')
        socket.emit('control', `flip f`)
    }
    if (e.code === "KeyK") {
        console.log('flip l')
        socket.emit('control', `flip l`)
    }
    if (e.code === "Semicolon") {
        console.log('flip r')
        socket.emit('control', `flip r`)
    }
    if (e.code === "Semicolon") {
        console.log('flip b')
        socket.emit('control', `flip b`)
    }
}