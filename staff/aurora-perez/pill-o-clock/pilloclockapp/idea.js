
// IDEA

// inside interval
let date = AsyncStorage.getItem('date')
date && (date = moment(date))

let alarms = await AsyncStorage.getItem('alarms')
alarms && (alarms = JSON.parse(alarms))

if (/* current date is greater that date */) {
  await AsyncStorage.setItem('date', moment().format('yyyyMMdd'))
  // reset alarms and in AsyncStorage
}

alarms = {
  'id-med-1' : {
    '1000': false, 
    '1215': false, 
    '1745': false
  },
  'id-med-2' : {
    '1100': false, 
    '1215': false, 
    '1845': false
  }
}

alarms.forEach(/* check time and launch alarms => alarms[med][time] = true */)

await AsyncStorage.setItem('alarms', JSON.stringify(alarms))


const alarms = await checkAlarms()

alarms.forEach(/* shoot alarms */)


// when retrieving medications

const medicaments = await retrieveMedications()

// sync alarms in async-storage
