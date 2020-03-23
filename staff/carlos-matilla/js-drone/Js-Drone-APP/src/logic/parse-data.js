import { time, control, lowTemp, hightTemp, battery, height, speed, atmosPressure } from './save-data'
import saveSession from './save-session'

const chart = 30
export default async function () {
    console.log('starting')
    const data = [lowTemp, hightTemp, battery, height, speed, atmosPressure]

    let lowTempP = [],
        hightTempP = [],
        batteryP = [],
        heightP = [],
        speedP = [],
        atmosPressureP = []

    let dataParsed = [lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP]

    let x = Math.floor(time / chart)
    if (x < 1) return x = 1

    for (var i = 0; i < data.length; i++) {
        for (var j = x; j < time + 1; j += x) {
            dataParsed[i].push(data[i][j])
        }
    }
    await saveSession(time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP)

}