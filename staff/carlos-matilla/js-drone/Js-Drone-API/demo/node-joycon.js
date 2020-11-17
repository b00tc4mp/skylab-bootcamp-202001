const devices = listConnectedJoyCons()
const v = 100
const negV = -100


if (devices[0]) {
  const left = devices[0].open()



  left.on("change:home", pressed => {
    console.log("take off");
    drone.send('takeoff', 0, 7, 8889, '192.168.10.1')
  });

  left.on("change:plus", pressed => {
    console.log("land");
    drone.send('land', 0, 4, 8889, '192.168.10.1')
  });

  left.on("change:y", pressed => {
    console.log("up");
    pressed ? drone.send(`rc 0 0 ${v} 0`, 0, 12, 8889, '192.168.10.1') : drone.send('rc 0 0 0 0', 0, 10, 8889, '192.168.10.1')
  });

  left.on("change:a", pressed => {
    console.log("down");
    pressed ? drone.send(`rc 0 0 ${negV} 0`, 0, 13, 8889, '192.168.10.1') : drone.send('rc 0 0 0 0', 0, 10, 8889, '192.168.10.1')

  });
  left.on("change:x", pressed => {
    console.log("turn r");
    pressed ? drone.send(`rc 0 0 0 ${v}`, 0, 12, 8889, '192.168.10.1') : drone.send('rc 0 0 0 0', 0, 10, 8889, '192.168.10.1')

  });
  left.on("change:b", pressed => {
    console.log("turn l");
    pressed ? drone.send(`rc 0 0 0 ${negV}`, 0, 13, 8889, '192.168.10.1') : drone.send('rc 0 0 0 0', 0, 10, 8889, '192.168.10.1')

  });

  left.on("change:analogStick", value => {
    switch (value) {
      case left.Directions.UP: {
        console.log("right");
        drone.send(`rc ${v} 0 0 0`, 0, 11, 8889, '192.168.10.1')
        break;
      }
      case left.Directions.UP_LEFT: {
        console.log("forward-right");
        drone.send(`rc ${v} ${v} 0 0`, 0, 12, 8889, '192.168.10.1')
        break;
      }

      case left.Directions.RIGHT: {
        console.log("backward");
        drone.send(`rc 0 ${negV} 0 0`, 0, 12, 8889, '192.168.10.1')
        break;
      }
      case left.Directions.UP_RIGHT: {
        console.log("backward-right");
        drone.send(`rc ${v} ${negV} 0 0`, 0, 13, 8889, '192.168.10.1')
        break;
      }

      case left.Directions.DOWN: {
        console.log("left");
        drone.send(`rc ${negV} 0 0 0`, 0, 12, 8889, '192.168.10.1')
        break;
      }
      case left.Directions.DOWN_LEFT: {
        console.log("forward-left");
        drone.send(`rc ${negV} ${v} 0 0`, 0, 13, 8889, '192.168.10.1')
        break;
      }
      case left.Directions.DOWN_RIGHT: {
        console.log("backward-left");
        drone.send(`rc ${negV} ${negV} 0 0`, 0, 14, 8889, '192.168.10.1')
        break;
      }

      case left.Directions.LEFT: {
        console.log("forward");
        drone.send(`rc 0 ${v} 0 0`, 0, 11, 8889, '192.168.10.1')
        break;
      }

      case left.Directions.NEUTRAL: {
        console.log("neutral");
        drone.send('rc 0 0 0 0', 0, 11, 8889, '192.168.10.1')
        break;
      }
    }
  })
}

