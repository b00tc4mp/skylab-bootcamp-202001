let time = 0
let lowTemp = []
let hightTemp = []
let battery = []
let height = []
let speed = []
let atmosPressure = []

export{
    time,
    lowTemp,
    hightTemp,
    battery,
    height,
    speed,
    atmosPressure
}

export function saveData (channelA, channelB, channelC, channelD, temph, templ, bat, baro, tof){
    time++
    // Speed
    let maxSpeed = Math.max(channelA, channelB, channelC, channelD)
    if(!isNaN(maxSpeed)) speed.push(maxSpeed)

    // hightTemp
     hightTemp.push(temph)

    // lowTemp
    lowTemp.push(templ)

    // battery
    battery.push(bat)

    // atmosPressure
    atmosPressure.push(baro)

    // height
    height.push(tof)

}