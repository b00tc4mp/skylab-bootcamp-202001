

function saveData({templ, temph, tof, bat, baro}){
    const counter = 0
    const lowTemp = []
    const hightTemp = []
    const battery = []
    const height = []
    const atmosPressure = []

    setInterval(() => {
        counter++
        lowTemp.push(templ)
        hightTemp.push(temph)
        battery.push(bat)
        height.push(tof)
        atmosPressure.push(baro)
    }, 1000)

}