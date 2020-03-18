import { time, lowTemp, hightTemp, battery, height, speed, atmosPressure } from './save-data'
import saveSession from './save-session'

const chart = 40

export default async function(){
    console.log('starting')
    // if(time < 40) await saveSession(time, lowTemp, hightTemp, battery, height, speed, atmosPressure)
    
    const data = [ lowTemp, hightTemp, battery, height, speed, atmosPressure]

    let lowTempP=[],
        hightTempP=[],
        batteryP=[], 
        heightP=[], 
        speedP=[], 
        atmosPressureP=[]

    let dataParsed = [ lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP]

    const x = Math.floor(time / chart)

    
   for(var i = 0; i < data.length; i++){
       for(var j = x; j<= time +1; j+=x){
           dataParsed[i].push(data[i][j])
       }
   }


   await saveSession(time, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP)

}