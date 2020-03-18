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

    if(tof === undefined){
        time = 0
    }else{
        time++
    }

    // Speed
    if(channelA === undefined){
        speed = []
    }else{
        let maxSpeed = Math.max(channelA, channelB, channelC, channelD)
        if(!isNaN(maxSpeed)) speed.push(maxSpeed)
    }

    // hightTemp
    if(temph === undefined){
        hightTemp = []
    }else{
        hightTemp.push(temph)
    }

    // lowTemp
    if(temph === undefined){
        lowTemp = []
    }else{
        lowTemp.push(templ)
    }

    // battery
    if(bat === undefined){
        battery = []
    }else{
        battery.push(bat)
    }

    // atmosPressure
    if(baro === undefined){
        atmosPressure = []
    }else{
        atmosPressure.push(baro)
    }

    // height
    if(tof === undefined){
        height = []
    }else{
        height.push(tof)
    }

}