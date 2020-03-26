import { DroneError } from 'drone-errors'

export default function (err) {
    if (err) {
      console.log('DRONE ERROR', err)
      throw new DroneError('Drone Error')
    }
  }